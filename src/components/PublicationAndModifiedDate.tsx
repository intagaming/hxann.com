import type { PostOrPageFrontmatter } from "src/types";

const PublicationAndModifiedDate = ({
  publication_date,
  modified_date,
}: Pick<PostOrPageFrontmatter, "publication_date" | "modified_date">) => (
  <div className="text-sm italic md:text-base">
    <p>
      Published{" "}
      {new Date(publication_date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </p>
    {modified_date && (
      <p>
        Updated{" "}
        {new Date(modified_date).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
    )}
  </div>
);

export default PublicationAndModifiedDate;
