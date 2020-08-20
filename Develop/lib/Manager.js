// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
let Employee = require("../lib/Employee.js");

module.exports = class Manager extends Employee {
  constructor(name, id, contact, office) {
    super(name, id, contact);
    this.officeNumber = office;
  }
  getOfficeNumber = () => {
    return this.officeNumber;
  };
  getRole = () => {
    return "Manager";
  };
};

//module.exports = Manager;
