'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Mail, 
  Plus,
  X,
  AlertCircle,
  Check,
  Loader2
} from 'lucide-react';
import { 
  getEmailNotificationRecipients, 
  updateEmailNotificationRecipients 
} from '@/lib/emailSettingsService';
import { useAuth } from '@/hooks/useAuth';

interface NotificationEmail {
  id: string;
  email: string;
  isValid: boolean;
}

const GeneralSettings = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState<NotificationEmail[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  // Load email recipients from Firebase on component mount
  useEffect(() => {
    const loadEmailRecipients = async () => {
      try {
        setIsLoading(true);
        const recipients = await getEmailNotificationRecipients();
        const emailObjects: NotificationEmail[] = recipients.map((email, index) => ({
          id: (index + 1).toString(),
          email,
          isValid: validateEmail(email)
        }));
        setEmails(emailObjects);
      } catch (error) {
        console.error('Error loading email recipients:', error);
        setSaveMessage('Failed to load email settings');
        setTimeout(() => setSaveMessage(''), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    loadEmailRecipients();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    if (!newEmail.trim()) return;
    
    const isValid = validateEmail(newEmail);
    const isDuplicate = emails.some(e => e.email.toLowerCase() === newEmail.toLowerCase());
    
    if (isDuplicate) {
      setSaveMessage('This email is already in the list');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    const newEmailObj: NotificationEmail = {
      id: Date.now().toString(),
      email: newEmail.trim(),
      isValid
    };
    
    setEmails(prev => [...prev, newEmailObj]);
    setNewEmail('');
  };

  const handleRemoveEmail = (id: string) => {
    setEmails(prev => prev.filter(email => email.id !== id));
  };

  const handleEmailChange = (id: string, newEmailValue: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id 
        ? { ...email, email: newEmailValue, isValid: validateEmail(newEmailValue) }
        : email
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    // Validate all emails
    const validEmails = emails.filter(email => email.isValid && email.email.trim());
    
    if (validEmails.length === 0) {
      setSaveMessage('At least one valid email is required');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    try {
      // Update email recipients in Firebase
      const recipients = validEmails.map(email => email.email.trim());
      const result = await updateEmailNotificationRecipients(recipients, user?.uid);
      
      if (result.success) {
        setSaveMessage('Settings saved successfully!');
      } else {
        setSaveMessage(result.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving email settings:', error);
      setSaveMessage('Failed to save settings');
    }
    
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddEmail();
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg p-8"
        >
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
            <span className="text-gray-600">Loading email settings...</span>
          </div>
        </motion.div>
      )}

      {/* Contact Form Notifications Card */}
      {!isLoading && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Contact Form Notification Recipients</h3>
          </div>
          <p className="text-primary-100 text-sm mt-2">
            Manage email addresses that receive notifications when users submit the contact form
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Add New Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Add New Email Address
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter email address..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddEmail}
                disabled={!newEmail.trim() || !validateEmail(newEmail)}
                className="px-6 py-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add</span>
              </motion.button>
            </div>
            {newEmail && !validateEmail(newEmail) && (
              <p className="text-red-600 text-sm mt-2 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Please enter a valid email address</span>
              </p>
            )}
          </div>

          {/* Email List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current Recipients ({emails.length})
            </label>
            
            {emails.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No email addresses configured</p>
                <p className="text-sm">Add an email address to receive contact form notifications</p>
              </div>
            ) : (
              <div className="space-y-3">
                {emails.map((emailObj, index) => (
                  <motion.div
                    key={emailObj.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all duration-200 ${
                      emailObj.isValid 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex-1">
                      <input
                        type="email"
                        value={emailObj.email}
                        onChange={(e) => handleEmailChange(emailObj.id, e.target.value)}
                        className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                          emailObj.isValid 
                            ? 'border-green-300 bg-white' 
                            : 'border-red-300 bg-red-50'
                        }`}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {emailObj.isValid ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Check className="w-4 h-4" />
                          <span className="text-xs font-medium">Valid</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">Invalid</span>
                        </div>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveEmail(emailObj.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200"
                        title="Remove email"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">How it works</h4>
                <p className="text-sm text-blue-700">
                  When visitors submit the contact form on your website, notifications will be sent to all valid email addresses listed above. 
                  Make sure to add at least one email address to receive inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      )}

      {/* Save Button */}
      {!isLoading && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl ${
              saveMessage.includes('successfully') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {saveMessage.includes('successfully') ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{saveMessage}</span>
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving || emails.filter(e => e.isValid).length === 0}
          className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </motion.button>
      </motion.div>
      )}
    </div>
  );
};

export default GeneralSettings;
