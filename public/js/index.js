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
  return $.get(`/user/${userId}`).then(showSingleUserEdit);
}

function showSingleUserEdit(data) {
  const card = new UserCard(data);
  card.renderUserProfileEdit(".profile-edit-container");
}

function getAllDepartments(selectDepartmentId) {
  $.get("/department").then(data => {
    showDepartmentOptions(data, selectDepartmentId);
  });
}

function showDepartmentOptions(data, selectDepartmentId) {
  let counter = 0;
  let departmentOptionsArray = [];
  for (let department of data.departments) {
    const departmentModel = new DepartmentOptions(department);
    counter++;
    departmentOptionsArray.push(departmentModel);
    if (counter >= data.departments.length) {
      departmentModel.renderDepartmentOptions(
        "#departmentName",
        departmentOptionsArray,
        selectDepartmentId
      );
    }
  }
}

function getStates () {
  <option value="" disabled="disabled" selected>Please select a State</option>
                    <option value="AK">AK</option>
                    <option value="AL">AL</option>
                    <option value="AR">AR</option>
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DC">DC</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="IA">IA</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="NE">NE</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NV">NV</option>
                    <option value="NY">NY</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VA">VA</option>
                    <option value="VT">VT</option>
                    <option value="WA">WA</option>
                    <option value="WI">WI</option>
                    <option value="WV">WV</option>
                    <option value="WY">WY</option>
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
    console.log("test on submit");
    $.ajax({
      url: `/user/${userId}`,
      type: "PUT",
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

export { getAllDepartments, getStates };

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
    getSingleUserEdit(queries["id"]).then(() => {
      captureUserEdit(queries["id"]);
    });
  };

  entryPoints.runDepartmentCreate = () => {
    captureDepartmentSubmission();
  };

  window.EntryPoints = entryPoints;
})(window);
