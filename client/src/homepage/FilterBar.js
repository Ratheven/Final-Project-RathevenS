const FilterBar = ({ setFilter }) => {
  return (
    <>
      <form>
        <input
          type="radio"
          name="gas"
          value="shell"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Shell</label>
        <input
          type="radio"
          name="gas"
          value="ultramaur"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Ultramaur</label>
        <input
          type="radio"
          name="gas"
          value="Esso"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Esso</label>
        <input
          type="radio"
          name="gas"
          value="Couche-Tard"
          
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Couche-Tard</label>
        <input
          type="radio"
          name="gas"
          value="Reset"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Reset filter</label>
      </form>
    </>
  );
};
export default FilterBar;
