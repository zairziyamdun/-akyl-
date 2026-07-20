type MzhdTheorySectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function MzhdTheorySectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: MzhdTheorySectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p
          className={
            dark
              ? "text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase"
              : "text-xs font-semibold tracking-[0.2em] text-sky-700 uppercase"
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight sm:text-4xl ${
          eyebrow ? "mt-3" : ""
        } ${dark ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg ${
            dark ? "text-white/70" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
