import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ThermometerSun, Heart, Phone, Mail, Calendar } from 'lucide-react';
import Button from '../components/Button';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

interface EmergencyFormData {
  name: string;
  email: string;
  symptoms: string;
  medicalHistory: boolean;
  currentMedication: boolean;
  temperature?: string;
}

interface AIResponse {
  severity: 'mild' | 'moderate' | 'severe';
  firstAid: string[];
  medicines: string[];
  recommendation: string;
}

const EmergencyAssistant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EmergencyFormData>({
    name: '',
    email: '',
    symptoms: '',
    medicalHistory: false,
    currentMedication: false,
    temperature: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      // Simulate AI analysis (replace with actual OpenAI API call)
      const severity = formData.symptoms.toLowerCase().includes('chest pain') || 
                      formData.symptoms.toLowerCase().includes('breathing') ||
                      formData.symptoms.toLowerCase().includes('stroke')
        ? 'severe'
        : 'moderate';

      const mockAIResponse: AIResponse = {
        severity,
        firstAid: [
          'Stay calm and seated in a comfortable position',
          'Take slow, deep breaths',
          'If available, take prescribed medication'
        ],
        medicines: [
          'Paracetamol for fever/pain',
          'ORS for dehydration',
          'Antacids for stomach discomfort'
        ],
        recommendation: severity === 'severe' 
          ? 'URGENT: Please seek immediate medical attention!'
          : 'Monitor symptoms and consult a doctor if condition worsens'
      };

      setAiResponse(mockAIResponse);

      if (severity === 'severe') {
        // Send emergency email
        const emailSubject = encodeURIComponent(`🚨 Emergency Medical Alert: ${formData.name} is experiencing critical symptoms!`);
        const emailBody = encodeURIComponent(`
Emergency Medical Alert

Patient: ${formData.name}
Symptoms: ${formData.symptoms}

First Aid Instructions:
${mockAIResponse.firstAid.join('\n')}

URGENT: Please seek immediate medical attention!

Book an appointment: http://localhost:5173/doctors
        `);

        window.location.href = `mailto:${formData.email}?subject=${emailSubject}&body=${emailBody}`;
      }

      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze symptoms');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBookAppointment = () => {
    navigate('/doctors');
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:911';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-700 px-6 py-8">
              <h1 className="text-3xl font-bold text-white text-center">
                Emergency Medical Assistant
              </h1>
              <p className="text-blue-100 text-center mt-2">
                Get instant medical advice and emergency assistance
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What are your symptoms?
                  </label>
                  <TextareaAutosize
                    value={formData.symptoms}
                    onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    minRows={3}
                    required
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.medicalHistory}
                        onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.checked }))}
                        className="h-5 w-5 text-blue-700 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Do you have any known medical history?</span>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.currentMedication}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentMedication: e.target.checked }))}
                        className="h-5 w-5 text-blue-700 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Are you on any current medication?</span>
                    </label>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Temperature (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.temperature}
                      onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                      placeholder="98.6"
                      step="0.1"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ThermometerSun className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </motion.div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isAnalyzing}
                    className="relative"
                  >
                    {isAnalyzing ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
                    {!isAnalyzing && (
                      <motion.div
                        className="absolute -top-1 -right-1 h-3 w-3"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </motion.div>
                    )}
                  </Button>
                </div>
              </form>

              <AnimatePresence>
                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 space-y-6"
                  >
                    <div className={`p-4 rounded-lg ${
                      aiResponse.severity === 'severe' ? 'bg-red-50' :
                      aiResponse.severity === 'moderate' ? 'bg-yellow-50' : 'bg-green-50'
                    }`}>
                      <div className="flex items-center mb-4">
                        <AlertCircle className={`h-6 w-6 ${
                          aiResponse.severity === 'severe' ? 'text-red-500' :
                          aiResponse.severity === 'moderate' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <span className="ml-2 font-medium">{aiResponse.recommendation}</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-slate-800 mb-2">First Aid Instructions:</h3>
                          <ul className="list-disc list-inside space-y-1 text-slate-600">
                            {aiResponse.firstAid.map((instruction, index) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-medium text-slate-800 mb-2">Suggested Medicines:</h3>
                          <ul className="list-disc list-inside space-y-1 text-slate-600">
                            {aiResponse.medicines.map((medicine, index) => (
                              <li key={index}>{medicine}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {aiResponse.severity === 'severe' && (
                      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button
                          onClick={handleEmergencyCall}
                          className="relative bg-red-600 hover:bg-red-700"
                        >
                          <Phone className="h-5 w-5 mr-2" />
                          Emergency Call (911)
                          <motion.div
                            className="absolute -top-1 -right-1 h-3 w-3"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.8, 1],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </motion.div>
                        </Button>
                        <Button onClick={handleBookAppointment}>
                          <Calendar className="h-5 w-5 mr-2" />
                          Book Urgent Appointment
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyAssistant;