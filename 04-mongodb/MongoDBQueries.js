// show databases
// show dbs
// use AnshikaDB
// show dbs - not showing - non-existent database (physically)

// db.createCollection(collection_name)
db.createCollection("employee")

//------------------------ new collection: employee ----------------------------

//Insert one record at once
db.employee.insertOne({
                    empName: 'Sachin',
                    empAge: 45,
                    empEmail: 'sachin@gmail.com'
                    })

db.employee.insertOne({
                    empName: 'Anshika',
                    empAge: 23,
                    empEmail: 'anshika@gmail.com'
                    })

db.employee.insertOne({
                    empName: 'Yash',
                    empAge: 24,
                    empEmail: 'yash@gmail.com',
                    empSalary: 35000
                    })

//to select all records
db.employee.find()

//Insert many records at once as documents
//here a nested record is also a document or an array
db.employee.insertMany([{
        empName: 'Ravi',
        empAge: 26,
        empEmail: 'ravi@gmail.com',
        empSalary: 39000.76
    },

    {
        empName: 'Mehak',
        empAge: 26,
        empEmail: 'mehak@gmail.com',
        empSalary: 85000,
        empSkills:['C', "C++", "Python"]
    },

    {
        empName: 'Saurabh',
        empAge: 26,
        empEmail: 'saurabh@gmail.com',
        empSalary: 76000,
        empSkills:['C', "C++", "Python"],
        empAddress:
        {
            houseNo: 1011,
            city: 'Mumbai',
            pincode: 101101
        }
    }
])

//Inclusion Projection (Include the fields)
db.employee.find({},{empName: 1, empAge: 1, _id:0})

//This will give error, except for _id
db.employee.find({},{empName: 1, empSalary: 0, _id:0})

//Exclusion Projection (Exclude the fields)
db.employee.find({},{empSkills: 0, empSalary: 0, _id:0})

//Operaters
//equal to (==)
db.employee.find({empName: 'Ravi'})
db.employee.find({empName: {$eq: 'Ravi'}})

//less than and equal to (<=)
db.employee.find({empSalary: 50000})
db.employee.find({empSalary: {$lte: 50000}})

//greater than and equal to (>=)
db.employee.find({empAge: 20})
db.employee.find({empAge: {$gte: 20}})

//single array values can be fetched directly
db.employee.find({empSkills: 'C++' })


//finds if a document exists in a database
//$eq can find only one document at a time
//$in can find a set of documents in the form of an array
db.employee.find({empName: {$eq: 'Mehak'}})
db.employee.find({empName: {$in: ['Mehak', 'Ravi', 'Abhay','Virat', 'Anshika']}})

db.employee.find({$and: [
    {empName: "Mehak"},
    {empAge: {$gte: 21}},
    {empEmail: 'mehak@gmail.com'}
]
})

db.employee.find({$or: [
    {empName: "Mehak"},
    {empAge: {$gte: 21}},
    {empEmail: 'ravi@gmail.com'}
]
})

db.employee.find({$and: [
    {empName: "Mehak"},
    {empAge: {$not: {$lte: 21}}},
]
})

//$type operator
//$exists operator
db.employee.find({$and: [
    {empSalary: {$exists: true}},
    {empSalary: {$type: 'int'}},
]})

//updateOne and updateMany
db.employee.updateOne(
    {
        empName: 'Sachin'
    },
    {
        $set: {empAge: 50}
    }
)

db.employee.updateMany(
    {
        empName: 'Sachin'
    },
    {
        $set: {empAge: 51, empEmail: 'tendulkar@gmail.com'}
    }
)

db.employee.updateMany(
    {
        empName: 'Nayan'
    },
    {
        $set: {empAge: 21, empEmail: 'nayan@gmail.com'}
    }
)

db.employee.updateMany(
    {
        empName: 'Nayan'
    },
    {
        $set: {empAge: 21, empEmail: 'nayan@gmail.com'}
    },
    {upsert: true}
)

//rename a field
db.employee.updateMany(
    {
        empName: 'Nayan'
    },
    {
        $rename: {"empAge": "Age"}
    }
)

//remove a field
db.employee.updateMany(
    {
        empName: 'Nayan'
    },
    {
        $unset: {"Age": ""}
    }
)

//Delete many dataset: deletes whole entry
db.employee.deleteMany({empName: 'Anshika'})

//---------------------------- new collection : assignment1 ---------------------------------

db.assignment1.insertMany([
    {
        "_id": 1,
        "name": "John Doe",
        "age": 28,
        "hobbies": ["Reading", "Swimming", "Cycling"],
        "about": "I am a software engineer who loves coding."
    },
    {
        "_id": 2,
        "name": "Emily Smith",
        "age": 32,
        "hobbies": ["Dancing", "Traveling", "Cooking"],
        "about": "Travel blogger and food enthusiast."
    },
    {
        "_id": 3,
        "name": "Michael Johnson",
        "age": 40,
        "hobbies": ["Photography", "Gardening", "Reading"],
        "about": "Passionate about nature and photography."
    },
    {
        "_id": 4,
        "name": "Sophia Brown",
        "age": 25,
        "hobbies": ["Music", "Drawing", "Gaming"],
        "about": "Aspiring artist who enjoys music and sketching."
    },
    {
        "_id": 5,
        "name": "David Wilson",
        "age": 36,
        "hobbies": ["Boxing", "Swimming", "Hiking"],
        "about": "Fitness trainer and outdoor explorer."
    }
]);

// Find a document using a keyword - case sensitive
db.assignment1.find({ about: /Fitness trainer/ });

// Find a document using a keyword - case insensitive
db.assignment1.find({ about: /MUsic/i });

db.assignment1.find({ name: /o/i });

// Starts with '^'
db.assignment1.find({ name: /^s/i });

// Ends with '$'
db.assignment1.find({ name: /n$/i });

// Starts with - find a name with a particular letter at a particular place
db.assignment1.find({ name: /^.{2}c/ });

// Ends with - find a name with a particular letter at a particular place
db.assignment1.find({ name: /s.{2}$/ });

// Find the number of records
db.assignment1.find().count();

// Limit - find first n records
db.assignment1.find().limit(2);

// Skip - skips first n records
db.assignment1.find().skip(2);

//------------------------------ back to employee collection --------------------------

//sort : 1 for ascending order
//sort : -1 for descending order
db.employee.find().sort({empName: 1})
db.employee.find().sort({empName: -1})

//sorts empName in ascending order and their age in descending order
db.employee.find().sort({empName: 1, empAge: -1})

//returns date in string format - immutable
Date()

//returns date object, stores date, month and year in JSON, easier to manipulate
new Date()

//returns date objects
new ISODate()

//------------------------- new collection : DateCollection ----------------------------

db.DateCollection.insertMany([
        {
            aboutDate: "Date using 'Date()'",
            insertedAt: Date()
        },
        {
            //UTC format
            aboutDate: "Date using 'new Date()'",
            insertedAt: new Date()
        },
        {
            //UTC format
            aboutDate: "Date using 'new ISODate()'",
            insertedAt: new ISODate()
        }
])

//Field Alias: RecordInsertedAt
db.DateCollection.find({insertedAt: {$type: 'date'}},
                        {
                            RecordInsertedAt:
                            {
                                $dateToString:
                                {
                                    date: "$insertedAt",
                                    format: "%d-%B-%Y %H:%M:%S",
                                    timezone: "Asia/Kolkata" //"+05:30"
                                }
                            }
                        })

//----------------------- new collection : Assignment2 ------------------------------------

db.assignment2.insertMany([
    {
        "_id": 1,
        "name": "Amit Sharma",
        "department": "Sales",
        "status": "Inactive",
        "mobile": "9812345678",
        "tempAddress": "Civil Lines",
        "updatedAt": "2025-01-01T00:00:00Z",
        "city": "Delhi",
        "salary": 85000,
        "age": 28,
        "email": "amit.s@gmail.com",
        "designation": "Senior General Manager",
        "joiningDate": "2021-03-15T09:30:00Z",
        "role": "Manager",
        "oldRole": "Assistant Manager",
        "skills": ["Java", "MongoDB"],
        "workMode": "On-site"
    },
    {
        "_id": 2,
        "name": "Ananya Roy",
        "department": "HR",
        "status": "Pending",
        "mobile": "9988776655",
        "tempAddress": "Rohini",
        "updatedAt": "2025-02-10T00:00:00Z",
        "city": "Delhi",
        "salary": 62000,
        "age": 24,
        "email": "ananya@yahoo.com",
        "designation": "HR Specialist",
        "joiningDate": "2022-07-20T10:15:00Z",
        "role": "HR Lead",
        "skills": ["Recruitment", "Payroll"],
        "workMode": "Remote"
    },
    {
        "_id": 3,
        "name": "Sameer Khan",
        "department": "IT",
        "status": "Active",
        "mobile": "9876543210",
        "tempAddress": "Connaught Place",
        "updatedAt": "2024-11-12T00:00:00Z",
        "city": "Delhi",
        "salary": 95000,
        "age": 30,
        "email": "sameer.khan@gmail.com",
        "designation": "Senior Software Engineer",
        "joiningDate": "2019-11-05T08:45:30Z",
        "role": "Developer",
        "oldRole": "Junior Dev",
        "skills": ["Python", "Machine Learning"],
        "workMode": "Hybrid"
    },
    {
        "_id": 4,
        "name": "Suresh Raina",
        "department": "Finance",
        "status": "Active",
        "mobile": "9123456789",
        "city": "Lucknow",
        "salary": 72000,
        "age": 29,
        "email": "suresh@company.com",
        "temporaryPassword": "tempPass123",
        "designation": "Finance Analyst",
        "joiningDate": "2020-01-10T11:00:00Z",
        "skills": ["Excel", "Financial Modeling"],
        "workMode": "On-site"
    },
    {
        "_id": 5,
        "name": "Sanjay Verma",
        "department": "IT",
        "status": "Active",
        "mobile": "9911223344",
        "city": "New Delhi",
        "salary": 110000,
        "age": 35,
        "email": "sanjay.v@yahoo.com",
        "designation": "Engineering Manager",
        "joiningDate": "2018-05-18T14:20:00Z",
        "skills": ["System Design", "Node.js"],
        "workMode": "On-site"
    },
    {
        "_id": 6,
        "name": "Aman Gupta",
        "department": "Marketing",
        "status": "Inactive",
        "mobile": "9899001122",
        "city": "Mumbai",
        "salary": 55000,
        "age": 23,
        "email": "aman.gupta@gmail.com",
        "designation": "Marketing Associate",
        "joiningDate": "2023-09-01T09:00:00Z",
        "skills": ["SEO", "Content Writing"],
        "workMode": "Remote"
    },
    {
        "_id": 7,
        "name": "Rohan Mehta",
        "department": "IT",
        "status": "Active",
        "mobile": "9900112233",
        "city": "Delhi",
        "salary": 125000,
        "age": 32,
        "email": "rohan.m@gmail.com",
        "designation": "Senior Product Manager",
        "joiningDate": "2017-04-12T10:00:00Z",
        "skills": ["Agile", "Product Strategy"],
        "workMode": "Hybrid"
    },
    {
        "_id": 8,
        "name": "Riya Kapoor",
        "department": "Design",
        "status": "Active",
        "mobile": "9811223344",
        "city": "New York",
        "salary": 90000,
        "age": 27,
        "email": "riya.k@company.com",
        "temporaryPassword": "passToChange",
        "designation": "UI/UX Designer",
        "joiningDate": "2021-11-30T16:45:00Z",
        "skills": ["Figma", "UI Design"],
        "workMode": "On-site"
    },
    {
        "_id": 9,
        "name": "Rahul Dravid",
        "department": "Operations",
        "status": "Active",
        "mobile": "9788990011",
        "city": "Bangalore",
        "salary": 140000,
        "age": 40,
        "email": "rahul.d@gmail.com",
        "designation": "Operations Director",
        "joiningDate": "2015-08-15T08:30:00Z",
        "skills": ["Management", "Logistics"],
        "workMode": "On-site"
    },
    {
        "_id": 10,
        "name": "Mohan",
        "department": "Support",
        "status": "Active",
        "mobile": "9912341234",
        "city": "Delhi",
        "salary": 45000,
        "age": 22,
        "email": "mohan@yahoo.com",
        "designation": "Support Executive",
        "joiningDate": "2024-02-01T09:15:00Z",
        "skills": ["Customer Service", "Ticketing"],
        "workMode": "Remote"
    },
    {
        "_id": 11,
        "name": "Maran",
        "department": "IT",
        "status": "Active",
        "mobile": "9876123456",
        "city": "Chennai",
        "salary": 78000,
        "age": 28,
        "email": "maran@company.com",
        "designation": "Database Administrator",
        "joiningDate": "2022-10-10T12:00:00Z",
        "skills": ["MongoDB", "SQL"],
        "workMode": "Hybrid"
    },
    {
        "_id": 12,
        "name": "Manan Khan",
        "department": "IT",
        "status": "Active",
        "mobile": "9811122233",
        "city": "Lucknow",
        "salary": 88000,
        "age": 29,
        "email": "manan.khan@gmail.com",
        "designation": "Senior QA Engineer",
        "joiningDate": "2023-01-15T10:30:00Z",
        "role": "QA Tester",
        "oldRole": "Junior QA",
        "skills": ["Selenium", "Automation"],
        "workMode": "On-site"
    },
    {
        "_id": 13,
        "name": "Sunil Chhetri",
        "department": "Sports",
        "status": "Active",
        "mobile": "9955443322",
        "city": "Kolkata",
        "salary": 130000,
        "age": 36,
        "email": "sunil@gmail.com",
        "designation": "Team Manager",
        "joiningDate": "2016-06-01T07:00:00Z",
        "skills": ["Leadership", "Strategy"],
        "workMode": "On-site"
    },
    {
        "_id": 14,
        "name": "Aarav",
        "department": "Sales",
        "status": "Inactive",
        "mobile": "9877665544",
        "city": "Delhi",
        "salary": 40000,
        "age": 21,
        "email": "aarav@gmail.com",
        "designation": "Sales Executive",
        "joiningDate": "2024-05-10T11:30:00Z",
        "skills": ["Communication", "Direct Sales"],
        "workMode": "Hybrid"
    },
    {
        "_id": 15,
        "name": "Rajesh Kumar",
        "department": "IT",
        "status": "Active",
        "mobile": "9822334455",
        "city": "Delhi",
        "salary": 98000,
        "age": 31,
        "email": "rajesh.k@gmail.com",
        "designation": "DevOps Manager",
        "joiningDate": "2019-09-09T09:00:00Z",
        "skills": ["Docker", "Kubernetes"],
        "workMode": "On-site"
    },
    {
        "_id": 16,
        "name": "Ramesh Khan",
        "department": "HR",
        "status": "Active",
        "mobile": "9933445566",
        "city": "New Mumbai",
        "salary": 67000,
        "age": 30,
        "email": "ramesh.khan@company.com",
        "designation": "HR Assistant",
        "joiningDate": "2021-08-20T13:15:00Z",
        "role": "Recruiter",
        "oldRole": "Trainee",
        "skills": ["Onboarding", "Screening"],
        "workMode": "On-site"
    },
    {
        "_id": 17,
        "name": "Swati Mishra",
        "department": "Legal",
        "status": "Active",
        "mobile": "9844556677",
        "city": "Delhi",
        "salary": 105000,
        "age": 33,
        "email": "swati.m@yahoo.com",
        "designation": "Legal Advisor",
        "joiningDate": "2018-12-01T15:45:00Z",
        "skills": ["Corporate Law", "Compliance"],
        "workMode": "Hybrid"
    },
    {
        "_id": 18,
        "name": "Ritika Singh",
        "department": "IT",
        "status": "Active",
        "mobile": "9944556677",
        "city": "Chandigarh",
        "salary": 82000,
        "age": 26,
        "email": "ritika@gmail.com",
        "designation": "Frontend Developer",
        "joiningDate": "2022-03-25T10:00:00Z",
        "skills": ["React", "CSS3"],
        "workMode": "Remote"
    },
    {
        "_id": 19,
        "name": "Aakash Jain",
        "department": "Finance",
        "status": "Active",
        "mobile": "9855667788",
        "city": "Delhi",
        "salary": 76000,
        "age": 27,
        "email": "aakash@company.com",
        "temporaryPassword": "pass456ToClear",
        "designation": "Senior Accountant",
        "joiningDate": "2020-11-11T11:11:11Z",
        "skills": ["Tally", "Auditing"],
        "workMode": "On-site"
    },
    {
        "_id": 20,
        "name": "Siddharth",
        "department": "IT",
        "status": "Active",
        "mobile": "9966778899",
        "city": "Pune",
        "salary": 115000,
        "age": 34,
        "email": "siddharth@gmail.com",
        "designation": "Project Manager",
        "joiningDate": "2017-10-10T10:10:10Z",
        "skills": ["Scrum", "Jira"],
        "workMode": "Hybrid"
    }
]);

//Update all employees whose name starts with A, set department to "IT" and status to "Active"
//using a single query
db.assignment2.updateMany({name: /^A/i},{$set: {department: 'IT', status: "Active"}})

//Rename the field mobile to phone, remove the tempAddress field, and update updatedAt with the 
//current date for employees whose city is "Delhi".
db.assignment2.updateMany({city: "Delhi"},
                        {$rename: {"mobile": "phone"},
                        $unset: {"tempAddress": ""},
                        $set: {"updatedAt": new Date()}
                        }
                    )

//Find employees whose name starts with S, sort them by salary in descending order, and
//display only the first 5 records.
db.assignment2.find({name: /^S/i}).sort({salary : -1}).limit(5)

//Find employees whose email ends with gmail.com (case-insensitive), skip the first 3 matching
//documents, and display the next 5.
db.assignment2.find({email: /gmail\.com$/i}).skip(3).limit(5)


//Update all employees whose designation contains the word Manager (case-insensitive) by setting 
//bonusEligible to true.
db.assignment2.updateMany(
                        {designation: /Manager/i },
                        {$set: {bonusEligible: true}},
                        {upsert: true})


//----------------------------- new collection: users ---------------------------------

// aggregate function
db.users.insertMany([
    {
        _id: 1,
        firstName: "John",
        lastName: "King",
        gender: "male",
        email: "john.king@abc.com",
        salary: 5000,
        department: {
            name: "HR"
        }
    },
    {
        _id: 2,
        firstName: "Sachin",
        lastName: "Tendulkar",
        gender: "male",
        email: "sachin.t@abc.com",
        salary: 8000,
        department: {
            name: "Finance"
        }
    },
    {
        _id: 3,
        firstName: "Virat",
        lastName: "kohli",
        gender: "male",
        email: "kohli@abc.com",
        salary: 7500,
        department: {
            name: "Marketing"
        }
    },
    {
        _id: 4,
        firstName: "Rohini",
        lastName: "Sharma",
        gender: "female",
        email: "roh@abc.com",
        salary: 5000,
        department: {
            name: "HR"
        }
    },
    {
        _id: 5,
        firstName: "Kapil",
        lastName: "Dev",
        gender: "male",
        email: "kapil.d@abc.com",
        salary: 4500,
        department: {
            name: "Finance"
        }
    },
    {
        _id: 6,
        firstName: "Amit",
        lastName: "B",
        gender: "male",
        email: "amit.b@abc.com",
        salary: 7000,
        department: {
            name: "Marketing"
        }
    }
])

// Aggregate function used with projection
// Displays only selected fields
db.users.aggregate([
    {
        $project: {
            firstName: 1,
            email: 1,
            salary: 1
        }
    }
])

// $match
// Filter female users and display selected fields
db.users.aggregate([
    {
        $match: {
            gender: "female"
        }
    },
    {
        $project: {
            firstName: 1,
            email: 1,
            salary: 1
        }
    }
])

// Filter users whose salary is between 5000 and 7000 (inclusive)
db.users.aggregate([
    {
        $match: {
            $and: [
                { salary: { $gte: 5000 } },
                { salary: { $lte: 7000 } }
            ]
        }
    },
    {
        $project: {
            firstName: 1,
            email: 1,
            salary: 1
        }
    }
])

// Group users by gender
db.users.aggregate([
    {
        $group: {
            _id: "$gender"
        }
    }
])

// Group users by department and calculate statistics
db.users.aggregate([
    {
        $group: {
            _id: "$department.name",
            TotalEmployees: { $sum: 1 },
            AverageSalary: { $avg: "$salary" },
            MinimumSalary: { $min: "$salary" },
            MaximumSalary: { $max: "$salary" }
        }
    }
])

// Group users by department with salary statistics
// Sort by total salary and average salary
// Limit the results
// Skip the first document
// Display only selected fields
db.users.aggregate([
    {
        $group: {
            _id: "$department.name",
            TotalEmployees: { $sum: 1 },
            AverageSalary: { $avg: "$salary" },
            MinimumSalary: { $min: "$salary" },
            MaximumSalary: { $max: "$salary" },
            TotalSalary: { $sum: "$salary" }
        }
    },
    {
        $sort: {
            TotalSalary: -1,
            AverageSalary: -1
        }
    },
    {
        $limit: 2
    },
    {
        $skip: 1
    },
    {
        $project: {
            TotalEmployees: 1,
            TotalSalary: 1
        }
    }
])

// $sample
// Generates random documents from the collection
db.users.aggregate([
    {
        $sample: {
            size: 3
        }
    }
])

// $sortByCount
// Groups documents by the specified field
// Counts how many times each value occurs
// Sorts the result in descending order based on the count
db.users.aggregate([
    {
        $sortByCount: "$department.name"
    }
])

// Array Operations
//---------------------------- new collection : trainer ------------------------------

db.createCollection("trainer")

// Insert Sample Document
db.trainer.insertOne({
    id: 1,
    name: "John",
    skills: ["C", "JavaScript", "Node.js"],
    marks: [75, 80, 90],
    students: [
        {
            name: "Ali",
            age: 20
        },
        {
            name: "Sara",
            age: 21
        }
    ]
})

// 1. Find Operations

// Find documents containing a specific array value
db.trainer.find({
    skills: "JavaScript"
})

// Find documents containing any matching value
db.trainer.find({
    skills: {
        $in: ["JavaScript", "Python"]
    }
})

// Find documents containing all specified values
db.trainer.find({
    skills: {
        $all: ["JavaScript", "Python"]
    }
})

// Find documents with an array of the given size
db.trainer.find({
    skills: {
        $size: 3
    }
})

// Find using array index
db.trainer.find({
    "skills.0": "C"
})

// Find using embedded document field
db.trainer.find({
    "students.name": "Ali"
})

// Find using $elemMatch
db.trainer.find(
    {
        students:
        {
            $elemMatch:
            {
                age: { $gte: 20 }
            }
        }
    }
)

// 2. Update Operations

// Add a single value
db.trainer.updateOne(
    { name: "John" },
    {
        $push:
        {
            skills: "AI-ML"
        }
    }
)

//Add multiple values
db.trainer.updateOne(
    { name: "John" },
    {
        $push:
        {
            skills:
            {
                $each: ["Express", "React"]
            }
        }
    }
)

//Add unique values only
//$addToSet prevents duplicate values
db.trainer.updateOne(
    { name: "John" },
    {
        $addToSet:
        {
            skills:
            {
                $each: ["Express", "React"]
            }
        }
    }
)

//Insert at a specific position
db.trainer.updateOne(
    { name: "John" },
    {
        $push:
        {
            skills:
            {
                $each: ["Python"],
                $position: 1
            }
        }
    }
)

//Insert values and keep only the first 3 elements
db.trainer.updateOne(
    { name: "John" },
    {
        $push:
        {
            skills:
            {
                $each: ["TypeScript"],
                $position: 2,
                $slice: 3
            }
        }
    }
)

//Insert values and sort the array
db.trainer.updateOne(
    { name: "John" },
    {
        $push:
        {
            skills:
            {
                $each: ["TypeScript"],
                $position: 2,
                $slice: 3,
                $sort: 1
            }
        }
    }
)

//Update value by array index
db.trainer.updateOne(
    { name: "John" },
    {
        $set: { "skills.1": "JavaScript" }
    }
)

//Replace JavaScript with TypeScript
db.trainer.updateOne(
    {
        skills: "JavaScript"
    },
    {
        $set: { "skills.1": "TypeScript" }
    }
)

//Update the first matching array element
db.trainer.updateOne(
    {
        skills: "JavaScript"
    },
    {
        $set: { "skills.$": "TypeScript" }
    }
)

//Update embedded document
db.trainer.updateOne(
    {
        "students.name": "Ali"
    },
    {
        $set: { "students.$.age": 22 }
    }
)

//Remove a single value
db.trainer.updateOne(
    {
        name: "John"
    },
    {
        $pull:
        {
            skills: "Node.js"
        }
    }
)

//Remove multiple matching values
db.trainer.updateOne(
    {
        name: "John"
    },
    {
        $pull:
        {
            skills: { $in: ["JavaScript", "Python"] }
        }
    }
)

//Remove matching embedded documents
db.trainer.updateOne(
    {
        name: "John"
    },
    {
        $pull:
        {
            students:
            {
                age: { $gt: 21 }
            }
        }
    }
)

//Remove the last element
db.trainer.updateOne(
    {},
    {
        $pop: { skills: 1 }
    }
)

//Remove the first element
db.trainer.updateOne(
    {},
    {
        $pop: { skills: -1 }
    }
)