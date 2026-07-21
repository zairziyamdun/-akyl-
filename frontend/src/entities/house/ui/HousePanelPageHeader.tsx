export function PageHeaderLike({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
        {title}
      </h1>
      {description ? (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
