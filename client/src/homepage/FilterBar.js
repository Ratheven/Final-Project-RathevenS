const FilterBar = ({ setFilter }) => {
  return (
    <>
      <form>
        <input
          type="checkbox"
          value="shell"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Shell</label>
        <input
          type="checkbox"
          value="ultramaur"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Ultramaur</label>
        <input
          type="checkbox"
          value="Esso"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Esso</label>
        <input
          type="checkbox"
          value="Couche-Tard"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Couche-Tard</label>
        <input
          type="checkbox"
          value="Reset"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Reset filter</label>
      </form>
    </>
  );
};
export default FilterBar;
