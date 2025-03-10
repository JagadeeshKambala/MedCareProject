import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';

interface Message {
  type: 'user' | 'bot';
  content: string;
  actions?: Array<{
    label: string;
    path: string;
  }>;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      content: 'Hi! I\'m MediBot, your healthcare assistant. I can help you with appointments, finding doctors, accessing your dashboard, and more. What would you like to know?',
      actions: [
        { label: 'View Dashboard', path: '/dashboard' },
        { label: 'Find Doctors', path: '/doctors' },
        { label: 'View Appointments', path: '/history' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(input.toLowerCase());
      setMessages(prev => [...prev, response]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const getBotResponse = (input: string): Message => {
    // Dashboard related queries
    if (input.includes('dashboard')) {
      return {
        type: 'bot',
        content: "The dashboard provides an overview of your healthcare activities. You can view your upcoming appointments, total appointments, and patient statistics. Would you like to access your dashboard?",
        actions: [{ label: 'Go to Dashboard', path: '/dashboard' }]
      };
    }

    // Appointment history queries
    if (input.includes('history') || input.includes('past appointment')) {
      return {
        type: 'bot',
        content: "You can view your complete appointment history, including past visits, prescriptions, and doctor's notes. The history page shows all appointments with their status and details.",
        actions: [{ label: 'View History', path: '/history' }]
      };
    }

    // Profile related queries
    if (input.includes('profile') || input.includes('my information')) {
      return {
        type: 'bot',
        content: "Your profile contains your personal information, medical history, allergies, and emergency contacts. You can update this information at any time.",
        actions: [{ label: 'View Profile', path: '/profile' }]
      };
    }

    // Booking related queries
    if (input.includes('book') || input.includes('appointment')) {
      return {
        type: 'bot',
        content: "You can book an appointment by browsing our list of doctors and selecting your preferred time slot. Would you like to see available doctors?",
        actions: [{ label: 'Find Doctors', path: '/doctors' }]
      };
    }

    // Doctor related queries
    if (input.includes('doctor') || input.includes('specialist')) {
      return {
        type: 'bot',
        content: "We have various specialists including Cardiologists, General Physicians, Pediatricians, Neurologists, and Dermatologists. You can view their profiles, qualifications, and available time slots.",
        actions: [{ label: 'Browse Doctors', path: '/doctors' }]
      };
    }

    // Contact related queries
    if (input.includes('contact') || input.includes('support')) {
      return {
        type: 'bot',
        content: "Our support team is available Monday to Friday, 9am-6pm. You can reach us through the contact page or call us at +1 (555) 123-4567.",
        actions: [{ label: 'Contact Us', path: '/contact' }]
      };
    }

    // Emergency queries
    if (input.includes('emergency')) {
      return {
        type: 'bot',
        content: "If you're experiencing a medical emergency, please call 911 immediately. For urgent but non-emergency situations, you can book an urgent appointment through our system.",
        actions: [{ label: 'Book Urgent Appointment', path: '/doctors' }]
      };
    }

    // Help with navigation
    if (input.includes('help') || input.includes('guide')) {
      return {
        type: 'bot',
        content: "I can help you navigate our website. Here are the main features you can access:",
        actions: [
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Find Doctors', path: '/doctors' },
          { label: 'Appointment History', path: '/history' },
          { label: 'Your Profile', path: '/profile' },
          { label: 'Contact Support', path: '/contact' }
        ]
      };
    }

    // Default response
    return {
      type: 'bot',
      content: "I can help you with appointments, finding doctors, accessing your dashboard, and more. What specific information are you looking for?",
      actions: [
        { label: 'View Dashboard', path: '/dashboard' },
        { label: 'Find Doctors', path: '/doctors' },
        { label: 'View History', path: '/history' }
      ]
    };
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: 1,
              y: 0,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 100 }}
            className={`fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-xl z-50 overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-blue-700 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-6 h-6 text-white" />
                <span className="ml-2 text-white font-medium">MediBot</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-blue-100"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-5 h-5" />
                  ) : (
                    <Minimize2 className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="p-4 h-[calc(600px-144px)] overflow-y-auto">
                  {messages.map((message, index) => (
                    <div key={index} className="mb-4">
                      <div
                        className={`flex ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-700 text-white'
                              : 'bg-gray-100 text-slate-800'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                      {message.actions && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.actions.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={() => handleActionClick(action.path)}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end space-x-2">
                    <TextareaAutosize
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg resize-none max-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxRows={4}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="p-2 bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;