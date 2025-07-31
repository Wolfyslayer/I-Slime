export default function FilterBar({ filters, setFilters, resetFilters }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Class:
        <select
          value={filters.class || ''}
          onChange={e => setFilters(prev => ({ ...prev, class: e.target.value || null }))}
        >
          <option value="">All</option>
          <option value="Archer">Archer</option>
          <option value="Swordsman">Swordsman</option>
          <option value="Mage">Mage</option>
        </select>
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Evolution Path:
        <select
          value={filters.evolution || ''}
          onChange={e => setFilters(prev => ({ ...prev, evolution: e.target.value || null }))}
        >
          <option value="">All</option>
          <option value="Path1">Path 1</option>
          <option value="Path2">Path 2</option>
        </select>
      </label>

      <button onClick={resetFilters} style={{ marginLeft: '1rem' }}>
        Reset Filters
      </button>
    </div>
  )
}
