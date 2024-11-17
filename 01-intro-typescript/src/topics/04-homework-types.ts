// Implement an interface for the given object.

interface SuperHero {
    name: string;
    age: number;
    // Recomended to declare interface for nested objects
    address: Address

    showAddress: () => string;

}

// This could be an example of the Interface Segregation Principle?
interface Address {
    street: string;
    city: string;
    country: string;
}

// Trick: f2 to rename properties and methods from the interface to all the file


const superHeroe: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        street: 'Main St',
        city: 'NY',
        country: 'USA'
    },
    showAddress() {
        return this.name + ', ' + this.address.city + ', ' + this.address.country;
    }
}




const address = superHeroe.showAddress();
console.log( address );




export {};