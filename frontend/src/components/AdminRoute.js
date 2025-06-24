import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * AdminRoute - компонент для защиты маршрутов, доступных только администраторам
 * Проверяет наличие пользователя и его роль - если не admin, перенаправляет на главную
 */
const AdminRoute = ({ element }) => {
  const { currentUser, loading } = useContext(AuthContext);
  
  // Показываем индикатор загрузки, пока проверяем пользователя
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Проверяем, авторизован ли пользователь и является ли он администратором
  if (!currentUser || currentUser.role !== 'admin') {
    // Если пользователь не admin, перенаправляем на главную
    return <Navigate to="/" replace />;
  }
  
  // Если пользователь admin, показываем запрошенный компонент
  return element;
};

export default AdminRoute; 