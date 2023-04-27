import type { PostFrontmatter } from "src/types";

const NavCard = ({
  post,
  isNext,
}: {
  post?: PostFrontmatter;
  isNext: boolean;
}) => (
  <div className="max-w-xs flex-1">
    {post && (
      <a
        href={`/${post.slug}`}
        className="flex h-full w-full flex-col gap-4 border p-4 no-underline hover:bg-neutral-800"
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
        <div className="font-sans font-bold">{post.title}</div>
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
