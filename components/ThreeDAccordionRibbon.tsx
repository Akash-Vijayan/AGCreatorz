import React, { useRef, useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ThreeDAccordionRibbonProps {
  progress: MotionValue<number>;
}

export const ThreeDAccordionRibbon: React.FC<ThreeDAccordionRibbonProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates for dynamic lighting effects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse coordinates from -1 to 1 relative to center of ribbon
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Responsiveness: compute ribbon width (as half-width value in 'vw')
  const [halfWidth, setHalfWidth] = useState('10vw');
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHalfWidth('18vw'); // wider on mobile to make it stand out
      } else {
        setHalfWidth('10vw'); // elegant 20vw total width on desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Folds: Start highly folded (65 degrees rotateX) and flatten to 0 degrees as scroll completes (0 to 0.7)
  const foldAngle = useTransform(progress, [0, 0.7], [65, 0]);
  
  // Expand ribbon width from 0 to its full size as the pages split
  const scaleX = useTransform(progress, [0, 0.55], [0, 1]);
  const opacity = useTransform(progress, [0.6, 0.95], [1, 0]);

  // Vertices of the central crease path
  const segments = [
    { id: 0, top: '0%', height: '15%', clip: (hw: string) => `polygon(calc(50% - ${hw}) 0%, calc(50% + ${hw}) 0%, calc(48% + ${hw}) 100%, calc(48% - ${hw}) 100%)`, dir: 1 },
    { id: 1, top: '15%', height: '20%', clip: (hw: string) => `polygon(calc(48% - ${hw}) 0%, calc(48% + ${hw}) 0%, calc(52% + ${hw}) 100%, calc(52% - ${hw}) 100%)`, dir: -1 },
    { id: 2, top: '35%', height: '20%', clip: (hw: string) => `polygon(calc(52% - ${hw}) 0%, calc(52% + ${hw}) 0%, calc(48% + ${hw}) 100%, calc(48% - ${hw}) 100%)`, dir: 1 },
    { id: 3, top: '55%', height: '20%', clip: (hw: string) => `polygon(calc(48% - ${hw}) 0%, calc(48% + ${hw}) 0%, calc(52% + ${hw}) 100%, calc(52% - ${hw}) 100%)`, dir: -1 },
    { id: 4, top: '75%', height: '15%', clip: (hw: string) => `polygon(calc(52% - ${hw}) 0%, calc(52% + ${hw}) 0%, calc(48% + ${hw}) 100%, calc(48% - ${hw}) 100%)`, dir: 1 },
    { id: 5, top: '90%', height: '10%', clip: (hw: string) => `polygon(calc(48% - ${hw}) 0%, calc(48% + ${hw}) 0%, calc(50% + ${hw}) 100%, calc(50% - ${hw}) 100%)`, dir: -1 },
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{
        scaleX,
        opacity,
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="absolute inset-0 w-full h-full pointer-events-none z-30 flex items-center justify-center"
    >
      {/* 3D Ribbon Segments wrapper */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {segments.map((seg) => {
          // Dynamic calculation of rotateX based on scroll progress and fold direction
          const rotateXVal = useTransform(foldAngle, (angle) => angle * seg.dir);
          
          // Calculate Z translation to keep edges aligned during 3D folding
          // Standard projection compensation makes the ribbon pop beautifully out of the screen
          const translateZVal = useTransform(foldAngle, (angle) => {
            const rad = (angle * Math.PI) / 180;
            return Math.sin(rad) * 45 * seg.dir; 
          });

          // Dynamic Shading based on current fold angle and mouse coordinate
          const shadowOpacityVal = useTransform(foldAngle, (angle) => {
            const baseShadow = Math.sin((angle * Math.PI) / 180) * 0.35;
            // Shading is modulated by mouse position. If mouse matches fold direction, shadow is reduced (highlight)
            const mouseMod = mousePos.y * seg.dir * 0.15;
            return Math.max(0, Math.min(0.7, baseShadow + mouseMod));
          });

          const highlightOpacityVal = useTransform(foldAngle, (angle) => {
            const baseHighlight = Math.sin((angle * Math.PI) / 180) * 0.25;
            const mouseMod = -mousePos.y * seg.dir * 0.15;
            return Math.max(0, Math.min(0.6, baseHighlight + mouseMod));
          });

          // Calculate interactive subtle gradient tilt based on mouse X (lighting direction)
          const shadowGradient = `linear-gradient(${90 + mousePos.x * 30}deg, rgba(82, 41, 89, 0.45) 0%, rgba(130, 77, 105, 0.05) 50%, rgba(82, 41, 89, 0.45) 100%)`;
          const highlightGradient = `linear-gradient(${90 - mousePos.x * 30}deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.2) 100%)`;

          return (
            <motion.div
              key={seg.id}
              style={{
                top: seg.top,
                height: seg.height,
                clipPath: seg.clip(halfWidth),
                rotateX: rotateXVal,
                translateZ: translateZVal,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
              className="absolute left-0 w-full origin-center transition-all duration-100 ease-out"
            >
              {/* Ribbon Base Layer with premium Violet Dusk Gradient */}
              <div 
                className="w-full h-full relative"
                style={{
                  background: 'linear-gradient(135deg, #DFB6B2 0%, #FAE5D8 40%, #CFA4A0 70%, #DFB6B2 100%)',
                  boxShadow: 'inset 0 0 40px rgba(82, 41, 89, 0.05)',
                }}
              >
                {/* 3D Lighting Shadow Overlay */}
                <motion.div
                  style={{
                    opacity: shadowOpacityVal,
                    background: shadowGradient,
                  }}
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                />

                {/* 3D Lighting Highlight Overlay */}
                <motion.div
                  style={{
                    opacity: highlightOpacityVal,
                    background: highlightGradient,
                  }}
                  className="absolute inset-0 pointer-events-none mix-blend-overlay"
                />

                {/* Crease line indicator */}
                <div 
                  className="absolute left-1/2 top-0 bottom-0 w-[2px] opacity-40 bg-gradient-to-b from-brandPrimary/40 via-brandPrimary-dark/10 to-brandPrimary/40"
                  style={{
                    transform: 'translateX(-50%) translateZ(1px)',
                    filter: 'blur(0.5px)',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
export default ThreeDAccordionRibbon;
