# ADR0005_FE_Choose_color_picker
​
## Status
_Proposed_
​
## Summary
_Research the most appropriate library for our purpose._
​
## Problem & Context
_Color picker should cover our design decision, have good maintenance, strong community and transparency of the solution adoption process, good documentation_
​
## Considered options
_Following options for color picker component:_
​
### a-color-picker (https://www.npmjs.com/package/a-color-picker)
| Pros | Cons |
|------|------|
|  Have basic features list | No library documentation |
| Light weight | 13 open issues |
| | Only 2k weekly downloads on npm |
| | Last publish 3 years ago |
​
​
​
### react-input-color (https://www.npmjs.com/package/react-input-color)
| Pros | Cons |
|------|------|
| Very light weight (24kb) | Have small feature list  |
| 3 open issues | No library documentation |
| Last publish 4 months ago | Only 3.2k weekly downloads on npm |
​
​
​
### react-colorful (https://www.npmjs.com/package/react-colorful)
| Pros | Cons |
|------|------|
| Have basic feature list | Have small feature list |
| 1.5kk weekly downloads on npm | Poor documentation |
| Light weight  | 16 open issues  |
| Last publish 3 months ago |  |
​
​
​
### react-color (https://www.npmjs.com/package/react-color)
| Pros | Cons |
|------|------|
| Have good feature list | 164 open issues |
| Multiple color picker components | Last publish 2 years ago |
| 1.1kk weekly downloads on npm | Comparely heavy weight  |
| Good documentation |   |
​
​
​
## Risks
_If we will use one of these libraries, of course we will be limited by the library we will choose.
Some libraries have quite powerful possibilities, so we will have some flexibility._
​
## Decision
_But in my opinion the best choice for color picker - react-color. This library has a good support, big community. It also provides us the features we need based on our design (like color picker, hex colors, possibility to manipulate hsl, saturation etc.)_
