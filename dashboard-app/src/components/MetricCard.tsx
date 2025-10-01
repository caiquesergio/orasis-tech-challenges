'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MetricCardProps } from '@/types/dashboard';
import { formatNumber } from '@/utils/api';

export default function MetricCard({ 
  title, 
  value, 
  icon, 
  color, 
  trend, 
  isLoading = false 
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'string' ? parseInt(value, 10) : value;

  useEffect(() => {
    if (isLoading || isNaN(numericValue)) return;
    
    let startTimestamp: number | null = null;
    const duration = 1500;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * numericValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [numericValue, isLoading]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        relative overflow-hidden rounded-xl bg-white p-6 shadow-lg 
        border border-gray-100 card-hover
        ${isLoading ? 'animate-pulse' : ''}
      `}
      role="article"
      aria-label={`${title}: ${formatNumber(numericValue)}`}
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-br opacity-5 ${color}`}
        aria-hidden="true"
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
            <div className={`text-2xl ${color.replace('bg-', 'text-')}`}>
              {icon}
            </div>
          </div>
          
          {trend && (
            <div className={`
              flex items-center text-sm font-medium
              ${trend.isPositive ? 'text-green-600' : 'text-red-600'}
            `}>
              <span className="mr-1">
                {trend.isPositive ? '↗' : '↙'}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <h3 className="text-sm font-medium text-gray-600 mb-2">
          {title}
        </h3>

        <div className="flex items-baseline">
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
          ) : (
            <motion.p 
              className="text-3xl font-bold text-gray-900"
              key={displayValue}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {formatNumber(displayValue)}
            </motion.p>
          )}
        </div>

        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: isLoading ? '0%' : '100%' }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}