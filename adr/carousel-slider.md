# ADR0006_FE_Choose_carousel_slider
​
## Status
_Proposed_
​
## Summary
_Research the most appropriate library for our purpose._
​
## Problem & Context
_Carousel slider should cover our design decision, have good maintenance, strong community and transparency of the solution adoption process, good documentation_
​
## Considered options
_Following options for carousel slider component:_
​
### Tiny Slider 2 (https://www.npmjs.com/package/tiny-slider)
| Pros                     | Cons                      |
|--------------------------|---------------------------|
| Have basic features list | Weak documentation        |
| Very lightweight, 11.4kb | 317 open issues           |
|                          | Last publish 2 years ago  |
|                          | No frameworks integration |
​
​
### Splide (https://www.npmjs.com/package/@splidejs/splide)
| Pros                         | Cons                      |
|------------------------------|---------------------------|
| Written in TypeScript        | No WebComponent version   |
| Lightweight, 29kb            | No Angular integration    |
| Flexible and extensible      | Last publish 9 months ago |
| Protected by 400+ test cases |                           |
​
​
### Swiper (https://www.npmjs.com/package/swiper)
| Pros                                                   | Cons                                               |
|--------------------------------------------------------|----------------------------------------------------|
| Very popular, 36k stars, 1.8kk weekly downloads        | Written in JavaScript (but has TypeScript typings) |
| Part of IonicFramework                                 |                                                    |
| Tree shaking ready design                              |                                                    |
| Very good feature list                                 |                                                    |
| Written as a WebComponent                              |                                                    |
​
​
## Risks
_If we will use one of these libraries, of course we will be limited by the library we will choose._
​
​
## Decision
_All listed libraries has many common pros like MIT license, zero dependencies, accessibility, theming support etc._

_But in my opinion the best choice for carousel slider is Swiper.
This library is very popular, used by many familiar companies and has a strong support by wide list of sponsors.
In comparison with its nearest competitor (Splide), it is written as a WebComponent, 
which fits well our Component Library design and simplifies integration with JS frameworks._
