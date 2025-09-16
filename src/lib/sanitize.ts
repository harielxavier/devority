import sanitizeHtml from 'sanitize-html'

const defaultOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']),
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    '*': ['style']
  },
  allowedSchemesByTag: {
    img: ['http', 'https', 'data'],
  },
  allowedSchemes: ['http', 'https', 'data', 'mailto'],
}

export function sanitizeHTML(input: string, options: sanitizeHtml.IOptions = {}): string {
  return sanitizeHtml(input || '', { ...defaultOptions, ...options })
}

export function sanitizeText(input: string): string {
  return sanitizeHtml(input || '', { allowedTags: [], allowedAttributes: {} })
}