import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Heart, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    bloodType: 'O+',
    allergies: 'None',
    medications: 'None',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update
    console.log('Profile updated:', profile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-blue-700 px-6 py-8 sm:px-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                  <User className="h-12 w-12 text-blue-700" />
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <p className="text-blue-100 flex items-center mt-2">
                  <Mail className="h-4 w-4 mr-2" />
                  {profile.email}
                </p>
                <p className="text-blue-100 flex items-center mt-1">
                  <Phone className="h-4 w-4 mr-2" />
                  {profile.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profile.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-800">{profile.dateOfBirth}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Blood Type
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bloodType"
                      value={profile.bloodType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-800 flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-2" />
                      {profile.bloodType}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Allergies
                </label>
                {isEditing ? (
                  <textarea
                    name="allergies"
                    value={profile.allergies}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-800 flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    {profile.allergies}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Medications
                </label>
                {isEditing ? (
                  <textarea
                    name="medications"
                    value={profile.medications}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-800">{profile.medications}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Emergency Contact
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContact"
                    value={profile.emergencyContact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-800">{profile.emergencyContact}</p>
                )}
              </div>

              <div className="flex justify-center pt-4">
                {isEditing ? (
                  <div className="space-x-4">
                    <Button type="submit">Save Changes</Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;