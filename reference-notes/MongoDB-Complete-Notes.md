# 🍃 MongoDB — The Complete Notes (Basics → Advanced)

> Compiled from the official MongoDB documentation (mongodb.com/docs) and cross-referenced with the practice repo (`04-mongodb/MongoDBQueries.js`). Every query in the repo is explained in context, and every major MongoDB topic *not* covered by the repo (indexes, aggregation stages beyond `$match`/`$group`, schema design, transactions, replication, sharding, security, GridFS, drivers...) is added so this is a genuine one-stop reference.

---

## 📑 Table of Contents

1. [What is MongoDB & Why NoSQL](#1-what-is-mongodb--why-nosql)
2. [Core Concepts: Database, Collection, Document, BSON](#2-core-concepts-database-collection-document-bson)
3. [Installing & Connecting (mongosh, Compass, Atlas)](#3-installing--connecting)
4. [Databases & Collections](#4-databases--collections)
5. [CRUD — Create (Insert)](#5-crud--create-insert)
6. [CRUD — Read (Find) & Projections](#6-crud--read-find--projections)
7. [Query Operators (Comparison, Logical, Element)](#7-query-operators)
8. [Regex Queries](#8-regex-queries)
9. [Pagination: count, limit, skip](#9-pagination-count-limit-skip)
10. [Sorting](#10-sorting)
11. [Dates in MongoDB](#11-dates-in-mongodb)
12. [CRUD — Update](#12-crud--update)
13. [CRUD — Delete](#13-crud--delete)
14. [Array Operations (Query + Update)](#14-array-operations-query--update)
15. [Embedded/Nested Documents](#15-embeddednested-documents)
16. [The Aggregation Framework](#16-the-aggregation-framework)
17. [Indexes](#17-indexes)
18. [Schema Validation](#18-schema-validation)
19. [Data Modeling: Embedding vs Referencing](#19-data-modeling-embedding-vs-referencing)
20. [Transactions](#20-transactions)
21. [Text Search & Geospatial Queries](#21-text-search--geospatial-queries)
22. [Replication (Replica Sets)](#22-replication-replica-sets)
23. [Sharding](#23-sharding)
24. [Security & Authentication](#24-security--authentication)
25. [Backup, Restore & Import/Export](#25-backup-restore--importexport)
26. [Performance: explain(), Profiler](#26-performance-explain--profiler)
27. [GridFS (Storing Large Files)](#27-gridfs-storing-large-files)
28. [Change Streams](#28-change-streams)
29. [Drivers & Mongoose (Node.js ODM)](#29-drivers--mongoose-nodejs-odm)
30. [MongoDB Atlas (Cloud)](#30-mongodb-atlas-cloud)
31. [Quick Reference Cheatsheet](#31-quick-reference-cheatsheet)

---

## 1. What is MongoDB & Why NoSQL

- **MongoDB** is a **document-oriented NoSQL database** — instead of rows/tables (like SQL/RDBMS), it stores data as flexible, JSON-like **documents** grouped into **collections**.
- **NoSQL** = "Not Only SQL" — a family of databases (document, key-value, column, graph) designed for flexible schemas and horizontal scaling, as opposed to the rigid, table-based schema of relational databases.

| SQL (e.g. MySQL) | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary Key | `_id` field |
| JOIN | `$lookup` (aggregation) or manual referencing/embedding |
| Schema fixed at table creation | Schema-flexible ("schema-less") — each document can have different fields |

### Why choose MongoDB?
- **Flexible schema** — great for evolving applications, rapid prototyping, and unstructured/semi-structured data.
- **Horizontal scalability** — built-in **sharding** distributes data across many servers.
- **High availability** — built-in **replication** via replica sets.
- **Rich query language** — supports filtering, aggregation, geospatial and text search, all in JSON-like syntax.
- **Natural fit for JSON-based apps** (Node.js/JavaScript stacks especially) since documents map directly to JS objects.

---

## 2. Core Concepts: Database, Collection, Document, BSON

- **Database** — a physical container for collections (like a schema in SQL). A single MongoDB server can host many databases.
- **Collection** — a group of documents (like a SQL table), but with **no enforced schema** by default — documents in the same collection can have completely different fields.
- **Document** — a single record, stored as a set of key-value pairs, conceptually just like a JSON object:
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c0d1"),
  "empName": "Sachin",
  "empAge": 45,
  "empEmail": "sachin@gmail.com"
}
```
- **BSON (Binary JSON)** — the actual binary-encoded format MongoDB stores documents in on disk. BSON extends JSON with extra types JSON doesn't have natively — `ObjectId`, `Date`, `Binary`, `Decimal128`, `int32`/`int64` (vs. JSON's single generic "number" type), `Regex`, `Timestamp`. This is *why* `new Date()`, `ObjectId()`, and `$type: 'int'` all work as first-class concepts in MongoDB.
- **`_id` field** — every document *must* have a unique `_id`; if you don't supply one, MongoDB auto-generates a 12-byte `ObjectId` (encoding timestamp + machine + process + counter). You *can* supply your own `_id` (the repo's `assignment1`/`assignment2` collections use plain integers `1, 2, 3...` as `_id`).

---

## 3. Installing & Connecting

### Ways to run MongoDB
1. **Local install** (Community Server) — download from mongodb.com, run the `mongod` server process, then connect with a client.
2. **MongoDB Atlas** — MongoDB's official fully-managed cloud service (free tier available) — no local install needed. See [section 30](#30-mongodb-atlas-cloud).
3. **Docker**: `docker run -d -p 27017:27017 mongo`

### Clients
| Tool | What it is |
|---|---|
| **`mongosh`** (MongoDB Shell) | The modern official command-line shell/REPL — what all the queries in the repo (`db.employee.find()`, etc.) are written for. Replaces the legacy `mongo` shell. |
| **MongoDB Compass** | Official GUI — browse databases/collections visually, build queries, view schema, explain plans, without writing shell commands. |
| **Drivers** | Official libraries for Node.js, Python, Java, C#, Go, etc. to connect from application code. |

### Connecting
```bash
# Local default connection
mongosh

# Connect to a specific host/port
mongosh "mongodb://localhost:27017"

# Connect to Atlas (cloud) with a connection string
mongosh "mongodb+srv://username:password@cluster0.mongodb.net/myDB"
```

---

## 4. Databases & Collections

```js
show dbs                 // list all databases on the server
use AnshikaDB             // switch to (or create) a database named AnshikaDB
db                        // shows current database in use
show collections          // list collections in the current db
```
> **Important nuance from the repo:** `use AnshikaDB` followed immediately by `show dbs` will **not** show `AnshikaDB` yet — MongoDB is **lazy**: a database (and a collection) is only *physically* created once you actually write data into it (insert a document or explicitly create a collection). Simply `use`-ing a database name just switches your shell's *context* to it.

### Creating a collection explicitly
```js
db.createCollection("employee")
```
- Explicit creation is optional — inserting into a non-existent collection (`db.newColl.insertOne({...})`) **auto-creates** it. Use explicit `createCollection()` when you need to pass creation-time options, e.g.:
```js
db.createCollection("logs", {
  capped: true,      // fixed-size collection, oldest docs auto-removed (great for logs/queues)
  size: 5242880,      // max size in bytes
  max: 5000            // max number of documents
})

db.createCollection("orders", {
  validator: { $jsonSchema: { /* schema rules — see section 18 */ } }
})
```

### Dropping databases/collections
```js
db.employee.drop()       // deletes the collection
db.dropDatabase()        // deletes the entire current database
```

---

## 5. CRUD — Create (Insert)

### `insertOne()` — insert a single document
```js
db.employee.insertOne({
  empName: 'Sachin',
  empAge: 45,
  empEmail: 'sachin@gmail.com'
})
```
Returns `{ acknowledged: true, insertedId: ObjectId("...") }`.

### `insertMany()` — insert multiple documents at once (as an array)
```js
db.employee.insertMany([
  { empName: 'Ravi', empAge: 26, empEmail: 'ravi@gmail.com', empSalary: 39000.76 },
  { empName: 'Mehak', empAge: 26, empEmail: 'mehak@gmail.com', empSalary: 85000,
    empSkills: ['C', 'C++', 'Python'] },
  { empName: 'Saurabh', empAge: 26, empEmail: 'saurabh@gmail.com', empSalary: 76000,
    empSkills: ['C', 'C++', 'Python'],
    empAddress: { houseNo: 1011, city: 'Mumbai', pincode: 101101 } }
])
```
- **Key flexibility point (from the repo):** notice `empSalary` and `empSkills` don't exist on every document — that's completely valid; MongoDB's schema-less nature means each document in a collection can have a different shape.
- A field's value can itself be an **array** (`empSkills`) or a **nested/embedded document** (`empAddress`) — this is how MongoDB avoids needing JOINs for simple one-to-few relationships.
- By default, `insertMany` inserts documents in the given order and **stops on the first error** unless you pass `{ ordered: false }` (which continues inserting the remaining valid documents even if one fails).

---

## 6. CRUD — Read (Find) & Projections

### `find()` — retrieve documents
```js
db.employee.find()                       // all documents
db.employee.findOne()                    // just the first matching document
db.employee.find({ empName: 'Ravi' })    // filter (like WHERE in SQL)
```

### Projections — choosing which fields to return
The **second argument** to `find()` is the projection document.

**Inclusion projection** (only return listed fields):
```js
db.employee.find({}, { empName: 1, empAge: 1, _id: 0 })
```
**Exclusion projection** (return everything except listed fields):
```js
db.employee.find({}, { empSkills: 0, empSalary: 0, _id: 0 })
```
> ⚠️ **Rule confirmed by the repo's comment:** you **cannot mix** inclusion (`1`) and exclusion (`0`) in the same projection — `{ empName: 1, empSalary: 0, _id: 0 }` throws an error. The **only** exception is `_id`, which can always be explicitly excluded (`_id: 0`) alongside an inclusion projection, since it's included by default otherwise.

---

## 7. Query Operators

MongoDB's query operators (all start with `$`) let you build rich filter conditions.

### Comparison operators
| Operator | Meaning | Repo example |
|---|---|---|
| `$eq` | equal to | `db.employee.find({ empName: { $eq: 'Ravi' } })` |
| `$ne` | not equal to | `db.employee.find({ empName: { $ne: 'Ravi' } })` |
| `$gt` | greater than | `db.employee.find({ empAge: { $gt: 20 } })` |
| `$gte` | greater than or equal | `db.employee.find({ empAge: { $gte: 20 } })` |
| `$lt` | less than | `db.employee.find({ empSalary: { $lt: 50000 } })` |
| `$lte` | less than or equal | `db.employee.find({ empSalary: { $lte: 50000 } })` |
| `$in` | value is in a given array | `db.employee.find({ empName: { $in: ['Mehak','Ravi','Abhay'] } })` |
| `$nin` | value is **not** in a given array | `db.employee.find({ empName: { $nin: ['Mehak','Ravi'] } })` |

> Note: `db.employee.find({ empSalary: 50000 })` (a plain value, no operator) is implicitly the same as `{ empSalary: { $eq: 50000 } }` — shorthand equality.

**`$eq` vs `$in`** (explicitly called out in the repo): `$eq` matches a document against **one** value; `$in` matches against **any value from a given set/array** — much more efficient than chaining multiple `$or` clauses for the same field.

### Logical operators
```js
// $and — ALL conditions must be true
db.employee.find({
  $and: [
    { empName: "Mehak" },
    { empAge: { $gte: 21 } },
    { empEmail: 'mehak@gmail.com' }
  ]
})

// $or — AT LEAST ONE condition must be true
db.employee.find({
  $or: [
    { empName: "Mehak" },
    { empAge: { $gte: 21 } },
    { empEmail: 'ravi@gmail.com' }
  ]
})

// $not — negates a condition
db.employee.find({
  $and: [
    { empName: "Mehak" },
    { empAge: { $not: { $lte: 21 } } }
  ]
})

// $nor — none of the conditions may be true (not in the repo, but the logical counterpart)
db.employee.find({ $nor: [ { empName: "Mehak" }, { empAge: { $lt: 21 } } ] })
```
- On a single field, MongoDB implicitly ANDs multiple plain key-value conditions written directly in one object — you only need explicit `$and` when combining **multiple conditions on the same field**, or for clarity/complex nesting.

### Element operators
```js
// $exists — field is present (true) or absent (false) on the document
db.employee.find({ empSalary: { $exists: true } })

// $type — field's BSON data type matches
db.employee.find({ empSalary: { $type: 'int' } })

// Combined, as in the repo:
db.employee.find({
  $and: [
    { empSalary: { $exists: true } },
    { empSalary: { $type: 'int' } }
  ]
})
```
Common `$type` aliases: `"string"`, `"int"`, `"long"`, `"double"`, `"decimal"`, `"bool"`, `"date"`, `"array"`, `"object"`, `"objectId"`, `"null"`.

### Array access shorthand
```js
// Single value inside an array field can be matched directly, no operator needed
db.employee.find({ empSkills: 'C++' })
```

---

## 8. Regex Queries

Regular expressions let you do pattern/substring matching on string fields — MongoDB supports native JS-style regex literals as query values.

```js
// Case-sensitive substring match
db.assignment1.find({ about: /Fitness trainer/ })

// Case-insensitive ('i' flag)
db.assignment1.find({ about: /MUsic/i })
db.assignment1.find({ name: /o/i })

// Starts with '^'
db.assignment1.find({ name: /^s/i })

// Ends with '$'
db.assignment1.find({ name: /n$/i })

// A specific letter at a specific position (2 chars, then 'c')
db.assignment1.find({ name: /^.{2}c/ })

// A specific letter near the end ('s', then 2 any chars, then end)
db.assignment1.find({ name: /s.{2}$/ })
```
- Equivalent operator form (useful when the pattern is a variable, not a literal): `db.assignment1.find({ name: { $regex: "^s", $options: "i" } })`.
- `.` = any character, `^` = start of string, `$` = end of string, `{n}` = exactly n repetitions — standard regex syntax, MongoDB just applies it to string fields.
- ⚠️ Regex queries **cannot use an index efficiently** unless the pattern is left-anchored (`^prefix`) — unanchored regexes (`/keyword/`) force a full collection scan. For real full-text search needs, prefer a **text index** (see [section 21](#21-text-search--geospatial-queries)).

---

## 9. Pagination: count, limit, skip

```js
// Total number of matching documents
db.assignment1.find().count()

// First n records only
db.assignment1.find().limit(2)

// Skip the first n records (then return the rest)
db.assignment1.find().skip(2)

// Classic pagination combo: skip + limit
db.assignment2.find({ email: /gmail\.com$/i }).skip(3).limit(5)   // "page 2" of 5-per-page results
```
> Note: `.count()` is considered legacy on some drivers/versions in favor of `db.collection.countDocuments()` (accurate, accounts for a filter) or the fast-but-approximate `db.collection.estimatedDocumentCount()` (whole-collection count using collection metadata, much faster for huge collections without a filter).

---

## 10. Sorting

```js
db.employee.find().sort({ empName: 1 })    // ascending (A→Z, 0→9)
db.employee.find().sort({ empName: -1 })   // descending (Z→A, 9→0)

// Multi-field sort: primary key first, tie-breaker second
db.employee.find().sort({ empName: 1, empAge: -1 })

// Combined with pagination — sort THEN limit for "top N" queries
db.assignment2.find({ name: /^S/i }).sort({ salary: -1 }).limit(5)
```
`1` = ascending, `-1` = descending. Sorting on large collections benefits hugely from a matching **index** (see [section 17](#17-indexes)) — without one, MongoDB must sort in memory (or on disk, if it exceeds the 100MB in-memory sort limit).

---

## 11. Dates in MongoDB

```js
Date()          // returns a STRING representation of the current date/time — immutable, hard to manipulate/query
new Date()      // returns a proper JS Date OBJECT (stored as BSON Date in Mongo) — the one you should actually store
new ISODate()   // also returns a proper BSON Date object, explicitly signaling ISO 8601 format
```
- **Rule of thumb:** always store dates using `new Date()` (or `new ISODate()`), **never** `Date()` (no `new`) — the latter is a plain string, so you lose the ability to do date range queries (`$gte`/`$lte`), sort chronologically, or use date aggregation operators on it.

```js
db.DateCollection.insertMany([
  { aboutDate: "Date using 'Date()'",       insertedAt: Date() },       // string — avoid for real data
  { aboutDate: "Date using 'new Date()'",   insertedAt: new Date() },   // BSON Date ✅
  { aboutDate: "Date using 'new ISODate()'",insertedAt: new ISODate() } // BSON Date ✅
])
```

### Formatting dates in output with `$dateToString`
```js
db.DateCollection.find(
  { insertedAt: { $type: 'date' } },
  {
    RecordInsertedAt: {
      $dateToString: {
        date: "$insertedAt",
        format: "%d-%B-%Y %H:%M:%S",
        timezone: "Asia/Kolkata"      // or a fixed UTC offset like "+05:30"
      }
    }
  }
)
```
- This is a **computed/aliased field** in the projection — `RecordInsertedAt` doesn't exist on the stored document; it's generated on-the-fly at query time from `insertedAt`.
- Other handy date aggregation operators: `$year`, `$month`, `$dayOfMonth`, `$hour`, `$dateDiff`, `$dateAdd`, `$dateSubtract`.

---

## 12. CRUD — Update

### `updateOne()` vs `updateMany()`
```js
// updateOne — updates the FIRST document that matches the filter
db.employee.updateOne(
  { empName: 'Sachin' },
  { $set: { empAge: 50 } }
)

// updateMany — updates ALL documents that match the filter
db.employee.updateMany(
  { empName: 'Sachin' },
  { $set: { empAge: 51, empEmail: 'tendulkar@gmail.com' } }
)
```
Both take `(filter, update, options?)`. The **update document must use update operators** (`$set`, etc.) — passing a plain `{ empAge: 50 }` without `$set` would (in `replaceOne`) *replace the entire document*, which is rarely what you want for a partial update.

### `upsert` — insert if no match is found
```js
db.employee.updateMany(
  { empName: 'Nayan' },
  { $set: { empAge: 21, empEmail: 'nayan@gmail.com' } },
  { upsert: true }
)
```
If a document matching `{ empName: 'Nayan' }` exists, it's updated; if **none** exists, a **new** document is inserted combining the filter fields + the `$set` fields. Extremely useful for "create or update" (idempotent) logic.

### `$rename` — rename a field
```js
db.employee.updateMany(
  { empName: 'Nayan' },
  { $rename: { "empAge": "Age" } }
)
```

### `$unset` — remove a field entirely
```js
db.employee.updateMany(
  { empName: 'Nayan' },
  { $unset: { "Age": "" } }
)
```
The value given to a field in `$unset` (`""` here) is ignored/irrelevant — only the *key* matters.

### Multi-operator updates in one call
```js
db.assignment2.updateMany(
  { city: "Delhi" },
  {
    $rename: { "mobile": "phone" },
    $unset: { "tempAddress": "" },
    $set: { "updatedAt": new Date() }
  }
)
```
You can combine `$set`, `$unset`, `$rename`, `$inc`, etc. in a **single** update document, applied atomically to each matched document.

### Other essential update operators (from docs, not explicit in repo but core)
```js
db.employee.updateOne({ empName: 'Ravi' }, { $inc: { empSalary: 5000 } })   // increment/decrement a number
db.employee.updateOne({ empName: 'Ravi' }, { $mul: { empSalary: 1.1 } })    // multiply a number
db.employee.updateOne({ empName: 'Ravi' }, { $min: { empSalary: 30000 } })  // set only if new value is LOWER
db.employee.updateOne({ empName: 'Ravi' }, { $max: { empSalary: 90000 } })  // set only if new value is HIGHER
db.employee.replaceOne({ empName: 'Ravi' }, { empName: 'Ravi', empAge: 27 }) // replaces the WHOLE document
```

---

## 13. CRUD — Delete

```js
db.employee.deleteMany({ empName: 'Anshika' })   // deletes ALL matching documents
db.employee.deleteOne({ empName: 'Anshika' })     // deletes only the FIRST matching document
```
- `deleteMany({})` (empty filter) deletes **every** document in the collection but keeps the (now-empty) collection and its indexes — different from `db.employee.drop()`, which removes the collection itself.

---

## 14. Array Operations (Query + Update)

Arrays are extremely common in MongoDB documents (e.g. `skills`, `hobbies`, `students`), and Mongo has dedicated operators for querying and mutating them.

### Setup used throughout this section
```js
db.trainer.insertOne({
  id: 1,
  name: "John",
  skills: ["C", "JavaScript", "Node.js"],
  marks: [75, 80, 90],
  students: [ { name: "Ali", age: 20 }, { name: "Sara", age: 21 } ]
})
```

### Querying arrays
```js
// Contains this exact value anywhere in the array
db.trainer.find({ skills: "JavaScript" })

// Contains ANY of these values
db.trainer.find({ skills: { $in: ["JavaScript", "Python"] } })

// Contains ALL of these values (order doesn't matter)
db.trainer.find({ skills: { $all: ["JavaScript", "Python"] } })

// Array has exactly this many elements
db.trainer.find({ skills: { $size: 3 } })

// Match by array index (dot notation: "field.index")
db.trainer.find({ "skills.0": "C" })

// Match a field inside embedded documents within an array
db.trainer.find({ "students.name": "Ali" })

// $elemMatch — match a SINGLE array element against MULTIPLE conditions at once
db.trainer.find({
  students: { $elemMatch: { age: { $gte: 20 } } }
})
```
> **Why `$elemMatch` matters:** without it, `{ "students.age": {$gte: 20}, "students.name": "Ali" }` could match a document where *different* array elements each satisfy one condition. `$elemMatch` guarantees both conditions are true on the **same** element.

### Updating arrays — adding elements
```js
// Push a single value
db.trainer.updateOne({ name: "John" }, { $push: { skills: "AI-ML" } })

// Push multiple values with $each
db.trainer.updateOne({ name: "John" }, { $push: { skills: { $each: ["Express", "React"] } } })

// Add only if not already present (prevents duplicates)
db.trainer.updateOne({ name: "John" }, { $addToSet: { skills: { $each: ["Express", "React"] } } })

// Insert at a specific index
db.trainer.updateOne({ name: "John" }, { $push: { skills: { $each: ["Python"], $position: 1 } } })

// Insert AND cap the array length (keep only first N elements after the push)
db.trainer.updateOne({ name: "John" }, {
  $push: { skills: { $each: ["TypeScript"], $position: 2, $slice: 3 } }
})

// Insert, then re-sort the entire array
db.trainer.updateOne({ name: "John" }, {
  $push: { skills: { $each: ["TypeScript"], $position: 2, $slice: 3, $sort: 1 } }
})
```
`$push` modifiers cheat-sheet: `$each` (multiple values), `$position` (insert index), `$slice` (trim resulting array — negative keeps the *last* N), `$sort` (reorder after insert; `1`/`-1`, or `{field:1}` for arrays of objects).

### Updating arrays — modifying elements
```js
// By known index
db.trainer.updateOne({ name: "John" }, { $set: { "skills.1": "JavaScript" } })

// The positional operator $ — update the FIRST element that matched the query filter
db.trainer.updateOne(
  { skills: "JavaScript" },
  { $set: { "skills.$": "TypeScript" } }
)

// Update a field inside a matched embedded document (array of objects)
db.trainer.updateOne(
  { "students.name": "Ali" },
  { $set: { "students.$.age": 22 } }
)
```
> The `$` positional operator is powerful but only updates the **first** matching array element. For updating *all* matching elements in one array, use the **`$[]`** (all) or **`$[<identifier>]`** (filtered, with `arrayFilters`) positional operators — newer additions in the docs beyond what the repo covers.

### Removing array elements
```js
// Remove all occurrences of a specific value
db.trainer.updateOne({ name: "John" }, { $pull: { skills: "Node.js" } })

// Remove all occurrences of any value in a set
db.trainer.updateOne({ name: "John" }, { $pull: { skills: { $in: ["JavaScript", "Python"] } } })

// Remove matching embedded documents from an array
db.trainer.updateOne({ name: "John" }, { $pull: { students: { age: { $gt: 21 } } } })

// Remove the LAST element
db.trainer.updateOne({}, { $pop: { skills: 1 } })

// Remove the FIRST element
db.trainer.updateOne({}, { $pop: { skills: -1 } })
```

---

## 15. Embedded/Nested Documents

```js
{
  empName: 'Saurabh',
  empAddress: { houseNo: 1011, city: 'Mumbai', pincode: 101101 }
}
```
- Query nested fields with **dot notation**: `db.employee.find({ "empAddress.city": "Mumbai" })`.
- Embedding is MongoDB's answer to "one-to-few" or "one-to-one" relationships that would need a JOIN in SQL — related data that's always read together is stored together in a single document for fast, single-read-trip access. See [section 19](#19-data-modeling-embedding-vs-referencing) for when to embed vs. when to reference.

---

## 16. The Aggregation Framework

Aggregation is MongoDB's **pipeline-based** system for transforming and analyzing data — think of it as SQL's `GROUP BY`, `JOIN`, `HAVING`, and computed columns, all expressed as a sequence of **stages**, each stage's output feeding the next.

```js
db.collection.aggregate([ stage1, stage2, stage3, ... ])
```

### `$match` — filter documents (like `find()`, but as a pipeline stage)
```js
db.users.aggregate([
  { $match: { gender: "female" } }
])
```
> Best practice: put `$match` **as early as possible** in the pipeline (ideally first) — it reduces the document count flowing into later, more expensive stages, and can use indexes just like `find()`.

### `$project` — reshape output, include/exclude/compute fields
```js
db.users.aggregate([
  { $match: { gender: "female" } },
  { $project: { firstName: 1, email: 1, salary: 1 } }
])
```

### Combining `$match` with `$and`
```js
db.users.aggregate([
  { $match: { $and: [ { salary: { $gte: 5000 } }, { salary: { $lte: 7000 } } ] } },
  { $project: { firstName: 1, email: 1, salary: 1 } }
])
```

### `$group` — aggregate/bucket documents by a key (like SQL `GROUP BY`)
```js
// Just group (distinct values)
db.users.aggregate([
  { $group: { _id: "$gender" } }
])

// Group with computed statistics per group
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
```
- `_id` in a `$group` stage defines **what you're grouping by** — use `null` to aggregate the *entire* collection into a single summary document.
- Accumulator operators: `$sum`, `$avg`, `$min`, `$max`, `$push` (collect values into an array), `$addToSet` (collect unique values), `$first`/`$last` (needs a preceding `$sort`).

### Full pipeline: group → sort → limit → skip → project
```js
db.users.aggregate([
  { $group: {
      _id: "$department.name",
      TotalEmployees: { $sum: 1 },
      AverageSalary: { $avg: "$salary" },
      MinimumSalary: { $min: "$salary" },
      MaximumSalary: { $max: "$salary" },
      TotalSalary: { $sum: "$salary" }
  }},
  { $sort: { TotalSalary: -1, AverageSalary: -1 } },
  { $limit: 2 },
  { $skip: 1 },
  { $project: { TotalEmployees: 1, TotalSalary: 1 } }
])
```
This mirrors a SQL query like: `SELECT department, COUNT(*), AVG(salary)... FROM users GROUP BY department ORDER BY total_salary DESC LIMIT 2 OFFSET 1`.

### `$sample` — random documents
```js
db.users.aggregate([ { $sample: { size: 3 } } ])
```
Useful for quick spot-checks or randomized selections (e.g. "show 3 random featured products").

### `$sortByCount` — shorthand for "group + count + sort desc"
```js
db.users.aggregate([ { $sortByCount: "$department.name" } ])
```
Equivalent to `{$group: {_id: "$department.name", count: {$sum:1}}}` followed by `{$sort: {count: -1}}` — a common "top categories" pattern in one line.

### Key aggregation stages beyond the repo (core docs additions)
| Stage | Purpose |
|---|---|
| `$unwind` | Deconstructs an array field, outputting **one document per array element** — essential before grouping/analyzing array contents |
| `$lookup` | A **left outer join** to another collection — MongoDB's answer to SQL JOINs |
| `$addFields` / `$set` | Add new computed fields without dropping existing ones (unlike `$project`) |
| `$count` | Returns just the count of documents at that pipeline stage |
| `$facet` | Runs multiple independent sub-pipelines on the same input, returning all results together (great for search-results-page "filters + results + total count" in one query) |
| `$bucket` / `$bucketAuto` | Groups documents into ranges (histograms) |
| `$out` / `$merge` | Writes pipeline results into a new/existing collection |

```js
// $unwind example
db.trainer.aggregate([ { $unwind: "$skills" } ])   // one doc per skill

// $lookup example (join)
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  }
])
```

---

## 17. Indexes

*(Not present in the repo at all, but essential for any production MongoDB knowledge — this is what makes queries fast.)*

- Without an index, MongoDB performs a **COLLSCAN** (collection scan) — checking every document, which is slow at scale.
- An **index** is a special, sorted data structure (B-tree) on one or more fields that lets MongoDB find matching documents without scanning the whole collection — directly analogous to SQL indexes.

```js
db.employee.createIndex({ empName: 1 })            // single-field ascending index
db.employee.createIndex({ empName: 1, empAge: -1 }) // compound index
db.employee.createIndex({ empEmail: 1 }, { unique: true })  // enforce uniqueness
db.employee.createIndex({ empSkills: 1 })            // multikey index — auto-created for array fields
db.employee.createIndex({ empAddress: "text" })       // text index — see section 21
db.employee.createIndex({ location: "2dsphere" })     // geospatial index — see section 21

db.employee.getIndexes()          // list all indexes on a collection
db.employee.dropIndex("empName_1") // remove an index
```
- Every collection automatically has a **default index on `_id`**.
- Indexes speed up reads but **slow down writes slightly** (each insert/update must also update the index) and consume extra disk/RAM — don't over-index.
- Use `.explain("executionStats")` (see [section 26](#26-performance-explain--profiler)) to verify a query is actually **using** an index (`IXSCAN`) instead of scanning (`COLLSCAN`).

---

## 18. Schema Validation

MongoDB is schema-flexible by default, but you can **optionally enforce structure** using JSON Schema validation rules at the collection level — useful once an app matures beyond the prototyping phase.

```js
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["item", "price"],
      properties: {
        item: { bsonType: "string", description: "must be a string and is required" },
        price: { bsonType: "double", minimum: 0, description: "must be a positive number" },
        status: { enum: ["placed", "shipped", "delivered"], description: "must be one of the enum values" }
      }
    }
  },
  validationLevel: "strict",    // "strict" (all writes) or "moderate" (only already-valid docs)
  validationAction: "error"      // "error" (reject) or "warn" (log only, allow write)
})
```
You can also add/modify validation on an **existing** collection with `collMod`:
```js
db.runCommand({ collMod: "orders", validator: { $jsonSchema: { /* ... */ } } })
```

---

## 19. Data Modeling: Embedding vs Referencing

The single most important design decision in MongoDB — there's no formal normalization requirement like SQL, so you choose deliberately.

| Approach | When to use | Example |
|---|---|---|
| **Embedding** (nested documents/arrays) | Data is always read together, "contains" relationship, bounded/small growth | `empAddress` inside `employee` (repo); order line-items inside an order |
| **Referencing** (store an `_id`, query separately or `$lookup`) | Data is large, frequently updated independently, shared across many parents, or grows unbounded | `authorId` in a `book` doc referencing a `authors` collection; students referencing a shared `course` |

```js
// Embedding
{ _id: 1, name: "Saurabh", address: { city: "Mumbai", pincode: 101101 } }

// Referencing
{ _id: 101, title: "MongoDB Basics", authorId: ObjectId("...") }
db.authors.findOne({ _id: ObjectId("...") })   // separate lookup
// or
db.books.aggregate([{ $lookup: { from: "authors", localField:"authorId", foreignField:"_id", as:"author" } }])
```
**Rule of thumb:** *"Data that is accessed together should be stored together."* Favor embedding for performance (one read = one document) unless the embedded data is large, unbounded (e.g., could grow to thousands of sub-items), or needs to be queried/updated independently of its parent.

---

## 20. Transactions

MongoDB supports **multi-document ACID transactions** (since v4.0 for replica sets, v4.2+ for sharded clusters) — needed when multiple writes across documents/collections must all succeed or all fail together (e.g., a bank transfer debiting one account and crediting another).

```js
const session = db.getMongo().startSession();
session.startTransaction();
try {
  const accounts = session.getDatabase("bank").accounts;
  accounts.updateOne({ _id: "A" }, { $inc: { balance: -100 } });
  accounts.updateOne({ _id: "B" }, { $inc: { balance: 100 } });
  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
  throw e;
} finally {
  session.endSession();
}
```
- Single-document writes (including nested arrays/embedded docs within one document) are **always atomic** in MongoDB even without an explicit transaction — this is actually one of the strong arguments *for* embedding related data.
- Transactions have a performance cost — use them only when genuinely needed across multiple documents/collections.

---

## 21. Text Search & Geospatial Queries

### Text search
```js
db.articles.createIndex({ content: "text" })
db.articles.find({ $text: { $search: "mongodb tutorial" } })
```
Unlike a naive regex scan, a `text` index tokenizes, stems, and ranks results by relevance (`{ score: { $meta: "textScore" } }`), supports multiple languages, and is far faster at real full-text search than `/regex/`.

### Geospatial queries
```js
db.places.createIndex({ location: "2dsphere" })
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
      $maxDistance: 5000   // meters
    }
  }
})
```
Used for "find nearby" features — stores/restaurants/drivers within X km, points inside a polygon (`$geoWithin`), etc.

---

## 22. Replication (Replica Sets)

- A **replica set** is a group of `mongod` instances holding the **same data set** — one **primary** (accepts all writes) and multiple **secondaries** (replicate the primary's changes, can serve reads).
- Provides **high availability**: if the primary goes down, the replica set automatically holds an **election** and promotes a secondary to primary — no manual failover needed.
- Also enables **read scaling** (routing reads to secondaries) and **backups without impacting the primary**.
```js
rs.initiate()                 // initialize a replica set
rs.add("mongodb2.example.net:27017")   // add a member
rs.status()                    // check replica set health
```
MongoDB Atlas clusters are replica sets (or sharded clusters of replica sets) by default — this happens automatically when you provision a cluster there.

---

## 23. Sharding

- **Sharding** is MongoDB's horizontal scaling strategy — splitting a large collection's data **across multiple servers (shards)** so no single machine needs to hold the entire dataset.
- You choose a **shard key** (one or more fields) that determines how documents are distributed across shards — a good shard key has high cardinality and even write distribution.
- Components: **shards** (each a replica set holding a data subset), **config servers** (store cluster metadata), **mongos** (query router the application actually connects to, which routes each operation to the right shard(s)).
- Use sharding when a single replica set can no longer hold your dataset in RAM/disk or handle your write throughput — it adds real operational complexity, so it's an advanced/production-scale decision, not a default.

---

## 24. Security & Authentication

- MongoDB has **no authentication enabled by default** on a fresh local install — enabling access control is one of the first production hardening steps.
```js
// Enable auth in mongod.conf: security.authorization: "enabled"

use admin
db.createUser({
  user: "appAdmin",
  pwd: "strongPassword",
  roles: [ { role: "readWrite", db: "myAppDB" } ]
})
```
```bash
mongosh -u appAdmin -p strongPassword --authenticationDatabase admin
```
- **Built-in roles**: `read`, `readWrite`, `dbAdmin`, `userAdmin`, `clusterAdmin`, `root` — follow the principle of least privilege (grant only what a given app/user actually needs).
- Other layers: **TLS/SSL** for encryption in transit, **encryption at rest**, **IP allow-listing / VPC peering** (especially relevant on Atlas), **field-level encryption** for especially sensitive fields (e.g. SSNs).

---

## 25. Backup, Restore & Import/Export

```bash
# Full binary backup/restore of a database (or entire server)
mongodump --db myAppDB --out ./backup
mongorestore --db myAppDB ./backup/myAppDB

# JSON/CSV import-export (per-collection, human-readable)
mongoexport --db myAppDB --collection employee --out employee.json
mongoimport --db myAppDB --collection employee --file employee.json
```
`mongodump`/`mongorestore` preserve BSON types exactly (dates, ObjectIds, etc.) and are the right tool for real backups; `mongoexport`/`mongoimport` are best for interoperating with other tools/spreadsheets where JSON/CSV is more convenient, accepting some type fidelity loss.

---

## 26. Performance: explain(), Profiler

```js
db.employee.find({ empName: "Ravi" }).explain("executionStats")
```
Shows whether the query used an index (`IXSCAN`) or scanned the whole collection (`COLLSCAN`), how many documents were examined vs. returned, and execution time — the primary tool for diagnosing slow queries.

```js
db.setProfilingLevel(1, { slowms: 100 })   // log all operations slower than 100ms
db.system.profile.find().sort({ ts: -1 }).limit(5)   // review recent slow operations
```

---

## 27. GridFS (Storing Large Files)

MongoDB documents have a **16MB size limit**. For larger files (videos, large images, PDFs), MongoDB provides **GridFS**, which automatically splits a file into small chunks (default 255KB) stored in two collections (`fs.files` for metadata, `fs.chunks` for binary data) and reassembles them transparently on read. Most official drivers include a GridFS API (e.g., Node's `GridFSBucket`) rather than needing raw shell commands.

---

## 28. Change Streams

Change streams let an application **subscribe to real-time data changes** (inserts, updates, deletes) on a collection/database/cluster — built on the same internal mechanism as replication (the oplog).
```js
const changeStream = db.employee.watch();
changeStream.on("change", (change) => {
  console.log(change);
});
```
Common uses: live dashboards, cache invalidation, triggering notifications/webhooks, syncing to another system, without polling.

---

## 29. Drivers & Mongoose (Node.js ODM)

- **Official drivers** exist for essentially every major language (Node.js, Python/PyMongo, Java, C#/.NET, Go, PHP, Ruby...) — they translate the same core CRUD/aggregation operations shown throughout this doc into that language's native syntax.
```js
// Node.js native driver
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('AnshikaDB');
await db.collection('employee').insertOne({ empName: 'Sachin' });
```
- **Mongoose** is a popular third-party **ODM (Object Document Mapper)** for Node.js built on top of the driver — adds schema definitions, validation, middleware ("hooks"), and model-based querying on top of raw MongoDB flexibility:
```js
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  empName: String,
  empAge: Number,
  empEmail: { type: String, required: true, unique: true }
});
const Employee = mongoose.model('Employee', employeeSchema);
await Employee.create({ empName: 'Sachin', empAge: 45, empEmail: 'sachin@gmail.com' });
```

---

## 30. MongoDB Atlas (Cloud)

- **Atlas** is MongoDB Inc.'s official fully-managed **Database-as-a-Service** — handles provisioning, replication, patching, backups, and scaling for you.
- Free tier ("M0") is enough for learning/small projects.
- Key Atlas-specific features beyond self-hosted MongoDB: **Atlas Search** (full-text search built on Apache Lucene), **Atlas Charts** (built-in data visualization), **Atlas Data Federation** (query across MongoDB + cloud storage), **Triggers** (serverless functions on data/scheduled events), built-in **backup snapshots**, and a **network access list** for IP-based security.
- Typical workflow: create a free cluster on cloud.mongodb.com → add a database user → allow your IP → copy the `mongodb+srv://...` connection string → use it in `mongosh` or your app's driver/Mongoose config.

---

## 31. Quick Reference Cheatsheet

```
Database:     show dbs / use <db> / db.dropDatabase()
Collection:   show collections / db.createCollection(name) / db.coll.drop()

Insert:       db.coll.insertOne({...}) / db.coll.insertMany([{...},{...}])
Read:         db.coll.find(filter, projection) / db.coll.findOne(filter)
Update:       db.coll.updateOne(filter, {$set:{...}}) / updateMany(...) / {upsert:true}
Delete:       db.coll.deleteOne(filter) / db.coll.deleteMany(filter)

Comparison:   $eq $ne $gt $gte $lt $lte $in $nin
Logical:      $and $or $not $nor
Element:      $exists $type
Array:        $in $all $size $elemMatch $push $addToSet $pull $pop  "field.$"  "field.0"
Regex:        { field: /pattern/i }   ^starts  ends$  .{n} exact-length

Sort/Page:    .sort({f:1|-1}) .limit(n) .skip(n) .count()

Aggregation:  db.coll.aggregate([ {$match}, {$project}, {$group}, {$sort},
                                   {$limit}, {$skip}, {$unwind}, {$lookup}, {$sample} ])
Group accum:  $sum $avg $min $max $push $addToSet $first $last

Indexes:      db.coll.createIndex({field: 1}) / getIndexes() / dropIndex()
Explain:      db.coll.find(...).explain("executionStats")

Dates:        new Date()  new ISODate()   (never bare Date())
```

**Official docs to bookmark:** https://www.mongodb.com/docs/manual/

---

### 📝 Repo coverage summary

Everything in `MongoDBQueries.js` is folded into the sections above:
- **Basics/CRUD** → §3–6, 12–13
- **Query Operators & Projections** → §6–7
- **Regex Queries** → §8
- **Pagination** → §9
- **Sorting** → §10
- **Dates** → §11
- **Aggregation Pipeline** (`$match`, `$project`, `$group`, `$sort`, `$limit`, `$skip`, `$sample`, `$sortByCount`) → §16
- **Array Operations** (`$push`, `$addToSet`, `$pull`, `$pop`, `$elemMatch`, `$all`, `$size`, positional `$`) → §14

Topics **added beyond the repo** to make this a complete reference: BSON/ObjectId internals, installation & tooling, indexes, schema validation, embedding-vs-referencing data modeling, transactions, text/geospatial search, replication, sharding, security, backup/restore, performance tooling, GridFS, change streams, drivers/Mongoose, and Atlas.
