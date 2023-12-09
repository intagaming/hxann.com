---
title: '"Tell me about the basics of REST API."'
publication_date: 2023-12-09
excerpt: "Spoiler: It was about HTTP."
---

## The interview

The question was from a fullstack interview. The interviewer asked:

> Tell me about the basics of REST API.

Let's be real for a moment. Here was the outline of what happened next in the
interview:

1. I tried to explain in 3-4 sentences about how most of today's REST APIs are
   not actually REST APIs based on [the definition of Roy Fielding][1]. I state
   [HATEOAS][4] as the reason.
2. The interviewer said I was not answering the question about the basics of
   REST APIs.
3. I tried to gave him what I thought he wanted, roughly: REST API is
   REpresentational State Transfer, which is the guideline for an API to
   provide interactions with and queries for Resources.

Then he solved the question himself, stating the followings:

- REST APIs have Status Code, like 200s, 400s, 500s.
- They have request body, response body, the type of the request/response body
  i.e. JSON or image.
- They have actions like `GET`, `POST`, `UPDATE`, `DELETE`...
- Probably some more, I don't totally remember.

Regarding my "today's REST APIs are not actually REST APIs" statement, he
stated:

- REST is just a **guideline**. People are using REST APIs just fine. Whether
  they implement REST fully or not doesn't matter.
- (About HATEOAS) It isn't necessary to put endpoints into the response, people
  solve that differently, like using Swagger to discover the API's endpoints.

That's what happened. Now onto my thoughts after a few weeks.

## Was the interviewer right?

Just to state the obvious: I am fully aware that I am no way a senior, and up to
now I wasn't saying that I was right or he was wrong.

**I don't think "the basics of REST API" includes an overview of the HTTP
specification.**

There are two parts here: REST and API. Here is [REST][1]. API is, well, existed
before REST happens. It is the Application Programming Interface, which is fancy
for "a way to interact with something". None of which mentions anything about
response body or status code.

If the interviewer wanted to ask about how the HTTP server and the HTTP client
communicates with each other, then the question is about **APIs that use HTTP
as the protocol**, not REST or API or REST API. Quoting [the original Roy
Fielding dissertation][1]:

> The Representational State Transfer (REST) style **is an abstraction** of the
> architectural elements within a distributed hypermedia system. REST **ignores
> the details of component implementation and protocol syntax** in order to
> focus on the roles of components, the constraints upon their interaction with
> other components, and their interpretation of significant data elements.

Judging from the beginning of the quote, it could be regarded as the definition
of REST. So there is that.

## He asked the wrong question, and that's fine\*

I get it. He wanted to know how much I knew about "APIs" since the interview was
for the fullstack position. The question was just too ambiguous.

I already know what you think: **You have to say what the interviewer wants you
to say.** And at the heat of the moment I was aware of that, but maybe I cared
too much and made an essay about REST. That's on me.

With that said: **I still stand by my opinion about the term "REST API".**
Here's another quote from Roy Fielding himself about the misconception:

> I am getting frustrated by the number of people calling any HTTP-based
> interface a REST API. Today’s example is the SocialSite REST API. That is RPC.
> It screams RPC. There is so much coupling on display that it should be given
> an X rating.
>
> What needs to be done to make the REST architectural style clear on the notion
> that hypertext is a constraint? In other words, if the engine of application
> state (and hence the API) is not being driven by hypertext, then it cannot be
> RESTful and cannot be a REST API. Period. Is there some broken manual
> somewhere that needs to be fixed?
>
> –Roy Fielding, Creator of the term REST
>
> [REST APIs must be hypertext-driven][2]

The article I found the quote on was ["How Did REST Come To Mean The Opposite of
REST?" by Carson Gross][3].

## (Optional) The outcome of the interview

Here's what I think of the interview: The interviewer was not very nice and was
frustrated about my answer**s** (notice the plural in "answers"). He really gave
me a **lecture** on "REST API". Depending on my view on the topic, you may
choose to discount my opinion but I think my answers to the interviewer's
questions were fair and knowledgable. **He was the engineer on the team. After
the interview, I don't want to work with him not because of the questions but
because of the attitude.**

The company's name? FPT Software. No bashing on the company itself though - I
just happened to have this experience, and I will tell the experience. Also I
went to FPT University. Just saying.

Ultimately I turned down the deal because the salary was lower than my current
job.

[1]: https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm
[2]: https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven
[3]: https://htmx.org/essays/how-did-rest-come-to-mean-the-opposite-of-rest/
[4]: https://htmx.org/essays/hateoas/
