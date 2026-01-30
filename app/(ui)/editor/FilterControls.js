export default function FilterControls({ filters, setFilters }) {
  return (
    <div className="space-y-2">
      {Object.keys(filters).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="range"
            min="0"
            max="200"
            value={filters[key]}
            onChange={(e) =>
              setFilters({ [key]: e.target.value })
            }
          />
        </div>
      ))}
    </div>
  );
}
