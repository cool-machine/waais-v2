import bcrypt from 'bcryptjs';
import { prisma } from './utils/database';

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@whartonai.studio' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@whartonai.studio',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      profile: {
        create: {
          bio: 'System Administrator',
          currentCompany: 'Wharton Alumni AI Studio',
          currentRole: 'Administrator',
          graduationYear: 2010,
          degree: 'MBA'
        }
      }
    }
  });

  // Create sample users
  const sampleUsers = [
    {
      email: 'sarah.johnson@example.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      password: await bcrypt.hash('password123', 12),
      profile: {
        bio: 'AI researcher and entrepreneur with 15+ years of experience in technology and venture capital.',
        currentCompany: 'TechVentures Capital',
        currentRole: 'Managing Partner',
        graduationYear: 2008,
        degree: 'MBA',
        industry: 'Venture Capital',
        location: 'San Francisco, CA',
        aiExpertise: ['Machine Learning', 'Computer Vision', 'Natural Language Processing'],
        yearsOfExperience: 15,
        availableForMentoring: true,
        interestedInStartups: true,
        linkedinUrl: 'https://linkedin.com/in/sarahjohnson'
      }
    },
    {
      email: 'michael.chen@example.com',
      firstName: 'Michael',
      lastName: 'Chen',
      password: await bcrypt.hash('password123', 12),
      profile: {
        bio: 'Serial entrepreneur with three successful AI startup exits. Passionate about mentoring the next generation.',
        currentCompany: 'AI Innovations Inc',
        currentRole: 'CEO & Founder',
        graduationYear: 2012,
        degree: 'MBA',
        industry: 'Technology',
        location: 'New York, NY',
        aiExpertise: ['Deep Learning', 'Robotics', 'AI Strategy'],
        yearsOfExperience: 12,
        availableForMentoring: true,
        interestedInStartups: true,
        linkedinUrl: 'https://linkedin.com/in/michaelchen'
      }
    },
    {
      email: 'priya.patel@example.com',
      firstName: 'Priya',
      lastName: 'Patel',
      password: await bcrypt.hash('password123', 12),
      profile: {
        bio: 'PhD in Computer Science with expertise in machine learning and data science. Leading AI initiatives at Fortune 500 company.',
        currentCompany: 'DataCorp Technologies',
        currentRole: 'Head of AI Research',
        graduationYear: 2015,
        degree: 'MBA',
        industry: 'Technology',
        location: 'Seattle, WA',
        aiExpertise: ['Data Science', 'Machine Learning', 'AI Ethics'],
        yearsOfExperience: 9,
        availableForMentoring: true,
        interestedInStartups: false,
        linkedinUrl: 'https://linkedin.com/in/priyapatel'
      }
    }
  ];

  const users = [];
  for (const userData of sampleUsers) {
    const { profile, ...userInfo } = userData;
    const user = await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {},
      create: {
        ...userInfo,
        profile: {
          create: profile
        }
      }
    });
    users.push(user);
  }

  // Create sample events
  const sampleEvents = [
    {
      title: 'AI in Healthcare: Future Trends and Applications',
      description: 'Join us for an insightful discussion on how AI is transforming healthcare, from diagnostic tools to personalized medicine.',
      content: 'This event will feature leading experts in AI and healthcare discussing the latest innovations and future possibilities.',
      startDate: new Date('2024-09-15T18:00:00Z'),
      endDate: new Date('2024-09-15T20:00:00Z'),
      location: 'Wharton San Francisco Campus',
      isVirtual: false,
      maxAttendees: 50,
      status: 'PUBLISHED' as const,
      createdById: admin.id
    },
    {
      title: 'Machine Learning for Finance: Virtual Workshop',
      description: 'Learn how machine learning is revolutionizing financial services in this hands-on virtual workshop.',
      content: 'Interactive workshop covering ML applications in trading, risk management, and fraud detection.',
      startDate: new Date('2024-09-22T14:00:00Z'),
      endDate: new Date('2024-09-22T17:00:00Z'),
      isVirtual: true,
      meetingUrl: 'https://zoom.us/j/123456789',
      maxAttendees: 100,
      status: 'PUBLISHED' as const,
      createdById: admin.id
    },
    {
      title: 'Startup Pitch Night: AI Innovations',
      description: 'Watch promising AI startups pitch their innovative solutions to a panel of expert judges and investors.',
      content: 'An exciting evening of startup presentations followed by networking and Q&A.',
      startDate: new Date('2024-10-05T19:00:00Z'),
      endDate: new Date('2024-10-05T22:00:00Z'),
      location: 'Philadelphia Convention Center',
      isVirtual: false,
      maxAttendees: 200,
      status: 'PUBLISHED' as const,
      createdById: admin.id
    }
  ];

  const events = [];
  for (const eventData of sampleEvents) {
    const event = await prisma.event.upsert({
      where: { title: eventData.title },
      update: {},
      create: eventData
    });
    events.push(event);
  }

  // Create sample startups
  const sampleStartups = [
    {
      name: 'MedAI Solutions',
      description: 'AI-powered diagnostic tools for early disease detection and personalized treatment recommendations.',
      website: 'https://medaisolutions.com',
      industry: 'Healthcare Technology',
      stage: 'SEED' as const,
      foundedYear: 2023,
      location: 'Boston, MA',
      teamSize: '5-10',
      aiTechnologies: ['Computer Vision', 'Deep Learning', 'Medical Imaging'],
      status: 'ACTIVE' as const
    },
    {
      name: 'FinanceBot Pro',
      description: 'Intelligent automation platform for financial advisory services using natural language processing.',
      website: 'https://financebotpro.com',
      industry: 'Financial Technology',
      stage: 'PRE_SEED' as const,
      foundedYear: 2024,
      location: 'New York, NY',
      teamSize: '3-5',
      aiTechnologies: ['Natural Language Processing', 'Machine Learning', 'Chatbots'],
      status: 'ACTIVE' as const
    },
    {
      name: 'EcoPredict Analytics',
      description: 'Environmental monitoring and prediction platform using satellite imagery and machine learning.',
      website: 'https://ecopredict.ai',
      industry: 'Environmental Technology',
      stage: 'SERIES_A' as const,
      foundedYear: 2021,
      location: 'San Francisco, CA',
      teamSize: '15-20',
      aiTechnologies: ['Satellite Imagery', 'Time Series Analysis', 'Environmental Modeling'],
      status: 'ACTIVE' as const
    }
  ];

  const startups = [];
  for (const startupData of sampleStartups) {
    const startup = await prisma.startup.upsert({
      where: { name: startupData.name },
      update: {},
      create: startupData
    });
    startups.push(startup);
  }

  // Create sample mentorships
  const mentorships = [];
  for (let i = 0; i < Math.min(users.length, 2); i++) {
    const user = users[i];
    const mentorship = await prisma.mentorship.create({
      data: {
        mentorId: user.id,
        title: `${user.firstName} ${user.lastName} - AI Expertise & Startup Guidance`,
        description: `Offering mentorship in AI technologies, startup strategy, and career development. With over 10 years of experience in the tech industry.`,
        expertise: ['Machine Learning', 'Startup Strategy', 'Product Development', 'Team Leadership'],
        maxMentees: 5,
        isActive: true
      }
    });
    mentorships.push(mentorship);
  }

  // Create sample partners
  const samplePartners = [
    {
      name: 'Stanford AI Institute',
      description: 'Leading research institution focused on artificial intelligence and machine learning innovations.',
      website: 'https://ai.stanford.edu',
      isActive: true
    },
    {
      name: 'TechCrunch',
      description: 'Premier technology media platform covering startups, technology news, and innovation.',
      website: 'https://techcrunch.com',
      isActive: true
    },
    {
      name: 'Y Combinator',
      description: 'World-renowned startup accelerator that has funded over 3000 companies including Dropbox, Airbnb, and Stripe.',
      website: 'https://ycombinator.com',
      isActive: true
    },
    {
      name: 'NVIDIA',
      description: 'Leading AI computing company providing the hardware and software platforms for AI development.',
      website: 'https://nvidia.com',
      isActive: true
    }
  ];

  const partners = [];
  for (const partnerData of samplePartners) {
    const partner = await prisma.partner.upsert({
      where: { name: partnerData.name },
      update: {},
      create: partnerData
    });
    partners.push(partner);
  }

  console.log('✅ Database seeded successfully!');
  console.log(`👤 Created ${users.length + 1} users (including admin)`);
  console.log(`📅 Created ${events.length} events`);
  console.log(`🚀 Created ${startups.length} startups`);
  console.log(`🎯 Created ${mentorships.length} mentorships`);
  console.log(`🤝 Created ${partners.length} partners`);
  
  console.log('\n🔑 Admin credentials:');
  console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@whartonai.studio'}`);
  console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });