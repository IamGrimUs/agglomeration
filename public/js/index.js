import $ from "jquery";
import UserCard from "./userCard";
import DepartmentOptions from "./departmentOptions";
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
    if (counter >= data.users.length) {
      card.setHandlers(".wrapper1");
    }
  }
}

function getSingleUser(userId) {
  $.get(`/user/${userId}`).then(showSingleUser);
}

function showSingleUser(data) {
  const card = new UserCard(data);
  card.renderSingleUserProfile(".main");
  card.renderUserLink(".edit-link-containter");
}

function createUser() {
  $.post(`/user/`);
}

function editUser(userId) {
  $.post(`/user/${userId}`);
}

function getSingleUserEdit(userId) {
  $.get(`/user/${userId}`).then(showSingleUserEdit);
}

function showSingleUserEdit(data) {
  const card = new UserCard(data);
  card.renderUserProfileEdit(".profile-edit-container");
}

function getAllDepartments() {
  $.get("/department").then(showDepartmentOptions);
}

function showDepartmentOptions(data) {
  let counter = 0;
  let departmentOptionsArray = [];
  for (let department of data.departments) {
    const departmentModel = new DepartmentOptions(department);
    counter++;
    departmentOptionsArray.push(departmentModel);
    if (counter >= data.departments.length) {
      departmentModel.renderDepartmentOptions(
        "#departmentName",
        departmentOptionsArray
      );
    }
  }
}

function captureUserSubmission() {
  $("#profile-form").on("submit", function(e) {
    e.preventDefault();

    $.ajax({
      url: "/user/",
      type: "POST",
      data: $("#profile-form").serialize(),
      success: function(json) {
        console.log("data recieved");
      }
    });
  });
}

function captureUserEdit(userId) {
  console.log("the user Id:", userId);
  $("#profile-form").on("submit", function(e) {
    e.preventDefault();

    $.ajax({
      url: `/user/${userId}`,
      type: "Put",
      data: $("#profile-form").serialize(),
      success: function(json) {
        console.log("data recieved");
      }
    });
  });
}

function captureDepartmentSubmission() {
  $("#profile-form").on("submit", function(e) {
    e.preventDefault();

    $.ajax({
      url: "/department/",
      type: "POST",
      data: $("#profile-form").serialize(),
      success: function(json) {
        console.log("data recieved");
      }
    });
  });
}

export { getAllDepartments, showDepartmentOptions };

(function(window) {
  const entryPoints = {};

  entryPoints.runIndex = () => {
    getAllUsers();
  };

  entryPoints.runProfile = () => {
    let queries = {};
    $.each(document.location.search.substr(1).split("&"), function(c, q) {
      let i = q.split("=");
      queries[i[0].toString()] = i[1].toString();
    });
    getSingleUser(queries["id"]);
  };

  entryPoints.runProfileCreate = () => {
    getAllDepartments();
    captureUserSubmission();
  };

  entryPoints.runProfileEdit = () => {
    let queries = {};
    $.each(document.location.search.substr(1).split("&"), function(c, q) {
      let i = q.split("=");
      queries[i[0].toString()] = i[1].toString();
    });
    getSingleUserEdit(queries["id"]);
    captureUserEdit(queries["id"]);
  };

  entryPoints.runDepartmentCreate = () => {
    captureDepartmentSubmission();
  };

  window.EntryPoints = entryPoints;
})(window);
