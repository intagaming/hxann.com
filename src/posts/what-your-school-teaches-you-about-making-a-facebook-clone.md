---
title: What your school teaches you about making a Facebook clone
slug: what-your-school-teaches-you-about-making-a-facebook-clone
author: An7
publication_date: 2021-07-12
excerpt: 'Alternative title: How you can make "AJAX" calls without APIs.'
cover_url: /images/uploads/fpt-meme.jpg
---
Here's a hot take from me.

At the higher level, I will put on 2 sides: *"Static"* and *"Dynamic"*, as in
**Render the whole page again** versus **fetch and re-render HTML elements on
the fly**, respectively. At the developer's level, we can think and categorize
instead into websites that **do not use APIs** as oppose of those which **do use
APIs** *on the client-side*.

The exception is a static website with don't have moving data i.e. *blogs*. They
can be just .html files, so APIs doesn't matter. More suitable example is **a
web application**, i.e. *Facebook*.

## The no APIs approach

*TL;DR: HTML is heavy. You can't make a mobile app.*

First of all, **you are making a Facebook with only HTMLs**. Think, *John*.

* **Data is in the form of HTML.** Hence, **you can't create a mobile app**.
  Please don't make apps with a webpage embedded in, *for god's sake*.
* In the case of Facebook, **you can't see new posts without downloading a whole
  new HTML**. Your server only outputs HTMLs.
* **I challenge you to get the comments for a post without refreshing Facebook,
  without APIs.**

That means, if you are making an application, you can forget what you learn
about web at school.

> My professor wanted me to use "AJAX" to make changes in a tabbed *Edit* page
> so that it **doesn't refresh the page without teaching APIs**. Can you guess
> why?

![AJAX without API](/images/uploads/jsp.jpg)

## The APIs approach

*TL;DR: Hot-swap data. Can make mobile app. Can be used as 3rd party service.*

**Data is in the form of JSON/XML (usually).** Now you can delete HTMLs and
render new ones from JSON with JavaScript. Better yet, use Front-end frameworks.
Even better, you'll **be able to send out immediately the static parts of the
page** and later on *fetch* and render other parts (because you request data
**on-demand** via APIs).

Your *Facebook* is more lively than ever, all thanks to *React*. Now imagine
*Java's JSP*. And *C#'s Razor Pages*.

Now that you have APIs, **you can create a mobile app**. Lewlew?