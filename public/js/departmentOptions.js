import $ from "jquery";

export default class DepartmentOptions {
  constructor(department) {
    this.department = department;
  }

  renderDepartmentOptions(containerForAppending, departmentOptionsArray) {
    let renderString = `
      <option value="" disabled="disabled" selected="selected">Please select a department</option>
    `;
    for (let i = 0; departmentOptionsArray.length; i++) {
      let option = `<option value="${departmentOptionsArray[i].department
        .id}">${departmentOptionsArray[i].department.name}</option>`;
      renderString += option;
      console.log(renderString);
      console.log(i);
      console.log(containerForAppending);
    }
    $(containerForAppending).append(renderString);
  }
}
