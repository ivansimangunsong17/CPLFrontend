const TableSkeleton = ({ rows = 3, columns = 5 }) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                    <td className="p-4">
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    </td>
                    {[...Array(columns - 1)].map((_, i) => (
                        <td key={i} className="p-4">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};
export default TableSkeleton;