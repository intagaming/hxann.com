import { range } from "lodash-es";

const PaginationButton = ({
  selected,
  page,
  link,
}: {
  selected: boolean;
  page: number;
  link: string;
}): JSX.Element => {
  return (
    <li>
      <a
        href={link}
        aria-current={selected ? "page" : undefined}
        className={
          selected
            ? "py-2 px-3 font-bold bg-blue-50 border border-neutral-300 hover:bg-blue-100 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:font-normal"
            : "py-2 px-3 leading-tight text-neutral-500 bg-white border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
        }
      >
        {page}
      </a>
    </li>
  );
};

const Pagination = ({
  totalItems,
  currentPage,
  perPage,
  maxPages,
  linkProducer,
}: {
  totalItems: number;
  currentPage?: number;
  perPage?: number;
  maxPages?: number;
  linkProducer: (page: number) => string;
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  let middlePagesCount = maxPages - 2;
  if (middlePagesCount % 2 === 0) middlePagesCount--;

  // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
  const middlePagesStart = Math.max(
    2,
    currentPage - Math.floor(middlePagesCount / 2)
  );
  const middlePagesEnd = Math.min(
    totalPages - 1,
    middlePagesStart + middlePagesCount
  );
  const middlePages = range(middlePagesStart, middlePagesEnd + 1);

  const showBeginningDots = middlePagesStart > 2;
  const showEndDots = middlePagesEnd < totalPages - 1;

  return (
    <nav
      aria-label="Page navigation example"
      className="my-10 flex justify-center"
    >
      <ul className="flex">
        <li>
          <a
            href={linkProducer(Math.max(1, currentPage - 1))}
            className="py-2 px-3 leading-tight text-neutral-500 bg-white rounded-l-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <i className="fa-solid fa-chevron-left"></i>
          </a>
        </li>

        <PaginationButton
          page={1}
          selected={currentPage === 1}
          link={linkProducer(1)}
        />

        {showBeginningDots && (
          <li>
            <span className="py-2 px-3 leading-tight text-neutral-500 bg-white dark:bg-neutral-900 dark:text-neutral-400">
              ...
            </span>
          </li>
        )}

        {middlePages.map((page) => (
          <PaginationButton
            key={page}
            page={page}
            selected={currentPage === page}
            link={linkProducer(page)}
          />
        ))}

        {showEndDots && (
          <li>
            <span className="py-2 px-3 leading-tight text-neutral-500 bg-white dark:bg-neutral-900 dark:text-neutral-400">
              ...
            </span>
          </li>
        )}

        {totalPages !== 1 && (
          <PaginationButton
            page={totalPages}
            selected={currentPage === totalPages}
            link={linkProducer(totalPages)}
          />
        )}

        <li>
          <a
            href={linkProducer(Math.min(totalPages, currentPage + 1))}
            className="py-2 px-3 leading-tight text-neutral-500 bg-white rounded-r-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <i className="fa-solid fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};
Pagination.defaultProps = {
  currentPage: 1,
  perPage: 10,
  maxPages: 7,
};

export default Pagination;
