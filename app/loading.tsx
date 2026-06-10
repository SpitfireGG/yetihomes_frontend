export default function RootLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F8F5]">
      <div className="flex flex-col items-center gap-6">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="font-headline text-sm text-gray-500">Yeti Homes Estate</p>
      </div>
    </div>
  );
}
