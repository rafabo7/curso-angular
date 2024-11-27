// JS classes don't work quite exactly as TS clases.
// For up to ES5 TS classes were transpiled as functions

// As in JS or Py, classes are like blueprints to create instance or objects.

export class Person {
    //* This method of declaring properties and constructor is used in Angular
    // Public to be available in the outer scope. 
    //* public name: string

    // Private to be available only within the class.
    // This will not work because JS don`t have this feature of private varialbe. However TS will throw an error and Angular can be configured to not compile when an error like this happen.
    //* private address: string

    // Special method, called when the instance is created
    //* constructor(name: string, address: string) {
        //* This is usually how it works, like in JS/Py, the constructor asign the arguments to properties.
        //* this.name = name
        //* this.address = address}

    //* The next method is more common for TS data structures:

    constructor (
        // You can apply arguments things in here too, like optional and default values
        public name: string,
        private address: string = 'Unknown'
    ) {}

}

// Extend a class, already known as inheritance, why change the name now?

// It builds a class upon a prior class

// Many extends can lead to difficult to maintain code
export class Hero extends Person {

    // Special word 'super' must be called when declaring a constructor for an extended class, because we need the inner properties too

    constructor(
        public alterEgo: string,
        public age: number, 
        public realname: string

    ){
        // This is the constructor of the father, it must be called like usual, with the arguments needed.
        // This is the same as => a = new Person(realname, 'NY')
        super( realname, 'NY')
    }

}


const tony = new Person('Tony', 'NY')

const spiderman = new Hero('Spiderman', 23, 'Peter')

console.log(tony);
console.log(spiderman);

//* If many extends are needed it is better to implement a //composition.

// A composition is a way to declare instance where it's easiaer to see how many objects or levels of inheritance do we have and eliminates the need to call super()

//? In this course Composition will be prioritize over Inheritance


export class Hero2 {

    // 1. Declare a prop typed with the prior father
    //* public person: Person

    constructor(
        public alterEgo: string,
        public age: number, 
        public realname: string,
        // 3. Or you can expect it as an argument for the Constructor
        public person: Person 

    ){
        // 2. Construct the instace for the prior father with its arguments
        // Pitfall: we have the reference to Person in our constructor for Hero2. If Person changes, Hero2 will be afected
        //* this.person = new Person( realname )
    }

}

// 4. Create an instace that will be passed to the next constructor
// 5. If the Person change in this scenario, Hero2 isn´t (that much) affected
const bruce = new Person('Bruce', 'Gotham')
const batman = new Hero2('Batman', 45, 'Bruce', bruce)

console.log(batman);




