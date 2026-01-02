export default function TextInput({ setText }) {
  return (
    <div className="border p-4 rounded">
      <label className="font-semibold block mb-2">
        Paste Text to Compare
      </label>

      <textarea
        rows="6"
        className="w-full border p-2"
        placeholder="Paste text here..."
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}
