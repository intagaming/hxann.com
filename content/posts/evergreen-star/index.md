+++
title = "Evergreen*"
date = "2024-09-02T12:23:00+0700"
author = "An7"
authorTwitter = ""
tags = []
keywords = []
description = "Evergreen* (pronounced Evergreen Star) describes software that will continue to provide value according to its specification for as long as possible. It's Evergreen*."
showFullContent = true
readingTime = true
hideComments = false
+++

[{{< image src="https://img.shields.io/badge/Evergreen*-complied-2ea44f" alt="Evergreen* complied badge" style="border: none; padding: 0;" >}}](https://hxann.com/posts/evergreen-star)

Evergreen* (pronounced Evergreen Star) describes software that will continue to
provide value according to its specification for as long as possible. It's
Evergreen*.

**Goals**: To use as a checklist to ensure software will work as long as
possible.

Evergreen* software must ensure the followings:

- The happy cases must be tested. This is the core of the software's
  specification.
    - Ideally test all cases you can think of, but if short on time, happy cases
      are enough.
- All the software's dependencies must be vendored.
- The environment that the software runs in must be deterministic.
- Any exception that leaves the system in an unknown state must crash the
  software.
- If software crashes, it must be restarted, no limits on how many times it
  restarts.
    - A software crash, in other words, is the fact that something did not went
      according to its specification. For
      happy cases, the software would still work and being beneficial. Thus, if
      the software restarts, the happy case
      can happen, providing value.

The star in Evergreen* means:

- Evergreen* does not guarantee bug-free software. It only guarantees that happy
  cases can happen and will provide
  value.
- A change to any of the 3rd-party services that the software uses will break
  the software, because the new 3rd-party
  service is not in the software's specification anymore.

If you don't find Evergreen* to be completely correct, that's fine, because it's
not supposed to be. This is just **my personal take** on how things should be.
Make your own standard.

