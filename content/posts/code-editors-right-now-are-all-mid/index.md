+++
title = "Code editors right now are all mid"
date = "2023-03-12T16:15:00+0700"
author = "An7"
authorTwitter = ""
tags = []
keywords = []
description = "Just spent my weekend improving my editor situation. Let's talk about what happened."
showFullContent = false
readingTime = true
hideComments = false
+++

Just spent my weekend improving my editor situation. Let's talk about what
happened.

Last updated time: May 31th, 2023.

Let's set the stage: I started with VSCode, learned Vim motions and used it in
VSCode. Everything is fine. Started seeking workflow optimizations. Landing on
Neovim. I'm optimizing for my work which is comprised of Astro, TailwindCSS and
TypeScript. Alright, let's go.

## Neovim

Neovim is great. Production-ready editor.

~~[`nvim-cmp` is having a hard time with
`tailwindcss-language-server`.](https://github.com/hrsh7th/nvim-cmp/issues/1009)
Typing classes will have Neovim sucks big time. A dealbreaker compares to
VSCode.~~ This had been fixed by the famous @folke.

Using Neovim everyday for work. It serves me well. I can hack around and write
code, but I feel I can be faster with more tricks. For now I'm sticking with
Neovim and see if I can _git gud_.

**The below is the original post.**

Maybe my Macbook Pro 15" 2015 (8 years old machine) can't handle modern LSPs.
Let's try remote development.

## Remote VM as development environment

I got a $10 Linode Linux VM. Same Neovim setup. Nothing changed, it sucks big
time.

I don't want to go back to VSCode yet. Let's try Helix.

## Helix

Helix is great. Got through `helix --tutor`, pretty mind-blown from a Vim user's
perspective.

[Helix doesn't yet support multiple LSPs at the same
time.](https://github.com/helix-editor/helix/pull/2507) Can't do Astro and
TailwindCSS at the same time. Dealbreaker.

Back to VSCode it is. Maybe remote development is the future? It might help me
get through the days that I forget my laptop to work. Let's try Gitpod.

## Gitpod

So, Gitpod.

- No first-class Vim IDE. That's fine, Neovim is mid anyway.
- I need a separate dotfiles repo for Gitpod because my dotfiles are a bare repo
  and `config checkout` doesn't work on Gitpod. It might, I don't care enough.
- `vscode-neovim` extension. I need `nvim` installed. Setting up `nvim` on
  Gitpod takes some research. Turns out `vscode-neovim` takes some unique
  brain-power to use. I don't care enough.
- Let's use normal Vim extension...

At this point I started thinking about the fact that I might not get anything
more than my local VSCode. Let's "try" VSCode.

## VSCode

VSCode is my home turf for a long time. It doesn't error out and is pretty good.

Coming from a full-keyboard Neovim workflow, VSCode sucks hard. Just imagine
navigating the sidebar with keyboards. It is not designed for keyboard use. You
can convince me but I'm pretty sure VSCode can't ever match Neovim no matter how
hard it tries.

Can't make VSCode acts like my Neovim. Dealbreaker. Let's go back to Neovim. I
decided to try LunarVim.

## LunarVim

Tried it on my project.

I think doing a minimal DIY config yourself is 200% better. You make the config
from scratch, you know why the editor looks and acts that way. If you need to
substitute something for another thing, you can do that.

LunarVim takes some unique brain-power to config. I don't care enough. Let's go
back to Neovim.

## Neovim, again.

Yeah. It's Neovim for me for now.

I tired `coq_nvim`. It sucks. It looks bland. I can't feel the fastness of it
compares to `nvim-cmp`. `tailwind-language-server` still chuckles.

If it's not for the Tailwind thing, Neovim is great.

> Code editors right now are all mid.

So, the title. It's probably right. I provided my evidence, and if the editor is
not making me conveniently do my job, it's mid, right?

The great thing is that I don't know how long until my Tailwind situation can be
resolved. Isn't it great that VSCode is flawlessly spitting Tailwind
autocompletion while Neovim autocompletion scene is doing a civil war?

As a code editor user, I'm disappointed. As a developer, I hope to someday have
the time and knowledge and courage to contribute to my tools. What am I trying
to say?

> Code editors right now are all mid.
