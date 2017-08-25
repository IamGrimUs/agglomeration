import $ from "jquery";

export default class DepartmentOptions {
  constructor(department) {
    this.department = department;
  }

  renderDepartmentOptions(containerForAppending, departmentOptionsArray) {
    let renderString = `
      <option value="" disabled="disabled" selected="selected">Please select a department</option>
    `;
    for (let i = 0; i < departmentOptionsArray.length; i++) {
      let option = `<option value="${departmentOptionsArray[i].department
        .id}">${departmentOptionsArray[i].department.name}</option>`;
      renderString += option;
    }
    $(containerForAppending).append(renderString);
  }
}
