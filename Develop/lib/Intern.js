// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
let Employee = require("../lib/Employee.js");

module.exports = class Intern extends Employee {
  constructor(name, id, contact, school) {
    super(name, id, contact);
    this.school = school;
  }
  getSchool = () => {
    return this.school;
  };
  getRole = () => {
    return "Intern";
  };
};
