const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);
export default CardSkeleton;