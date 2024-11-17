// Type string
let name: string = 'Strider';

// Type number
let age: number = 80;

// Type bool
let isAlive: boolean = true;

// Type 'value' const
// Typed like this => isFriendOf: 'Frodo'
const isFriendOf = 'Frodo';

// Const variables infer the type as they need to be assign when declare. Although is best practice to still type the variable

const kingOf: string = 'Gondor etcetera'

// Various types (number OR 'Ful')
let hpPoints: number | 'Full' = 95;

console.log({
    name,
    hpPoints,
    isAlive,
    isFriendOf,
    age,
    kingOf
});

export {};
