import { Dinosaur, PaginatedResponse } from '@/types';

export default function index({ dinosaurs }: { dinosaurs: PaginatedResponse<Dinosaur> }) {
    console.log(dinosaurs);
    return 'dinosaurs';
}
