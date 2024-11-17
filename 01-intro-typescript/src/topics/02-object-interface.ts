//! Not recomended
//! let badSkills = ['Dash', 'Counter', 'Hit', true, 23]
//! it looks a lot like my javascript code...

//* Recomended, seriously.
const skills: string[] = ['Hit', 'Heal', 'Dash']
// for array of srings => string[]
// I assume that number[] will work too, boolean[] should work too but don't do that

// modifyng const still working is TS
skills.push('Hit harder')

console.log(skills);

//* How to type an object literal

// First create an interface, typescript feature, this will type the props of the future object, is not a class, sort of a constructor
interface Character {
    name: string;
    hp: number;
    skills: string[];
    // Final '?' if the property is not mandatory
    hometown?: string;
}

// Then declare an object literal typed with the interface, it will throw an error if types don`t match
const strider: Character = {
    name: 'Strider',
    hp: 95,
    skills: skills
}

// You can assign later other properties of the interface
strider.hometown = 'Rivendel'

console.table(strider)

// Personal doubt
//? Does Character[] will work for an array of Characters type objects?
// Later in the lesson it was confirmed: an array of character would typed with Character[], later in the course we'll look at ir


export {};