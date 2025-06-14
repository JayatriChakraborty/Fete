
import CategoryIcon from "@/components/CategoryIcon";
import { categories } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Categories = () => (
  <section className="space-y-4">
    <h2 className="text-xl font-bold text-white">Categories</h2>
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem key={category.name} className="basis-auto">
            <CategoryIcon category={category} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </section>
);

export default Categories;
