export function SortBy({
  sortingOrder,
  onChange,
}: {
  sortingOrder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label>
        Sorting:
        <select value={sortingOrder} onChange={onChange}>
          <option value=''>Default</option>
          <option value='asc'>Title A-Z</option>
          <option value='desc'>Title Z-A</option>
        </select>
      </label>
    </div>
  );
}
