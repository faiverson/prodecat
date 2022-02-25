
const repeat = (obj, times) => {
  let repeated = []
  for(let i=0; i < times; i++) {
    repeated.push(obj())
  }
  return repeated
}

const language = () => {
  return navigator.languages
    ? navigator.languages[0]
    : navigator.language
}

const snakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

export {repeat, language, snakeCase}
