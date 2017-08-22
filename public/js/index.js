import $ from "jquery";
import UserCard from "./userCard";
// import DepartmentInfo from "./departmentInfo";
import "./menu";

function getAllUsers() {
  $.get("/user").then(showAllUsers);
}

function showAllUsers(data) {
  let counter = 0;
  for (let user of data.users) {
    const card = new UserCard(user);
    card.renderUserCard(".wrapper1");
    counter++;
    console.log(data.users.length);
    if (counter >= data.users.length) {
      card.setHandlers(".wrapper1");
    }
  }
}

function getSingleUser(userId) {
  $.get(`/user/${userId}`).then(showSingleUser);
}

function createUser() {
  $.post(`/user/`).next();
}

function showSingleUser(data) {
  const card = new UserCard(data);
  card.renderSingleUserProfile(".main");
}

function captureUserSubmission() {
  $("#profile-form").on("submit", function(e) {
    e.preventDefault();

    $.ajax({
      url: "/user",
      cache: false,
      type: "POST",
      data: $("#profile-form").serialize(),
      success: function(json) {
        console.log("data recieved");
        $(".successMessage p").html(
          `Thank you for creating a profile. It's great to meet you ${json.firstName}`
        );
      }
    });
  });
}

(function(window) {
  const entryPoints = {};

  entryPoints.runIndex = () => {
    getAllUsers();
  };

  entryPoints.runProfile = () => {
    getSingleUser("5994bc837360000e4386246a");
  };

  entryPoints.runProfileCreate = () => {
    console.log("running captureUserSubmission");
    captureUserSubmission();
  };

  entryPoints.runProfileEdit = () => {};

  window.EntryPoints = entryPoints;
})(window);
