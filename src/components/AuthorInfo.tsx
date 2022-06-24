import { Component } from "solid-js";
import { Author } from "src/authors";

type Props = {
  author: Author;
};

const AuthorInfo: Component<Props> = (props) => (
  <>
    <p>
      Written by <b className="font-bold">{props.author.fullName}</b>
    </p>
    <blockquote className="italic">{props.author.bio}</blockquote>
  </>
);

export default AuthorInfo;
