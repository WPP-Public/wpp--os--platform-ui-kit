import { html, render } from 'lit-html';
import { transformToVersionedTag } from '../../utils/utils';
export default {
  title: 'Design System/Components/Chat/Chat Conversation',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {},
};
const MOCK_RESPONSES = [
  `## Greeting Function in JavaScript

Here's a simple greeting utility you can drop into any project:

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;

console.log(greet('World')); // Hello, World!
\`\`\`

Some things to note:
- Uses an **arrow function** for conciseness
- Template literals (\`\`\`) handle the string interpolation
- You can extend it to support \`greeting\` as a second parameter

> 💡 Tip: If you need i18n support, consider using a library like \`react-intl\` instead.`,
  `## Async/Await with TypeScript

Async/await is syntactic sugar over Promises, making asynchronous code easier to read and maintain.

\`\`\`typescript
async function fetchUser(userId: string): Promise<User> {
try {
  const response = await fetch(\`/api/users/\${userId}\`);

  if (!response.ok) {
    throw new Error(\`HTTP error — status: \${response.status}\`);
  }

  const data: User = await response.json();
  return data;
} catch (error) {
  console.error('Failed to fetch user:', error);
  throw error;
}
}
\`\`\`

**Key concepts:**
1. \`async\` marks the function as asynchronous and wraps the return in a \`Promise\`
2. \`await\` pauses execution until the Promise resolves
3. Always wrap in \`try/catch\` to handle network or parsing errors gracefully`,
  `## Fibonacci — Approaches Compared

Here's the classic recursive implementation:

\`\`\`python
def fibonacci(n: int) -> int:
  if n <= 1:
      return n
  return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55
\`\`\`

However, recursion has exponential time complexity. Here's a comparison:

| Approach | Time Complexity | Space Complexity | Best For |
|---|---|---|---|
| Recursive | O(2ⁿ) | O(n) | Small values / readability |
| Memoization | O(n) | O(n) | Medium values |
| Dynamic Programming | O(n) | O(1) | Large values |
| Matrix Exponentiation | O(log n) | O(1) | Very large values |

*For production use, always prefer the iterative DP or memoized approach.*`,
  `The answer to life, the universe, and everything is **42** — at least according to *The Hitchhiker's Guide to the Galaxy* by Douglas Adams.

In the story, a supercomputer called **Deep Thought** spent 7.5 million years computing the answer to the "Ultimate Question of Life, the Universe, and Everything." The result was simply: **42**.

The joke, of course, is that nobody actually knew what the *question* was — making the answer meaningless without the context.

> "The problem is that we don't know what the question actually is."
> — *Douglas Adams*

This has since become one of the most iconic references in programming culture, often used as a placeholder value — much like \`foo\`, \`bar\`, or \`Hello, World!\`.`,
  `## Setting Up a React Project with Vite

Follow these steps to scaffold a new React + TypeScript project:

**1. Create the project**
\`\`\`bash
npm create vite@latest my-app -- --template react-ts
cd my-app
\`\`\`

**2. Install dependencies**
\`\`\`bash
npm install
\`\`\`

**3. Start the dev server**
\`\`\`bash
npm run dev
\`\`\`

Your \`tsconfig.json\` will be pre-configured, but you may want to enable stricter checks:

\`\`\`json
{
"compilerOptions": {
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
}
\`\`\`

**Quick checklist before you start:**
- [ ] Node.js >= 18 installed
- [ ] Git repository initialised
- [ ] ESLint + Prettier configured
- [ ] Path aliases set up in \`vite.config.ts\``,
  `## Single Image Showcase

Here is a beautiful landscape:

![Mountain Landscape](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80)

You can use the standard markdown syntax \`![alt](url)\` to render a full-width image.`,
  `## Image Gallery Grid

This example shows how multiple images within the same paragraph are automatically grouped into a grid. The first image stays large, and the others form a scrollable row.

![Main Feature](https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80) ![Thumbnail 1](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80) ![Thumbnail 2](https://images.unsplash.com/photo-1433086566608-bc48375927c1?auto=format&fit=crop&w=400&q=80) ![Thumbnail 3](https://images.unsplash.com/photo-1500622391680-202715a195c1?auto=format&fit=crop&w=400&q=80) ![Thumbnail 4](https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80) ![Thumbnail 5](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80)

*Note: Make sure there are no double newlines between the image tags to ensure they are parsed as a single paragraph.*`,
];
const MOCK_RESPONSE_ALL = `# The Complete Markdown Showcase

This response covers **every** standard markdown element. Content is intentionally varied — focus is *coverage*, not coherence.

---

## Text Formatting

Plain paragraph text sitting in a regular block. The quick brown fox jumps over the lazy dog.

**Bold via double asterisks** and __bold via double underscores__.

*Italic via single asterisks* and _italic via single underscores_.

***Bold and italic combined*** works with triple asterisks.

~~Strikethrough~~ uses double tildes.

All in one sentence: **bold**, *italic*, ***both***, ~~strikethrough~~, and \`inline code\` together.

---

## All Heading Levels

# H1 — Top Level
## H2 — Section
### H3 — Subsection
#### H4 — Sub-subsection
##### H5 — Minor Heading
###### H6 — Smallest Heading

---

## Code

Inline examples: \`const answer = 42\`, \`npm install\`, \`Promise<T>\`, \`Array.isArray([])\`.

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('World')); // Hello, World!
\`\`\`

\`\`\`typescript
async function fetchUser(id: string): Promise<User> {
const res = await fetch(\`/api/users/\${id}\`);
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
return res.json();
}
\`\`\`

\`\`\`python
squares = [x ** 2 for x in range(10) if x % 2 == 0]
print(squares)  # [0, 4, 16, 36, 64]
\`\`\`

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev
\`\`\`

\`\`\`json
{
"name": "my-app",
"version": "1.0.0",
"devDependencies": {
  "typescript": "^5.0.0",
  "vite": "^5.0.0"
}
}
\`\`\`

---

## Blockquotes

> Simple single-level blockquote. The universe is under no obligation to make sense to you.

> **Nested blockquotes:**
>
> > This is second-level nesting.
> >
> > > This is third-level nesting — deepest standard level.

> Blockquotes can also contain **bold**, \`inline code\`, and lists:
>
> - First item inside a blockquote
> - Second item inside a blockquote

---

## Lists

### Unordered List

- Apples
- Bananas
- Cavendish
- Plantain
  - Deepest nested bullet
- Cherries

### Ordered List

1. First step
1. Second step
   1. Nested ordered A
   1. Nested ordered B
1. Third step

### Task List

- [x] Design the component API
- [x] Implement the streaming logic
- [ ] Write unit tests
- [ ] Add accessibility attributes
- [ ] Deploy to production

### Mixed Nesting

1. Top-level ordered item
 - Unordered bullet nested inside
 - Another unordered bullet
   - Even deeper unordered
2. Back to ordered

---

## Table

| Language   | Typing  | Paradigm       | Use Case           |
|:-----------|:-------:|----------------|-------------------:|
| TypeScript | Static  | Multi-paradigm | Web / Node.js      |
| Python     | Dynamic | Multi-paradigm | AI / Data Science  |
| Rust       | Static  | Systems        | Wasm / CLI         |
| Go         | Static  | Concurrent     | Cloud / DevOps     |

---

## Horizontal Rules

Three dashes:

---

Three asterisks:

***

Three underscores:

___

---

## Links

[OpenAI](https://openai.com) — inline link without title.

[GitHub](https://github.com "Visit GitHub") — inline link with a title tooltip.

---

## Hard Line Break

This line is followed by two trailing spaces (hard break)
This line appears directly below without a blank line gap.

---

## Escaped Characters

These render as literal symbols: * _ \` [ ] # ! \\\\ { }

---

*End of the complete markdown showcase.*`;
export const Default = {
  render: args => {
    let messages = args.messages || [];
    let isStreaming = false;
    let currentStream = null;
    const actionBarActions = [
      { text: 'Action 1', onClick: () => console.log('Action 1 clicked') },
      { text: 'Action 2', onClick: () => console.log('Action 2 clicked') },
      { text: 'Action 3', onClick: () => console.log('Action 3 clicked') },
      { text: 'Action 4', onClick: () => console.log('Action 4 clicked') },
    ];
    const sourcesActionConfig = {
      text: '3 Sources',
      ariaProps: { label: `Action button with sources` },
      onClick: () => console.log(`Action sources clicked`),
    };
    const initComponent = () => {
      const placeholder = document.getElementById('conversation-placeholder');
      if (!placeholder)
        return;
      const chatInputConfig = {
        enableAttach: true,
        ...args.chatInputConfig,
      };
      const convTag = transformToVersionedTag('wpp-chat-conversation');
      // Check if component already exists to avoid re-creating it and losing state (though here we want to re-render it with new props)
      let el = placeholder.querySelector('#chat-conv-component');
      if (!el) {
        placeholder.innerHTML = `
          <${convTag}
            id="chat-conv-component"
          ></${convTag}>
        `;
        el = placeholder.querySelector('#chat-conv-component');
        if (el) {
          el.addEventListener('wppSend', handleSend);
          el.addEventListener('wppMessageChanged', (e) => console.log('Message changed:', e.detail));
        }
      }
      if (el) {
        el.messages = messages;
        el.assistantAvatarConfig = args.assistantAvatarConfig || { icon: 'wpp-icon-ai' };
        el.userAvatarConfig = args.userAvatarConfig || { name: 'User' };
        el.chatInputConfig = chatInputConfig;
      }
    };
    const updateStory = () => {
      const container = document.getElementById('chat-conversation-story-container');
      if (container) {
        render(renderContent(), container);
        initComponent();
      }
    };
    async function handleSend(event) {
      const message = event.detail.message;
      if (!message.trim() || isStreaming)
        return;
      isStreaming = true;
      const userId = crypto.randomUUID();
      let userAttachments = [];
      if (message.toLowerCase().trim() === 'attachments') {
        const imageCount = Math.random() > 0.5 ? 5 : 2;
        const images = Array.from({ length: imageCount }).map((_, i) => ({
          name: `image-${i + 1}.jpg`,
          url: `https://picsum.photos/seed/${Math.random()}/400/400`,
          type: 'image/jpeg',
        }));
        const fileCount = Math.floor(Math.random() * 3);
        const files = Array.from({ length: fileCount }).map((_, i) => ({
          name: `document-${i + 1}.pdf`,
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          type: 'application/pdf',
          size: 1024 * 100 * (i + 1),
        }));
        userAttachments = [...images, ...files];
      }
      messages = [
        ...messages,
        {
          id: userId,
          role: 'user',
          content: message,
          status: 'complete',
          attachments: userAttachments,
        },
      ];
      const assistantId = crypto.randomUUID();
      messages = [
        ...messages,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          status: 'loading',
          actionButtonsConfig: actionBarActions,
          sourcesActionConfig,
        },
      ];
      updateStory();
      // Small delay to ensure component is rendered
      await new Promise(r => setTimeout(r, 100));
      const convTag = transformToVersionedTag('wpp-chat-conversation');
      const convEl = document.querySelector(convTag);
      if (convEl) {
        await convEl.setStatus('streaming');
        let responseText = '';
        const lowerMsg = message.toLowerCase().trim();
        if (lowerMsg === 'test') {
          responseText = MOCK_RESPONSE_ALL;
        }
        else if (lowerMsg === 'image') {
          responseText = MOCK_RESPONSES[5];
        }
        else if (lowerMsg === 'gallery') {
          responseText = MOCK_RESPONSES[6];
        }
        else {
          responseText = MOCK_RESPONSES[Math.floor(Math.random() * 5)];
        }
        const chunks = responseText.match(/\S+|\s+/g) || [];
        currentStream = { cancelled: false };
        for (const chunk of chunks) {
          if (currentStream.cancelled)
            break;
          const delay = /^\s+$/.test(chunk) ? 5 : 30 + Math.random() * 50;
          await new Promise(resolve => setTimeout(resolve, delay));
          if (currentStream.cancelled)
            break;
          await convEl.appendChunk(chunk);
        }
        if (!currentStream.cancelled) {
          await convEl.completeStream();
          messages = messages.map(m => (m.id === assistantId ? { ...m, status: 'complete' } : m));
          isStreaming = false;
          updateStory();
        }
      }
    }
    function renderContent() {
      return html `
        <div style="height: 600px; display: flex; flex-direction: column; border: 1px solid var(--wpp-grey-color-200);">
          <div id="conversation-placeholder" style="height: 100%; width: 100%;"></div>
        </div>
      `;
    }
    setTimeout(initComponent, 0);
    return html ` <div id="chat-conversation-story-container">${renderContent()}</div> `;
  },
};
