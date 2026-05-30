import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F8F5] px-6">
      <div className="max-w-md text-center">
        <p className="font-headline text-7xl font-bold text-gray-200">404</p>
        <h2 className="mt-4 font-headline text-xl font-semibold text-gray-900">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
