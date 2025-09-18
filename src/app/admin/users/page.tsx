'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import UserTable from '@/components/admin/UserTable';
import UserFormModal from '@/components/admin/UserFormModal';
import { 
  firestoreUserService, 
  FirestoreUser, 
  CreateFirestoreUserData, 
  UpdateFirestoreUserData 
} from '@/lib/firestoreUserService';

interface AlertMessage {
  type: 'success' | 'error';
  message: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<FirestoreUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<FirestoreUser | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [alert, setAlert] = useState<AlertMessage | null>(null);
  
  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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
        showAlert('error', result.error);
      } else {
        setUsers(result.users);
      }
    } catch (err) {
      const errorMessage = 'Failed to load users';
      setError(errorMessage);
      showAlert('error', errorMessage);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleCreateUser = async (userData: CreateFirestoreUserData) => {
    setFormLoading(true);
    try {
      const result = await firestoreUserService.createUser(userData);
      if (result.error) {
        showAlert('error', result.error);
      } else {
        showAlert('success', 'User created successfully in both authentication and database systems');
        setShowUserForm(false);
        await loadUsers(); // Refresh users list
      }
    } catch (error) {
      showAlert('error', 'Failed to create user. Please try again.');
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
        showAlert('error', result.error);
      } else {
        showAlert('success', 'User updated successfully in both authentication and database systems');
        setShowUserForm(false);
        setEditingUser(null);
        await loadUsers(); // Refresh users list
      }
    } catch (error) {
      showAlert('error', 'Failed to update user. Please try again.');
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
    if (window.confirm('Are you sure you want to delete this user? This will remove them from both the authentication system and database. This action cannot be undone.')) {
      try {
        const result = await firestoreUserService.deleteUser(uid);
        if (result.error) {
          showAlert('error', result.error);
        } else {
          showAlert('success', 'User deleted successfully from both authentication and database systems');
          await loadUsers(); // Refresh users list
        }
      } catch (error) {
        showAlert('error', 'Failed to delete user. Please try again.');
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleBulkDelete = async (uids: string[]) => {
    const nonAdminSelected = uids.filter(uid => {
      const user = users.find(u => u.uid === uid);
      return !user?.isAdmin;
    });
    
    if (nonAdminSelected.length === 0) {
      showAlert('error', 'Cannot delete admin users!');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${nonAdminSelected.length} user(s)? This will remove them from both the authentication system and database. This action cannot be undone.`)) {
      try {
        const result = await firestoreUserService.deleteUsers(nonAdminSelected);
        if (result.error) {
          showAlert('error', result.error);
        } else {
          showAlert('success', `${result.deletedCount || nonAdminSelected.length} user(s) deleted successfully`);
          if (result.errors && result.errors.length > 0) {
            console.warn('Some users could not be deleted:', result.errors);
          }
          await loadUsers(); // Refresh users list
        }
      } catch (error) {
        showAlert('error', 'Failed to delete users');
        console.error('Error deleting users:', error);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Users className="w-8 h-8 text-primary-600" />
              <span>User Management</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Manage user accounts, roles, and permissions across your platform
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Users Count */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
              <Users className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">
                {users.length} {users.length === 1 ? 'User' : 'Users'}
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddUser}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add User</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error Loading Users</h3>
                <p className="text-red-600 mt-1">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={loadUsers}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Try Again
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* User Table */}
        {!error && (
          <UserTable
            users={users}
            loading={loading}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onBulkDelete={handleBulkDelete}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterRole={filterRole}
            onFilterRoleChange={setFilterRole}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
          />
        )}

        {/* User Form Modal */}
        <UserFormModal
          user={editingUser}
          isOpen={showUserForm}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
          isLoading={formLoading}
        />

        {/* Alert Messages */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 max-w-md w-full p-4 rounded-2xl shadow-2xl border ${
              alert.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              {alert.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium">{alert.message}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAlert(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersPage;