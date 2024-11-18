// Import and export, is just encapsulated funcionality
// Only exported things are available outside the file

// Okay... modules, its no big deal. Typescript helps a lot though

import { Product, taxCalculation } from './06-argument-destructuring'

const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 100
    },
    {
        description: 'iPad',
        price: 150
    }
]

const tax = 0.15

const [ totalPrice, totalTax] = taxCalculation({
    tax,
    products: shoppingCart
})

console.log({
    'Total Price': totalPrice,
    'Total taxes': totalTax
});