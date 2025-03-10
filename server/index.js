import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { appointmentRouter } from './routes/appointments.js';
import { userRouter } from './routes/users.js';
import { doctorRouter } from './routes/doctors.js';
import { reviewRouter } from './routes/reviews.js';
import { notificationRouter } from './routes/notifications.js';
import { Doctor } from './models/doctor.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with retry logic
const connectDB = async () => {
  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      console.log(`Attempting to connect to MongoDB (attempt ${retries + 1}/${MAX_RETRIES})...`);
      console.log('MongoDB URI:', process.env.MONGODB_URI);
      
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
        keepAlive: true,
        keepAliveInitialDelay: 300000
      });
      
      console.log('MongoDB Connected Successfully');
      
      // Check if we need to seed initial doctors
      const doctorCount = await Doctor.countDocuments();
      console.log('Current doctor count:', doctorCount);
      
      if (doctorCount === 0) {
        console.log('No doctors found, seeding initial data...');
        await seedDoctors();
      }
      
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${retries + 1} failed:`, error);
      retries++;
      
      if (retries === MAX_RETRIES) {
        console.error('Max retries reached. Could not connect to MongoDB.');
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Seed initial doctors
const seedDoctors = async () => {
  const doctors = [
    {
      name: 'Dr. Sarah Smith',
      email: 'sarah.smith@medicare.com',
      phone: '+1 (555) 123-4567',
      specialty: 'Cardiologist',
      experience: 10,
      qualifications: [{ degree: 'MD', institution: 'Harvard Medical School', year: 2010 }],
      availableSlots: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.8,
      totalReviews: 124
    },
    {
      name: 'Dr. John Doe',
      email: 'john.doe@medicare.com',
      phone: '+1 (555) 234-5678',
      specialty: 'General Physician',
      experience: 8,
      qualifications: [{ degree: 'MD', institution: 'Stanford Medical School', year: 2012 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.6,
      totalReviews: 98
    },
    {
      name: 'Dr. Emily Brown',
      email: 'emily.brown@medicare.com',
      phone: '+1 (555) 345-6789',
      specialty: 'Pediatrician',
      experience: 12,
      qualifications: [{ degree: 'MD', institution: 'Yale School of Medicine', year: 2008 }],
      availableSlots: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Friday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.9,
      totalReviews: 156
    },
    {
      name: 'Dr. Michael Chen',
      email: 'michael.chen@medicare.com',
      phone: '+1 (555) 456-7890',
      specialty: 'Neurologist',
      experience: 15,
      qualifications: [{ degree: 'MD', institution: 'Johns Hopkins School of Medicine', year: 2005 }],
      availableSlots: [
        { day: 'Wednesday', startTime: '10:00', endTime: '18:00' },
        { day: 'Friday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.7,
      totalReviews: 142
    },
    {
      name: 'Dr. Lisa Wilson',
      email: 'lisa.wilson@medicare.com',
      phone: '+1 (555) 567-8901',
      specialty: 'Dermatologist',
      experience: 9,
      qualifications: [{ degree: 'MD', institution: 'UCLA School of Medicine', year: 2011 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.5,
      totalReviews: 87
    },
    {
      name: 'Dr. Robert Taylor',
      email: 'robert.taylor@medicare.com',
      phone: '+1 (555) 678-9012',
      specialty: 'Cardiologist',
      experience: 20,
      qualifications: [{ degree: 'MD', institution: 'Columbia University', year: 2000 }],
      availableSlots: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.9,
      totalReviews: 198
    },
    {
      name: 'Dr. Maria Garcia',
      email: 'maria.garcia@medicare.com',
      phone: '+1 (555) 789-0123',
      specialty: 'Pediatrician',
      experience: 11,
      qualifications: [{ degree: 'MD', institution: 'University of Pennsylvania', year: 2009 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.8,
      totalReviews: 134
    },
    {
      name: 'Dr. James Anderson',
      email: 'james.anderson@medicare.com',
      phone: '+1 (555) 890-1234',
      specialty: 'General Physician',
      experience: 7,
      qualifications: [{ degree: 'MD', institution: 'Duke University', year: 2013 }],
      availableSlots: [
        { day: 'Monday', startTime: '10:00', endTime: '18:00' },
        { day: 'Friday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.4,
      totalReviews: 76
    },
    {
      name: 'Dr. Patricia Martinez',
      email: 'patricia.martinez@medicare.com',
      phone: '+1 (555) 901-2345',
      specialty: 'Dermatologist',
      experience: 13,
      qualifications: [{ degree: 'MD', institution: 'University of Michigan', year: 2007 }],
      availableSlots: [
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.7,
      totalReviews: 112
    },
    {
      name: 'Dr. David Kim',
      email: 'david.kim@medicare.com',
      phone: '+1 (555) 012-3456',
      specialty: 'Neurologist',
      experience: 16,
      qualifications: [{ degree: 'MD', institution: 'Northwestern University', year: 2004 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Thursday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.8,
      totalReviews: 167
    },
    {
      name: 'Dr. Jennifer Lee',
      email: 'jennifer.lee@medicare.com',
      phone: '+1 (555) 123-4567',
      specialty: 'Pediatrician',
      experience: 9,
      qualifications: [{ degree: 'MD', institution: 'University of Washington', year: 2011 }],
      availableSlots: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.6,
      totalReviews: 89
    },
    {
      name: 'Dr. William Thompson',
      email: 'william.thompson@medicare.com',
      phone: '+1 (555) 234-5678',
      specialty: 'Cardiologist',
      experience: 18,
      qualifications: [{ degree: 'MD', institution: 'Mayo Medical School', year: 2002 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
        { day: 'Thursday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.9,
      totalReviews: 178
    },
    {
      name: 'Dr. Elizabeth White',
      email: 'elizabeth.white@medicare.com',
      phone: '+1 (555) 345-6789',
      specialty: 'Dermatologist',
      experience: 10,
      qualifications: [{ degree: 'MD', institution: 'Vanderbilt University', year: 2010 }],
      availableSlots: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Friday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.5,
      totalReviews: 92
    },
    {
      name: 'Dr. Thomas Rodriguez',
      email: 'thomas.rodriguez@medicare.com',
      phone: '+1 (555) 456-7890',
      specialty: 'General Physician',
      experience: 12,
      qualifications: [{ degree: 'MD', institution: 'University of Virginia', year: 2008 }],
      availableSlots: [
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.7,
      totalReviews: 123
    },
    {
      name: 'Dr. Susan Clark',
      email: 'susan.clark@medicare.com',
      phone: '+1 (555) 567-8901',
      specialty: 'Neurologist',
      experience: 14,
      qualifications: [{ degree: 'MD', institution: 'University of Pittsburgh', year: 2006 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.8,
      totalReviews: 145
    },
    {
      name: 'Dr. Richard Martin',
      email: 'richard.martin@medicare.com',
      phone: '+1 (555) 678-9012',
      specialty: 'Cardiologist',
      experience: 17,
      qualifications: [{ degree: 'MD', institution: 'Emory University', year: 2003 }],
      availableSlots: [
        { day: 'Monday', startTime: '10:00', endTime: '18:00' },
        { day: 'Wednesday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.9,
      totalReviews: 187
    },
    {
      name: 'Dr. Margaret Lewis',
      email: 'margaret.lewis@medicare.com',
      phone: '+1 (555) 789-0123',
      specialty: 'Pediatrician',
      experience: 13,
      qualifications: [{ degree: 'MD', institution: 'Boston University', year: 2007 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Thursday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.7,
      totalReviews: 156
    },
    {
      name: 'Dr. Joseph Hall',
      email: 'joseph.hall@medicare.com',
      phone: '+1 (555) 890-1234',
      specialty: 'Dermatologist',
      experience: 11,
      qualifications: [{ degree: 'MD', institution: 'University of Wisconsin', year: 2009 }],
      availableSlots: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.6,
      totalReviews: 98
    },
    {
      name: 'Dr. Barbara Young',
      email: 'barbara.young@medicare.com',
      phone: '+1 (555) 901-2345',
      specialty: 'General Physician',
      experience: 15,
      qualifications: [{ degree: 'MD', institution: 'University of Minnesota', year: 2005 }],
      availableSlots: [
        { day: 'Wednesday', startTime: '10:00', endTime: '18:00' },
        { day: 'Friday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.8,
      totalReviews: 167
    },
    {
      name: 'Dr. Charles Scott',
      email: 'charles.scott@medicare.com',
      phone: '+1 (555) 012-3456',
      specialty: 'Neurologist',
      experience: 19,
      qualifications: [{ degree: 'MD', institution: 'University of Colorado', year: 2001 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.9,
      totalReviews: 198
    },
    {
      name: 'Dr. Sandra Green',
      email: 'sandra.green@medicare.com',
      phone: '+1 (555) 123-4567',
      specialty: 'Cardiologist',
      experience: 16,
      qualifications: [{ degree: 'MD', institution: 'University of Iowa', year: 2004 }],
      availableSlots: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.7,
      totalReviews: 178
    },
    {
      name: 'Dr. Christopher Adams',
      email: 'christopher.adams@medicare.com',
      phone: '+1 (555) 234-5678',
      specialty: 'Pediatrician',
      experience: 12,
      qualifications: [{ degree: 'MD', institution: 'University of Maryland', year: 2008 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
        { day: 'Thursday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.8,
      totalReviews: 145
    },
    {
      name: 'Dr. Michelle Baker',
      email: 'michelle.baker@medicare.com',
      phone: '+1 (555) 345-6789',
      specialty: 'Dermatologist',
      experience: 10,
      qualifications: [{ degree: 'MD', institution: 'University of Arizona', year: 2010 }],
      availableSlots: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.6,
      totalReviews: 112
    },
    {
      name: 'Dr. Daniel Nelson',
      email: 'daniel.nelson@medicare.com',
      phone: '+1 (555) 456-7890',
      specialty: 'General Physician',
      experience: 14,
      qualifications: [{ degree: 'MD', institution: 'University of Oregon', year: 2006 }],
      availableSlots: [
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Friday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.7,
      totalReviews: 156
    },
    {
      name: 'Dr. Laura Carter',
      email: 'laura.carter@medicare.com',
      phone: '+1 (555) 567-8901',
      specialty: 'Neurologist',
      experience: 13,
      qualifications: [{ degree: 'MD', institution: 'University of Utah', year: 2007 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.8,
      totalReviews: 134
    },
    {
      name: 'Dr. Kevin Mitchell',
      email: 'kevin.mitchell@medicare.com',
      phone: '+1 (555) 678-9012',
      specialty: 'Cardiologist',
      experience: 18,
      qualifications: [{ degree: 'MD', institution: 'University of Kansas', year: 2002 }],
      availableSlots: [
        { day: 'Monday', startTime: '10:00', endTime: '18:00' },
        { day: 'Wednesday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.9,
      totalReviews: 189
    },
    {
      name: 'Dr. Rachel Turner',
      email: 'rachel.turner@medicare.com',
      phone: '+1 (555) 789-0123',
      specialty: 'Pediatrician',
      experience: 11,
      qualifications: [{ degree: 'MD', institution: 'University of Nebraska', year: 2009 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
        { day: 'Thursday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.7,
      totalReviews: 123
    },
    {
      name: 'Dr. Steven Phillips',
      email: 'steven.phillips@medicare.com',
      phone: '+1 (555) 890-1234',
      specialty: 'Dermatologist',
      experience: 15,
      qualifications: [{ degree: 'MD', institution: 'University of Oklahoma', year: 2005 }],
      availableSlots: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.8,
      totalReviews: 167
    },
    {
      name: 'Dr. Rebecca Cooper',
      email: 'rebecca.cooper@medicare.com',
      phone: '+1 (555) 901-2345',
      specialty: 'General Physician',
      experience: 9,
      qualifications: [{ degree: 'MD', institution: 'University of Arkansas', year: 2011 }],
      availableSlots: [
        { day: 'Wednesday', startTime: '10:00', endTime: '18:00' },
        { day: 'Friday', startTime: '10:00', endTime: '18:00' }
      ],
      averageRating: 4.6,
      totalReviews: 98
    },
    {
      name: 'Dr. Timothy Ross',
      email: 'timothy.ross@medicare.com',
      phone: '+1 (555) 012-3456',
      specialty: 'Neurologist',
      experience: 17,
      qualifications: [{ degree: 'MD', institution: 'University of Alabama', year: 2003 }],
      availableSlots: [
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' }
      ],
      averageRating: 4.9,
      totalReviews: 178
    },
    {
      name: 'Dr. Amanda Morgan',
      email: 'amanda.morgan@medicare.com',
      phone: '+1 (555) 123-4567',
      specialty: 'Cardiologist',
      experience: 12,
      qualifications: [{ degree: 'MD', institution: 'University of Kentucky', year: 2008 }],
      availableSlots: [
        { day: 'Monday', startTime: '08:00', endTime: '16:00' },
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00' }
      ],
      averageRating: 4.7,
      totalReviews: 145
    }
  ];

  try {
    console.log('Attempting to seed doctors...');
    await Doctor.insertMany(doctors);
    console.log('Initial doctors seeded successfully');
  } catch (error) {
    console.error('Error seeding doctors:', error);
    throw error;
  }
};

// Connect to MongoDB before starting the server
connectDB().then(() => {
  // Routes
  app.use('/api/appointments', appointmentRouter);
  app.use('/api/users', userRouter);
  app.use('/api/doctors', doctorRouter);
  app.use('/api/reviews', reviewRouter);
  app.use('/api/notifications', notificationRouter);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});