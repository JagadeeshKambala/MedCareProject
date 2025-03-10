import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/Button';

const AppointmentHistory = () => {
  const [filter, setFilter] = useState('all');

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      date: '2025-02-15',
      time: '10:00 AM',
      status: 'completed',
      notes: 'Regular checkup, blood pressure normal',
      prescription: 'Prescribed blood pressure medication',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      date: '2025-01-20',
      time: '2:30 PM',
      status: 'cancelled',
      notes: 'Patient cancelled due to emergency',
      prescription: null,
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      specialty: 'Pediatrician',
      date: '2024-12-10',
      time: '11:15 AM',
      status: 'completed',
      notes: 'Vaccination appointment',
      prescription: 'No prescription needed',
    },
  ];

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Appointment History</h1>
            <div className="flex space-x-4">
              <Button 
                variant={filter === 'all' ? 'primary' : 'secondary'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'completed' ? 'primary' : 'secondary'}
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
              <Button 
                variant={filter === 'cancelled' ? 'primary' : 'secondary'}
                onClick={() => setFilter('cancelled')}
              >
                Cancelled
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        {appointment.status === 'completed' ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">
                          {appointment.doctor}
                        </h3>
                        <p className="text-slate-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-slate-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-slate-600 mt-1">
                        <Clock className="h-4 w-4 mr-2" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">
                          Doctor's Notes
                        </h4>
                        <p className="text-slate-600">{appointment.notes}</p>
                      </div>
                      {appointment.prescription && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">
                            Prescription
                          </h4>
                          <p className="text-slate-600">{appointment.prescription}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {appointment.status === 'completed' && (
                    <div className="mt-4 flex justify-end">
                      <Button variant="secondary">Download Report</Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentHistory;