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
import { Star, Plus, Edit, Trash2, Filter, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface Review {
  id: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  isHighlighted: boolean;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [ratingFilter, setRatingFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockReviews: Review[] = [
      {
        id: '1',
        propertyId: 'prop-1',
        propertyName: 'Ocean View Villa',
        guestName: 'Sarah Johnson',
        guestEmail: 'sarah.j@email.com',
        rating: 5,
        comment: 'Absolutely stunning property with breathtaking ocean views. The host was incredibly responsive and helpful throughout our stay.',
        date: '2024-12-15',
        status: 'approved',
        isHighlighted: true,
      },
      {
        id: '2',
        propertyId: 'prop-2',
        propertyName: 'Mountain Retreat',
        guestName: 'Michael Chen',
        guestEmail: 'michael.chen@email.com',
        rating: 4,
        comment: 'Great location for hiking and relaxation. The cabin was clean and well-equipped. Would definitely stay again.',
        date: '2024-12-10',
        status: 'approved',
        isHighlighted: false,
      },
      {
        id: '3',
        propertyId: 'prop-1',
        propertyName: 'Ocean View Villa',
        guestName: 'Emily Rodriguez',
        guestEmail: 'emily.r@email.com',
        rating: 5,
        comment: 'Perfect getaway spot! The amenities were excellent and the view was even better than the photos.',
        date: '2024-12-08',
        status: 'pending',
        isHighlighted: false,
      },
    ];

    setTimeout(() => {
      setReviews(mockReviews);
      setFilteredReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter reviews based on search and filters
  useEffect(() => {
    let filtered = reviews;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(review => review.status === statusFilter);
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }

    setFilteredReviews(filtered);
  }, [reviews, searchTerm, statusFilter, ratingFilter]);

  const handleStatusChange = (reviewId: string, newStatus: Review['status']) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId ? { ...review, status: newStatus } : review
    ));
  };

  const handleHighlightToggle = (reviewId: string) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId ? { ...review, isHighlighted: !review.isHighlighted } : review
    ));
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
            <p className="text-gray-600 mt-2">Manage guest reviews and testimonials</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Review</span>
          </motion.button>
        </motion.div>

        * Filters *
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            * Search *
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            * Status Filter *
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            * Rating Filter *
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value as 'all' | '1' | '2' | '3' | '4' | '5')}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            * Clear Filters *
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRatingFilter('all');
              }}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>Clear</span>
            </motion.button>
          </div>
        </motion.div>

        * Reviews List *
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  review.isHighlighted ? 'border-yellow-300 bg-yellow-50/50' : 'border-white/20'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    * Header *
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{review.guestName}</h3>
                          {review.isHighlighted && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200">
                              Highlighted
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{review.guestEmail}</p>
                        <p className="text-sm text-gray-500">{review.propertyName}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm font-medium text-gray-700">({review.rating})</span>
                      </div>
                    </div>

                    * Comment *
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>

                    * Meta *
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(review.status)}`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  * Actions *
                  <div className="flex flex-col space-y-2 lg:ml-6">
                    * Status Actions *
                    {review.status === 'pending' && (
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(review.id, 'approved')}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors text-sm font-medium"
                        >
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(review.id, 'rejected')}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                          Reject
                        </motion.button>
                      </div>
                    )}

                    * Other Actions *
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleHighlightToggle(review.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          review.isHighlighted
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        title={review.isHighlighted ? 'Remove highlight' : 'Highlight review'}
                      >
                        <Star className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors"
                        title="Edit review"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteReview(review.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default ReviewsPage;

*/