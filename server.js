const prompt = require("prompt-sync")();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_URI = process.env.DB_URI;
const username = prompt("What is your name? ");

async function connect() {
  await mongoose.connect(DB_URI);
  await runQueries();
  await mongoose.disconnect();
  process.exit();
}

async function runQueries() {
  console.log("running");
}
connect();
console.log(`Your name is ${username}`);
