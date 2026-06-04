import { Loader } from "@/components/ui/loader";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F8F5]">
      <div className="flex flex-col items-center gap-6">
        <Loader size={80} />
        <p className="font-headline text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
