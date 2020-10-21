const natural = require('natural')




// string distance


// hamming
// Dice coefficient
// JaroWinkler
// Levenshtein 

    
let corpus = [
    'Soft-computing is the use of approximate calculations to mimic human brain.',
    'It deals with approximate values.'
]

let answer = [
    'Soft computing is used for giving intelligence to computer just like human brain.'
]


hamming = natural.HammingDistance(corpus[0],answer[0],true)
jaro =  natural.JaroWinklerDistance(corpus[0],answer[0],undefined,true)
lev = natural.LevenshteinDistance(corpus[0],answer[0])

console.log(hamming + '\n')
console.log(jaro + '\n')
console.log(lev + '\n')