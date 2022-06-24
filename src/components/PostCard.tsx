import { MarkdownInstance } from "astro";
import { PostFrontmatter } from "src/types";
import { parseDate } from "src/utils";

type Props = {
  post: MarkdownInstance<PostFrontmatter>;
};

const PostCard = ({ post }: Props) => {
  const fm = post.frontmatter;

  return (
    <a href={`/blog/posts/${fm.slug}`}>
      <article className="flex flex-col gap-4 md:flex-row md:gap-10">
        <div className="md:flex-1">
          <div className="relative aspect-w-16 aspect-h-9">
            <img src={fm.cover_url} />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-1">
          <h2 className="text-2xl font-bold md:text-3xl dark:text-white">
            {fm.title}
          </h2>
          <p className="text-neutral-700 dark:text-neutral-400">{fm.excerpt}</p>
          <p className="text-neutral-700 dark:text-neutral-400">
            By {fm.author} on{" "}
            {parseDate(fm.publication_date).toLocaleDateString()}
          </p>
        </div>
      </article>
    </a>
  );
};

export default PostCard;
