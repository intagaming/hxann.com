---
title: What is the architecture of the T3 application?
slug: t3-architecture
author: "An7"
publication_date: "2022-09-25 10:47:00"
excerpt: Is it even MVC? Serverless?
cover_url: https://res.cloudinary.com/an7/image/upload/v1664117454/blog/t3-architecture_l3iakv.png
---

# What is the architecture of the T3 application?

![cover](https://res.cloudinary.com/an7/image/upload/v1664117454/blog/t3-architecture_l3iakv.png)

## MVC and its derived patterns

[Model-View-Controller (MVC) is a user interface architecture
pattern.](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

![mvc-diagram](https://res.cloudinary.com/an7/image/upload/v1664117552/blog/mvc-diagram_ygwmqy.png)

It describes how data (i.e. Model) is applied into the View, which is via the
Controller. The data might come from some database, and the Controller will go
and fetch them.

Model-View-ViewModel (MVVM) is based on MVC, concerning with the separation
between the GUI (View) and the logic (ViewModel & Model). The point is making
the View to not contain any logic at all, moving logic somewhere else.

Because MVC, MVVM and similar architectures are defining the architecture of a
whole application, when considering the architecture of the T3 stack, we must
consider the architecture of the whole T3 stack. Expect there is a problem: the
T3 stack contains multiple applications, each with different architecture.

*Side note about what a T3 stack is: [https://init.tips/](https://init.tips/)*

## The T3 application breakdown

### React

The React application has no default architecture, i.e. the way which the
application must be architected. A React app can be architected based on how the
data moves within the app. The T3 stack doesn't impose any architecture on the
React app.

### Next.js (backend)

The Next.js application, which uses React as the frontend, can do several *data
fetching patterns* depending on how Next.js is used.

- Client-side Rendering (CSR) is the pattern where data is fetched on the
  client-side, i.e. the user's browser.
- Server-side Rendering (SSR): data is fetched on the server, then sent to
  user's browser.
- Static Site Generation (SSG) and its variant, Incremental Static Regeneration
  (ISR): data is fetch once, then no more. From the second requests on, the page
  has the same data.

The aboves are just patterns to *fetch data for the Next.js frontend*. There are
also the Next.js backend: a bunch of functions waiting to be called. Not much of
an architecture on the Next.js backend itself: how the Next.js backend is
organized is not regulated and varies between apps. However the Next.js frontend
can use one of the above patterns to fetch data from the Next.js backend. This
is just the **Client-Server architecture**. In the T3 stack, tRPC is powered by
the Next.js backend, so nothing special about tRPC.

If we decide to throw in a React Native frontend for mobile in the T3 stack, we
are just replacing the React in Next.js with React Native. React Native can call
the Next.js backend just like the React app, a.k.a. Client-side rendering. Here,
the link between RN and the Next.js backend is just a Client-Server
architecture.

## MVC in T3 stack?

Let's walk back and try to fit MVC and its derived patterns somewhere in the T3
stack.

If we look into React, it is a thing to make UIs. It can be a full application
by itself, but it's not how typical React applications work. The React
application (typically) needs a backend. So React is the View.

One small note about MVVM: Because the distance between the React and the server
can be huge compare to a WPF application, as well as the fact that the Model
part in the T3 stack is stateless (meaning there is no state on the backend that
can be subscribed to; the data is fetched on demand), MVVM is usually not common
on the web.

Model is the data. Data is handled by the Next.js backend. How does the data
from the Next.js backend move to the React app? In MVC, it must be facilitated
by the Controller. There are a few options here:

- If Next.js' SSR or SSG is used, then Next.js is the thing that provides data
  to the React app. Hence Next.js is the Controller.
- If no SSR or SSG is used, the Controller is the React app. The React app has
  to actually go and fetch the data it needs by itself.
- Even if SSR or SSG is used, those are just used to *fetch* data **initially**.
  If we need to fetch/update data while the app is running, React must go and do
  that itself by calling the Next.js backend. React is now the Controller.

So, it is not clear what the M, V and C are. Though we can still make the case
that the T3 application is an MVC application. I would argue that MVC is so
generic it can be applied to many applications that don't even have MVC written
in its portfolio. MVC is just a way to think about UI and logic segregations.

## Serverless?

What about Serverless architecture?

Serverless refers to the fact that the server that hosts the Next.js backend
functions are handled by a third-party service responsible for scaling the
infrastructure. Next.js backend functions are now called Lambdas, which are code
that run on a server somewhere on-demand. The first time the Lambda gets called,
it needs to be deployed on a server somewhere, which takes some relatively short
time. This is called a Cold Start. Following requests are just as fast as a
normal API request. If the Lambda doesn't get called for awhile, the server
brings the code down.

Because of the fact that there is no one fixed server in the Serverless
architecture, the Lambdas must be "stateless": there must be no state retained
from the previous requests. Though, state can be stored outside of Lambdas, e.g.
in an external database.

If the Next.js backend is deployed on a Serverless platform like Vercel or
Netlify, it exhibits a Serverless architecture. If the Next.js backend is
deployed on a normal fixed server, it is otherwise not Serverless, which is
advised against anyway.

## The T3 stack architecture

That said, what is the architecture of the T3 stack?

As you can see, there are options to choose from, and we can even choose
multiple options at once, so as everything else in life, "it depends".

Here is a diagram to sum it up:

![t3-architecture](https://res.cloudinary.com/an7/image/upload/v1664117454/blog/t3-architecture_l3iakv.png)
