
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

export {repeat, language}
