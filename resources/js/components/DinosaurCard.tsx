'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { Card } from '@/components/retroui/AnimatedCard';
import { Text } from '@/components/retroui/Text';
import { Button as RetroButton } from '@/components/retroui/Button';
import { cn } from '@/lib/utils';
import { Dinosaur } from '@/types';

export interface DinosaurCardProps extends React.HTMLAttributes<HTMLDivElement> {
    dinosaur: Dinosaur;
    href?: string;
    onView?: (dino: Dinosaur) => void;
}

export function DinosaurCard({ dinosaur, className, href, onView, ...rest }: DinosaurCardProps) {
    const period = dinosaur.period_start_period || dinosaur.period_end_period;
    const taxon = dinosaur.taxon;
    const idLabel = `ID: ${dinosaur.id}`;

    return (
        <Card
            className={cn('w-full h-full flex flex-col rounded-lg overflow-hidden', className)}
            {...rest}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-emerald-800 text-emerald-50">
                <Text as="h6" className="tracking-wider text-xs font-mono">
                    {idLabel}
                </Text>
                {period && (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-600 text-white font-semibold uppercase">
                        {period}
                    </span>
                )}
            </div>

            {/* Image */}
            <div className="relative w-full h-44 md:h-52 lg:h-56 bg-black/5">
                <img
                    src={dinosaur.images?.[0]?.url || '/placeholder.png'}
                    alt={`Thumbnail image for ${dinosaur.name}`}
                    className="object-contain w-full h-full"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-4 grow">
                <div>
                    <Text as="h4" className="text-emerald-800 font-semibold tracking-wide">
                        {dinosaur.taxon}
                    </Text>
                    {taxon && (
                        <Text as="p" className="text-muted-foreground italic text-sm">
                            {taxon}
                        </Text>
                    )}
                </div>

                <div className="mt-1">
                    <Text
                        as="h6"
                        className="uppercase text-[11px] tracking-widest text-muted-foreground"
                    >
                        Stats
                    </Text>
                    <div className="mt-2 space-y-1.5 text-sm">
                        {dinosaur.period_start_human_readable && (
                            <div className="flex items-center justify-between">
                                <span className="text-foreground/70">Lived</span>
                                <span className="font-medium">
                                    {dinosaur.period_start_human_readable}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto pt-2">
                    {href ? (
                        <RetroButton className="w-full" asChild>
                            <Link href={href}>View species →</Link>
                        </RetroButton>
                    ) : (
                        <RetroButton className="w-full" onClick={() => onView?.(dinosaur)}>
                            View species →
                        </RetroButton>
                    )}
                </div>
            </div>
        </Card>
    );
}

export default DinosaurCard;
