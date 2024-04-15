import CategoryButton from "./CategoryButton";

export default function CategoryCard({ title }: { title: string }) {
  const type = title === "Multiple Choice" ? "multiple" : "boolean";

  return (
    <div className="max-w-[350px] bg-slate-900 px-6 py-8">
      <div className="flex items-center">
        <p className="w-[60%] text-4xl text-white">{title}</p>
        <div className="grid w-[40%] gap-4">
          <CategoryButton difficulty={"easy"} type={type} />
          <CategoryButton difficulty={"hard"} type={type} />
        </div>
      </div>
    </div>
  );
}
