import { PostFrontmatter } from "src/types";
import PostCard from "./PostCard";
import { MarkdownInstance } from "astro";

const PostList = ({
  posts,
}: {
  posts: MarkdownInstance<PostFrontmatter>[];
}) => (
  <div className="flex flex-col items-center gap-12 px-6 my-12">
    {posts.slice(0, 10).map((post) => (
      <div key={post.frontmatter.slug} className="w-full md:max-w-4xl">
        <PostCard post={post} />
      </div>
    ))}
  </div>
);

export default PostList;
