"use client";

import { motion } from "motion/react";
import DinosaurCard from "@/components/DinosaurCard";
import { Dinosaur } from "@/types";
import React from "react";

interface DinosaurGridProps {
  dinosaurs: Dinosaur[];
}

export default function DinosaurGrid({ dinosaurs }: DinosaurGridProps) {
  return (
    <>
      <motion.div
        className="grid items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {dinosaurs.map((dinosaur, index) => (
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
    </>
  );
}
