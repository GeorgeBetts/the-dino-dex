import React from 'react';
import { Dinosaur, PaginatedResponse } from '@/types';
import DinosaurCard from '@/components/DinosaurCard';
import { motion } from 'motion/react';
import Layout from '@/components/Layout';

export default function index({ dinosaurs }: { dinosaurs: PaginatedResponse<Dinosaur> }) {
    return (
        <Layout>
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
                        transition={{ delay: index * 0.1, duration: 0.3 }}
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
        </Layout>
    );
}
