import { useEffect, useRef } from "react";

const giscusAttributes = {
  src: "https://giscus.app/client.js",
  "data-repo": "intagaming/hxann.com",
  "data-repo-id": "R_kgDOHjZmwQ",
  "data-category": "Announcements",
  "data-category-id": "DIC_kwDOHjZmwc4CWM95",
  "data-mapping": "pathname",
  "data-strict": "0",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-lang": "en",
  "data-loading": "lazy",
  crossorigin: "anonymous",
  async: "",
};

const Giscus = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    const theme = localStorage.getItem("theme");
    Object.entries(giscusAttributes).forEach(([key, value]) =>
      script.setAttribute(key, value)
    );
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    container.current.appendChild(script);
  }, []);

  return <div ref={container}></div>;
};

export default Giscus;
