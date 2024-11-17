import './style.css'

//* The next import statements are comented, they belong to the lessons and log the results of the examples.
// import './topics/01-basics-types'
// import './topics/02-object-interface'
// import './topics/03-functions'
import './topics/04-homework-types'


// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  Hola Typescript!
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
