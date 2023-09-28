export function SortBy({
  sortedBy,
  onChange,
}: {
  sortedBy: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label htmlFor=''>Sorting: </label>
      <select value={sortedBy} onChange={onChange}>
        <option value='' selected>
          Default
        </option>
        <option value='asc'>Title A-Z</option>
        <option value='desc'>Title Z-A</option>
      </select>
    </div>
  );
}
