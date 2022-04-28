
const repeat = (obj: Function, times: number): Array<any> => {
  let repeated = []
  for(let i=0; i < times; i++) {
    repeated.push(obj())
  }
  return repeated
}

interface NavigatorLanguage  {
    userLanguage?: string;
}

const language = (): string => {
  return navigator.languages
    ? navigator.languages[0]
    : navigator.language
}

const snakeCase = (str: string):string =>
  str &&
  str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

export {repeat, language, snakeCase}
