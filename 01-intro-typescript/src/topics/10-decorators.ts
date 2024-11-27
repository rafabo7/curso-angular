// Decorators are specials functions that work with different objects.
// Usually Angular developers don't create their decorators, but use decorators already created.

// A decorator is a function
function classDecorator(
    constructor: any
) {
    return class extends constructor{
        aProp = 'Chill Daddy';
        bProp = 'What the hell is even this?!';
    

    }


}

@classDecorator
class SuperClass {

    oneProp: string = 'ABC'

    print() {
        console.log(this.oneProp);
    }
}

console.log(SuperClass)
// Loging class declaration

const myInstance = new SuperClass()
console.log(myInstance);
// Loging class instance. You'll se the props of the decorators added.

//* Decorators are an everyday tool in Angular. In Angular all is a class, but the funcionality of theese are classes are extended or specified by decorators, they allow us to keep the same class based syntax but adding decorators to the classes so they behave the way we need too. But the again, most of all of the decorators you need are already created.