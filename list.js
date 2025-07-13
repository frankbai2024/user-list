function clearList() {
  const userListEl = document.getElementById("user_list");
  while (userListEl.firstChild) {
    userListEl.removeChild(userListEl.firstChild);
  }
}

function appendUsers(users) {
  users.forEach(function (user) {
    const li = document.createElement("li");
    li.innerHTML = `${user.name} ${user.age}`;
    const userListEl = document.getElementById("user_list");
    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      deleteUserById(user.id);
    });
    li.appendChild(deleteButton);
    userListEl.appendChild(li);
  });
}

function getList() {
  console.log("getList is fired");
  const url = "http://localhost:8080/users";
  axios
    .get(url)
    .then(function (res) {
      console.log("res", res);
      const users = res.data.data;
      clearList();
      appendUsers(users);
    })
    .catch(function (err) {
      console.error("error fetching user list:", err);
    });
}

function postUser() {
  console.log("poseUser is fired");
  const url = "http://localhost:8080/users";
  const nameInput = document.getElementById("username");
  const nameValue = nameInput.value;
  const ageInput = document.getElementById("age");
  const ageValue = ageInput.value;

  console.log(nameValue, ageValue);
  if (!nameValue || !ageValue) return;
  const body = {
    name: nameValue,
    age: parseInt(ageValue),
  };

  axios
    .post(url, body)
    .then(function (res) {
      console.log("res", res);
      getList();
      ageInput.value = "";
      nameInput.value = "";
    })
    .catch(function (err) {
      console.error("error adding users:", err);
    });
}

function deleteList() {
  console.log("deleteList is fire");
  const url = "http://localhost:8080/users";
  axios
    .delete(url)
    .then(function () {
      console.log("user list cleared in backend");
      getList();
    })
    .catch(function (err) {
      console.error("error clearing user list:", err);
    });
}

function deleteUserById(userId) {
  console.log("deleteUserById is fired:", userId);
  const url = `http://localhost:8080/users/${userId}`;
  axios
    .delete(url)
    .then(function () {
      getList();
    })
    .catch(function (err) {
      console.error(`error deleting user by id ${userId}`, err);
    });
}
//每次要 npx  nodemon server.js
