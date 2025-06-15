import { useState, useRef, useEffect } from 'react';

const Zoom = ({
    imageSrc,
    zoomLevel = 3,
    spotSize = 200
}) => {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showZoom, setShowZoom] = useState(false);
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImgDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        };
        img.src = imageSrc;
    }, [imageSrc]);

    const handleMouseMove = (e) => {
        if (!containerRef.current || !imgRef.current) return;

        const container = containerRef.current;
        const { left, top } = container.getBoundingClientRect();

        const x = ((e.clientX - left) / container.offsetWidth) * 100;
        const y = ((e.clientY - top) / container.offsetHeight) * 100;

        setPosition({ x, y });
        setShowZoom(true);
    };

    const handleMouseLeave = () => {
        setShowZoom(false);
    };

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                display: 'inline-block',
                maxWidth: '100%',
                cursor: 'crosshair'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img
                ref={imgRef}
                src={imageSrc}
                alt="Zoomable"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block'
                }}
            />

            {showZoom && (
                <div
                    style={{
                        position: 'absolute',
                        width: `${spotSize}px`,
                        height: `${spotSize}px`,
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: `
                0 0 0 1px rgba(0, 0, 0, 0.1),
                0 4px 20px rgba(0, 0, 0, 0.15),
                0 8px 30px rgba(0, 0, 0, 0.2)
              `,
                        pointerEvents: 'none',
                        left: `calc(${position.x}% - ${spotSize / 2}px)`,
                        top: `calc(${position.y}% - ${spotSize / 2}px)`,
                        backgroundImage: `url(${imageSrc})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${imgDimensions.width}px ${imgDimensions.height}px`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center',
                        zIndex: 10,
                        transition: 'transform 0.1s ease-out',
                        backdropFilter: 'blur(1px)',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '50%',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }} />
                </div>
            )}
        </div>
    );
};
export default Zoom;