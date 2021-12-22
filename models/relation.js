const Student = require("./Student");
const Book = require("./Book");
const Class = require("./Class");

Class.hasMany(Student);
Student.belongsTo(Class);
Student.hasMany(Book);
Book.belongsTo(Student);
