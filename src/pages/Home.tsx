import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Mail, Clock } from 'lucide-react';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-blue-700 mb-6">
              Never Miss Your Doctor's Appointment Again!
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Get email reminders, reschedule easily, and manage all your appointments in one place.
              We make healthcare scheduling simple and efficient.
            </p>
            <div className="flex justify-center space-x-6">
              <Button onClick={() => navigate('/doctors')}>Book an Appointment</Button>
              <Button variant="secondary" onClick={() => navigate('/doctors')}>
                View Doctors
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">About Our Service</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We understand the importance of timely medical care. Our smart appointment system
              helps you stay on top of your healthcare schedule with automated reminders and
              easy management tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <Calendar className="w-12 h-12 text-blue-700 mb-6" />
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Easy Scheduling</h3>
              <p className="text-slate-600">
                Book appointments quickly and easily through our intuitive interface.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <Mail className="w-12 h-12 text-blue-700 mb-6" />
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Smart Reminders</h3>
              <p className="text-slate-600">
                Receive timely email reminders so you never miss an appointment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <Clock className="w-12 h-12 text-blue-700 mb-6" />
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Flexible Rescheduling</h3>
              <p className="text-slate-600">
                Need to change your appointment? Reschedule with just a few clicks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">Contact Us</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-center">
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                LinkedIn
              </a>
            </div>
            <p className="text-slate-400">© 2025 MediCare. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;