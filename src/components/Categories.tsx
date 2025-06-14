
import CategoryIcon from "@/components/CategoryIcon";
import { categories } from "@/lib/data";

const Categories = () => (
  <section className="space-y-4">
    <h2 className="text-xl font-bold text-white">Categories</h2>
    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
      {categories.map((category) => (
        <CategoryIcon key={category.name} category={category} />
      ))}
    </div>
  </section>
);

export default Categories;
