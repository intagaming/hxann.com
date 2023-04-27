import type { MarkdownInstance } from "astro";
import type { PostFrontmatter } from "src/types";

import PostCard from "./PostCard";

const PostList = ({
  posts,
}: {
  posts: MarkdownInstance<PostFrontmatter>[];
}) => (
  <div className="my-12 flex flex-col items-center gap-12 px-6">
    {posts.map((post) => (
      <div key={post.frontmatter.slug} className="w-full md:max-w-4xl">
        <PostCard post={post} />
      </div>
    ))}
  </div>
);

export default PostList;
