export default function SortBy({sortedBy, onChange}: {sortedBy: string, onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void} ) {

  return (
    <div>
      <label htmlFor="">Sorting: </label>
      <select value={sortedBy} onChange={onChange}>
        <option value="default">Default</option>
        <option value="ascending">Title A-Z</option>
        <option value="descending">Title Z-A</option>
      </select>
    </div>
  );
}
