
import { cn } from '@/lib/utils';
import { Category } from '@/lib/data';

type CategoryIconProps = {
  category: Category;
};

const CategoryIcon = ({ category }: CategoryIconProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", category.bgColor)}>
        <category.icon className={cn("w-8 h-8", category.color)} />
      </div>
      <span className="text-sm font-medium text-foreground">{category.name}</span>
    </div>
  );
};

export default CategoryIcon;
