//Assignment2 - MongoDB - Switched to students collection

db.students.insertMany([
    { name:"Aman Kumar", age:20, course:"B.Tech", courseId:101, city:"Delhi", marks:88, email:"aman@gmail.com", mobile:"9876543210", skills:["HTML","CSS","JavaScript","React"], address:{city:"Delhi",pin:110001} },

    { name:"Rahul Singh", age:21, course:"MCA", courseId:102, city:"Noida", marks:92, email:"rahul@gmail.com", mobile:"9876543211", skills:["Java","MongoDB","Node.js"], address:{city:"Noida",pin:201301} },

    { name:"Priya Sharma", age:22, course:"BCA", courseId:103, city:"Lucknow", marks:76, email:"priya@gmail.com", mobile:"9876543212", skills:["HTML","CSS"], address:{city:"Lucknow",pin:226001} },

    { name:"Ankit Verma", age:19, course:"B.Tech", courseId:101, city:"Delhi", marks:54, email:"ankit@gmail.com", mobile:"9876543213", skills:["Python","MongoDB"], address:{city:"Delhi",pin:110002} },

    { name:"Sneha Gupta", age:23, course:"MCA", courseId:102, city:"Kanpur", marks:69, email:"sneha@gmail.com", mobile:"9876543214", skills:["React","Node.js","MongoDB"], address:{city:"Kanpur",pin:208001} },

    { name:"Rohit Kumar", age:24, course:"BCA", courseId:103, city:"Patna", marks:81, email:"rohit@gmail.com", mobile:"9876543215", skills:["HTML","Bootstrap","CSS"], address:{city:"Patna",pin:800001} },

    { name:"Aman Kumar", age:20, course:"B.Tech", courseId:101, city:"Delhi", marks:88, email:"aman2@gmail.com", mobile:"9876543216", skills:["HTML","CSS"], address:{city:"Delhi",pin:110003} },

    { name:"Neha Singh", age:18, course:"MBA", courseId:104, city:"Noida", marks:91, email:"neha@gmail.com", mobile:"9876543217", skills:["Excel","Power BI"], address:{city:"Noida",pin:201302} },

    { name:"Vikas Sharma", age:26, course:"MCA", courseId:102, city:"Delhi", marks:35, email:"vikas@gmail.com", mobile:"9876543218", skills:["MongoDB"], address:{city:"Delhi",pin:110004} },

    { name:"Deepak Yadav", age:27, course:"BCA", courseId:103, city:"Jaipur", marks:44, email:"deepak@gmail.com", mobile:"9876543219", skills:[], address:{city:"Jaipur",pin:302001} },

    { name:"Pooja Gupta", age:20, course:"B.Tech", courseId:101, city:"Noida", marks:73, email:"pooja@gmail.com", mobile:"9876543220", skills:["HTML","React","Bootstrap"], address:{city:"Noida",pin:201303} },

    { name:"Karan Mehta", age:22, course:"MBA", courseId:104, city:"Mumbai", marks:83, email:"karan@gmail.com", mobile:"9876543221", skills:["Excel","SQL"], address:{city:"Mumbai",pin:400001} },

    { name:"Nisha Verma", age:21, course:"MCA", courseId:102, city:"Delhi", marks:95, email:"nisha@gmail.com", mobile:"9876543222", skills:["MongoDB","Express","React","Node.js"], address:{city:"Delhi",pin:110005} },

    { name:"Arjun Patel", age:23, course:"B.Tech", courseId:101, city:"Ahmedabad", marks:64, email:"arjun@gmail.com", mobile:"9876543223", skills:["Java","Spring Boot"], address:{city:"Ahmedabad",pin:380001} },

    { name:"Simran Kaur", age:19, course:"BCA", courseId:103, city:"Chandigarh", marks:59, email:"simran@gmail.com", mobile:"9876543224", skills:["HTML","CSS","JavaScript"], address:{city:"Chandigarh",pin:160001} },

    { name:"Mohit Sharma", age:25, course:"MCA", courseId:102, city:"Delhi", marks:78, email:"mohit@gmail.com", mobile:"9876543225", skills:["React","MongoDB"], address:{city:"Delhi",pin:110006} },

    { name:"Riya Singh", age:20, course:"B.Tech", courseId:101, city:"Lucknow", marks:99, email:"riya@gmail.com", mobile:"9876543226", skills:["HTML","CSS","JavaScript","React","MongoDB"], address:{city:"Lucknow",pin:226002} },

    { name:"Harsh Jain", age:22, course:"MBA", courseId:104, city:"Indore", marks:67, email:"harsh@gmail.com", mobile:"9876543227", skills:["Power BI","SQL"], address:{city:"Indore",pin:452001} }, 
    { name:"Sakshi Mishra", age:21, course:"BCA", courseId:103, city:"Patna", marks:39, email:"sakshi@gmail.com", mobile:"9876543228", skills:["HTML"], address:{city:"Patna",pin:800002} }, 
    { name:"Aditya Raj", age:24, course:"MCA", courseId:102, city:"Noida", marks:85, email:"aditya@gmail.com", mobile:"9876543229", skills:["MongoDB","Node.js","Express","React"], address:{city:"Noida",pin:201304} } 
] )

// 1. Display all students
db.students.find()

// 2. Display only the Name, Course, and Marks fields without displaying the _id field.
db.students.find({},{name: 1, course: 1, marks: 1, _id: 0})

// 3. Find students whose age is greater than 20.
db.students.find({age: {$gt: 20}})

// 4. Find students whose marks are greater than or equal to 80.
db.students.find({marks: {$gte: 80}})

// 5. Find students whose age is less than 22.
db.students.find({age: {$lt: 22}})

// 6. Find students whose marks are less than or equal to 70.
db.students.find({marks: {$lte: 70}})

// 7. Find students whose age is equal to 20.
db.students.find({age: {$eq: 20}})

// 8. Find students whose course is not "BCA".
db.students.find({course: {$ne: 'BCA'}})

// 9. Find students whose marks are greater than 70 and less than 90.
db.students.find({$and: [
                        {marks : {$gt : 70}},
                        {marks: {$lt : 90}}
                ]
            })

// 10. Find students whose course is "B.Tech" and city is "Delhi".
db.students.find({$and: [
                        {course: 'B.Tech'},
                        {city : 'Delhi'}
                ]
            })

// 11. Find students whose course is "B.Tech" or "MCA".
db.students.find({$or: [
                        {course: 'B.Tech'},
                        {course : 'MCA'}
                ]
            })

// 12. Find students whose city is not "Delhi".
db.students.find({city: {$ne: 'Delhi'}})

// 13. Find students whose city is either "Delhi", "Noida", or "Lucknow" using a single operator.
db.students.find({$or: [
                {city: 'Delhi'},
                {city: 'Noida'},
                {city: 'Lucknow'}
]
})

// 14. Find students whose course is neither "MBA" nor "BCA".
db.students.find({$and:
            [
                {course: {$ne:'MBA'}},
                {course: {$ne:'BCA'}},
            ]
})

// 15. Display only Name, Email, and Skills without displaying the _id field.
db.students.find({},{name: 1, email: 1, skills: 1, _id: 0})

// 16. Find students whose marks are greater than or equal to 80 and whose age is less than or equal to 22
db.students.find({$and:
                [
                        {marks: {$gte: 80}},
                        {age: {$lte: 22}}
                ]
            })

// 17. Find students whose age is not greater than 22.
db.students.find({age: {$not: {$gt: 22}}})

// 18. Find students whose city is neither "Delhi" nor "Noida" using the $nor operator.
db.students.find({$nor: [
    {city: 'Delhi'},
    {city: 'Noida'}
]
})

// 19. Find students whose course is "MCA" and whose marks are greater than 75 or whose city is "Lucknow".
db.students.find({$and :
                    [
                        {$or: [
                                {city: 'Lucknow'},
                                {marks: {$gt : 75}}
                                ]
                        },
                        {course: 'MCA'}
                    ]
})

// 20. Display only Name, Course, City, Marks, and Age for students whose marks are greater than 60 and whose course is either "B.Tech" or "MCA".

db.students.find({$and: [
                        {marks : {$gt: 60}},
                        {$or: [
                                {course: 'B.Tech'},
                                {course: 'MCA'}
                            ]
                        }
                    ]},
    {name: 1, course: 1, city: 1, marks: 1, age: 1}
)
