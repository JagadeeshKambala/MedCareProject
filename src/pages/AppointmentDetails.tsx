import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, FileText, Pill, Stethoscope, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/Button';

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock appointment data - in a real app, this would come from an API
  const appointment = {
    id,
    patientName: 'John Doe',
    doctor: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    date: '2025-03-15',
    time: '10:00 AM',
    status: 'Confirmed',
    reason: 'Regular checkup and blood pressure monitoring',
    symptoms: ['High blood pressure', 'Occasional dizziness', 'Fatigue'],
    diagnosis: 'Hypertension - Stage 1',
    prescription: [
      {
        medicine: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '3 months'
      },
      {
        medicine: 'Amlodipine',
        dosage: '5mg',
        frequency: 'Once daily',
        duration: '3 months'
      }
    ],
    notes: 'Patient should maintain a low-sodium diet and exercise regularly. Follow-up appointment recommended in 3 months.',
    vitals: {
      bloodPressure: '140/90 mmHg',
      heartRate: '78 bpm',
      temperature: '98.6°F',
      weight: '75 kg'
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-blue-700 px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-700" />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold text-white">{appointment.patientName}</h1>
                    <p className="text-blue-100">Appointment #{appointment.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.status === 'Confirmed' ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <span className="text-white font-medium">{appointment.status}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Stethoscope className="w-5 h-5 text-blue-700 mr-3" />
                    <div>
                      <p className="text-sm text-slate-600">Doctor</p>
                      <p className="text-slate-800 font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-slate-600">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-700 mr-3" />
                    <div>
                      <p className="text-sm text-slate-600">Date</p>
                      <p className="text-slate-800 font-medium">{appointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-700 mr-3" />
                    <div>
                      <p className="text-sm text-slate-600">Time</p>
                      <p className="text-slate-800 font-medium">{appointment.time}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-slate-800 mb-2">Vitals</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Blood Pressure</p>
                      <p className="text-slate-800">{appointment.vitals.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Heart Rate</p>
                      <p className="text-slate-800">{appointment.vitals.heartRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Temperature</p>
                      <p className="text-slate-800">{appointment.vitals.temperature}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Weight</p>
                      <p className="text-slate-800">{appointment.vitals.weight}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason and Symptoms */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Reason & Symptoms</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-slate-600 mb-4">{appointment.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {appointment.symptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diagnosis and Notes */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  <FileText className="w-5 h-5 inline-block mr-2" />
                  Diagnosis & Notes
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-slate-800 mb-2">{appointment.diagnosis}</p>
                  <p className="text-slate-600">{appointment.notes}</p>
                </div>
              </div>

              {/* Prescription */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  <Pill className="w-5 h-5 inline-block mr-2" />
                  Prescription
                </h3>
                <div className="space-y-4">
                  {appointment.prescription.map((med, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-slate-800">{med.medicine}</p>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-slate-600">Dosage</p>
                          <p className="text-slate-800">{med.dosage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Frequency</p>
                          <p className="text-slate-800">{med.frequency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Duration</p>
                          <p className="text-slate-800">{med.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentDetails;