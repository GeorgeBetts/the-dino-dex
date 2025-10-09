'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { HTMLAttributes, useCallback } from 'react';
import { Text } from './Text';
import { motion, useMotionValue } from 'motion/react';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const AnimatedCard = ({ className, onMouseMove, onMouseLeave, ...props }: ICardProps) => {
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouseMove = useCallback<NonNullable<ICardProps['onMouseMove']>>(
        (e) => {
            const target = e.currentTarget as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width; // 0..1
            const maxTilt = 4; // degrees
            // Tilt opposite to cursor direction
            const y = (px - 0.5) * -(maxTilt * 2); // rotateY
            // rotateX.set(x);
            rotateY.set(y);

            // Call any consumer-provided handler too
            onMouseMove?.(e);
        },
        [onMouseMove, rotateY]
    );

    const handleMouseLeave = useCallback<NonNullable<ICardProps['onMouseLeave']>>(
        (e) => {
            rotateX.set(0);
            rotateY.set(0);
            onMouseLeave?.(e);
        },
        [onMouseLeave, rotateX, rotateY]
    );

    return (
        <motion.div
            className={cn(
                'inline-block border-2 shadow-md bg-card will-change-transform',
                // retain smoothness with Tailwind's transition for non-motion props
                'transition-[box-shadow] duration-200',
                className
            )}
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            whileHover={{
                scale: 1.02,
                y: -4,
                boxShadow: '0 14px 30px rgba(0,0,0,0.2)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, mass: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        />
    );
};

const CardHeader = ({ className, ...props }: ICardProps) => {
    return <div className={cn('flex flex-col justify-start p-4', className)} {...props} />;
};

const CardTitle = ({ className, ...props }: ICardProps) => {
    return <Text as="h3" className={cn('mb-2', className)} {...props} />;
};

const CardDescription = ({ className, ...props }: ICardProps) => (
    <p className={cn('text-muted-foreground', className)} {...props} />
);

const CardContent = ({ className, ...props }: ICardProps) => {
    return <div className={cn('p-4', className)} {...props} />;
};

const CardComponent = Object.assign(AnimatedCard, {
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Content: CardContent,
});

export { CardComponent as Card };
