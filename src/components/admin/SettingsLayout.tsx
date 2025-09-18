'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon
} from 'lucide-react';
import GeneralSettings from './GeneralSettings';

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState('general');

  const settingsTabs = [
    { 
      id: 'general', 
      label: 'General', 
      icon: SettingsIcon,
      description: 'Contact form and notification settings'
    }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Settings Navigation Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-80 flex-shrink-0"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600">
            <h2 className="text-xl font-bold text-white mb-2">Settings</h2>
            <p className="text-primary-100 text-sm">Configure your admin panel</p>
          </div>
          
          <nav className="p-2">
            {settingsTabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-4 rounded-2xl mb-2 transition-all duration-300 group ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 shadow-md' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-0.5 ${
                      activeTab === tab.id 
                        ? 'text-primary-600' 
                        : 'text-gray-400 group-hover:text-primary-500'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm mb-1 ${
                      activeTab === tab.id 
                        ? 'text-primary-800' 
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {tab.label}
                    </h3>
                    <p className={`text-xs ${
                      activeTab === tab.id 
                        ? 'text-primary-600' 
                        : 'text-gray-500 group-hover:text-gray-600'
                    }`}>
                      {tab.description}
                    </p>
                  </div>
                </div>
                
                {activeTab === tab.id && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 mt-3 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Settings Content */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        {renderActiveComponent()}
      </motion.div>
    </div>
  );
};

export default SettingsLayout;
