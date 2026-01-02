import { useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import FileUpload from "../components/FileUpload"
import ResultsTable from "../components/ResultsTable"

export default function Dashboard() {
  // IMPORTANT: files is an array and we accumulate files
  const [files, setFiles] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    // Validation
    if (!files || files.length < 2) {
      alert("Please upload at least 2 files")
      return
    }

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })

    try {
      setLoading(true)

      const res = await axios.post(
        "http://127.0.0.1:5000/api/check-plagiarism",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setResults(res.data)
    } catch (err) {
      console.error("Backend error:", err)
      alert("Failed to connect to backend")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setFiles([])
    setResults([])
  }

  return (
    <div>
      <Navbar />

      <div className="p-6 grid gap-4 max-w-4xl mx-auto">
        {/* File Upload */}
        <FileUpload setFiles={setFiles} />

        {/* Selected files preview */}
        {files.length > 0 && (
          <div className="border p-3 rounded bg-gray-50">
            <p className="font-semibold mb-2">
              Selected Files ({files.length})
            </p>
            <ul className="list-disc list-inside text-sm">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Plagiarism"}
          </button>

          <button
            onClick={handleClear}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        <ResultsTable results={results} />
      </div>
    </div>
  )
}
