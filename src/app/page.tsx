import fetchDinosaurs from "@/lib/api/fetchDinosaurs";
import { Card } from "@/components/retroui/Card";
import Image from "next/image";

export default async function Home() {
  const dinosaurs = await fetchDinosaurs();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8  gap-y-6">
      {dinosaurs.data.map((dinosaur) => (
        <Card className="w-full hover:shadow-none" key={dinosaur.id}>
          <Card.Content className="pb-0">
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-gray-50">
              <Image
                src={dinosaur.images[0].url}
                alt={"Thumbnail image for " + dinosaur.name}
                fill
                className="object-contain"
              />
            </div>
          </Card.Content>
          <Card.Header className="pb-0 text-center">
            <Card.Title>{dinosaur.name}</Card.Title>
          </Card.Header>
          <Card.Content className="flex justify-between items-center"></Card.Content>
        </Card>
      ))}
    </div>
  );
}
