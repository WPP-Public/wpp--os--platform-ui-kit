# ADR0004_FE_Choose_theme_builder_tools
​
## Status
_Proposed_
​
## Summary
_Research the most appropriate tools for our purpose._
​
## Problem & Context
_The main problem is to find a tool that allows you to generate the palette in one place, rather than using several tools that are slightly different. The idea is to make the palette generation flow much easier than it currently is_
​
## Considered options
_Following options for the color manipulation:_
​
### colord (https://www.npmjs.com/package/colord)
| Pros | Cons |
|------|------|
| Free     |  Requires plugin for additional features |
|  Have basic features like setting darkens, lightness, saturation etc. | Heavy weight |
| 6kk downloads on npm | 8 open issues |
| Last publish 3 months ago |  |



​
### color (https://www.npmjs.com/package/color)
| Pros | Cons |
|------|------|
| Free     | 7 open issues |
|  Have basic features like setting darkens, lightness, saturation etc. |    |
| Light weight |   |
| Almost 16kk downloads on npm |  |
| Last publish 7 months ago |  |


​
## Risks
_If we will use one of these libraries, of course we will be limited by the library we will choose.
But in case if it will be needed we can handle some of the color manipulations
by ourselves using HSL colors_
​
## Decision
_In my opinion, the best solution for generating a palette is the library color
and colors-generator. They give us a good opportunity to generate colors
and manipulate them however we want, so they are very flexible to use.
Also, color is one of the most popular library for color manipulation,
which means that it will be easy to find answers to difficult questions_
