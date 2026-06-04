interface LoaderProps {
  size?: number;
  className?: string;
}

export function Loader({ size = 80, className }: LoaderProps) {
  const padding = Math.max(2, Math.round(size * 0.125));
  const blur = Math.max(1, Math.round(size * 0.15));
  return (
    <div
      className={className ? `loader ${className}` : "loader"}
      style={{
        "--l-size": `${size}px`,
        "--l-padding": `${padding}px`,
        "--l-blur": `${blur}px`,
      } as React.CSSProperties}
    />
  );
}
