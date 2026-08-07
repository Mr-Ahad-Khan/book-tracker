export default function FilterBar({ filter, setFilter, genres, statuses }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search by title or author…"
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      />
      <div className="select-group">
        <select
          value={filter.genre}
          onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g === "All" ? "All Genres" : g}
            </option>
          ))}
        </select>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Statuses" : s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
