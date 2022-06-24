export type Author = {
  username: string;
  fullName: string;
  email: string;
  bio: string;
};

const authors: { [username: string]: Author } = {
  An7: {
    username: "An7",
    fullName: "An Hoang",
    email: "xuanan2001@pm.me",
    bio: "I rant universities and document thought process.",
  },
};

export const getAuthor = (username: string): Author | undefined =>
  authors[username];
