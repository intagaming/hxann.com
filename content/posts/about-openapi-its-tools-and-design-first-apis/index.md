+++
title = "About OpenAPI, its tools, and design-first APIs"
date = "2022-06-07"
author = "An7"
authorTwitter = ""
tags = []
keywords = []
description = "OpenAPI has not ripen."
showFullContent = false
readingTime = true
hideComments = false
+++

When it comes to designing a web API, OpenAPI is the standard. It's everywhere,
it's also known under the name Swagger (whatever Swagger product they're
called). But if you have ever written an OpenAPI specification document, I think
you would have visited the OpenAPI reference too many times to be comfortable.

## OpenAPI is too enormous and hard to write.

OpenAPI is too complicated to write (by hand).

- Describing an API is hard enough. Doing that while having to think about an
  arbitrary syntax is so unnecessary that I couldn't concentrate.
- Knowing what you're supposed to fill in for an OpenAPI object is not trivial.
  There are _Request Body Object_, _Parameter Object_, _Schema Object_ and some
  more, each one needs a different set of fields.

There are [GUIs][1] to ease this pain. I like Stoplight Studio. It's stylish,
and gets things done.

## Tools that generate APIs from OpenAPI spec are opinionated, bloated, and limiting.

Take [openapi-generator][2]. It takes an OpenAPI spec file and generates server
or client code in whatever language or framework that you chose.

However, after I generated an API, I questioned:

- What is this structure that it outputs? Is this best practice that's taken
  somewhere? Is it really the best practice? How can I extend from these?
- What are these naming schemes?
- What are these "design patterns"?
- What "customizations" do I have?
- What happens when I want to update my OpenAPI spec? What files should I keep
  from being overwritten?

I think every OpenAPI generators have the same flaws. I decided to not use one,
and manually implement an API. But...

## Tools that validate APIs with their OpenAPI spec are not mainstreamed.

I want to know if my implementation is in sync with its OpenAPI spec. But maybe
not every validating tool is created equal.

I programmed in Go, so I looked at [`kin-openapi`][3]. To be honest, I don't
even know what I'm looking at. The introduction is as generic as it can be. At
least I could maybe find a "recipe" for validating the "HTTP
requests/responses". Still, it lacks clarity as to what it is doing under the
hood. If you don't know what attributes of the requests/responses it's even
validating, why do you use a validation tool?

There might still be a perfect tool for this purpose, but I still have yet to
find a mainstreamed-enough tool good enough that it's as popular as the OpenAPI
specification itself. It should be.

## The alternatives are sometimes not very good.

I've tried [Goa][4], a design-first framework to create web services. It has its
own Domain-Specific Language (DSL) that is, I suppose, a set or combination of
syntax in Go specific to creating web services. You write a specification in Go,
and it **generates** the interfaces, followed by an implementation to use those
interfaces.

First, minor detail, there are limitations in the DSL itself. I encountered a
problem where it doesn't allow a field in the response to be `nullable`.

Second, the implementation is structured in a way that is very opinionated and
unclear to extend upon. I guess it's a template and I can use my Go imagination
to de-magicify them, but oh well.

Third, the middleware system in Goa is so confusing. I don't know how to fetch
any type of params in the Endpoint Middleware. Each type of router has different
ways to fetch those, and I don't know what router Goa uses. At least it's
nowhere found in the Goa documentation.

And, this [Security][5] documentation of Goa doesn't even exist anymore in the
current documentation. Just go to [goa.design][4] and try to find the Security
page on the navigation bar.

After all, Goa is still a framework, and my use case seems to be on the edge
cases. Maybe they will address these soon, but I won't care anymore. I think
I've had enough for an API framework.

## Conclusion

I would for now stick with OpenAPI with GUIs, and manually implement the API.
The [OpenAPI wonderland][6] hasn't delivered yet, but I'll be waiting.

[1]: https://openapi.tools/#gui-editors
[2]: https://openapi-generator.tech
[3]: https://github.com/getkin/kin-openapi
[4]: https://goa.design
[5]: https://goa.design/design/security
[6]: https://oai.github.io/Documentation/start-here.html
