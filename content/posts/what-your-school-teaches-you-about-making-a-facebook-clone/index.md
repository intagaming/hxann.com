+++
title = "What your school teaches you about making a Facebook clone"
date = "2021-07-12"
author = "An7"
authorTwitter = ""
tags = []
keywords = []
description = 'Alternative title: How you can make "AJAX" calls without APIs.'
showFullContent = false
readingTime = true
hideComments = false
+++

Here's a hot take from me.

At the higher level, I will put on 2 sides: _"Static"_ and _"Dynamic"_, as in
**Render the whole page again** versus **fetch and re-render HTML elements on
the fly**, respectively. At the developer's level, we can think and categorize
instead into websites that **do not use APIs** as oppose of those which **do use
APIs** _on the client-side_.

The exception is a static website with don't have moving data i.e. _blogs_. They
can be just .html files, so APIs doesn't matter. More suitable example is **a
web application**, i.e. _Facebook_.

## The no APIs approach

_TL;DR: HTML is heavy. You can't make a mobile app._

First of all, **you are making a Facebook with only HTMLs**. Think, _John_.

- **Data is in the form of HTML.** Hence, **you can't create a mobile app**.
  Please don't make apps with a webpage embedded in, _for god's sake_.
- In the case of Facebook, **you can't see new posts without downloading a whole
  new HTML**. Your server only outputs HTMLs.
- **I challenge you to get the comments for a post without refreshing Facebook,
  without APIs.**

That means, if you are making an application, you can forget what you learn
about web at school.

> My professor wanted me to use "AJAX" to make changes in a tabbed _Edit_ page
> so that it **doesn't refresh the page without teaching APIs**. Can you guess
> why?

![AJAX without API](jsp.jpg)

## The APIs approach

_TL;DR: Hot-swap data. Can make mobile app. Can be used as 3rd party service._

**Data is in the form of JSON/XML (usually).** Now you can delete HTMLs and
render new ones from JSON with JavaScript. Better yet, use Front-end frameworks.
Even better, you'll **be able to send out immediately the static parts of the
page** and later on _fetch_ and render other parts (because you request data
**on-demand** via APIs).

Your _Facebook_ is more lively than ever, all thanks to _React_. Now imagine
_Java's JSP_. And _C#'s Razor Pages_.

Now that you have APIs, **you can create a mobile app**. Lewlew?
