import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Upload, DollarSign, Users, Mail, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import toast, { Toaster } from 'react-hot-toast';

interface Campaign {
  id: string;
  patientName: string;
  condition: string;
  imageUrl: string;
  requiredAmount: number;
  raisedAmount: number;
  bankDetails: string;
  status: 'active' | 'completed';
}

const Fundraising = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      condition: 'Brain Surgery',
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      requiredAmount: 50000,
      raisedAmount: 35000,
      bankDetails: '************1234',
      status: 'active'
    },
    {
      id: '2',
      patientName: 'Michael Brown',
      condition: 'Heart Surgery',
      imageUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      requiredAmount: 75000,
      raisedAmount: 75000,
      bankDetails: '************5678',
      status: 'completed'
    }
  ]);

  const [formData, setFormData] = useState({
    patientName: '',
    condition: '',
    imageUrl: '',
    requiredAmount: '',
    bankDetails: ''
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      patientName: formData.patientName,
      condition: formData.condition,
      imageUrl: formData.imageUrl,
      requiredAmount: parseFloat(formData.requiredAmount),
      raisedAmount: 0,
      bankDetails: formData.bankDetails,
      status: 'active'
    };

    setCampaigns(prev => [...prev, newCampaign]);
    setShowCreateForm(false);
    setFormData({
      patientName: '',
      condition: '',
      imageUrl: '',
      requiredAmount: '',
      bankDetails: ''
    });
    toast.success('Campaign created successfully!');
  };

  const handleDonate = async (campaign: Campaign) => {
    try {
      // Simulate payment process
      const donationAmount = 1000; // Example amount
      const updatedCampaigns = campaigns.map(c => {
        if (c.id === campaign.id) {
          const newAmount = c.raisedAmount + donationAmount;
          return {
            ...c,
            raisedAmount: newAmount,
            status: newAmount >= c.requiredAmount ? 'completed' : 'active'
          };
        }
        return c;
      });

      setCampaigns(updatedCampaigns);

      // Simulate sending thank you email
      const emailSubject = encodeURIComponent('Thank you for your donation! ❤️');
      const emailBody = encodeURIComponent(`
Dear Donor,

Thank you for your generous donation!

Patient Name: ${campaign.patientName}
Amount Donated: $${donationAmount}
Donation Date: ${new Date().toLocaleDateString()}

You just saved a life! Thank you ❤️

Best regards,
Medical Fundraising Team
      `);

      window.location.href = `mailto:donor@example.com?subject=${emailSubject}&body=${emailBody}`;

      toast.success('Thank you for your donation!');
    } catch (error) {
      toast.error('Failed to process donation');
    }
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Medical Fundraising</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              Create Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.patientName}
                    className="w-full h-48 object-cover"
                  />
                  {campaign.status === 'completed' && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Completed
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {campaign.patientName}
                  </h3>
                  <p className="text-slate-600 mb-4">{campaign.condition}</p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Progress</span>
                        <span>${campaign.raisedAmount} / ${campaign.requiredAmount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-blue-700 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(campaign.raisedAmount / campaign.requiredAmount) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-slate-600">
                        <Users className="h-5 w-5 mr-1" />
                        <span>{Math.floor(Math.random() * 50) + 10} donors</span>
                      </div>
                      {campaign.status === 'active' && (
                        <Button onClick={() => handleDonate(campaign)}>
                          <Heart className="h-5 w-5 mr-2" />
                          Donate Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Create Fundraising Campaign</h2>

                <form onSubmit={handleCreateCampaign} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Patient's Name
                    </label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Medical Condition
                    </label>
                    <input
                      type="text"
                      value={formData.condition}
                      onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Patient's Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Required Amount ($)
                    </label>
                    <input
                      type="number"
                      value={formData.requiredAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, requiredAmount: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bank Account Details
                    </label>
                    <input
                      type="text"
                      value={formData.bankDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, bankDetails: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="secondary"
                      onClick={() => setShowCreateForm(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Create Campaign
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Fundraising;