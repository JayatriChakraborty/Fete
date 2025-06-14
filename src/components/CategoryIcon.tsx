
import { cn } from '@/lib/utils';
import { Category } from '@/lib/data';

type CategoryIconProps = {
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
};

const CategoryIcon = ({ category, isSelected, onClick }: CategoryIconProps) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 text-center w-20 group">
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105",
        category.bgColor,
        isSelected ? 'ring-2 ring-white/80' : 'ring-0'
      )}>
        <category.icon className={cn("w-7 h-7 transition-all", category.color)} />
      </div>
      <span className={cn(
        "text-sm font-medium truncate w-full",
        isSelected ? 'text-white' : 'text-muted-foreground'
      )}>{category.name}</span>
    </button>
  );
};

export default CategoryIcon;
