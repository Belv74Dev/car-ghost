import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import style from './style.module.css';

export const CarGhost = () => {
    const containerRef = useRef(null);

    const [springs, api] = useSpring(() => ({
        position: 0,
        config: {
            mass: 0.8,
            tension: 120,
            friction: 20,
            clamp: true
        }
    }));

    const handleMousemove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const height = containerRef.current.offsetHeight;

        const newPosition = Math.max(0, Math.min(100, (y / height) * 100));
        api.start({ position: newPosition });
    };

    const getClipPath = (position) => {
        const tension = 20 * (1 - Math.abs(position - 50) / 50);
        const top = position - tension;
        const bottom = position + tension;

        return `polygon(
            0px ${top}%,
            100% ${top}%,
            100% ${bottom}%,
            0px ${bottom}%
        )`;
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMousemove}
            className={style.container}
        >
            <animated.div
                className={style.car}
                style={{
                    clipPath: springs.position.to(p => getClipPath(p))
                }}
            >
                <div className={style.carGhost}></div>
            </animated.div>
        </div>
    )
}