// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

let Employee = require("../lib/Employee.js");

module.exports = class Engineer extends Employee {
  constructor(name, id, contact, github) {
    super(name, id, contact);
    this.github = github;
  }
  getGithub = () => {
    return this.github;
  };
  getRole = () => {
    return "Engineer";
  };
};
