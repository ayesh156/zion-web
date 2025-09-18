'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to properties section after login
    router.replace('/admin/properties');
  }, [router]);

  // Show loading state while redirecting
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200/50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-primary-800 mb-2">
              Redirecting to Properties
            </h2>
            <p className="text-neutral-600">
              Taking you to the property management section...
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}


/*

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone, Calendar, Trash2, Archive, Reply, Star } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  type: 'inquiry' | 'booking' | 'complaint' | 'compliment';
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied' | 'archived'>('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 123-4567',
        subject: 'Booking Inquiry for Ocean View Villa',
        message: 'Hi! I\'m interested in booking the Ocean View Villa for December 20-25. Could you please let me know about availability and pricing? We are a family of 4 adults.',
        date: '2024-12-15T10:30:00Z',
        status: 'unread',
        priority: 'high',
        type: 'booking',
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        subject: 'Amazing stay at Mountain Retreat',
        message: 'Thank you for an incredible experience at the Mountain Retreat! Everything was perfect - the location, amenities, and your hospitality. We will definitely be back!',
        date: '2024-12-14T15:45:00Z',
        status: 'read',
        priority: 'medium',
        type: 'compliment',
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.r@email.com',
        phone: '+1 (555) 987-6543',
        subject: 'Question about Property Amenities',
        message: 'Hello, I\'m considering booking one of your properties for a weekend getaway. Could you provide more details about the WiFi speeds and workspace facilities? I may need to work remotely during part of my stay.',
        date: '2024-12-13T09:15:00Z',
        status: 'replied',
        priority: 'medium',
        type: 'inquiry',
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david.w@email.com',
        subject: 'Issue with Booking Confirmation',
        message: 'I made a booking yesterday but haven\'t received a confirmation email yet. Could you please check the status of my booking? Reference number: ZPC-2024-001.',
        date: '2024-12-12T14:20:00Z',
        status: 'read',
        priority: 'high',
        type: 'complaint',
      },
    ];

    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMessages = messages.filter(message => 
    statusFilter === 'all' || message.status === statusFilter
  );

  const handleStatusChange = (messageId: string, newStatus: Message['status']) => {
    setMessages(prev => prev.map(message =>
      message.id === messageId ? { ...message, status: newStatus } : message
    ));
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(message => message.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'archived':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Message['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: Message['type']) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4" />;
      case 'inquiry':
        return <MessageSquare className="w-4 h-4" />;
      case 'complaint':
        return <Mail className="w-4 h-4" />;
      case 'compliment':
        return <Star className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        * Header *
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-2">Manage guest inquiries and communications</p>
          </div>
          
          * Status Filter *
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'unread' | 'read' | 'replied' | 'archived')}
            className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          * Messages List *
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Messages ({filteredMessages.length})
                </h2>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (message.status === 'unread') {
                          handleStatusChange(message.id, 'read');
                        }
                      }}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                        selectedMessage?.id === message.id ? 'bg-primary-50' : ''
                      } ${message.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={getPriorityColor(message.priority)}>
                            {getTypeIcon(message.type)}
                          </div>
                          <h3 className={`text-sm font-medium ${
                            message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {message.name}
                          </h3>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </div>
                      
                      <p className={`text-sm mb-2 ${
                        message.status === 'unread' ? 'font-medium text-gray-900' : 'text-gray-600'
                      }`}>
                        {message.subject}
                      </p>
                      
                      <p className="text-xs text-gray-500 truncate mb-2">
                        {message.message}
                      </p>
                      
                      <p className="text-xs text-gray-400">
                        {formatDate(message.date)}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          * Message Detail *
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg"
              >
                * Header *
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.name}</h2>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedMessage.status)}`}>
                          {selectedMessage.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{selectedMessage.email}</span>
                        </div>
                        {selectedMessage.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{selectedMessage.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    * Actions *
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded-xl transition-all duration-200"
                        title="Archive"
                      >
                        <Archive className="w-5 h-5" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{selectedMessage.subject}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className={getPriorityColor(selectedMessage.priority)}>
                        {getTypeIcon(selectedMessage.type)}
                      </div>
                      <span className="capitalize">{selectedMessage.type}</span>
                      <span>•</span>
                      <span>{formatDate(selectedMessage.date)}</span>
                    </div>
                  </div>
                </div>

                * Message Content *
                <div className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                * Reply Section *
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Reply</h4>
                    
                    <textarea
                      rows={4}
                      placeholder="Type your reply here..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="replied">Mark as Replied</option>
                          <option value="read">Keep as Read</option>
                        </select>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                        className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all duration-300"
                      >
                        <Reply className="w-4 h-4" />
                        <span>Send Reply</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg p-12 text-center"
              >
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                <p className="text-gray-600">Choose a message from the list to view its details and reply.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MessagesPage;

*/