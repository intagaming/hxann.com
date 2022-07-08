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
      <article class="flex flex-col gap-4 md:flex-row md:gap-10">
        <div class="md:flex-1">
          <div class="aspect-video">
            <img alt="cover image" src={fm.cover_url} class="object-cover h-full w-full" />
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-1">
          <h2 class="text-2xl font-bold md:text-3xl dark:text-white">
            {fm.title}
          </h2>
          <p class="text-neutral-700 dark:text-neutral-400">{fm.excerpt}</p>
          <p class="text-neutral-700 dark:text-neutral-400">
            By {fm.author} on{" "}
            {parseDate(fm.publication_date).toLocaleDateString()}
          </p>
        </div>
      </article>
    </a>
  );
};

export default PostCard;
