//What if we have a function that does different things depending on the type of the argument that is passed (yeah, I know we wouldn't want a function like that but imagine it for the sake of the course)?

// We could be tempted to the argument as any

export function beetleJuice ( argument: any ) {
    return argument.no.error.isShown.because.anyHasNoRestrictions('yeah')
    // This won't throw an error before runing, and this will make the typescript intellisense useless.
}

// We really, really, really dont want to use any, because it has no restricctions, its la JS LOL

// Okay, how to deal with a function that depends on the data type => With Generics

function whatsMyType<T> ( argument : T): T {

    //That T is a standard, it could be other letter

    return argument
}

// The generic is then specified in the function call. This will throw an error if the argument is not a string.
let amIString = whatsMyType<string>('Que pasó wey')

console.log( amIString.repeat(2) );