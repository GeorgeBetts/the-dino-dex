import fetchDinosaurs from "@/lib/api/fetchDinosaurs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/retroui/Pagination";
import DinosaurGrid from "@/app/DinosaurGrid";

export default async function Home() {
  const dinosaurs = await fetchDinosaurs();
  return (
    <>
      <div className="flex justify-start mb-8">
        <Pagination className="mx-0 justify-start md:justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <DinosaurGrid dinosaurs={dinosaurs.data} />
    </>
  );
}
