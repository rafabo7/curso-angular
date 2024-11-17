//* Functions work just as in JS, but all is typed.

// Typed arguments, it is mandatory in strict mode to explicitly type the arguments
// Return value type can be infered
function addNumbers( a: number, b:number ) {
    return a + b 
}



// Again, arrow functions work same as is JS
// You can type the returned value just after the arguments
//*That's called the 'firm' of a function
// o la firma de la función en español.
// It can be different from the arguments if the function mutates it.
const arrowAdd = (a: number, b:number):string => {
    return `${a + b}`
}

//! Don`t let Typescript infered your values, if you make a mistake it will be carried all along your app

//* Mandatory, optional and default arguments
// First mandatory typed argument, then optional typed argument with final '?', then arguments with default values. As in JS, but typed.
// With more than three arguments it is recomended to pass an object. 

function multiply (firsNumber: number, secondNumber?: number, base: number = 2) {
    
    return secondNumber ? firsNumber * secondNumber : firsNumber * base
    
}

// Return values are infered, but always good practices to type
const result: number = addNumbers( 1, 2 )
const arrowResult: string = arrowAdd(3 , 5)
const multiplyResult: number = multiply( 5 )

console.table({result, arrowResult, multiplyResult});

//* Function with objects as arguments
// Always typed stricted. It means if you pass an object to a function then you created an object somewhere. That object as the rest of the code must be typed, 'with what?' with an interface.
// If you have an object-argument you have an interface, if you have an interface the props of the object are type, period.

interface Character {
    name: string;
    hp: number;
    //How to define methods in interfaces
    // Name of the method, followed by a colon, then the parameters if there's any, and the returned type
    showHp: () => void;
}

// This is very helpful for not mess up with objects props.
// This typed object is not exactly an object with typeOf X, but an object that macthes the requirements given in the interface
const healCharacter = ( character: Character, amount: number ) => {

    //! character.pv += amount error!
    console.log(`Healing ${character.name} with ${amount}hp`)
    character.hp += amount // good

}

const strider: Character =  {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Health points: ${this.hp}`)
    },

}

strider.showHp()

healCharacter( strider, 10)

strider.showHp()

export {};