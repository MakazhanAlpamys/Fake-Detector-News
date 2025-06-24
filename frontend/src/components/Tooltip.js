import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Компонент для отображения всплывающих подсказок
 * @param {Object} props
 * @param {React.ReactNode} props.children - Дочерний элемент, при наведении на который будет показана подсказка
 * @param {string} props.text - Текст подсказки
 * @param {string} props.position - Позиция подсказки (top, bottom, left, right)
 * @param {number} props.delay - Задержка перед показом подсказки (мс)
 * @param {boolean} props.showOnClick - Показывать подсказку при клике (для мобильных устройств)
 */
const Tooltip = ({ 
  children, 
  text, 
  position = 'top', 
  delay = 300, 
  showOnClick = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  
  const showTooltip = () => {
    setIsVisible(true);
  };
  
  const hideTooltip = () => {
    setIsVisible(false);
  };
  
  const handleClick = () => {
    if (showOnClick) {
      setIsVisible(!isVisible);
    }
  };
  
  // Настройки позиционирования
  const positionStyles = {
    top: { 
      bottom: '100%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      marginBottom: '8px',
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 }
    },
    bottom: { 
      top: '100%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      marginTop: '8px',
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 }
    },
    left: { 
      right: '100%', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      marginRight: '8px',
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -10 }
    },
    right: { 
      left: '100%', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      marginLeft: '8px',
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 10 }
    }
  };
  
  // Стрелки для разных позиций
  const tooltipArrows = {
    top: 'after:content-[""] after:absolute after:left-1/2 after:-bottom-2 after:border-8 after:border-transparent after:border-t-current after:-translate-x-1/2',
    bottom: 'after:content-[""] after:absolute after:left-1/2 after:-top-2 after:border-8 after:border-transparent after:border-b-current after:-translate-x-1/2',
    left: 'after:content-[""] after:absolute after:top-1/2 after:-right-2 after:border-8 after:border-transparent after:border-l-current after:-translate-y-1/2',
    right: 'after:content-[""] after:absolute after:top-1/2 after:-left-2 after:border-8 after:border-transparent after:border-r-current after:-translate-y-1/2'
  };
  
  const tooltipStyles = positionStyles[position];
  const arrowStyles = tooltipArrows[position];
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={handleClick}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && text && (
          <motion.div
            className={`absolute z-50 pointer-events-none ${arrowStyles}`}
            style={{ 
              bottom: tooltipStyles.bottom,
              top: tooltipStyles.top,
              left: tooltipStyles.left,
              right: tooltipStyles.right,
              transform: tooltipStyles.transform,
              marginTop: tooltipStyles.marginTop,
              marginBottom: tooltipStyles.marginBottom,
              marginLeft: tooltipStyles.marginLeft,
              marginRight: tooltipStyles.marginRight
            }}
            initial={tooltipStyles.initial}
            animate={tooltipStyles.animate}
            exit={tooltipStyles.exit}
            transition={{ duration: 0.2, delay: isVisible ? delay / 1000 : 0 }}
          >
            <div className={`whitespace-normal max-w-xs px-3 py-2 text-sm rounded-md shadow-md 
              ${theme === 'dark' 
                ? 'bg-gray-800 text-white border border-gray-700' 
                : 'bg-white text-gray-800 border border-gray-200'}`}
            >
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip; 