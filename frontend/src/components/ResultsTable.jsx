export default function ResultsTable({ results }) {
  if (!results.length) {
    return (
      <div className="border p-4 rounded text-gray-500">
        No results yet
      </div>
    )
  }

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Results</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Document A</th>
            <th className="p-2 border">Document B</th>
            <th className="p-2 border">Similarity</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="text-center">
              <td className="p-2 border">{r.docA}</td>
              <td className="p-2 border">{r.docB}</td>
              <td
                className={`p-2 border font-bold ${
                  r.score > 50
                    ? "text-red-600"
                    : r.score > 30
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
              >
                {r.score}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
