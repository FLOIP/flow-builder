import {marked} from 'marked'
import * as DOMPurify from 'dompurify'

export const SIMPLE_TYPOGRAPHY = ['b', 'i', 'strong', 'em']

export function markdownToHtml(markdown: string, ALLOWED_TAGS: string[] = SIMPLE_TYPOGRAPHY): string {
  return DOMPurify.sanitize(marked.parse(markdown), {ALLOWED_TAGS})
}
