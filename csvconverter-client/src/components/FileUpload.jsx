import React from 'react';
import CloudUploadImage from "../assets/upload.svg"

const FileUpload = ({ onFileSelect }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onFileSelect(file);
    };

    return (
        <div className=" p-6 max-w-full ">
            <h2 className="text-2xl font-bold p-2">OR Option 2: Choose File</h2>
            <div className='flex items-center flex-col justify-center text-center mb-8 py-6 border-4 border-blue-100'>
                <img src={CloudUploadImage} alt="Upload file icon" width={50} className="h-8" />
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv"

                />
            </div>
        </div>
    );
}

export default FileUpload;
