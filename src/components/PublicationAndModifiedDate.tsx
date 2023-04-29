import type { PostOrPageFrontmatter } from "src/types";

const PublicationAndModifiedDate = ({
  publication_date,
  modified_date,
}: Pick<PostOrPageFrontmatter, "publication_date" | "modified_date">) => (
  <div className="mb-10 text-base">
    <span className="mr-6">
      Published{" "}
      {new Date(publication_date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </span>
    {modified_date && (
      <span>
        Updated{" "}
        {new Date(modified_date).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </span>
    )}
  </div>
);

export default PublicationAndModifiedDate;
