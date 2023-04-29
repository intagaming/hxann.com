const Footer = () => {
  return (
    <footer className="min-h-32 flex flex-col items-center justify-center border-t px-4 py-10 text-center dark:bg-neutral-900 dark:text-white">
      <p className="mb-6">Made by An Hoang with ❤️</p>

      <p className="mb-2">
        This <i>personal</i> blog is open source. Check it out.
      </p>

      <div className="mb-6 flex">
        <a href="https://github.com/intagaming/hxann.com">
          <i className="fa-brands fa-github fa-xl"></i>
        </a>
      </div>

      <p>©️ 2021 - {new Date().getFullYear()} An Hoang. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
