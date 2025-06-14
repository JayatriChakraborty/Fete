
import CategoryIcon from "@/components/CategoryIcon";
import { categories } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LayoutGrid } from "lucide-react";

type CategoriesProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const allCategory = { name: 'All', icon: LayoutGrid, color: 'text-gray-400', bgColor: 'bg-gray-700' };

const Categories = ({ selectedCategory, onSelectCategory }: CategoriesProps) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        <CarouselItem className="basis-auto">
          <CategoryIcon
            category={allCategory}
            isSelected={selectedCategory === 'All'}
            onClick={() => onSelectCategory('All')}
          />
        </CarouselItem>
        {categories.map((category) => (
          <CarouselItem key={category.name} className="basis-auto">
            <CategoryIcon 
              category={category} 
              isSelected={selectedCategory === category.name}
              onClick={() => onSelectCategory(category.name)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </section>
);

export default Categories;
