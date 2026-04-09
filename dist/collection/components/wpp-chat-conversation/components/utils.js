import { Marked } from 'marked';
const md = new Marked({
  gfm: true,
  breaks: true,
});
export const extractImageData = (t) => {
  if (t.type === 'image') {
    const img = t;
    return { href: img.href, alt: img.text || img.title || '' };
  }
  if (t.type === 'link') {
    const link = t;
    const img = link.tokens?.find(inner => inner.type === 'image');
    if (img) {
      return { href: img.href, alt: img.text || img.title || '', linkHref: link.href };
    }
  }
  return null;
};
export const transformImageGroups = (token) => {
  if (token.type !== 'paragraph')
    return;
  const tokens = token.tokens ?? [];
  const imageDataArr = [];
  let hasNonImageContent = false;
  for (const t of tokens) {
    if (t.type === 'br' || t.type === 'space')
      continue;
    if (t.type === 'text' && !t.text.trim())
      continue;
    const imageData = extractImageData(t);
    if (imageData) {
      imageDataArr.push(imageData);
    }
    else {
      hasNonImageContent = true;
      break;
    }
  }
  if (!hasNonImageContent && imageDataArr.length > 0) {
    const group = token;
    group.type = 'image_group';
    group.images = imageDataArr;
  }
};
export const getMarkdownTokens = (text) => {
  const tokens = md.lexer(text);
  tokens.forEach(transformImageGroups);
  return tokens;
};
export const findSafeBoundary = (text) => {
  let inCodeFence = false;
  let lastBoundary = -1;
  let i = 0;
  while (i < text.length) {
    // Detect an opening/closing code fence at the start of a line
    if ((i === 0 || text[i - 1] === '\n') && (text[i] === '`' || text[i] === '~')) {
      const fenceChar = text[i];
      let fenceLen = 0;
      while (i + fenceLen < text.length && text[i + fenceLen] === fenceChar) {
        fenceLen++;
      }
      if (fenceLen >= 3) {
        const lineEnd = text.indexOf('\n', i + fenceLen);
        if (inCodeFence) {
          // Closing fence - safe to commit after this line
          inCodeFence = false;
          if (lineEnd !== -1)
            lastBoundary = lineEnd + 1;
        }
        else {
          inCodeFence = true;
        }
        i = lineEnd === -1 ? text.length : lineEnd + 1;
        continue;
      }
    }
    // Blank line outside a code fence = block boundary
    if (!inCodeFence && text[i] === '\n' && i + 1 < text.length && text[i + 1] === '\n') {
      lastBoundary = i + 2;
    }
    i++;
  }
  // If inside an unclosed code fence = do not commit changes and process further
  return inCodeFence ? -1 : lastBoundary;
};
export const handleDownload = async (href, alt) => {
  try {
    const response = await fetch(href);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = alt || 'image';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }
  catch (error) {
    console.error('Image download failed:', error);
  }
};
