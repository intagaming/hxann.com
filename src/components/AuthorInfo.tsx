import { Component } from "solid-js";
import { Author } from "src/authors";

type Props = {
  author: Author;
};

const AuthorInfo: Component<Props> = (props) => (
  <>
    <p>
      Written by <b class="font-bold">{props.author.fullName}</b>
    </p>
    <blockquote class="italic">{props.author.bio}</blockquote>
  </>
);

export default AuthorInfo;
