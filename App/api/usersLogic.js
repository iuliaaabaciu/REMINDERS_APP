const config = require('./config');
const knex = require("knex")(config);
const bcrypt = require("bcrypt");

exports.listUsers = () => 
  knex.select("id", "firstName", "lastName", "email")
  .from("users");    

exports.register = async (firstName, lastName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return knex("users").insert({ 
    firstName: firstName, 
    lastName: lastName, 
    email: email,
    password: hashedPassword, 
  });
}

exports.login = async (email, password) => {
  const users = await knex('users')
    .where("email", email);
  
  if(users.length === 0) throw new Error("Sorry, your email was not found"); 

  const user = users[0];

  const paswordMatches = await bcrypt.compare(password, user.password);
  if(!paswordMatches) throw new Error("Incorrect password");

  return user;
}