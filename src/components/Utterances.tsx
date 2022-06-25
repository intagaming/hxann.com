import { Component, onMount } from "solid-js";

const Utterances: Component = () => {
  let container: HTMLDivElement | undefined;

  onMount(() => {
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
    container.appendChild(script);
  });

  return <div ref={container}></div>;
};

export default Utterances;
