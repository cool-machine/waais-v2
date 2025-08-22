import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/database';
import { emailService } from './emailService';
import { createError } from '../middleware/errorHandler';

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  graduationYear?: number;
  degree?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  async register(data: RegisterData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw createError('User already exists with this email', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        profile: {
          create: {
            graduationYear: data.graduationYear,
            degree: data.degree,
          }
        }
      },
      include: {
        profile: true
      }
    });

    // Send welcome email
    await emailService.sendWelcomeEmail(user.email, user.firstName);

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profile: user.profile
      },
      token
    };
  }

  async login(data: LoginData) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { profile: true }
    });

    if (!user) {
      throw createError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw createError('Invalid email or password', 401);
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profile: user.profile
      },
      token
    };
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { profile: true }
      });

      if (!user) {
        throw createError('Invalid token', 401);
      }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profile: user.profile
      };
    } catch (error) {
      throw createError('Invalid token', 401);
    }
  }

  async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal that user doesn't exist
      return { message: 'If an account exists, a reset link will be sent' };
    }

    const resetToken = this.generateResetToken(user.id);
    
    // In production, store this token with expiry in database
    await emailService.sendPasswordResetEmail(user.email, user.firstName, resetToken);

    return { message: 'If an account exists, a reset link will be sent' };
  }

  private generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  private generateResetToken(userId: string): string {
    return jwt.sign(
      { userId, type: 'reset' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  }
}

export const authService = new AuthService();