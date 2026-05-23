interface SectionHeadingProps {
  title: string;
  description?: string;
  badge?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  title,
  description,
  badge,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={`flex flex-col gap-3 ${alignmentClasses[align]} ${className}`}
    >
      {badge && (
        <span className="px-3 py-1 bg-primary-container text-primary rounded-full text-xs font-semibold tracking-wide uppercase border border-primary/10 shadow-sm">
          {badge}
        </span>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-medium text-on-surface leading-tight break-words">
        {title}
      </h2>

      {description && (
        <p className="text-on-surface-variant text-sm md:text-base max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
