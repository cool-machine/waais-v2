import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export class EmailService {
  private fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@whartonai.studio';

  async sendWelcomeEmail(email: string, firstName: string) {
    try {
      const msg = {
        to: email,
        from: this.fromEmail,
        subject: 'Welcome to Wharton Alumni AI Studio!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Welcome to Wharton Alumni AI Studio!</h1>
            <p>Dear ${firstName},</p>
            <p>We're thrilled to welcome you to the Wharton Alumni AI Studio and Research Center community!</p>
            <p>Our platform connects Wharton alumni to foster innovation, knowledge sharing, and collaboration in the AI space.</p>
            
            <h2 style="color: #2d3748;">What you can do now:</h2>
            <ul>
              <li>Complete your profile to connect with other alumni</li>
              <li>Browse upcoming events and register for those that interest you</li>
              <li>Explore startup opportunities in our community</li>
              <li>Consider becoming a mentor to help other alumni and startups</li>
            </ul>
            
            <p>If you have any questions, feel free to reach out to us at info@whartonai.studio</p>
            
            <p>Best regards,<br>The Wharton Alumni AI Studio Team</p>
            
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #718096;">
              Wharton Alumni AI Studio and Research Center<br>
              2bis Place de Touraine, 78000 Versailles, France<br>
              Phone: 01 30 21 61 43
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Don't throw error to prevent registration failure
    }
  }

  async sendPasswordResetEmail(email: string, firstName: string, resetToken: string) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5174'}/reset-password?token=${resetToken}`;
      
      const msg = {
        to: email,
        from: this.fromEmail,
        subject: 'Password Reset Request - Wharton Alumni AI Studio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Password Reset Request</h1>
            <p>Dear ${firstName},</p>
            <p>We received a request to reset your password for your Wharton Alumni AI Studio account.</p>
            <p>Click the link below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
            </div>
            
            <p><strong>This link will expire in 1 hour.</strong></p>
            
            <p>If you didn't request this password reset, please ignore this email or contact us at info@whartonai.studio if you have concerns.</p>
            
            <p>Best regards,<br>The Wharton Alumni AI Studio Team</p>
            
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #718096;">
              If you're having trouble clicking the button, copy and paste this URL into your browser:<br>
              ${resetUrl}
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  async sendEventRegistrationEmail(email: string, firstName: string, eventTitle: string, eventDate: string) {
    try {
      const msg = {
        to: email,
        from: this.fromEmail,
        subject: `Event Registration Confirmation - ${eventTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Event Registration Confirmed!</h1>
            <p>Dear ${firstName},</p>
            <p>Your registration for <strong>${eventTitle}</strong> has been confirmed.</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #2d3748;">Event Details:</h3>
              <p style="margin: 5px 0;"><strong>Event:</strong> ${eventTitle}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${eventDate}</p>
            </div>
            
            <p>We'll send you additional details and any updates closer to the event date.</p>
            
            <p>Looking forward to seeing you there!</p>
            
            <p>Best regards,<br>The Wharton Alumni AI Studio Team</p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log(`Event registration email sent to ${email}`);
    } catch (error) {
      console.error('Error sending event registration email:', error);
      // Don't throw error to prevent registration failure
    }
  }

  async sendNewsletterSubscriptionEmail(email: string) {
    try {
      const msg = {
        to: email,
        from: this.fromEmail,
        subject: 'Newsletter Subscription Confirmed - Wharton Alumni AI Studio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Newsletter Subscription Confirmed!</h1>
            <p>Thank you for subscribing to the Wharton Alumni AI Studio newsletter!</p>
            <p>You'll now receive updates about:</p>
            <ul>
              <li>Upcoming events and workshops</li>
              <li>Featured startups and success stories</li>
              <li>AI industry insights and trends</li>
              <li>Community highlights and opportunities</li>
            </ul>
            
            <p>You can unsubscribe at any time by clicking the unsubscribe link in any newsletter email.</p>
            
            <p>Best regards,<br>The Wharton Alumni AI Studio Team</p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log(`Newsletter subscription email sent to ${email}`);
    } catch (error) {
      console.error('Error sending newsletter subscription email:', error);
    }
  }
}

export const emailService = new EmailService();