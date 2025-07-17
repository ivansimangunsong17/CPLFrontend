import React, { useState, useEffect } from 'react';

const DebugLogger = () => {
    const [logs, setLogs] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        // Override console.log, console.error, etc. untuk menangkap logs
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        const addLog = (type, message, ...args) => {
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = {
                id: Date.now() + Math.random(),
                type,
                message: typeof message === 'object' ? JSON.stringify(message, null, 2) : String(message),
                args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)),
                timestamp
            };

            setLogs(prevLogs => {
                const newLogs = [...prevLogs, logEntry];
                // Keep only last 50 logs
                return newLogs.slice(-50);
            });
        };

        // Override console methods
        console.log = (message, ...args) => {
            originalLog(message, ...args);
            addLog('log', message, ...args);
        };

        console.error = (message, ...args) => {
            originalError(message, ...args);
            addLog('error', message, ...args);
        };

        console.warn = (message, ...args) => {
            originalWarn(message, ...args);
            addLog('warn', message, ...args);
        };

        // Cleanup on unmount
        return () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
        };
    }, []);

    const clearLogs = () => {
        setLogs([]);
    };

    const getLogColor = (type) => {
        switch (type) {
            case 'error':
                return 'text-red-400';
            case 'warn':
                return 'text-yellow-400';
            default:
                return 'text-green-400';
        }
    };

    // Only show in development
    if (process.env.NODE_ENV !== 'development') return null;

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50 hover:bg-gray-700"
                title="Show Debug Console"
            >
                🐛
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white rounded-lg shadow-2xl z-50 font-mono text-xs"
            style={{ width: '400px', maxHeight: isMinimized ? '40px' : '300px' }}>

            {/* Header */}
            <div className="flex justify-between items-center p-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
                <span className="text-green-400 font-bold">Debug Console</span>
                <div className="flex gap-1">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-yellow-400 hover:text-yellow-300 text-sm"
                        title={isMinimized ? "Expand" : "Minimize"}
                    >
                        {isMinimized ? '📤' : '📥'}
                    </button>
                    <button
                        onClick={clearLogs}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                        title="Clear logs"
                    >
                        🗑️
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-red-400 hover:text-red-300 text-sm"
                        title="Hide console"
                    >
                        ❌
                    </button>
                </div>
            </div>

            {/* Content */}
            {!isMinimized && (
                <div className="p-2 overflow-y-auto" style={{ maxHeight: '250px' }}>
                    {logs.length === 0 ? (
                        <div className="text-gray-500 text-center py-4">No logs yet...</div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="mb-1 border-b border-gray-800 pb-1">
                                <div className="flex justify-between items-start">
                                    <span className={`${getLogColor(log.type)} text-xs opacity-70`}>
                                        [{log.timestamp}]
                                    </span>
                                    <span className={`text-xs px-1 rounded ${log.type === 'error' ? 'bg-red-900 text-red-200' :
                                            log.type === 'warn' ? 'bg-yellow-900 text-yellow-200' :
                                                'bg-green-900 text-green-200'
                                        }`}>
                                        {log.type.toUpperCase()}
                                    </span>
                                </div>
                                <div className={`${getLogColor(log.type)} break-words`}>
                                    {log.message}
                                </div>
                                {log.args.length > 0 && (
                                    <div className="text-gray-400 pl-2">
                                        {log.args.map((arg, index) => (
                                            <div key={index} className="break-words">{arg}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default DebugLogger;
