import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 18v-7.5A1.5 1.5 0 0 1 4.5 9H12a3 3 0 0 1 3 3v6" />
      <path d="M3 13h18v5" />
      <path d="M17 9.5h2.5A1.5 1.5 0 0 1 21 11v7" />
      <path d="M7 9V6.5A1.5 1.5 0 0 1 8.5 5h2A1.5 1.5 0 0 1 12 6.5V9" />
    </svg>
  );
}

export function BathIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 13h16" />
      <path d="M5 13v1.5A4.5 4.5 0 0 0 9.5 19h5A4.5 4.5 0 0 0 19 14.5V13" />
      <path d="M7 19v2" />
      <path d="M17 19v2" />
      <path d="M8 13V8a2 2 0 1 1 4 0" />
      <path d="M12 8h3" strokeLinecap="round" />
    </svg>
  );
}

export function RulerIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 15.5L15.5 4a2.12 2.12 0 0 1 3 0l1.5 1.5a2.12 2.12 0 0 1 0 3L8.5 20a2.12 2.12 0 0 1-3 0L4 18.5a2.12 2.12 0 0 1 0-3Z" />
      <path d="M14 6l4 4" />
      <path d="M11.5 8.5l1.5 1.5" />
      <path d="M8.5 11.5l1.5 1.5" />
      <path d="M5.5 14.5L7 16" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 20.5s-7-4.35-7-10.05A4.2 4.2 0 0 1 9.2 6c1.28 0 2.5.58 3.3 1.56A4.24 4.24 0 0 1 15.8 6 4.2 4.2 0 0 1 20 10.45c0 5.7-7 10.05-7 10.05Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.8 2.45 4.5 5.52 4.5 9s-1.7 6.55-4.5 9c-2.8-2.45-4.5-5.52-4.5-9S9.2 5.45 12 3Z" />
    </svg>
  );
}

export function AtIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8.5v5.25a1.75 1.75 0 0 0 3.5 0V12a7.5 7.5 0 1 0-2.2 5.3" />
      <circle cx="12" cy="12" r="3.25" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export function BikeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path
        d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
