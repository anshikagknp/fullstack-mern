//Assignment 3 - MongoDB - Employees Collection

db.employees.insertMany([
    {
        _id: 1,
        name: "Aman Kumar",
        age: 24,
        department: "IT",
        designation: "Software Engineer",
        salary: 45000,
        experience: 2,
        city: "Delhi",
        gender: "Male",
        skills: ["Java", "MongoDB", "React"],
        joiningDate: new Date("2022-03-15"),
        status: "Active"
    },
    {
        _id: 2,
        name: "Priya Sharma",
        age: 28,
        department: "HR",
        designation: "HR Manager",
        salary: 60000,
        experience: 5,
        city: "Noida",
        gender: "Female",
        skills: ["Recruitment", "Payroll"],
        joiningDate: new Date("2020-07-10"),
        status: "Active"
    },
    {
        _id: 3,
        name: "Rohit Verma",
        age: 30,
        department: "Sales",
        designation: "Sales Executive",
        salary: 52000,
        experience: 6,
        city: "Lucknow",
        gender: "Male",
        skills: ["Marketing", "CRM"],
        joiningDate: new Date("2019-06-01"),
        status: "Inactive"
    },
    {
        _id: 4,
        name: "Neha Singh",
        age: 26,
        department: "Finance",
        designation: "Accountant",
        salary: 48000,
        experience: 3,
        city: "Kanpur",
        gender: "Female",
        skills: ["Excel", "GST"],
        joiningDate: new Date("2021-09-20"),
        status: "Active"
    },
    {
        _id: 5,
        name: "Rahul Das",
        age: 35,
        department: "IT",
        designation: "Team Lead",
        salary: 90000,
        experience: 10,
        city: "Delhi",
        gender: "Male",
        skills: ["Java", "Spring Boot", "MongoDB"],
        joiningDate: new Date("2016-02-15"),
        status: "Active"
    },
    {
        _id: 6,
        name: "Sneha Gupta",
        age: 27,
        department: "Marketing",
        designation: "SEO Analyst",
        salary: 42000,
        experience: 4,
        city: "Patna",
        gender: "Female",
        skills: ["SEO", "Content"],
        joiningDate: new Date("2021-01-10"),
        status: "Active"
    },
    {
        _id: 7,
        name: "Arjun Yadav",
        age: 29,
        department: "IT",
        designation: "Backend Developer",
        salary: 70000,
        experience: 7,
        city: "Noida",
        gender: "Male",
        skills: ["NodeJS", "MongoDB"],
        joiningDate: new Date("2018-11-18"),
        status: "Active"
    },
    {
        _id: 8,
        name: "Pooja Mishra",
        age: 31,
        department: "Finance",
        designation: "Finance Manager",
        salary: 85000,
        experience: 8,
        city: "Delhi",
        gender: "Female",
        skills: ["Accounting", "Audit"],
        joiningDate: new Date("2017-05-12"),
        status: "Active"
    },
    {
        _id: 9,
        name: "Vikas Singh",
        age: 23,
        department: "Support",
        designation: "Support Engineer",
        salary: 35000,
        experience: 1,
        city: "Kanpur",
        gender: "Male",
        skills: ["Linux", "Networking"],
        joiningDate: new Date("2023-04-18"),
        status: "Active"
    },
    {
        _id: 10,
        name: "Anjali Kumari",
        age: 32,
        department: "HR",
        designation: "Recruiter",
        salary: 50000,
        experience: 7,
        city: "Patna",
        gender: "Female",
        skills: ["Interview", "Communication"],
        joiningDate: new Date("2018-09-01"),
        status: "Inactive"
    },
    {
        _id: 11,
        name: "Deepak Raj",
        age: 34,
        department: "IT",
        designation: "DevOps Engineer",
        salary: 95000,
        experience: 9,
        city: "Delhi",
        gender: "Male",
        skills: ["AWS", "Docker", "Kubernetes"],
        joiningDate: new Date("2017-12-11"),
        status: "Active"
    },
    {
        _id: 12,
        name: "Kiran Patel",
        age: 25,
        department: "Sales",
        designation: "Sales Manager",
        salary: 67000,
        experience: 5,
        city: "Ahmedabad",
        gender: "Female",
        skills: ["Sales", "Negotiation"],
        joiningDate: new Date("2020-08-15"),
        status: "Active"
    },
    {
        _id: 13,
        name: "Imran Khan",
        age: 36,
        department: "IT",
        designation: "Project Manager",
        salary: 120000,
        experience: 12,
        city: "Bangalore",
        gender: "Male",
        skills: ["Agile", "Java", "MongoDB"],
        joiningDate: new Date("2014-04-20"),
        status: "Active"
    },
    {
        _id: 14,
        name: "Sakshi Jain",
        age: 27,
        department: "Marketing",
        designation: "Digital Marketer",
        salary: 46000,
        experience: 4,
        city: "Jaipur",
        gender: "Female",
        skills: ["Google Ads", "SEO"],
        joiningDate: new Date("2021-07-11"),
        status: "Active"
    },
    {
        _id: 15,
        name: "Abhishek Gupta",
        age: 29,
        department: "Support",
        designation: "Technical Support",
        salary: 39000,
        experience: 5,
        city: "Lucknow",
        gender: "Male",
        skills: ["Windows", "Networking"],
        joiningDate: new Date("2020-01-19"),
        status: "Inactive"
    },
    {
        _id: 16,
        name: "Riya Sinha",
        age: 24,
        department: "IT",
        designation: "Frontend Developer",
        salary: 58000,
        experience: 2,
        city: "Patna",
        gender: "Female",
        skills: ["React", "JavaScript"],
        joiningDate: new Date("2022-10-10"),
        status: "Active"
    },
    {
        _id: 17,
        name: "Mohit Sharma",
        age: 33,
        department: "Finance",
        designation: "Auditor",
        salary: 76000,
        experience: 8,
        city: "Delhi",
        gender: "Male",
        skills: ["Audit", "GST"],
        joiningDate: new Date("2017-06-22"),
        status: "Active"
    },
    {
        _id: 18,
        name: "Nisha Verma",
        age: 30,
        department: "HR",
        designation: "HR Executive",
        salary: 45000,
        experience: 6,
        city: "Noida",
        gender: "Female",
        skills: ["Training", "Payroll"],
        joiningDate: new Date("2019-12-12"),
        status: "Active"
    },
    {
        _id: 19,
        name: "Tarun Mehta",
        age: 26,
        department: "Sales",
        designation: "Business Executive",
        salary: 49000,
        experience: 3,
        city: "Delhi",
        gender: "Male",
        skills: ["CRM", "Sales"],
        joiningDate: new Date("2021-03-15"),
        status: "Active"
    },
    {
        _id: 20,
        name: "Komal Sharma",
        age: 28,
        department: "IT",
        designation: "Database Administrator",
        salary: 88000,
        experience: 6,
        city: "Pune",
        gender: "Female",
        skills: ["MongoDB", "SQL"],
        joiningDate: new Date("2019-11-01"),
        status: "Active"
    }
]);

// 1. Find the average salary of Active IT employees.

// 2. Count employees from Delhi having salary above ₹50,000.

// 3. Find the maximum salary among Finance employees who are neither from Delhi nor Mumbai.

// 4. Find employees who know Java, React, and MongoDB simultaneously.

// 5. Find employees whose phone number starts with 98 or 99, sort them by salary (descending) and age (ascending), and display only the first 10 records.

// 6. Find employees who do not have MongoDB in their skills.

// 7. Find employees who earn more than the average salary of their own department but less than the company average salary.

// 8. Find departments where the average experience is greater than the company average experience.

// 9. Display employee name and total experience after adding 2 years.

// 10. Display the total number of employees in each department.

// 11. Remove the skills field from employees whose experience is less than 3 years, then count the remaining documents having the skills field.

// 12. Display the top 3 departments with the highest average salary.

// 13. Find the total number of employees in every city whose experience is greater than 5 years.

// 14. Display the total number of employees in each department.

// 15. Update the designation from "Software Engineer" to "Senior Software Engineer" where experience is greater than 5 years.

// 16. Find employees whose department is not HR and salary is less than ₹50,000.

// 17. Increase the salary of every employee in the Software Development department by ₹10,000.

// 18. Find the top 3 departments having the highest average salary, considering only Active employees with experience greater than or equal to 5 years.

// 19. Find departments where at least one employee's name starts with A, R, or S, then calculate the average salary of those departments.

// 20. Find employees whose department starts with S or M, then calculate the average experience department-wise.

// 21. Find employees eligible for promotion where:
//     • Experience is greater than or equal to 5 years.
//     • Salary is greater than or equal to ₹80,000.
//     • Department is either Software Development or Data Science.

// 22. Find employees whose:
//     • Age is between 25 and 30 years.
//     • Experience is greater than 3 years.
//     • City is either Delhi or Noida.

// 23. Count employees according to designation using $sortByCount.

// 24. Find employees whose salary is between the department average salary and the company average salary.

// 25. Find the maximum salary of female employees in every department.

// 26. Find employees whose names start with A, then calculate the average salary department-wise.

// 27. Remove the mobile field only from employees whose email belongs to Yahoo.

// 28. Find employees who have both "Java" and "MongoDB" in their skills array, then calculate the average salary grouped by city.

// 29. Build a single aggregation pipeline that returns:
//     • Company total salary.
//     • Highest-paid employee.
//     • Lowest-paid employee.
//     • Average experience.
//     • Total Active employees.
//     • Total Inactive employees.

// 30. Create one aggregation pipeline that returns:
//     • Department.
//     • Employee Count.
//     • Average Salary.
//     • Highest Salary.
//     • Lowest Salary.
//     • Total Salary.
//     • Average Experience.