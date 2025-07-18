const express = require("express");

//create router instance
const router = express.Router();
let users = [
  { id: 1, name: "Ben", age: 20 },
  { id: 2, name: "John", age: 30 },
  { id: 3, name: "Chris", age: 40 },
  { id: 4, name: "Jane", age: 60 },
];

//calculate the next available user id
function getNextUserId(users) {
  const userIds = users.map(function (user) {
    return user.id;
  }); //肯定执行，return.

  return Math.max(...userIds, -1) + 1;
}

//get fetch all users
router.get("/users", function (req, res) {
  res.status(200).json({
    status: "success",
    message: "retrieved users successfully",
    data: users,
  });
});
//post add a new user
router.post("/users", function (req, res) {
  const newUser = req.body;
  if (!newUser.name || !newUser.age) {
    return res.status(400).json({
      status: "error",
      message: "name and agee are required",
    });
  }
  const newId = getNextUserId(users);
  let obj = { id: newId, name: newUser.name, age: newUser.age };
  users.push(obj);
  res.status(200).json({
    status: "success",
    message: "user added successfully",
    data: users,
  });
});

//delete all users
router.delete("/users", function (req, res) {
  users = [];
  res.status(204).send();
});

//delete user by id
router.delete("/users/:id", function (req, res) {
  const userIdtoDelete = parseInt(req.params.id);
  const initialUserCount = users.length;
  users = users.filter(function (user) {
    return user.id !== userIdtoDelete;
  });
  if (users.length === initialUserCount) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: `user with id ${userIdtoDelete} deleted`,
    data: users,
  });
});

module.exports = router;
