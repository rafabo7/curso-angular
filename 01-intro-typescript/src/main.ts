import './style.css'

//* The next import statements are comented, they belong to the lessons and log the results of the examples.
// import './topics/01-basics-types'
// import './topics/02-object-interface'
// import './topics/03-functions'
// import './topics/04-homework-types'
// import './topics/05-basic-destructuring'
// import './topics/06-argument-destructuring'
// import './topics/07-import-export'
// import './topics/08-classes'
// import './topics/09-generics'
import './topics/10-decorators'


// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  Hola Typescript!
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
