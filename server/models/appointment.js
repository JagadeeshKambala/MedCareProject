import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  symptoms: [String],
  diagnosis: {
    type: String,
    default: null
  },
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String,
    notes: String
  }],
  followUp: {
    required: Boolean,
    date: Date
  },
  notes: {
    doctorNotes: String,
    patientNotes: String
  },
  vitals: {
    bloodPressure: String,
    temperature: Number,
    heartRate: Number,
    respiratoryRate: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

appointmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);