import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import ThemeToggle from "./ThemeToggle";

export type NavBarEntry = {
  link: string;
  title: string;
};

const NavBar = ({
  entries,
  currentPath,
}: {
  entries: NavBarEntry[];
  currentPath: string;
}) => {
  const [extend, setExtend] = useState(false);

  const closeMenu = () => {
    setExtend(false);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => closeMenu());

  return (
    <>
      <nav className="flex items-center h-28 gap-6 px-4 md:px-14 dark:bg-neutral-900 dark:text-white">
        <button
          type="button"
          className="flex-1 md:hidden"
          onClick={() => setExtend(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <a
          href="/"
          className="text-2xl flex-[2] md:flex-1 text-center md:text-left font-bold"
        >
          <span
            className={`border-b-2 border-transparent hover:border-indigo-600 ${
              currentPath === "/" ? "border-indigo-600" : ""
            }`}
          >
            An Hoang
          </span>
        </a>

        <div className="hidden md:flex flex-[3] text-lg justify-center gap-4">
          {entries.map((entry) => {
            const isPath = currentPath.startsWith(entry.link);
            return (
              <a
                key={entry.link}
                href={entry.link}
                className={`p-2 border-b-2 border-transparent hover:border-indigo-600 hover:text-neutral-900 dark:hover:text-neutral-100 ${
                  isPath
                    ? "border-indigo-600 text-neutral-900 dark:text-neutral-100"
                    : "dark:text-neutral-400 text-neutral-400"
                }`}
              >
                {entry.title}
              </a>
            );
          })}
        </div>

        <div className="flex justify-end flex-1">
          <ThemeToggle />
        </div>
      </nav>

      <>
        <div
          className={`fixed top-0 left-0 w-full h-full z-50 ${
            !extend ? "hidden" : ""
          }`}
        />
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 transition-transform ease-in-out duration-300 w-2/3 h-full z-50 bg-white shadow-md dark:bg-neutral-900 dark:text-white ${
            extend ? "translate-x-0" : "-translate-x-[67vw]"
          }`}
        >
          <button
            type="button"
            className="absolute top-0 right-0 flex gap-2 p-4 m-2"
            onClick={() => setExtend(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>Close</span>
          </button>

          <ul className="flex flex-col justify-center w-full h-full gap-4 px-4 text-2xl">
            <li>
              <a href="/">Home</a>
            </li>
            {entries.map((entry) => (
              <li key={entry.link}>
                <a href={entry.link}>{entry.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </>
    </>
  );
};

export default NavBar;
