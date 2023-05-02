import type { MarkdownInstance } from "astro";
import clsx from "clsx";
import type { PostFrontmatter } from "src/types";
import { parseDate } from "src/utils";

type Props = {
  post: MarkdownInstance<PostFrontmatter>;
  direction?: "row" | "column";
};

const PostCard = ({ post, direction }: Props) => {
  const fm = post.frontmatter;

  return (
    <a href={`/${fm.slug}`}>
      <article
        className={clsx(
          "flex gap-4 md:gap-6",
          !direction && "flex-col md:flex-row",
          direction === "row" && "flex-row",
          direction === "column" && "flex-col"
        )}
      >
        <div className="md:flex-1">
          <div className="aspect-[1200/630]">
            <img
              alt="cover image"
              src={fm.cover_url}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-1">
          <h2 className="text-2xl font-bold dark:text-white">{fm.title}</h2>
          <p className="text-neutral-700 dark:text-neutral-400">{fm.excerpt}</p>
          <p className="italic text-neutral-700 dark:text-neutral-500">
            By <b>{fm.author}</b> on{" "}
            {parseDate(fm.publication_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </article>
    </a>
  );
};

export default PostCard;
