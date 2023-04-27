import type { Author } from "src/authors";

const AuthorInfo = ({ author }: { author: Author }) => (
  <>
    <p>
      Written by <b className="font-bold">{author.fullName}</b>
    </p>
    <blockquote className="italic">{author.bio}</blockquote>
  </>
);

export default AuthorInfo;
