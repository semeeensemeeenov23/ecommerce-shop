import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

const gifUrls = [
  "/images/gifs/gif1.gif",
  "/images/gifs/gif2.gif",
  "/images/gifs/gif3.gif",
  "/images/gifs/gif4.gif",
  "/images/gifs/gif5.gif",
  "/images/gifs/gif6.gif",
  "/images/gifs/gif7.gif",
  "/images/gifs/gif8.gif",
  "/images/gifs/gif9.gif",
];

interface FloatingGifItem {
  id: number;
  imageUrl: string;
  x: number;
  y: number;
}

interface FloatingGifsProps {
  isVideoPlaying?: boolean;
  idleTime?: number;
  displayTime?: number;
}

export default function FloatingGifs({ 
  isVideoPlaying = false, 
  idleTime = 15000,
  displayTime = 5000,
}: FloatingGifsProps) {
  const [currentGif, setCurrentGif] = useState<FloatingGifItem | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const floatRef = useRef<HTMLDivElement>(null);
  
  // Для отслеживания времени появления гифки
  const showTimeRef = useRef<number>(0);

  const getRandomPosition = useCallback(() => {
    const padding = 80;
    const gifSize = 160;
    const maxX = window.innerWidth - gifSize - padding;
    const maxY = window.innerHeight - gifSize - padding;
    return { 
      x: Math.max(padding, Math.min(maxX, Math.random() * maxX)), 
      y: Math.max(padding, Math.min(maxY, Math.random() * maxY))
    };
  }, []);

  const getRandomGif = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * gifUrls.length);
    const position = getRandomPosition();
    return {
      id: Date.now() + Math.random(),
      imageUrl: gifUrls[randomIndex],
      x: position.x,
      y: position.y,
    };
  }, [getRandomPosition]);

  // Функция для принудительного скрытия гифки
  const forceHideGif = useCallback(() => {
    if (displayTimerRef.current) {
      clearTimeout(displayTimerRef.current);
      displayTimerRef.current = null;
    }
    setCurrentGif(null);
  }, []);

  // Функция для показа гифки
  const showGif = useCallback(() => {
    if (isVideoPlaying) return;
    
    // Сначала скрываем текущую гифку, если есть
    if (currentGif) {
      forceHideGif();
    }
    
    const newGif = getRandomGif();
    setCurrentGif(newGif);
    showTimeRef.current = Date.now();
    
    // Очищаем предыдущий таймер
    if (displayTimerRef.current) {
      clearTimeout(displayTimerRef.current);
    }
    
    // Устанавливаем таймер на скрытие
    displayTimerRef.current = setTimeout(() => {
      console.log("Таймер сработал, скрываем гифку через", displayTime, "мс");
      setCurrentGif(null);
      displayTimerRef.current = null;
    }, displayTime);
  }, [isVideoPlaying, getRandomGif, currentGif, forceHideGif, displayTime]);

  // Запуск таймера бездействия
  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      if (!isVideoPlaying && !currentGif) {
        console.log("Таймер бездействия сработал, показываем гифку");
        showGif();
      }
    }, idleTime);
  }, [isVideoPlaying, currentGif, showGif, idleTime]);

  // Полный сброс
  const resetAndHide = useCallback(() => {
    console.log("Активность пользователя - сброс");
    if (currentGif) {
      forceHideGif();
    }
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    startIdleTimer();
  }, [currentGif, forceHideGif, startIdleTimer]);

  // Дополнительный эффект для принудительного скрытия по времени
  useEffect(() => {
    if (!currentGif) return;
    
    // Проверяем каждую секунду, не превышено ли время показа
    const interval = setInterval(() => {
      if (currentGif && (Date.now() - showTimeRef.current) >= displayTime) {
        console.log("Принудительное скрытие по таймеру");
        setCurrentGif(null);
        if (displayTimerRef.current) {
          clearTimeout(displayTimerRef.current);
          displayTimerRef.current = null;
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentGif, displayTime]);

  // Обработка активности пользователя
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'wheel'];
    
    const handleActivity = () => {
      resetAndHide();
    };

    events.forEach(event => window.addEventListener(event, handleActivity));
    
    // Запускаем таймер при монтировании
    startIdleTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
    };
  }, [resetAndHide, startIdleTimer]);

  // Анимация плавания
  useEffect(() => {
    if (!currentGif || isDragging) return;

    let time = 0;
    let animationId: number;

    const animate = () => {
      if (!floatRef.current) return;
      time += 0.02;
      
      const moveX = Math.sin(time) * 30;
      const moveY = Math.cos(time * 1.2) * 25;
      const rotate = Math.sin(time * 0.8) * 8;
      const scale = 1 + Math.sin(time * 1.5) * 0.03;
      
      floatRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [currentGif, isDragging]);

  // Перетаскивание
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !currentGif) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    let newX = startPos.x + deltaX;
    let newY = startPos.y + deltaY;
    
    const gifSize = 160;
    newX = Math.max(0, Math.min(window.innerWidth - gifSize, newX));
    newY = Math.max(0, Math.min(window.innerHeight - gifSize, newY));
    
    setCurrentGif(prev => prev ? { ...prev, x: newX, y: newY } : null);
  }, [isDragging, dragStart.x, dragStart.y, startPos.x, startPos.y, currentGif]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setStartPos({ x: currentGif?.x || 0, y: currentGif?.y || 0 });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Адаптация при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (currentGif) {
        const gifSize = 160;
        const maxX = window.innerWidth - gifSize;
        const maxY = window.innerHeight - gifSize;
        setCurrentGif(prev => prev ? {
          ...prev,
          x: Math.max(0, Math.min(maxX, prev.x)),
          y: Math.max(0, Math.min(maxY, prev.y))
        } : null);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentGif]);

  return (
    <AnimatePresence>
      {currentGif && (
        <motion.div
          key={currentGif.id}
          initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.2, rotate: 180 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
          style={{
            position: 'fixed',
            left: currentGif.x,
            top: currentGif.y,
            zIndex: 9999,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
        >
          <div ref={floatRef} className="relative">
            <img
              src={currentGif.imageUrl}
              alt="Floating promo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-full shadow-2xl cursor-grab active:cursor-grabbing"
              onDragStart={(e) => e.preventDefault()}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-4xl';
                  fallback.innerHTML = '📦';
                  parent.appendChild(fallback);
                }
              }}
            />
            
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl group-hover:bg-green-500/30 transition-all duration-300" />
          </div>
          
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black/30 rounded-full blur-md transition-all duration-300 group-hover:w-32 group-hover:bg-black/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}