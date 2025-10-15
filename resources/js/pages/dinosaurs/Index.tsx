import React, { useEffect, useState } from 'react';
import { Dinosaur, PaginatedResponse } from '@/types';
import DinosaurCard from '@/components/DinosaurCard';
import { motion } from 'motion/react';
import Layout from '@/components/Layout';
import { InfiniteScroll, router } from '@inertiajs/react';
import { Input } from '@/components/retroui/Input';

export default function Index({
    dinosaurs,
    initialSearch,
}: {
    dinosaurs: PaginatedResponse<Dinosaur>;
    initialSearch: string;
}) {
    const [search, setSearch] = useState(initialSearch);

    console.log(initialSearch);

    useEffect(() => {
        setSearch(initialSearch);
    }, [initialSearch]);

    const onSearchChange = (value: string) => {
        setSearch(value);

        const params = new URLSearchParams(
            typeof window !== 'undefined' ? window.location.search : ''
        );
        if (value && value.trim().length > 0) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        router.visit('/', {
            data: Object.fromEntries(params.entries()),
            only: ['dinosaurs', 'initialSearch'],
            reset: ['dinosaurs', 'initialSearch'],
            replace: true,
            preserveState: true,
        });
    };

    return (
        <Layout>
            <div className="mb-8 w-full">
                <div className="w-full md:max-w-md lg:max-w-lg xl:max-w-2xl">
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            onSearchChange((e as React.ChangeEvent<HTMLInputElement>).target.value)
                        }
                        className="w-full"
                    />
                </div>
            </div>
            <InfiniteScroll data="dinosaurs">
                <motion.div
                    className="grid items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-9"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {dinosaurs.data.map((dinosaur, index) => (
                        <motion.div
                            key={dinosaur.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index % 15) * 0.1, duration: 0.3 }}
                            className="h-full"
                        >
                            <DinosaurCard
                                className="w-full h-full"
                                dinosaur={dinosaur}
                                href={`/dinosaurs/${dinosaur.id}`}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </InfiniteScroll>
        </Layout>
    );
}
