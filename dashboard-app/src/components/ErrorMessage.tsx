'use client';

import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg"
    >
      <span className="text-red-500 text-6xl mb-4">⚠️</span>
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Ops! Algo deu errado
      </h3>
      <p className="text-red-600 text-center mb-6">
        {message}
      </p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          aria-label="Tentar novamente"
        >
          <span className="text-sm">🔄</span>
          <span>Tentar Novamente</span>
        </motion.button>
      )}
    </motion.div>
  );
}