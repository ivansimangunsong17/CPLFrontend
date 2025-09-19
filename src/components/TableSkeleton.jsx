import React from 'react';

const TableSkeleton = ({ columns = 5, rows = 5 }) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={`skeleton-row-${rowIndex}`} className="animate-pulse">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <td key={`skeleton-cell-${rowIndex}-${colIndex}`} className="p-4">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableSkeleton;