import React, { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/retroui/Card';
import { Text } from '@/components/retroui/Text';
import { Button } from '@/components/retroui/Button';
import { Accordion } from '@/components/retroui/Accordion';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowLeft } from 'lucide-react';
import { Dinosaur } from '@/types';

function domainFromUrl(url: string): string {
    try {
        const u = new URL(url);
        return u.hostname.replace('www.', '');
    } catch {
        return url;
    }
}

function faviconFromUrl(url: string): string | null {
    try {
        const u = new URL(url);
        return `${u.origin}/favicon.ico`;
    } catch {
        return null;
    }
}

export default function Show({ dinosaur }: { dinosaur: Dinosaur }) {
    console.log(dinosaur);
    const images = dinosaur.images ?? [];
    const [current, setCurrent] = useState(0);

    const hasImages = images.length > 0;

    const goPrev = () => {
        if (!hasImages) {
            return;
        }
        setCurrent((idx) => (idx === 0 ? images.length - 1 : idx - 1));
    };

    const goNext = () => {
        if (!hasImages) {
            return;
        }
        setCurrent((idx) => (idx === images.length - 1 ? 0 : idx + 1));
    };

    const periodBadge = useMemo(() => {
        return dinosaur.period_start_period || dinosaur.period_end_period || null;
    }, [dinosaur.period_end_period, dinosaur.period_start_period]);

    return (
        <Layout>
            <div className="mb-4 w-full md:w-1/4">
                <Button asChild variant="outline" size="sm" aria-label="Go back">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (history.length > 1) {
                                history.back();
                            } else {
                                window.location.href = '/';
                            }
                        }}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </a>
                </Button>
            </div>

            <Card className="w-full overflow-hidden rounded-lg">
                {/* Header similar to small card */}
                <div className="flex items-center justify-between px-4 py-2 bg-emerald-800 text-emerald-50">
                    <Text as="h6" className="tracking-wider text-xs font-mono">
                        ID: {dinosaur.id}
                    </Text>
                    {periodBadge && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-600 text-white font-semibold uppercase">
                            {periodBadge}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Image carousel */}
                    <div className="relative col-span-2 bg-black/5 h-[260px] lg:h-[380px] overflow-hidden">
                        {hasImages ? (
                            <>
                                <img
                                    src={images[current]?.url}
                                    alt={`Image ${current + 1} of ${images.length} for ${dinosaur.name}`}
                                    className="object-contain w-full h-full"
                                />

                                {/* Controls */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Previous image"
                                            onClick={goPrev}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border border-black/10 rounded-full p-2 shadow"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Next image"
                                            onClick={goNext}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border border-black/10 rounded-full p-2 shadow"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Indicators */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                            {images.map((_, i) => (
                                                <button
                                                    key={i}
                                                    aria-label={`Go to image ${i + 1}`}
                                                    className={`h-2.5 w-2.5 rounded-full border ${i === current ? 'bg-emerald-600 border-emerald-700' : 'bg-white/80 border-black/10'}`}
                                                    onClick={() => setCurrent(i)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-8">
                                <Text as="p" className="text-muted-foreground">
                                    No images available
                                </Text>
                            </div>
                        )}
                    </div>

                    {/* Fact content */}
                    <div className="col-span-3 p-4 lg:p-6 space-y-4">
                        <div>
                            <Text as="h2" className="text-emerald-800 font-semibold tracking-wide">
                                {dinosaur.name}
                            </Text>
                            {dinosaur.taxon && (
                                <Text as="p" className="text-muted-foreground italic">
                                    {dinosaur.taxon}
                                </Text>
                            )}
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-wrap items-center gap-3">
                            {dinosaur.wikipedia_entry && (
                                <Button asChild size="sm" variant="default">
                                    <a
                                        href={dinosaur.wikipedia_entry}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="gap-2"
                                    >
                                        Wikipedia <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                            )}
                            {dinosaur.wikidata_entry && (
                                <Button asChild size="sm" variant="default">
                                    <a
                                        href={dinosaur.wikidata_entry}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="gap-2"
                                    >
                                        Wikidata <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                            )}
                        </div>

                        {/* Facts Accordion */}
                        <Accordion
                            type="multiple"
                            className="space-y-3"
                            defaultValue={['overview', 'size']}
                        >
                            <Accordion.Item value="overview">
                                <Accordion.Header>
                                    <Text as="h5">Overview</Text>
                                </Accordion.Header>
                                <Accordion.Content>
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-x-15">
                                        {dinosaur.period_start_human_readable && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground/70">Appeared</span>
                                                <span className="font-medium">
                                                    {dinosaur.period_start_human_readable}
                                                </span>
                                            </div>
                                        )}
                                        {dinosaur.period_end_human_readable && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground/70">
                                                    Last known
                                                </span>
                                                <span className="font-medium">
                                                    {dinosaur.period_end_human_readable}
                                                </span>
                                            </div>
                                        )}
                                        {dinosaur.period_start_period && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground/70">Period</span>
                                                <span className="font-medium">
                                                    {dinosaur.period_start_period}
                                                </span>
                                            </div>
                                        )}
                                        {dinosaur.taxon && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground/70">Taxon</span>
                                                <span className="font-medium">
                                                    {dinosaur.taxon}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>

                            {dinosaur.size_comparison && (
                                <Accordion.Item value="size">
                                    <Accordion.Header>
                                        <Text as="h5">Size</Text>
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <img
                                            src={dinosaur.size_comparison}
                                            alt={`Size comparison of ${dinosaur.name}`}
                                            className="max-w-full h-auto rounded border"
                                            onError={(e) => {
                                                (
                                                    e.currentTarget as HTMLImageElement
                                                ).style.display = 'none';
                                            }}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                            )}
                        </Accordion>
                    </div>
                </div>
            </Card>

            {/* Articles Section */}
            <section className="mt-8">
                <div className="mb-3">
                    <Text as="h3">Articles</Text>
                </div>

                {dinosaur.articles?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dinosaur.articles.map((article) => {
                            const domain = domainFromUrl(article.url);
                            const favicon = faviconFromUrl(article.url);

                            return (
                                <Card key={article.id} className="rounded-lg overflow-hidden">
                                    <div className="flex items-center gap-3 p-4 border-b">
                                        {favicon ? (
                                            <img
                                                src={favicon}
                                                alt={`${domain} logo`}
                                                className="w-6 h-6 rounded-sm border"
                                                onError={(e) => {
                                                    // hide broken favicon images
                                                    (
                                                        e.currentTarget as HTMLImageElement
                                                    ).style.display = 'none';
                                                }}
                                            />
                                        ) : null}
                                        <Text as="h6" className="truncate">
                                            {domain}
                                        </Text>
                                    </div>
                                    <div className="p-4">
                                        <Text as="p" className="mb-3">
                                            {article.title}
                                        </Text>
                                        <Button asChild size="sm" className="gap-2">
                                            <a href={article.url} target="_blank" rel="noreferrer">
                                                Read article <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Text as="p" className="text-muted-foreground">
                        No articles available
                    </Text>
                )}
            </section>
        </Layout>
    );
}
