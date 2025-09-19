# ADR0007_FE_Choose_rich_text_editor
​
## Status
_Proposed_
​
## Summary
_Research the most appropriate library for our purpose._
​
## Problem & Context
_Rich text editor should cover our design decision, have good maintenance, strong community and transparency of the solution adoption process, good documentation._
​
## Considered options
_Following options for rich text editor:_
### Editor.js (https://editorjs.io/)
| Pros                          | Cons                               |
|-------------------------------|------------------------------------|
| Table support                 | Strange UI                         |
| Popular on GitHub (24k stars) | No real time collaboration feature |
| Internationalization support  | Weak theming support               |
​
​
### ProseMirror (https://prosemirror.net/)
| Pros                                   | Cons                             |
|----------------------------------------|----------------------------------|
| Good modern architecture               | Weak theming support             |
| Own plugin for real time collaboration | No internationalization support  |
| Own plugin for tables                  | Young project, smaller community |
| Broad API                              | Harder learning curve            |
|                                        | No production grade UI yet       |
​
​
### Quill (https://quilljs.com/)
| Pros                                                                                                                       | Cons                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| Most famous framework agnostic rich text editor                                                                            | Weak internationalization support                                                                |
| Modular architecture                                                                                                       | Tables feature using 3rd party plugin [quill-table-ui](https://github.com/volser/quill-table-ui) |
| Big community, lots of 3rd party modules                                                                                   | Real time collaboration using 3rd party plugin                                                   |
| Theming support                                                                                                            |                                                                                                  |
| WebComponent version using Stencil by 3rd party project [stencil-quill](https://github.com/KillerCodeMonkey/stencil-quill) |                                                                                                  |
​
​
## Risks
_If we use one of these libraries, of course we will be limited by the library we will choose._
​
​
## Decision
_In my opinion the best choice for rich text editor is Quill.
This library is very popular, used by many familiar companies and has big community.
In comparison with its nearest competitor (ProseMirror), it is more mature, has theming support and has a WebComponent version,
thus fits well our Component Library design and simplifies integration with JS frameworks._
