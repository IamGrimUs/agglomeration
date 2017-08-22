import $ from "jquery";

export default class DepatmentInfo {
  constructor(department) {
    this.department = department;
    // this.setHandlers();
  }

  // setHandlers() {
  //   $(".profile-card").click(() => {
  //     console.log("you clicked me");
  //   });
  // }

  convertDepartmentId(departmentId) {
    $(departmentId).addClass("department.name");
  }
}
