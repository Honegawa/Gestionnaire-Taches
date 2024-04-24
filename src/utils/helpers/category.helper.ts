import { Category } from "../../interfaces/category";

export const getCategoryNameFromId = (
  id: number | Category,
  categories: Category[]
): string => {
  const categoryName =
    categories.filter((c: Category) => c.id === id).pop()?.name ?? "";
  return categoryName;
};
