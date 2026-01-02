export default function FileUpload({ setFiles }) {
  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files)

    setFiles((prevFiles) => {
      // merge old + new, avoid duplicates
      const combined = [...prevFiles, ...newFiles]
      const unique = Array.from(
        new Map(combined.map(f => [f.name, f])).values()
      )
      return unique
    })

    // allow selecting same file again if needed
    e.target.value = ""
  }

  return (
    <div className="border p-4 rounded">
      <label className="font-semibold block mb-2">
        Upload Files (select multiple or add one by one)
      </label>

      <input
        type="file"
        onChange={handleChange}
        className="block mb-2"
      />

      <p className="text-sm text-gray-500">
        Tip: You can add files one by one or select multiple together
      </p>
    </div>
  )
}
