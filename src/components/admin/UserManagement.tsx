'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Shield, 
  Mail,
  Calendar,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { firestoreUserService, FirestoreUser, CreateFirestoreUserData, UpdateFirestoreUserData } from '@/lib/firestoreUserService';
import FirestoreUserForm from './FirestoreUserForm';

// Define interfaces for timestamp handling
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds?: number;
  toDate(): Date;
}

interface SerializedTimestamp {
  _seconds: number;
  _nanoseconds?: number;
  seconds?: string;
}

interface FirestoreUserWithTimestamps extends Omit<FirestoreUser, 'createdAt' | 'lastLogin'> {
  createdAt: string | Date | FirestoreTimestamp | SerializedTimestamp;
  lastLogin?: string | Date | FirestoreTimestamp | SerializedTimestamp;
}

const UserManagement = () => {
  const [users, setUsers] = useState<FirestoreUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<FirestoreUser | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'createdAt'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await firestoreUserService.getAllUsers();
      if (result.error) {
        setError(result.error);
      } else {
        setUsers(result.users);
      }
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayAlert = (type: 'success' | 'error', message: string) => {
    setShowAlert({ type, message });
    setTimeout(() => setShowAlert(null), 5000);
  };

  const handleCreateUser = async (userData: CreateFirestoreUserData) => {
    setFormLoading(true);
    try {
      const result = await firestoreUserService.createUser(userData);
      if (result.error) {
        displayAlert('error', result.error);
      } else {
        displayAlert('success', 'User created successfully');
        setShowUserForm(false);
        await loadUsers(); // Refresh users list
      }
    } catch (error) {
      displayAlert('error', 'Failed to create user');
      console.error('Error creating user:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateUser = async (userData: UpdateFirestoreUserData) => {
    if (!editingUser) return;
    
    setFormLoading(true);
    try {
      const result = await firestoreUserService.updateUser(editingUser.uid, userData);
      if (result.error) {
        displayAlert('error', result.error);
      } else {
        displayAlert('success', 'User updated successfully');
        setShowUserForm(false);
        setEditingUser(null);
        await loadUsers(); // Refresh users list
      }
    } catch (error) {
      displayAlert('error', 'Failed to update user');
      console.error('Error updating user:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSaveUser = async (userData: CreateFirestoreUserData | UpdateFirestoreUserData) => {
    if (editingUser) {
      await handleUpdateUser(userData as UpdateFirestoreUserData);
    } else {
      await handleCreateUser(userData as CreateFirestoreUserData);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user: FirestoreUser) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const result = await firestoreUserService.deleteUser(uid);
        if (result.error) {
          displayAlert('error', result.error);
        } else {
          displayAlert('success', 'User deleted successfully');
          await loadUsers(); // Refresh users list
        }
      } catch (error) {
        displayAlert('error', 'Failed to delete user');
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSelectUser = (uid: string) => {
    setSelectedUsers(prev => 
      prev.includes(uid) 
        ? prev.filter(id => id !== uid)
        : [...prev, uid]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.uid));
    }
  };

  const handleBulkDelete = async () => {
    const nonAdminSelected = selectedUsers.filter(uid => {
      const user = users.find(u => u.uid === uid);
      return !user?.isAdmin;
    });
    
    if (nonAdminSelected.length === 0) {
      displayAlert('error', 'Cannot delete admin users!');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${nonAdminSelected.length} user(s)? This action cannot be undone.`)) {
      try {
        const result = await firestoreUserService.deleteUsers(nonAdminSelected);
        if (result.error) {
          displayAlert('error', result.error);
        } else {
          displayAlert('success', `${nonAdminSelected.length} user(s) deleted successfully`);
          setSelectedUsers([]);
          await loadUsers(); // Refresh users list
        }
      } catch (error) {
        displayAlert('error', 'Failed to delete users');
        console.error('Error deleting users:', error);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const name = user.name || user.email || '';
    const email = user.email || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase());
    const userRole = user.role;
    const matchesRole = filterRole === 'all' || userRole === filterRole;
    
    return matchesSearch && matchesRole;
  });

  // Convert various Firebase/Firestore timestamp shapes to a JS Date
  const toDateSafe = (timestamp: string | Date | FirestoreTimestamp | SerializedTimestamp | number | null | undefined): Date | null => {
    if (!timestamp) return null;
    // Already a Date
    if (timestamp instanceof Date) return isNaN(timestamp.getTime()) ? null : timestamp;
    // Firestore Timestamp (client SDK)
    if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp && typeof timestamp.toDate === 'function') {
      const d = timestamp.toDate();
      return isNaN(d.getTime()) ? null : d;
    }
    // Firestore Timestamp-like object
    if (timestamp && typeof timestamp === 'object') {
      // { seconds, nanoseconds }
      if ('seconds' in timestamp && typeof timestamp.seconds === 'number') {
        const nanoseconds = 'nanoseconds' in timestamp && typeof timestamp.nanoseconds === 'number' ? timestamp.nanoseconds : 0;
        const ms = timestamp.seconds * 1000 + nanoseconds / 1_000_000;
        const d = new Date(ms);
        return isNaN(d.getTime()) ? null : d;
      }
      // { _seconds, _nanoseconds } (serialized)
      if ('_seconds' in timestamp && typeof timestamp._seconds === 'number') {
        const nanoseconds = '_nanoseconds' in timestamp && typeof timestamp._nanoseconds === 'number' ? timestamp._nanoseconds : 0;
        const ms = timestamp._seconds * 1000 + nanoseconds / 1_000_000;
        const d = new Date(ms);
        return isNaN(d.getTime()) ? null : d;
      }
      // { seconds: string }
      if ('seconds' in timestamp && typeof timestamp.seconds === 'string') {
        const num = Number(timestamp.seconds);
        if (!Number.isNaN(num)) {
          const d = new Date(num * 1000);
          return isNaN(d.getTime()) ? null : d;
        }
      }
    }
    // ISO/string
    if (typeof timestamp === 'string') {
      const d = new Date(timestamp);
      return isNaN(d.getTime()) ? null : d;
    }
    // Epoch ms
    if (typeof timestamp === 'number') {
      const d = new Date(timestamp);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  };

  // Format like: 2025-8-25 3:40:22 AM
  const formatPrettyWithTZ = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-based
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    // No leading zeros for month/day/hour
    return `${year}-${month}-${day} ${hour}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} ${ampm}`;
  };

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'name':
        aValue = (a.name || a.email || '').toLowerCase();
        bValue = (b.name || b.email || '').toLowerCase();
        break;
      case 'role':
        aValue = a.role;
        bValue = b.role;
        break;
      case 'createdAt':
        {
          const ad = toDateSafe((a as FirestoreUserWithTimestamps).createdAt);
          const bd = toDateSafe((b as FirestoreUserWithTimestamps).createdAt);
          aValue = ad ? ad.getTime() : 0;
          bValue = bd ? bd.getTime() : 0;
        }
        break;
      default:
        aValue = (a.name || a.email || '').toLowerCase();
        bValue = (b.name || b.email || '').toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate users
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return <ArrowUpDown className="w-4 h-4 text-neutral-400" />;
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-primary-600" />
      : <ArrowDown className="w-4 h-4 text-primary-600" />;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center p-12"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="text-lg text-neutral-600">Loading users...</span>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Error Loading Users</h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={loadUsers}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Header with Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 overflow-hidden"
          >
        <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">User Management</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddUser}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </motion.button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="p-6 border-b border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 overflow-hidden"
      >
        {/* Table Header with Stats */}
        <div className="p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{users.length}</div>
                <div className="text-sm text-neutral-600">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{users.length}</div>
                <div className="text-sm text-neutral-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.isAdmin).length}</div>
                <div className="text-sm text-neutral-600">Administrators</div>
              </div>
            </div>
            <div className="text-sm text-neutral-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length} users
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-primary-800">
                  {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                >
                  Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedUsers([])}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="text-left px-6 py-4 font-semibold text-neutral-800">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-2 hover:text-primary-600 transition-colors"
                  >
                    <span>User</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="text-left px-6 py-4 font-semibold text-neutral-800">
                  <button
                    onClick={() => handleSort('role')}
                    className="flex items-center space-x-2 hover:text-primary-600 transition-colors"
                  >
                    <span>Role</span>
                    {getSortIcon('role')}
                  </button>
                </th>
                <th className="text-left px-6 py-4 font-semibold text-neutral-800">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center space-x-2 hover:text-primary-600 transition-colors"
                  >
                    <span>Created</span>
                    {getSortIcon('createdAt')}
                  </button>
                </th>
                <th className="text-left px-6 py-4 font-semibold text-neutral-800">Last Login</th>
                <th className="text-center px-6 py-4 font-semibold text-neutral-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <Users className="w-12 h-12 text-neutral-400" />
                      <div className="text-lg font-medium text-neutral-500">No users found</div>
                      <div className="text-sm text-neutral-400">Try adjusting your search or filters</div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <motion.tr
                    key={user.uid}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.uid)}
                        onChange={() => handleSelectUser(user.uid)}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-primary-700 font-bold text-sm">
                              {(user.name || user.email || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-neutral-900 truncate">{user.name || user.email}</div>
                          <div className="text-sm text-neutral-600 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(user.role)}`}>
                          <Shield className="w-3 h-3 mr-1" />
                          {user.role}
                        </span>
                        <div className="text-xs text-neutral-500">
                          {user.isAdmin ? 'Admin privileges' : 'Standard user'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-neutral-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <div>
                          {(() => {
                            const d = toDateSafe((user as FirestoreUserWithTimestamps).createdAt);
                            if (!d) {
                              return (
                                <>
                                  <div className="font-medium text-neutral-500">Unknown</div>
                                  <div className="text-xs text-neutral-400">Invalid date</div>
                                </>
                              );
                            }
                            const days = Math.max(0, Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24)));
                            return (
                              <>
                                <div className="font-medium text-neutral-900">
                                  {formatPrettyWithTZ(d)}
                                </div>
                                <div className="text-xs text-neutral-500">{days} days ago</div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-neutral-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <div>
                          {(() => {
                            const d = toDateSafe((user as FirestoreUserWithTimestamps).lastLogin);
                            if (!d) {
                              return <span className="font-medium text-neutral-500">Never</span>;
                            }
                            return <span className="font-medium text-neutral-900">{formatPrettyWithTZ(d)}</span>;
                          })()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        {!user.isAdmin && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteUser(user.uid)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        )}
                        {user.isAdmin && (
                          <div className="p-2 text-neutral-300" title="Cannot delete admin">
                            <Shield className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length} results
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </motion.button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-primary-600 text-white'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Alert Messages */}
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            showAlert.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            {showAlert.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span>{showAlert.message}</span>
          </div>
        </motion.div>
      )}

      {/* User Form Modal */}
      {showUserForm && (
        <FirestoreUserForm
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
          isLoading={formLoading}
        />
      )}
        </>
      )}
    </div>
  );
};

export default UserManagement;
