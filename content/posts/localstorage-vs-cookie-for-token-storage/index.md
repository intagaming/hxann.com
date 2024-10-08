+++
title = "localStorage vs. Cookie for token storage"
date = "2021-09-24"
author = "An7"
authorTwitter = ""
tags = []
keywords = []
description = "localStorage is not as unsecured as you'd think."
showFullContent = false
readingTime = true
hideComments = false
+++

localStorage is not as unsecured as you'd think.

## Update August 1st, 2022

I recently had a new hot take on this subject on YouTube, check it out (please click the image):

{{< youtube OTcjpteMB6c >}}

## Context

Some time ago, I had to store the JWT token returned from Strapi in a React web
app. Strapi is a **stateless** server. The React app is **client-side**. Here's
what the internet has to say when I need to learn "jwt storage":

![jwt-storage-google](jwt-storage-google_pq7lyt.png)

Seems like most opposed to the idea of using `localStorage`.

What about "react jwt storage"?

![react-jwt-storage-google](react-jwt-storage-google_m8on8v.png)

First one that recommends `localStorage`! Hmm, there are also people that
recommend storing JWT in Cookie. Also, there's a recommendation of using
in-memory storage. [It's not persistent. I don't want to login every page
refreshes.][8] So let's not talk about it.

Let's dig into [the first StackOverflow post][9] above:

![jwt-first-so-answer](jwt-first-so-answer_kbfpiz.png)

Okay. They said that I should use cookies and refresh token instead. And the
Refresh Token should be stored in a cookie with `httpOnly` flag. Hold that idea
for a second.

How about [the second post][10]:

![jwt-second-so-answer](jwt-second-so-answer_rhln47.png)

Interesting. Two posts that recommend the same Cookie approach. Look at the 3rd
point. They said that I should store my JWT in a Cookie, because in point number
2, `localStorage` is exposed to XSS. Is Cookie **immune to XSS**? What about
**CSRF**? My server is stateless, and as you read on this blog post further,
you'll need to implement the _Double Submit Cookie_ CSRF prevention technique
(I'm using **stateless** server, remember), which is **NOT** immune to XSS,
because the CSRF token also needs to be present in the request body. Not to
mention that now you have to prevent both XSS _and_ CSRF. Hence the 3rd point is
not valid, in my opinion, just because of the XSS argument alone.

You can see the problem here. Back then, I didn't knowledgeable enough to know
that storing JWT in Cookie have problems. It's easy to blindly listen to these
SO answers when you're starting out as an intern (Yes, I had to implement this
in my internship). Obviously, this needs to be addressed. If someone is in the
same boot as me trying to get into the new Serverless world, they need to know
the reasoning behind these.

## Original post starts here:

---

You know the drill. Authentication time, you chuck the access token into your
`localStorage`. Suddenly you have a flashback of bad luck working with
`localStorage`, namely they could _easily_ be taken by a script via Cross-Site
Scripting. So you turned to `httpOnly` cookie (along with some other attributes,
stay tuned). You even went as far as using a refresh token, and implement a CSRF
token thing. Solved, right?

## You missed a point about cookies

Whenever you touch a cookie, you are blessed with a **new** problem: Cross-Site
Request Forgery a.k.a. CSRF. Take this from OWASP Cheat Sheet of CSRF
Prevention, I'll provide an example later.

> [Remember that any Cross-Site Scripting (XSS) can be used to defeat all CSRF
> mitigation techniques!][1]

Let's switch gears here. I'm gonna implement a CSRF mitigation. According to the
Cheat Sheet, I have to implement something called a _Double Submit Cookie_ (I'm
cutting corners here, we are in a stateless development age, there's no server
state, just in case you wonder why not the _Synchronizer Token Pattern_).

> **DISCLAIMER**: This is simplified. I'm sure there's more sophisticated ways
> to perform the CSRF attack.

I'm at the Cheat Sheet. Here's the steps:

1. On the server side, I would have to generate a pseudorandom value and put
   them in a cookie.
2. Every time I need to send out a request, I would put that value (also called
   a CSRF token) into a header field, something along the lines of
   `X-XSRF-Token`. The Cookie from step 1 is sent along with the request.
3. On the server side again, I would have to implement a comparison between
   those two.

Here's a visualization of what's going on:

![double-submit](double-submit_siyipg.png)

The end result is, if the attacker wants to do the CSRF now, they would need to:

1. Set a freshly dummy value, replacing the CSRF token in the request
   body/header. Easy enough. For example:
   ```
   POST /user/transfer
   X-CSRF-Token: MY_DUMMY_VALUE
   ```
2. Modify the `csrfToken` cookie to `MY_DUMMY_VALUE`. _Not trivial_, but
   [doable][2].
   ```
   POST /user/transfer
   Cookie: csrfToken=MY_DUMMY_VALUE
   X-CSRF-Token: MY_DUMMY_VALUE
   ```
3. This request is placed within a malicious site, e.g.
   `https://malicious.example`. Using JavaScript, the POST request is submitted.
   Depending on the `SameSite` flag and the browser's implementation, the
   `accessToken` Cookie would be sent.

Okay, it's pretty good if combined with some `Cross-Origin-Resource-Policy` and
`SameSite` or some other things. CSRF solved.

[Now you go read this document from OWASP and find out that your CSRF prevention
attempt is flawed.][2] Then, _hopefully not_, [read this from StackOverflow if
you store the csrfToken not in the cookie, but in localStorage][3]. If you go as
far as using `SameSite=Strict` setting, remember that [Setting a cookie as
Strict can affect browsing experience negatively][4], meaning a setting of
`SameSite=Lax` still leaves top-level `GET` alone.

If that's not enough, **not all APIs are equipped with CSRF prevention
framework.** Google "Strapi CSRF" and you'll basically find nothing besides of
implementing CSRF prevention yourself. Why? Because _Strapi is not setting the
token in a cookie_.

**However**, assuming that CSRF is absolutely prevented, there's still the
elephant in the room, the _absolute_ CSRF prevention buster. Read on.

### Here's my take on it.

See, you still **have to** put the CSRF token in the body, by design. That means
your CSRF token _cannot_ be `httpOnly`, because it prevents JavaScript from
reading the cookie. Have you realized yet? You've just achieved Cross-Site
Scripting. If your JavaScript can read your cookie, so do mine.

Here it is again:

> [Remember that any Cross-Site Scripting (XSS) can be used to defeat all CSRF
> mitigation techniques!][1]

[And here's how.][11]

If you say

> But it makes the access token harder for the attacker to get than
> localStorage! If not they'd just snatch it!

So what? Take this, _your website has a Cross-Site Scripting problem, not CSRF_.
Do you sleep well on that? You have just gone full circle. `localStorage` has
XSS problem, but cookie has CSRF **and** XSS. _That's why I'm not eating the
cookies_.

Side note: About the Refresh Token, it solves nothing. It is still a token.
Store it in the Cookie and you have CSRF **and** XSS, just like a normal token.
You can't use `httpOnly` if you want to prevent CSRF.

## Fixing the myth of localStorage by mending XSS

Let's debunk this. You got the XSS problem. _Deal with it_. There's a reason why
`dangerouslySetInnerHTML` exists.

So where are you getting these foreign scripts to run on your site? Let's start
with some of the greatest archnemesis of `localStorage` doubters.

### XSS from Node libraries

I'm talking about your `node_modules` when you're deploying on Vercel or
something. Think about it. There are literally from hundreds to millions of
projects using that very same library. If that happens, you **would** know. You
would definitely know.
[Here's something from GitLab to let them check for your development comfort][5].
Or just run `yarn audit`.

### XSS from CDN libraries

Alright, here's the interesting part. CDNs can be compromised. Why do you use
them though? Just use NPM. And how do you use TypeScript with CDN anyway? Why
are your libraries not available in NPM? If it's that niche, why not just write
them yourselves if you're literally 1 out of the 3 people that would use those?
_Why do I have so many questions for you?_

If you're using libraries from CDNs I think you're having a bigger problem.

**Now, to be clear.** Maybe you are forced to use libraries from CDNs, because
something like "They don't update it anymore!" or "I don't want to use NPM for
my little HTML/CSS/JS project!". I use NPM, it's **the repo** to get JavaScript
libraries from, and I don't have your headache.

### XSS from JS injection

Also called a _Stored XSS_. Or any JS injection from _form inputs_. It's pretty
hard to screw up something that would cause XSS without you knowing first-hand.
[Take a look at this StackOverflow on why React has some XSS-proof.][6] Make
sure to make use of some ESLint rules, those are pretty handy.

In the nutshell, it's pretty hard these days to get XSS if you're doing things
right.

## The winner

`localStorage`. I just stripped out a workday of effort in your life by doing
so. There's nothing about that anymore, right? The stereotypical thing about
`localStorage` is, they have XSS problem, and they do, just as your CSRF
mitigation. Don't overengineer your system.

Here's something you'll dig:
[Why avoiding LocalStorage for tokens is the wrong solution][7]

[1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
[2]: https://owasp.org/www-pdf-archive/David_Johansson-Double_Defeat_of_Double-Submit_Cookie.pdf
[3]: https://stackoverflow.com/a/37169633
[4]: https://www.netsparker.com/blog/web-security/same-site-cookie-attribute-prevent-cross-site-request-forgery
[5]: https://docs.gitlab.com/ee/user/application_security/dependency_scanning
[6]: https://stackoverflow.com/q/33644499
[7]: https://pragmaticwebsecurity.com/articles/oauthoidc/localstorage-xss.html
[8]: https://auth0.com/docs/secure/security-guidance/data-security/token-storage#browser-in-memory-scenarios
[9]: https://stackoverflow.com/questions/39176237/how-do-i-store-jwt-and-send-them-with-every-request-using-react
[10]: https://stackoverflow.com/questions/69294536/where-to-store-jwt-token-in-react-client-side-in-secure-way
[11]: https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-perform-csrf
