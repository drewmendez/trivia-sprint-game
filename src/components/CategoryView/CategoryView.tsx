import CategoryCard from "./CategoryCard";

export default function CategoryView() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 md:flex-row">
      <CategoryCard title={"Multiple Choice"} />
      <CategoryCard title={"True or False"} />
    </main>
  );
}
