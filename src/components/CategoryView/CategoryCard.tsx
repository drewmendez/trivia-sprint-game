import CategoryButton from "./CategoryButton";

export default function CategoryCard({ title }: { title: string }) {
  const type = title === "Multiple Choice" ? "multiple" : "boolean";

  return (
    <div className="max-w-[350px] rounded-xl bg-slate-800 px-6 py-10 duration-100 hover:scale-105">
      <div className="flex items-center">
        <p className="w-[60%] text-4xl font-bold text-white">{title}</p>
        <div className="grid w-[40%] gap-4">
          <CategoryButton difficulty={"easy"} type={type} />
          <CategoryButton difficulty={"hard"} type={type} />
        </div>
      </div>
    </div>
  );
}
