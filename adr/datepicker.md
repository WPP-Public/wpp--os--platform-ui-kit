# ADR0001_FE_Choose_datepicker_component
​
## Status
 _Proposed_  
​
## Summary
_Research the most appropriate library for our purpose._
​
## Problem & Context
_Datepicker should cover most of our design decision, have good maintenance and community_
​
## Considered options
_Following options for datepicker:_
​
### Air-datepicker (https://www.npmjs.com/package/air-datepicker)
| Pros | Cons |
|------|------|
|  Light weight    |  Different range mode    |
|  It works in shadow DOM    |   Time picker have completely different UI (https://air-datepicker.com/examples)   |
|  Have css variables, it’s easy to customise styles    |      |
|  Have great dropdown realisation, this library using Popper.js    |      |
|  Developers support and maintenance https://snyk.io/advisor/npm-package/air-datepicker#maintenance    |      |
|  Written in pure js without any dependencies    |      |
|  Have good documentation  https://air-datepicker.com/    |      |
|  Changing month or year in the same way as in our design    |      |
​
### FlatPickr (https://www.npmjs.com/package/flatpickr)
| Pros | Cons |
|------|------|
|   It works in shadow DOM   |   Different flow while change month or year   |
|   Light weight   |   Different range mode   |
|   Design is similar   |    ot using css variables, it’s not that comfortable to change styles unlike air-datepicker  |
|   Have similar time picker   |   This library can be using only with plane css   |
|   Have good docs https://flatpickr.js.org/examples/   |   This library using custom dropdown position and this is not so flexible unlike in air-datepicker   |
|   Big community and developers support https://snyk.io/advisor/npm-package/flatpickr   |      |
​
## Risks
_If we will use one of this library, of course we will be limited by this library, we freely can change styles, but change some behaviour in general way we couldn’t_
​
## Decision
_In my opinion the best choice for date picker - Air-datepicker. This library have good support (not that big as FlatPickr, but still), great visual components, dropdown realisation and more similar to our design than many others libraries. Unfortunately, this library have completely different time picker, but we can use time picker from FlatPickr if designers will like time picker from FlatPickr. Libraries have small weight and supporting tree shaking, so it shouldn't be a problem to use two libraries for different components._