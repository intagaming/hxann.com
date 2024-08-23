+++
title = "Thoughts about Elixir"
date = "2024-04-06"
author = "An7"
authorTwitter = ""
tags = []
keywords = []
showFullContent = false
readingTime = true
hideComments = false
+++

I understand that _Every code is legacy_, given most projects, even Java
codebase, use some kind of package manager. But hear me out about Elixir.

When I used Elixir for my side project, it was great and I indeed was flying.
But I was working on another Elixir project at work. Here I encountered:

- Ash Framework. You think Spring Boot Framework or .NET Framework is a giant
  piece of software? You haven't seen Ash Framework. You will have a chance to
  basically turn your Elixir code into an Ash application. This ain't Elixir
  anymore, not the kind you can do work after you read the Elixir language book.
  - You don't use Ecto, you use Ash Resources. You don't use `Ecto.Changeset`,
    you will use `Ash.Changeset`. Oh you want to query? Better use `Ash.Query`.
    And how do you commit those changesets, `MyApp.Repo.create()` or
    `MyApp.create()` or `MyApp.Animal.create()`? This is **webdev** level of
    abstraction.
  - You want documentation? Here, check this out. Go to [Ash Framework
    website][1] and try to search. You need to wait 30 seconds. So you use
    HexDocs now.
  - Let's play a game. Let's try to learn how to create [Ash Changeset][2]. This
    docs page says nothing. There isn't even a link to learn about it. Looking
    at the list of functions in that module, I just want to give up. Learn Ecto
    Changeset instead? I've already given up on that. I want to do work, not
    crafting changesets and commit them.
- You don't write SQL or use an ORM. You use Ecto and its changeset. The term
  "Changeset" seems like a good idea for a mutation until you realize that to do
  what is equivalent to the `WHERE` clause of SQL, you don't know how.
  
  > Ecto has made the decision to clearly separate data from action, whereas in
  > an OO language like Ruby they’re tied together.
  >
  > Consequently, you may need an extra line or two to do certain things via
  > Ecto that you’d do from ActiveRecord. I don’t really see this as much of a
  > problem, and it helps make it wildly clearer when and how database access
  > actually happens.
  >
  > [link](https://elixirforum.com/t/updating-a-field-using-ecto-one-liner/11714/3)

  "A line or two" means you do a fucking query to update a line. Nice!

- `credo`. Oh Clean Code. You don't write a long project, you split them up and
  have to name every single piece. You don't write `// TODO:` or it won't let
  your code pass CI. Idiomatic Elixir.

And what do I like about Elixir?  

- `|> dbg()`

[1]: https://ash-hq.org/docs/guides/ash/latest/tutorials/get-started
[2]: https://hexdocs.pm/ash/Ash.Changeset.html

