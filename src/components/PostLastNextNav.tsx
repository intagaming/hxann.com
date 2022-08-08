import { PostFrontmatter } from "src/types";

const NavCard = ({
  post,
  isNext,
}: {
  post?: PostFrontmatter;
  isNext: boolean;
}) => (
  <div className="flex-1 max-w-xs">
    {post && (
      <a
        href={`/blog/posts/${post.slug}`}
        className="flex flex-col w-full h-full gap-4 p-4 no-underline border rounded-md"
      >
        <div
          className={`flex items-center gap-4 ${isNext ? "justify-end" : ""}`}
        >
          {!isNext ? (
            <>
              <i className="fa-solid fa-arrow-left"></i>
              <span>Last Article</span>
            </>
          ) : (
            <>
              <span>Next Article</span>
              <i className="fa-solid fa-arrow-right"></i>
            </>
          )}
        </div>
        <div className="font-bold font-sans">{post.title}</div>
      </a>
    )}
  </div>
);

const PostLastNextNav = ({
  last,
  next,
}: {
  last?: PostFrontmatter;
  next?: PostFrontmatter;
}) => (
  <div className="flex items-stretch justify-between gap-4 py-8">
    <NavCard isNext={false} post={last} />
    <NavCard isNext post={next} />
  </div>
);

export default PostLastNextNav;
