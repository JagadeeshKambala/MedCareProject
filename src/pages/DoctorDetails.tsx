import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, Phone, Mail, Clock, MapPin, Calendar, Stethoscope, X, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import toast, { Toaster } from 'react-hot-toast';
import { doctors } from '../data/doctors';

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
}

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
  });

  // Find doctor by ID from the shared data
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Doctor not found</h2>
          <Button onClick={() => navigate('/doctors')}>Back to Doctors</Button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email content
      const emailSubject = encodeURIComponent(`Appointment Request with ${doctor.name}`);
      const emailBody = encodeURIComponent(`
Dear ${doctor.name},

I would like to request an appointment:

Date: ${formData.date}
Time: ${formData.time}
Patient Name: ${formData.name}
Phone: ${formData.phone}
Reason for Visit: ${formData.reason}

Thank you.
      `);

      // Open email client
      window.location.href = `mailto:${doctor.email}?subject=${emailSubject}&body=${emailBody}`;

      // Show calendar modal
      setShowBookingModal(false);
      setShowCalendarModal(true);

      toast.success('Appointment request sent successfully!');
    } catch (error) {
      toast.error('Failed to process appointment request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCalendar = () => {
    const eventDetails = encodeURIComponent(`
Start: ${formData.date} ${formData.time}
Doctor: ${doctor.name}
Patient: ${formData.name}
Reason: ${formData.reason}
Location: Medical Center
    `);

    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appointment with ${doctor.name}`)}&dates=${formData.date.replace(/-/g, '')}T${formData.time.replace(':', '')}00/${formData.date.replace(/-/g, '')}T${(parseInt(formData.time.split(':')[0]) + 1).toString().padStart(2, '0')}${formData.time.split(':')[1]}00&details=${eventDetails}&location=${encodeURIComponent('Medical Center')}`;

    // Open Google Calendar in a new tab
    window.open(googleCalendarUrl, '_blank');
    setShowCalendarModal(false);
    
    // Reset form data
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      reason: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="secondary"
            onClick={() => navigate('/doctors')}
            className="mb-8"
          >
            Back to Doctors
          </Button>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Hero Section */}
            <div className="bg-blue-700 px-6 py-12 sm:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
                    <Stethoscope className="h-12 w-12 text-blue-700" />
                  </div>
                  <div className="ml-6">
                    <h1 className="text-3xl font-bold text-white">{doctor.name}</h1>
                    <p className="text-blue-100 text-lg">{doctor.specialty}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-2 text-white">{doctor.averageRating} ({doctor.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <Button onClick={() => setShowBookingModal(true)}>
                  Book Appointment
                </Button>
              </div>
            </div>

            {/* Details Section */}
            <div className="px-6 py-8 sm:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">About Doctor</h2>
                  <div className="space-y-4">
                    <div className="flex items-center text-slate-600">
                      <Award className="h-5 w-5 mr-3" />
                      <span>{doctor.experience} years of experience</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Mail className="h-5 w-5 mr-3" />
                      <span>{doctor.email}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Phone className="h-5 w-5 mr-3" />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>123 Medical Center, New York, NY</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Qualifications</h3>
                  <div className="space-y-3">
                    {doctor.qualifications.map((qual, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-slate-800">{qual.degree}</p>
                        <p className="text-slate-600">{qual.institution}, {qual.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">Available Time Slots</h2>
                  <div className="space-y-4">
                    {doctor.availableSlots.map((slot, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-slate-800 font-medium mb-2">
                          <Calendar className="h-5 w-5 mr-2" />
                          {slot.day}
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Clock className="h-5 w-5 mr-2" />
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Book Appointment</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">{doctor.name}</h3>
                  <p className="text-slate-600">{doctor.specialty}</p>
                </div>

                <form onSubmit={handleBookAppointment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                      Reason for Visit
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="secondary"
                      onClick={() => setShowBookingModal(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </span>
                      ) : (
                        'Book Appointment'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Calendar Modal */}
        {showCalendarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Add to Calendar</h2>
                  <button
                    onClick={() => setShowCalendarModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-slate-600 mb-6">
                  Would you like to add this appointment to your calendar?
                </p>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => setShowCalendarModal(false)}
                  >
                    Skip
                  </Button>
                  <Button onClick={handleAddToCalendar}>
                    Add to Google Calendar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorDetails;