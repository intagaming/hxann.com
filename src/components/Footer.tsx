const Footer = () => {
  return (
    <footer className="min-h-32 flex flex-col items-center justify-center border-t py-10 dark:bg-neutral-900 dark:text-white">
      <p>Made by An Hoang with ❤️</p>
      <p>
        This <i>personal</i> blog is open source. Check it out.
      </p>

      <div className="my-6 flex">
        <a href="https://github.com/intagaming/hxann.com">
          <i className="fa-brands fa-github fa-xl"></i>
        </a>
      </div>

      <p>©️ 2021 - {new Date().getFullYear()} An Hoang. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
