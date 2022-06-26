import { Component } from "solid-js";
import { PostOrPageFrontmatter } from "src/types";

type Props = Pick<PostOrPageFrontmatter, "publication_date" | "modified_date">;

const PublicationAndModifiedDate: Component<Props> = (props) => (
  <div class="text-base mb-10 font-sans">
    <span class="mr-6">
      Published {new Date(props.publication_date).toLocaleString()}
    </span>
    {props.modified_date && (
      <span>Updated {new Date(props.modified_date).toLocaleString()}</span>
    )}
  </div>
);

export default PublicationAndModifiedDate;
