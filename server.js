const prompt = require("prompt-sync")();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const CustomerModel = require("./models/customer");

const DB_URI = process.env.DB_URI;

let userInputValue;

async function connect() {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
  await runQueries();
  // await mongoose.disconnect();
  // console.log("disconnected from MongoDB");

  // process.exit();
}

async function runQueries() {
  displayPrompts();
}
connect();

///////////////////////////
// PROMPTS
///////////////////////////
function displayPrompts() {
  console.log("Welcome to the CRM \n");
  console.log("What would you like to do? \n");
  console.log("1: Create a customer");
  console.log("2: View all customers");
  console.log("3: Update a customer");
  console.log("4: Delete a customer");
  console.log("5: Quit\n");
  userInputValue = prompt("Number of action to run: ");
  selectUserAction(userInputValue);
}

async function selectUserAction(value) {
  switch (value) {
    case "1":
      return createCustomerPrompt();
    case "2":
      return getAllCustomers();
    case "3":
      return updateCustomerPrompt();
    case "4":
      return deleteCustomerPrompt();
    case "5":
      console.log("Quitting...");
      await mongoose.disconnect();
      return process.exit();
    default:
      console.log("Invalid choice. Please try again.");
      return displayPrompts();
  }
}
///////////////////////////
// DB INTERACTIONS
///////////////////////////
// GET ALL CUSTOMERS
async function getAllCustomers() {
  const allCustomers = await CustomerModel.find({});
  console.log("Here they are folks --> ", allCustomers);
  await quitOrSelectAnotherPrompt();
}
// UPDATE CUSTOMER BY ID
async function updateCustomerById() {}
// DELETE ALL CUSTOMERS
async function deleteAllCustomers() {}
// DELETE CUSTOMER BY ID
async function deleteCustomerById() {}
// CREATE CUSTOMER
async function createNewCustomer(name, age) {
  const newCustomerData = {
    name,
    age,
  };
  const newCustomer = await CustomerModel.create(newCustomerData);
  console.log(newCustomer);
}

///////////////////////////
// USER ACTIONS | PROMPTS
///////////////////////////
async function quitOrSelectAnotherPrompt() {
  console.log("Do you want to run another operation?");
  console.log("Yes: Press 1");
  console.log("No: Press 2");
  const choice = prompt();
  if (choice === "1") {
    displayPrompts();
  } else {
    await mongoose.disconnect();
    process.exit();
  }
}

// CREATE CUSTOMER
async function createCustomerPrompt() {
  const name = prompt(`Enter the customer's name: `);
  const age = prompt(`Enter the customer's age: `);
  await createNewCustomer(name, age);
  await quitOrSelectAnotherPrompt();
}

// UPDATE CUSTOMER
async function updateCustomerPrompt() {
  console.log("Below is a list of customers:\n");

  const customerListByID = await CustomerModel.find({});
  customerListByID.map((customer) => {
    return console.log(`
    id: ${customer._id} \n
    Name: ${customer.name}\n
    Age: ${customer.age}
    `);
  });

  console.log(
    "Copy and paste the id of the customer you would like to update here: \n"
  );
  const selectedCustomerID = prompt();
  console.log("What is the customers new name?");
  const newName = prompt();
  console.log("What is the customers new age?");
  const newAge = prompt();
  const updatedInfo = {
    name: newName,
    age: newAge,
  };
  const customerToBeUpdated = await CustomerModel.findByIdAndUpdate(
    selectedCustomerID,
    updatedInfo
  );
  console.log(
    `${customerToBeUpdated.name}'s new name is now ${newName} and their age went from ${customerToBeUpdated.age} to ${newAge}`
  );
  await quitOrSelectAnotherPrompt();
}
// DELETE CUSTOMER
async function deleteCustomerPrompt() {
  console.log("Below is a list of customers:\n");

  const customerListByID = await CustomerModel.find({});
  customerListByID.map((customer) => {
    return console.log(`
    id: ${customer._id} \n
    Name: ${customer.name}\n
    Age: ${customer.age}
    `);
  });

  console.log(
    "Copy and paste the id of the customer you would like to delete here: \n"
  );
  const selectedCustomerID = prompt();
  const customerToDelete = await CustomerModel.findByIdAndDelete(
    selectedCustomerID
  );
  console.log(`You have now deleted this user: `, customerToDelete);
  await quitOrSelectAnotherPrompt();
}
