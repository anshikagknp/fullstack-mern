const students = [
    {
        id: 101,
        name: "Amit Sharma",
        age: 22,
        gender: "Male",
        course: "MCA",
        marks: 78,
        city: "Delhi",
        skills: ["Java", "Python", "SQL"]
    },
    {
        id: 102,
        name: "Priya Singh",
        age: 21,
        gender: "Female",
        course: "BCA",
        marks: 92,
        city: "Lucknow",
        skills: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 103,
        name: "Rahul Verma",
        age: 23,
        gender: "Male",
        course: "MCA",
        marks: 65,
        city: "Noida",
        skills: ["C", "C++", "Java"]
    },
    {
        id: 104,
        name: "Neha Gupta",
        age: 20,
        gender: "Female",
        course: "B.Tech",
        marks: 88,
        city: "Kanpur",
        skills: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 105,
        name: "Arjun Yadav",
        age: 22,
        gender: "Male",
        course: "MCA",
        marks: 55,
        city: "Delhi",
        skills: ["Python", "Django"]
    },
    {
        id: 106,
        name: "Simran Kaur",
        age: 21,
        gender: "Female",
        course: "BCA",
        marks: 81,
        city: "Agra",
        skills: ["JavaScript", "React"]
    },
    {
        id: 107,
        name: "Rohan Mishra",
        age: 24,
        gender: "Male",
        course: "MBA",
        marks: 73,
        city: "Patna",
        skills: ["Excel", "Power BI"]
    },
    {
        id: 108,
        name: "Anjali Roy",
        age: 22,
        gender: "Female",
        course: "MCA",
        marks: 95,
        city: "Kolkata",
        skills: ["Java", "Spring Boot"]
    },
    {
        id: 109,
        name: "Vikas Kumar",
        age: 20,
        gender: "Male",
        course: "B.Tech",
        marks: 69,
        city: "Jaipur",
        skills: ["C", "Python"]
    },
    {
        id: 110,
        name: "Sneha Ali",
        age: 23,
        gender: "Female",
        course: "MBA",
        marks: 84,
        city: "Mumbai",
        skills: ["Marketing", "Communication"]
    }
];

// 1. Write a program to display all student objects
console.log("Displaying a list of all student objects : ")
students.forEach((stu)=>{
    console.log(stu)
})

// 2. Find the first student whose marks are greater than 80
const bright = students.find((stu)=> stu.marks>80)
console.log("The first student with marks > 80 is : ")
console.log(bright)

// 3. Display students whose names start with "A"
const stuA = students.filter((stu)=> stu.name.startsWith("A"))
console.log("Students whose name starts with A : ")
console.table(stuA)

// 4. Find the total marks of all students
let sum = 0
students.forEach((stu)=> sum=sum+stu.marks)
console.log("Total Marks : "+sum)

// 5. Display students whose course contains "CA"
const stuCA = students.filter((stu)=> stu.course.includes("CA"))
console.log("Displaying students whose course contains CA : ")
console.table(stuCA)

// 6. Display students having marks less than 60
const marklt60 = students.filter((stu)=> stu.marks < 60)
console.log("Students with marks less than 60 : ")
console.table(marklt60)

// 7. Count the total characters in every student's name
const namelen = students.map((stu) => {
    return { ...stu, Length : stu.name.length }
})
console.log("Number of characters in every student's name : ")
console.table(namelen)

// 8. Find the index of the first student scoring above 80
const bright2 = students.find((stu)=> stu.marks>80)
console.log("The index of the first student with marks > 80 is : ")
console.log(students.indexOf(bright2))

// 9. Write a program to count the total number of words in a paragraph
para = "This handout will help you understand how paragraphs are formed, how to develop stronger paragraphs, and how to completely and clearly express your ideas"
const t_words = para.split(" ");
console.log("Total number of words : "+t_words.length)

// 10. Replace spaces with hyphens in every name
const newstr = students.map((stu) => stu.name.replace(" ", "-"))
console.log("Replaced space with Hyphens in Names : ")
console.table(newstr)

// 11. Display the names of students whose marks are multiples of 3, sorted in descending order
let multi3x = students.filter((stu)=> stu.marks%3 == 0 ).sort((a, b) => b.name.localeCompare(a.name))
console.log("Names of students with marks multiple of 3 in descending order : ")
console.table(multi3x)

// 12. Write a program to find the index of the first MCA student
let indexMCA = students.find((stu) => stu.course == "MCA")
console.log("Index of first MCA student : " +students.indexOf(indexMCA))

// 13. Write a program to display the total number of students in each city using reduce()
// Important
const stu_city = students.reduce((count,stu)=>{
    count[stu.city] = (count[stu.city] || 0) + 1
    return count
},{})
console.log("Total number of students in each city : ")
console.log(stu_city);

// 14. Write a program to display the highest-scoring student using sort() and find()
students.sort((a,b) => b.marks - a.marks)
console.log("The highest Scoring Student : ")
console.log(students[0])

// 15. Write a program to display the lowest-scoring student using sort() and find()
students.sort((a,b) => a.marks - b.marks)
console.log("The lowest Scoring Student : ")
console.log(students[0])

// 16. Write a program to display the names of students after adding 5 bonus marks using map()
const bonus = students.map((stu)=>{
    return { name: stu.name, bonusmarks: stu.marks + 5 }
})
console.log("After adding 5 bonus marks : ")
console.table(bonus)

// 17. Write a program to display students whose city contains the letter "a" using filter() and includes()
const fcity = students.filter((stu)=> stu.city.includes("a"))
console.log("The students whose city contains the letter a : ")
console.table(fcity)

// 18. Display only unique cities
// Important
const unique_city = students.reduce((cities, stu) => {
    if (!cities.includes(stu.city)) {
        cities.push(stu.city)
    }
    return cities
}, [])
console.log("Unique cities : ")
console.log(unique_city);

// 19. Count the total marks obtained by MCA students
let sumMCA = 0
students.filter((stu)=> stu.course == "MCA").forEach((stu)=> sumMCA = sumMCA + stu.marks)
console.log("Total Marks of MCA Students : "+sumMCA)

// 20. Display all students after increasing their marks by 10%
const updatedM = students.map((stu)=> {
    return {Name: stu.name, Marks: Number((stu.marks*1.1).toFixed(1))}
})
console.log("Updated marks of all students : ")
console.table(updatedM)