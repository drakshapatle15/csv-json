import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ConversionForm from './components/ConversionForm';
import Result from './components/Result';
import "tailwindcss/tailwind.css";
import axios from 'axios';
import Option1 from './components/Option1';
import Swal from 'sweetalert2'


const App = () => {
    const [resultObtained, setResultObtained] = useState(null);
    const [conversionFormData, setConversionFormData] = useState({
        delimiter: ",",
        noheader: "0",
        headers: [],
        quotes: "on",
        ignoreEmpty: "0",
        indent: "2",
        includeColumns: '',
        file: null,
        csvData: null
    });

    const handleFileSelect = (file) => {
        setConversionFormData((prevState) => ({ ...prevState, file: file }));
    };
    const handleCsvSelect = (csvData) => {
        setConversionFormData((prevState) => ({ ...prevState, csvData: csvData }));
    };
    const handleConvert = () => {
        if (!conversionFormData.file && !conversionFormData.csvData) {
            Swal.fire({
                title: 'Error!',
                text: 'No file was uploaded and or no CSV content was pasted',
                icon: 'error',
                confirmButtonText: 'Close',
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                width: "100%",
                showConfirmButton: false,
                allowOutsideClick: false,
                padding: 0,
                position: "top-end",
            })
            return;
        }

        const formData = new FormData();

        if (conversionFormData.file) {
            formData.append('file', conversionFormData.file);
        } else {
            formData.append('csvData', conversionFormData.csvData);
        }

        console.log("Submitting this", conversionFormData)
        
        axios.post(
            `http://localhost:4000/csv-to-json`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    "noheader": conversionFormData.noheader,
                    "delimiter": conversionFormData.delimiter,
                    "quotes": conversionFormData.quotes,
                    "ignoreEmpty": conversionFormData.ignoreEmpty,
                    "indent": conversionFormData.indent,
                    "headers": conversionFormData.headers,
                    "includeColumns": conversionFormData.includeColumns
                }
            }
        )
            .then(response => {
                setResultObtained(response.data);
            })
            .catch(error => {
                if (error?.isAxiosError && error?.response?.status === 413) {
                    Swal.fire({
                        title: 'File too large!',
                        text: 'Error in converting the CSV to JSON!. The file exceeds the limit of 100MB',
                        icon: 'error',
                        confirmButtonText: 'Close',
                        toast: true,
                        timer: 3000,
                        timerProgressBar: true,
                        width: "100%",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        padding: 0,
                        position: "top-end",
                    })
                }
                else if (error?.isAxiosError && error?.response?.status === 422) {
                    Swal.fire({
                        title: 'Unprocessable input or set of parameters!',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Close',
                        toast: true,
                        timer: 3000,
                        timerProgressBar: true,
                        width: "100%",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        padding: 0,
                        position: "top-end",
                    })
                }
                else {

                    Swal.fire({
                        title: 'Error!',
                        text: 'Error in converting the CSV to JSON!',
                        icon: 'error',
                        confirmButtonText: 'Close',
                        toast: true,
                        timer: 3000,
                        timerProgressBar: true,
                        width: "100%",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        padding: 0,
                        position: "top-end",
                    })
                }
                console.error('Error converting CSV to JSON:', error);
            });
    };

    return (
        <div className="container mx-auto  d-flex ">

            <Header />
            <Option1 onCsvSelect={handleCsvSelect} />
            <FileUpload onFileSelect={handleFileSelect} />
            <ConversionForm formData={conversionFormData} setFormData={setConversionFormData} onConvert={handleConvert} />
            <Result jsonData={resultObtained}></Result>

        </div>
    );
}

export default App;
