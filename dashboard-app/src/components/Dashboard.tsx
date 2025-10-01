'use client';

import { motion } from 'framer-motion';
import { useDashboard } from '@/hooks/useDashboard';
import MetricCard from '@/components/MetricCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function Dashboard() {
  const { data, loading, error, refetch } = useDashboard(30000);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading && !data) {
    return <LoadingSpinner size="lg" text="Carregando métricas do dashboard..." />;
  }

  if (error && !data) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!data) {
    return <ErrorMessage message="Nenhum dado disponível" onRetry={refetch} />;
  }

  const metrics = [
    {
      title: 'Total de Usuários',
      value: data.metrics.total_users,
      icon: <span className="text-2xl">👥</span>,
      color: 'bg-blue-500',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Usuários Ativos',
      value: data.metrics.active_users,
      icon: <span className="text-2xl">✅</span>,
      color: 'bg-green-500',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Usuários Inativos',
      value: data.metrics.inactive_users || 0,
      icon: <span className="text-2xl">⏸️</span>,
      color: 'bg-yellow-500',
      trend: { value: 3, isPositive: false }
    },
    {
      title: 'Administradores',
      value: data.metrics.admin_users || 0,
      icon: <span className="text-2xl">👑</span>,
      color: 'bg-purple-500',
      trend: { value: 5, isPositive: true }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
          <motion.header 
            className="mb-8"
            variants={headerVariants}
          >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard de Métricas
              </h1>
              <p className="text-gray-600">
                Bem-vindo(a), <strong>{data.user.name}</strong> · 
                <span className="capitalize ml-1">{data.user.role}</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Atualização automática</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refetch}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white border border-primary-500 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Atualizar dados"
              >
                <span className={`text-lg ${loading ? 'animate-spin' : ''}`}>
                  {loading ? '⟳' : '↻'}
                </span>
                <span className="font-medium">Atualizar</span>
              </motion.button>
            </div>
          </div>
        </motion.header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                color={metric.color}
                trend={metric.trend}
                isLoading={loading}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.section
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <div className="flex items-center mb-4">
            <span className="text-primary-500 mr-2 text-2xl">📈</span>
            <h2 className="text-xl font-semibold text-gray-900">
              Insights da Plataforma
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Taxa de Atividade</h3>
              <p className="text-2xl font-bold text-green-600">
                {((data.metrics.active_users / data.metrics.total_users) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Crescimento</h3>
              <p className="text-2xl font-bold text-blue-600">+12%</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Administradores</h3>
              <p className="text-2xl font-bold text-purple-600">
                {((data.metrics.admin_users || 0) / data.metrics.total_users * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.section>

        <motion.footer 
          className="mt-8 text-center text-sm text-gray-500"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <p>Dashboard atualizado automaticamente a cada 30 segundos</p>
          <p className="mt-1">
            Última atualização: {new Date().toLocaleTimeString('pt-BR')}
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}