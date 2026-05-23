import { brandName, navigationItems } from "@/data/landing-content";

export function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/20 glass-nav">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <a
          href="#top"
          className="font-headline text-xl font-extrabold tracking-[0.32em] text-on-surface sm:text-2xl"
        >
          {brandName}
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`border-b-2 pb-1 font-headline text-sm font-semibold tracking-[0.18em] uppercase transition-colors ${
                item.active
                  ? "border-primary text-on-surface"
                  : "border-transparent text-primary/75 hover:text-on-surface"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            className="hidden font-headline text-sm font-semibold tracking-[0.18em] uppercase text-primary transition-colors hover:text-on-surface sm:inline-flex"
          >
            Sign In
          </a>
          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2.5 font-headline text-sm font-semibold tracking-[0.18em] uppercase text-on-primary transition-transform hover:-translate-y-0.5"
          >
            List Property
          </a>
        </div>
      </div>
    </header>
  );
}
