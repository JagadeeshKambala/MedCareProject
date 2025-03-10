import express from 'express';
import { Appointment } from '../models/appointment.js';
import { User } from '../models/user.js';
import { Doctor } from '../models/doctor.js';

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialty');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log('Received appointment request:', req.body);

    // First, create or find the patient
    let patient = await User.findOne({ email: req.body.email }).session(session);
    if (!patient) {
      console.log('Creating new patient');
      patient = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dateOfBirth: new Date(), // Default date
      });
      patient = await patient.save({ session });
      console.log('New patient created:', patient);
    }

    // Find the doctor
    const doctorName = req.body.doctor.split(' - ')[0];
    console.log('Looking for doctor:', doctorName);
    const doctor = await Doctor.findOne({ name: doctorName }).session(session);
    
    if (!doctor) {
      await session.abortTransaction();
      session.endSession();
      console.log('Doctor not found');
      return res.status(404).json({ message: 'Doctor not found in the system' });
    }
    console.log('Doctor found:', doctor);

    // Create the appointment
    const appointmentData = {
      patient: patient._id,
      doctor: doctor._id,
      appointmentDate: new Date(`${req.body.date}T${req.body.time}`),
      appointmentTime: req.body.time,
      reason: req.body.reason,
      status: 'pending',
      symptoms: [],
      notes: {
        patientNotes: req.body.reason
      }
    };
    console.log('Creating appointment with data:', appointmentData);

    const appointment = new Appointment(appointmentData);
    const newAppointment = await appointment.save({ session });
    console.log('Appointment created:', newAppointment);

    await session.commitTransaction();
    session.endSession();

    // Populate the response with patient and doctor details
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialty');

    res.status(201).json(populatedAppointment);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Appointment creation error:', error);
    res.status(400).json({ 
      message: error.message || 'Error creating appointment',
      details: error.toString()
    });
  }
});

// Get appointments by patient ID
router.get('/patient/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('doctor', 'name specialty')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by doctor ID
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'name email phone')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment status
router.patch('/:id/status', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = req.body.status;
    if (req.body.doctorNotes) {
      appointment.notes.doctorNotes = req.body.doctorNotes;
    }

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'cancelled';
    await appointment.save();
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const appointmentRouter = router;