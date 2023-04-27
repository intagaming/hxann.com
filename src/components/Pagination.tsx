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
            ? "border border-neutral-300 bg-blue-50 px-3 py-2 font-bold hover:bg-blue-100 dark:border-neutral-700 dark:bg-neutral-700 dark:font-normal dark:text-white"
            : "border border-neutral-300 bg-white px-3 py-2 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
        }
      >
        {page}
      </a>
    </li>
  );
};

const Pagination = ({
  totalItems,
  currentPage = 1,
  perPage = 10,
  maxShownPages = 7,
  linkProducer,
}: {
  totalItems: number;
  currentPage?: number;
  perPage?: number;
  maxShownPages?: number;
  linkProducer: (page: number) => string;
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  let middlePagesCount = maxShownPages - 2; // Minus the first and last page
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
            className="border border-neutral-300 bg-white px-3 py-2 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
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
            <span className="bg-white px-3 py-2 leading-tight text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
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
            <span className="bg-white px-3 py-2 leading-tight text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
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
            className="border border-neutral-300 bg-white px-3 py-2 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <i className="fa-solid fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
