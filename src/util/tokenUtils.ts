import { Tokens } from '../projects/tokens'

export function replaceTokens(contents: string, tokens: Tokens): string {
  return contents.replace(/\{\{\s*(\w+)\s*\}\}/g, (marker, token: string) => {
    if (!tokens.hasOwnProperty(token)) {
      throw new Error(`Missing token '${token}'`)
    }
    return tokens[token];
  })
}
