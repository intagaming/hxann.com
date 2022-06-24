import { PostFrontmatter } from "src/types";
import PostCard from "./PostCard";
import { MarkdownInstance } from "astro";

type Props = {
  posts: MarkdownInstance<PostFrontmatter>[];
};

const PostList = ({ posts }: Props) => (
  <main className="flex flex-col items-center gap-12 px-6 my-12">
    {posts.slice(0, 10).map((post, index) => (
      <div
        key={(post.frontmatter as unknown as PostFrontmatter).slug}
        className="w-full md:max-w-4xl"
      >
        <PostCard post={post} />
      </div>
    ))}
  </main>
);

export default PostList;
