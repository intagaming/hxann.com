import { type RefObject, useEffect, useRef, useState } from "react";

import ThemeToggle from "./ThemeToggle";

// From https://hashnode.com/post/useonclickoutside-custom-hook-to-detect-the-mouse-click-on-outside-typescript-ckrejmy3h0k5r91s18iu42t28
type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

export type NavBarEntry = {
  id: string;
  link: string;
  title: string;
};

const NavBar = <T extends NavBarEntry[]>({
  entries,
  activeNav,
}: {
  entries: T;
  activeNav: "/" | T[number]["id"];
}) => {
  const [extend, setExtend] = useState(false);

  const closeMenu = () => {
    setExtend(false);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => closeMenu());

  return (
    <>
      <nav className="flex h-28 items-center gap-6 px-4 dark:bg-neutral-900 dark:text-white md:px-14">
        <button
          type="button"
          className="flex-1 md:hidden"
          onClick={() => setExtend(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          className="flex-[2] text-center text-2xl font-bold md:flex-1 md:text-left"
        >
          <span
            className={`border-b-2 hover:border-indigo-600 ${
              activeNav === "/" ? "border-indigo-600" : "border-transparent"
            }`}
          >
            An Hoang
          </span>
        </a>

        <div className="hidden flex-[3] justify-center gap-4 text-lg md:flex">
          {entries.map((entry) => {
            const isActive = activeNav === entry.id;
            return (
              <a
                key={entry.link}
                href={entry.link}
                className={`border-b-2 p-2 hover:border-indigo-600 hover:text-neutral-900 dark:hover:text-neutral-100 ${
                  isActive
                    ? "border-indigo-600 text-neutral-900 dark:text-neutral-100"
                    : "border-transparent text-neutral-400 dark:text-neutral-400"
                }`}
              >
                {entry.title}
              </a>
            );
          })}
        </div>

        <div className="flex flex-1 justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <>
        <div
          className={`fixed left-0 top-0 z-50 h-full w-full ${
            !extend ? "hidden" : ""
          }`}
        />
        <div
          ref={menuRef}
          className={`fixed left-0 top-0 z-50 h-full w-2/3 bg-white shadow-md transition-transform duration-300 ease-in-out dark:bg-neutral-900 dark:text-white ${
            extend ? "translate-x-0" : "-translate-x-[67vw]"
          }`}
        >
          <button
            type="button"
            className="absolute right-0 top-0 m-2 flex gap-2 p-4"
            onClick={() => setExtend(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

          <ul className="flex h-full w-full flex-col justify-center gap-4 px-4 text-2xl">
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
