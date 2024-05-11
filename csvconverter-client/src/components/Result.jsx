

import React from 'react';
import ReactJson from 'react-json-view';
import { useState } from 'react';
const Result = ({ jsonData }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {

        navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleSave = () => {

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = 'result.json';
        anchor.click();
    };

    if (jsonData) {
        return (
            <div className="border border-gray-300 rounded-lg p-4 shadow-md mb-4">
                <h2 className="text-2xl font-bold mb-2">Conversion Result</h2>
                <div className="flex justify-end mb-2">
                    <button className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-6 rounded mr-2" onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button className="bg-emerald-600 hover:bg-green-600 text-white font-bold py-2 px-6 rounded" onClick={handleSave}>
                        Save
                    </button>
                </div>
                <div className="max-h-60 overflow-y-auto  ">
                    <ReactJson src={jsonData} name={false} />
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default Result;
