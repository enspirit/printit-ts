import sanitizeHtml from 'sanitize-html';

const OPTIONS = {
  allowedTags: [
    'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4',
    'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'blockquote', 'dd', 'div',
    'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre',
    'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn',
    'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp',
    'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'caption',
    'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'img',
  ],
  // disallowedTagsMode: 'discard', // commented because of a TypeScript error, but default value used
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    // We don't currently allow img itself by default, but
    // these attributes would make sense if we did.
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    // `id` is what makes a document's own `#section` links resolve: strip it
    // and the converter has nothing to point an internal link at, so a table
    // of contents comes out dead. It carries no script and no navigation of
    // its own — DOM clobbering is a browser concern, and this HTML only ever
    // reaches a document converter.
    '*': ['class', 'id'],
  },
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  // URL schemes we permit
  allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false,
};

export default {
  sanitize(html: string) {
    return sanitizeHtml(html, OPTIONS);
  },
};
