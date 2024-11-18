// Simple interface
interface Product {
    description: string
    price: number
}

// Typed objects
const phone: Product = {
    description: 'Nokia A1',
    price: 150
}

const tablet: Product = {
    description: 'iPad Air',
    price: 250
}

//* Pattern: the next combination of interface to object to argument is very common

interface TaxCalculationOptions {
    tax: number
    products: Product[]
}

// Another option for argument destructuring:
// function taxCalculation( { products, tax }: TaxCalculationOptions ): [number, number]

// This is more readable when more argument come in, and believe me they will come in.
// If you know you expect a tuple you can type the return value with => [number, number]
function taxCalculation( options: TaxCalculationOptions ): [number, number] {
    let { products, tax } = options

    let total = 0

    // You can destructure directly in an argument when you pass an object
    products.forEach( ( { price } ) => total += price )

    return [total, total * tax]


}

// Typed optional, but recomended
const shoppingCart: Product[] = [phone, tablet]
const tax: number = 0.15

// You already know, you can destructure a tuple.
let [totalPrice, totalTax] = taxCalculation( {
    products: shoppingCart,
    tax
} )

console.log('Total price:', totalPrice)
console.log('Total taxes:', totalTax)




export {};