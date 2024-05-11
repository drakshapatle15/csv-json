
import React from 'react';

const Option1 = ({ onCsvSelect }) => {
    const handleCsvChange = (e) => {
        const csvData = e.target.value;
        onCsvSelect(csvData);
    }

    return (
        <div className=" p-6">
            <h2 className="text-2xl font-bold mb-2">Option 1: Paste CSV Data</h2>
            <div className="mb-10 py-0 ">
                <textarea
                    name="csvData"
                    onChange={handleCsvChange}
                    className="border-4 border-blue-100 px-2 py-1 w-full h-32 mb-4"
                    placeholder="Paste your CSV data here..."
                />
            </div>
        </div>
    );
}

export default Option1;
