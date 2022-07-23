const Footer = () => {
  return (
    <footer class="flex flex-col items-center justify-center py-10 border-t min-h-32 dark:bg-neutral-900 dark:text-white">
      <p>Made by An Hoang with ❤️</p>
      <p>
        This <i>personal</i> blog is open source. Check it out.
      </p>

      <div class="flex my-6">
        <a href="https://github.com/intagaming/hxann.com">
          <i class="fa-brands fa-github fa-xl"></i>
        </a>
      </div>

      <p>©️ 2021 - {new Date().getFullYear()} An Hoang. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
