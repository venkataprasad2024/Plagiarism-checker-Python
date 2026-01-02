export default function ThresholdSlider({ threshold, setThreshold }) {
  return (
    <div className="border p-4 rounded">
      <label className="font-semibold block mb-2">
        Plagiarism Threshold: {threshold}%
      </label>

      <input
        type="range"
        min="0"
        max="100"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        className="w-full"
      />
    </div>
  )
}
