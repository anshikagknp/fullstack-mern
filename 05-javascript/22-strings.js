let firstname = "Anshika"
let lastname = "Gupta"

console.log(firstname + lastname)

let str = "Welcome "
console.log(str + firstname);

//template string using backticks - can replace variables (interpolation)
str = `Welcome ${firstname} , LastName : ${lastname}`
console.log(str)

let s = "A quick brown fox jumps over the lazy dog"
console.log(s.indexOf("fox"));
console.log(s.indexOf("cat"));

console.log(s.lastIndexOf("o"));

console.log(s.includes("dog"));

console.log(s.startsWith("The"));
console.log(s.startsWith("A"));

console.log(s.endsWith("dog"));
console.log(s.endsWith("Dog"));

s1 = " Practise makes a man perfect "
console.log(s1.trim())

//delimiter is not included in the output
console.log(s1.split(" "))
console.log(s1.split(" ", 3))

console.log(s1.replace("Practise", "Consistency"))
console.log(s1.replaceAll("a", "@"))

console.log(s1.charAt(2))