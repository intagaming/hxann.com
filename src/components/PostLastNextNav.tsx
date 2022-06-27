import { Component } from "solid-js";
import { PostFrontmatter } from "src/types";

type NavCardProps = {
  post?: PostFrontmatter;
  isNext: boolean;
};

const NavCard: Component<NavCardProps> = (props) => (
  <div className="flex-1 max-w-xs">
    {props.post && (
      <a
        href={`/blog/posts/${props.post.slug}`}
        class="flex flex-col w-full h-full gap-4 p-4 no-underline border rounded-md"
      >
        <div
          class="flex items-center gap-4"
          classList={{
            "justify-end": props.isNext,
          }}
        >
          {!props.isNext ? (
            <>
              <i class="fa-solid fa-arrow-left"></i>
              <span>Last Article</span>
            </>
          ) : (
            <>
              <span>Next Article</span>
              <i class="fa-solid fa-arrow-right"></i>
            </>
          )}
        </div>
        <div className="font-bold font-sans">{props.post.title}</div>
      </a>
    )}
  </div>
);

type Props = {
  last?: PostFrontmatter;
  next?: PostFrontmatter;
};

const PostLastNextNav: Component<Props> = (props) => (
  <div className="flex items-stretch justify-between gap-4 py-8">
    <NavCard isNext={false} post={props.last} />
    <NavCard isNext post={props.next} />
  </div>
);

export default PostLastNextNav;
