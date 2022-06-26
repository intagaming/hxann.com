# hxann.com

Portfolio and blog, powered by [Astro][1].

Source code for [https://hxann.com][4].

## Design decisions

## Components

I use [SolidJS][2]. Personal preference I guess.

The thing you put inside the JSX for the SolidJS's `ParentComponent` currently
doesn't qualify as `children`, so you have to set the `children` prop. That's
one thing to keep in mind.

## Styling

[Tailwind CSS][3]. Fast to prototype, haven't had any problems.

## Content

I use Markdown. Astro will render `*.md` into pages.

I upload images to Cloudinary and use them in my Markdown. The Cloudinary CDN
will do well to provide good responsiveness.

[1]: https://astro.build
[2]: https://www.solidjs.com
[3]: https://tailwindcss.com
[4]: https://hxann.com
