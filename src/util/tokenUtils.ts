import { TokenObject } from '../projects/tokenObject'

export function replaceTokens(contents: string, tokens: TokenObject): string {
  return contents.replace(/\{\{\s*(\w+)\s*\}\}/g, (marker, token: string) => {
    if (!tokens.hasOwnProperty(token)) {
      throw new Error(`Missing token '${token}'`)
    }
    return tokens[token];
  })
}
