//! Not recomended
let badSkills = ['Dash', 'Counter', 'Hit', true, 23]
// it looks a lot like my javascript code...

//* Recomended, seriously.
const skills: string[] = ['Hit', 'Heal', 'Dash']
// for array of srings => string[]
// I assume that number[] boolean[] will work too

// modifyng const still working
skills.push('Hit harder')

console.log(skills);

//* How to type an object literal

// First create an interface, typescript feature
interface Character {
    name: string;
    hp: number;
    skills: string[];
    // Final '?' if the property is not mandatory
    hometown?: string;
}

// Then declare an object literal typed with the interface
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
// Later in the lesson it was confirmed.


export {};