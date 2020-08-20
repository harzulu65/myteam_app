const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const colors = require("colors");
const Employee = require("../Develop/lib/Employee");
require("events").EventEmitter.defaultMaxListeners = 50;

const { stdin, stdout } = process;
let user = [];
let name = "";
let id = "";
let email = "";
let position = "";
let office = "";
let github = "";
let school = "";
let answer = true;
let employee = "";
let arrayHtml = "";

function prompt(question) {
  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);

    stdin.on("data", (data) => resolve(data.toString().trim()));
    stdin.on("error", (err) => reject(err));
  });
}

async function renderQuestions() {
  let i_office = "";
  let i_github = "";
  let i_school = "";
  try {
    let key = true;
    while (key) {
      let i_name = await prompt("What's Employee's name ? ");
      let i_id = await prompt("What's your id? ");
      let i_email = await prompt("What's your email address? ");
      let i_position = await prompt("What's employee's position ? ");
      if (i_position === "Manager") {
        i_office = await prompt("What's Manager's office Number ? ");
      } else {
        if (i_position === "Engineer") {
          i_github = await prompt("What's Engineer's Github Username ? ");
        } else {
          if (i_position === "Intern") {
            i_school = await prompt("What's Intern's School ? ");
          }
        }
      }
      answer = await prompt("Would you like to continue y/n ? ");
      if (answer === "n" || answer === "N") {
        key = false;
      }
      user.push([
        {
          i_name,
          i_id,
          i_email,
          i_position,
          i_office,
          i_github,
          i_school,
        },
      ]);
      // console.log(user);
    }

    let arrayRender = [];

    let i = 0;

    const array = await user.forEach((element) => {
      // console.log("enter here : ", i, element);
      // console.log(element[0].i_name);
      i += 1;
      let renderName = element[0].i_name;
      let renderId = element[0].i_id;
      let renderEmail = element[0].i_email;
      let renderRole = element[0].i_position;
      let renderOffice = element[0].i_office;
      let renderGithub = element[0].i_github;
      let renderSchool = element[0].i_school;

      const arrayPrep = () => {
        arrayHtml = render([
          {
            getName: function () {
              return renderName;
            },
            getId: function () {
              return renderId;
            },
            getEmail: function () {
              return renderEmail;
            },
            getRole: function () {
              return renderRole;
            },
            getOfficeNumber() {
              return renderOffice;
            },
            getGithub() {
              return renderGithub;
            },
            getSchool() {
              return renderSchool;
            },
          },
        ]);
      };

      arrayPrep();
      console.log("write file : ", arrayHtml);

      console.log(outputPath, OUTPUT_DIR);

      fs.writeFile("team.html", JSON.stringify(arrayHtml), "utf8", function (
        err
      ) {
        if (err) return console.log(err);
        console.log("success!! > " + outputPath);
      });
      //===================================================
    });

    //console.log(employee);

    stdin.pause();
  } catch (error) {
    console.log("There's an error!");
    console.log(error);
  }
  process.exit();
}

renderQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
