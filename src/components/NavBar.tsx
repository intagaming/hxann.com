import { Component, createSignal } from "solid-js";
import clickOutside from "src/directives/clickOutside";
import ThemeToggle from "./ThemeToggle";

export type NavBarEntry = {
  link: string;
  title: string;
};

type Props = {
  entries: NavBarEntry[];
  currentPath: string;
};

const _ = clickOutside;

const NavBar: Component<Props> = (props) => {
  const [extend, setExtend] = createSignal(false);

  const closeMenu = () => {
    setExtend(false);
  };

  let menuRef: HTMLDivElement | undefined = undefined;

  return (
    <>
      <nav class="flex items-center h-28 gap-6 px-4 md:px-14 dark:bg-neutral-900 dark:text-white">
        <button
          type="button"
          class="flex-1 md:hidden"
          onClick={() => setExtend(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width={2}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <a
          href="/"
          class="text-2xl flex-[2] md:flex-1 text-center md:text-left font-bold"
        >
          <span
            class="border-b-2 border-transparent hover:border-indigo-600"
            classList={{
              "border-indigo-600": props.currentPath === "/",
            }}
          >
            An Hoang
          </span>
        </a>

        <div class="hidden md:flex flex-[3] text-lg justify-center gap-4">
          {props.entries.map((entry) => (
            <a
              href={entry.link}
              class="p-2 border-b-2 border-transparent hover:border-indigo-600 hover:text-neutral-900 dark:hover:text-neutral-100"
              classList={{
                "border-indigo-600": props.currentPath.startsWith(entry.link),
                "text-neutral-900": props.currentPath.startsWith(entry.link),
                "dark:text-neutral-100": props.currentPath.startsWith(
                  entry.link
                ),
                "dark:text-neutral-400": !props.currentPath.startsWith(
                  entry.link
                ),
                "text-neutral-400": !props.currentPath.startsWith(entry.link),
              }}
            >
              {entry.title}
            </a>
          ))}
        </div>

        <div class="flex justify-end flex-1">
          <ThemeToggle />
        </div>
      </nav>

      <>
        <div
          class="fixed top-0 left-0 w-full h-full z-50"
          classList={{
            hidden: !extend(),
          }}
        />
        <div
          ref={menuRef}
          class="fixed top-0 left-0 transition-transform ease-in-out duration-300 w-2/3 h-full z-50 bg-white shadow-md dark:bg-neutral-900 dark:text-white"
          classList={{
            "translate-x-0": extend(),
            "-translate-x-[67vw]": !extend(),
          }}
          use:clickOutside={() => closeMenu()}
        >
          <button
            type="button"
            class="absolute top-0 right-0 flex gap-2 p-4 m-2"
            onClick={() => setExtend(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>Close</span>
          </button>

          <ul class="flex flex-col justify-center w-full h-full gap-4 px-4 text-2xl">
            <li>
              <a href="/">Home</a>
            </li>
            {props.entries.map((entry) => (
              <li>
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
