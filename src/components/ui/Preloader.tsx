import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="relative w-48 h-48"
      >
        {/* Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-primary-100 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-4 border-secondary-100 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-4xl">Z</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Preloader;
