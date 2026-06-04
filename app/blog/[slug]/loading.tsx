export default function BlogSlugLoading() {
  return (
    <div className="min-h-screen bg-[#F8F8F5] animate-pulse">
      <div className="h-[40vh] bg-gray-200" />
      <div className="mx-auto w-full max-w-[800px] px-6 lg:px-10 py-12 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="space-y-3 mt-8">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
