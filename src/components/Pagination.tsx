type Props = {
  currentPage: number;
  pagesNumber: number;
  onPageChange: (page: number) => void;
};
export function Pagination({ currentPage, pagesNumber, onPageChange }: Props) {
  return (
    <div className='container'>
      <ul className='pagination'>
        {currentPage > 1 && (
          <li onClick={() => onPageChange(currentPage - 1)}>
            <a href='#'>Prev</a>
          </li>
        )}

        {/* {currentPage > 2 && (
          <li>
            <a href='#'>{currentPage - 1}</a>
          </li>
        )} */}
        <li className='active'>
          <a href='#'>{currentPage}</a>
        </li>
        {/* {currentPage + 1 < pagesNumber && (
          <li>
            <a href='#'>{currentPage + 1}</a>
          </li>
        )} */}
        {pagesNumber > currentPage && (
          <li onClick={() => onPageChange(currentPage + 1)}>
            <a href='#'>Next</a>
          </li>
        )}
      </ul>
    </div>
  );
}
