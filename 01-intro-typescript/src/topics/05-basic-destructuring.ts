
// Interface and objects for example

interface AudioPlayer {
    playerVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    playerVolume: 80,
    songDuration: 60,
    song: "Mary on a Cross",
    details: {
        author: "Ghost",
        year: 2015
    }
}

//Object destructuring

const { 
    // Simple destructuring
    song,
    // Destructuring a nested object. Useful but not very readable.

    // Fernando Herrera advise is to destrucure first the nested object, and in the next line of code extract the property needed.
    // In this example I leave like this becasue of the simplicity of the object (also this are lessons notes, they lack a lot of readability already)
    details: {
        author
    },
    // Destructuring with renaming
    songDuration: duration 
} = audioPlayer

//* Fernando Herrera recomendation:
//* const { song, duration, details } = audioPlayer
//* const { author } = details
//* He is not wrong => readability is always over a little-micro-minimum of efficiency.

// Tip: if you log data as an object it will be displayed more clearly on the console
console.log({ song, author, duration });

// Array destructuring
const dbz: string[] = ['Goku', 'Vegeta', 'Trunks']
// If you only want Trunks, with a default value in case there is no index 2
const [ , , p3 = 'Not found'] = dbz

console.error('Player 3:', p3)



export {};
