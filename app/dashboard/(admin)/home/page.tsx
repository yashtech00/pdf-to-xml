"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardHome() {
    const [file, setFile] = useState<File | null>(null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const res = await axios.get("/api/results");
            setResults(res.data);
        };
        fetchResults();
    }, []);

    const handleConvert = async (fileId: string) => {
        try {
            await axios.post("/api/convert", { fileId });
            window.location.reload();
        } catch (error) {
            console.error("Error converting file:", error);
        }
    };

    const handleUpload = async () => {
        console.log(file, "Selected file");
        
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file); // Ensure the key matches the server's expectation
        console.log(...formData.entries(), "Uploaded form data");
        
        const res = await axios.post("/api/upload", formData);
        if (res) {
            window.location.reload();
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-200 mb-2">
                        Upload File
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            title="Choose a file to upload"
                            className="block w-full text-sm text-gray-200 border border-dotted border-gray-300 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[150px]"
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        />
                        <Button
                            onClick={handleUpload}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Upload
                        </Button>
                    </div>
                </div>
                <div className="text-gray-200">
                    <label className="block text-lg font-medium mb-4">Preview</label>
                    <ul className="space-y-4">
                        {/* Uncomment and adjust the following code when `results` is properly structured */}
                        {/* {results.map((result) => (
                            <li key={result.file.id} className="flex items-center justify-between">
                                <span>{result.filename}</span>
                                {!result.xmlResult ? (
                                    <Button
                                        onClick={() => handleConvert(result.file.id)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Convert to XML
                                    </Button>
                                ) : (
                                    <a
                                        href={`/api/download?fileId=${result.file.id}`}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Download XML
                                    </a>
                                )}
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>
        </div>
    );
}