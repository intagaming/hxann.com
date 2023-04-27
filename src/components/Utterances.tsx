import { useEffect, useRef } from "react";

const Utterances = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    const theme = localStorage.getItem("theme");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "intagaming/hxann.com");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      theme === "dark" ? "github-dark" : "github-light"
    );
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");
    container.current.appendChild(script);
  }, []);

  return <div ref={container}></div>;
};

export default Utterances;
