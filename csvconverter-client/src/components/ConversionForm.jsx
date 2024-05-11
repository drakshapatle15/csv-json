
import React from 'react';
import '../App.css';

const ConversionForm = ({ onConvert, formData, setFormData }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleConvert = () => {
        onConvert(formData);
    };

    return (
        <div className="my-4  p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="w-full md:w-1/4 mb-4 md:mb-0 ">
                    <label className="font-bold block mb-2">CSV contains a header row</label>
                    <select

                        name="noheader"
                        value={formData.noheader}
                        onChange={handleInputChange}
                        className="text-sm rounded-xl border border-gray-400 px-2 py-2 mb-4 w-full pl-8 classic"
                    >
                        <option value="0">Yes</option>
                        <option value="1">No</option>
                    </select>
                </div>
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <label htmlFor="headers" className="font-bold block mb-2">Add comma separate headers</label>
                    <input
                        type="text"
                        name="headers"
                        value={formData.headers}
                        className="text-sm rounded-xl border border-gray-400 px-2 py-3 mb-4 w-full"
                        onChange={(e) => {
                            const headerStrings = e.target.value;
                            const splits = headerStrings.split(",")
                            const headersToAdd = []
                            for (const split of splits) {
                                headersToAdd.push(split.trim())
                            }
                            setFormData((prevState) => ({ ...prevState, headers: headersToAdd }))
                        }}

                    />
                </div>
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <label className="font-bold block mb-2">Included columns (regex)</label>
                    <input
                        type="text"
                        name="includeColumns"
                        value={formData.includeColumns}
                        onChange={handleInputChange}
                        className="text-sm rounded-xl border border-gray-400 px-2 py-3 mb-4 w-full "
                    />
                </div>
            </div>


            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="w-full md:w-1/4 mb-4 md:mb-0 select-wrapper">
                    <label className="font-bold block mb-2">Delimiter</label>
                    <select
                        name="delimiter"
                        value={formData.delimiter}
                        onChange={handleInputChange}
                        className="text-sm rounded-xl border border-gray-400 px-2 py-2 mb-4 w-full classic"
                    >
                        <option value=",">Comma (,)</option>
                        <option value=";">Semicolon (;)</option>
                        <option value="\t">Tab (\t)</option>
                        <option value=".">Dot (.)</option>
                    </select>
                </div>

                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <label className="font-bold block mb-2">Ignore delimiter inside quotes</label>
                    <select
                        name="quotes"
                        value={formData.quotes}
                        onChange={handleInputChange}
                        className="text-sm rounded-xl border border-gray-400 px-2 py-2 mb-4 w-full classic"
                    >
                        <option value="off">Split "Hello, world" or 'Hello, world' </option>
                        <option value='"'>Assume "Hello, world" as single item</option>
                        <option value="'">Assume 'Hello, world' as single item</option>
                    </select>
                </div>
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <label className="font-bold block mb-2">Empty values in the csv</label>
                    <select
                        name="ignoreEmpty"
                        value={formData.ignoreEmpty}
                        onChange={handleInputChange}
                        className="text-sm rounded-xl border border-gray-400 px-2 py-2 mb-4 w-full classic"
                    >
                        <option value="0">Convert to empty string</option>
                        <option value="1">Skip</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <button onClick={handleConvert} className="convert-button">
                    Convert csv to json
                </button>
            </div>
        </div>
    );
};

export default ConversionForm;
