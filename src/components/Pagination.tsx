import {Component, JSX, mergeProps} from 'solid-js';
import { range } from "lodash-es";

type PaginationButtonProps = {
  selected: boolean;
  page: number;
  link: string;
};

const PaginationButton: Component<PaginationButtonProps> = (props):JSX.Element => {
  return (
    <li>
      <a
        href={props.link}
        aria-current={props.selected ? "page" : undefined}
        class={
          props.selected
            ? "py-2 px-3 font-bold bg-blue-50 border border-neutral-300 hover:bg-blue-100 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:font-normal"
            : "py-2 px-3 leading-tight text-neutral-500 bg-white border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
        }
      >
        {props.page}
      </a>
    </li>
  );
};

type Props = {
  totalItems: number;
  currentPage?: number;
  perPage?: number;
  maxPages?: number;
  linkProducer: (page: number) => string;
};

const Pagination: Component<Props> = (props) => {
  const merged = mergeProps(
    {
      currentPage: 1,
      perPage: 10,
      maxPages: 7,
    },
    props
  );

  const totalPages = Math.ceil(merged.totalItems / merged.perPage);

  let middlePagesCount = merged.maxPages - 2;
  if (middlePagesCount % 2 === 0) middlePagesCount--;

  // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
  const middlePagesStart = Math.max(
    2,
    merged.currentPage - Math.floor(middlePagesCount / 2)
  );
  const middlePagesEnd = Math.min(
    totalPages - 1,
    middlePagesStart + middlePagesCount
  );
  const middlePages = range(middlePagesStart, middlePagesEnd + 1);

  const showBeginningDots = middlePagesStart > 2;
  const showEndDots = middlePagesEnd < totalPages - 1;

  return (
    <nav aria-label="Page navigation example" class="my-10 flex justify-center">
      <ul class="flex">
        <li>
          <a
            href={merged.linkProducer(Math.max(1, merged.currentPage - 1))}
            class="py-2 px-3 leading-tight text-neutral-500 bg-white rounded-l-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <i class="fa-solid fa-chevron-left"></i>
          </a>
        </li>

        <PaginationButton
          page={1}
          selected={merged.currentPage === 1}
          link={props.linkProducer(1)}
        />

        {showBeginningDots && (
          <li>
            <span class="py-2 px-3 leading-tight text-neutral-500 bg-white dark:bg-neutral-900 dark:text-neutral-400">
              ...
            </span>
          </li>
        )}

        {middlePages.map((page) => (
          <PaginationButton
            page={page}
            selected={merged.currentPage === page}
            link={props.linkProducer(page)}
          />
        ))}

        {showEndDots && (
          <li>
            <span class="py-2 px-3 leading-tight text-neutral-500 bg-white dark:bg-neutral-900 dark:text-neutral-400">
              ...
            </span>
          </li>
        )}

        {totalPages !== 1 && (
          <PaginationButton
            page={totalPages}
            selected={merged.currentPage === totalPages}
            link={props.linkProducer(totalPages)}
          />
        )}

        <li>
          <a
            href={merged.linkProducer(
              Math.min(totalPages, merged.currentPage + 1)
            )}
            class="py-2 px-3 leading-tight text-neutral-500 bg-white rounded-r-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <i class="fa-solid fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
