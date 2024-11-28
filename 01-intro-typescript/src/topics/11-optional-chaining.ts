
export interface Passenger {
    name: string
    children?: string[]

}

const passenger1: Passenger = {
    name: 'Fernando'
}

const passenger2: Passenger = {
    name: 'Rafa',
    children: ['Ulises', 'Julia']
}

// Here comes the optional chaining

const printChildren = ( passenger: Passenger) => {

    const numberOfChildren = passenger.children?.length || 0
    // Okay this is just Javascript optional chaining syntax
    // like a conditional operator, if children doesn't exist it returns 0
    
    //You can tell TS that you will always have a children prop this is helpful for finding bugs
    //* This is called non-null assertion operator
    //* const numberOfChildren = passenger.children!.length


    console.log(passenger.name, numberOfChildren);
}

printChildren(passenger1)
printChildren(passenger2)