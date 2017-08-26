import $ from "jquery";
import { getAllDepartments } from "./index";
import { renderStates } from "./index";
import { renderCountries } from "./index";

export default class UserCard {
  constructor(user) {
    this.user = user;
  }

  setHandlers(itemToClick) {
    $(itemToClick).on("click", ".profile-card", function(event) {
      event.preventDefault();
      window.location = `profile.html?id=${$(this).attr("data-userId")}`;
    });
  }

  renderUserCard(containerForAppending) {
    $(containerForAppending).prepend(`
      <div data-userId="${this.user
        .id}" class="profile-card ${this.user.departmentName
      .toLowerCase()
      .split(" ", 2)[0] + "-team"}" id="${this.user.id}">
        <div>
          <h2>${this.user.firstName} ${this.user.lastName}</h2>
          <p>${this.user.departmentName}</p>
        </div>
        <figure>
          <img src="img/${this.user.firstName}_${this.user
      .lastName}.jpg" alt="${this.user.firstName} ${this.user.lastName}">
          <figcaption>
            <p>${this.user.position}</p>
            <a href="mailto:${this.user.email}">${this.user.email}</a>
            <a href="tel:${this.user.telephone}">${this.user.telephone}</a>
          </figcaption>
        </figure>
      </div>
    `);
  }

  renderSingleUserProfile(containerForAppending) {
    $(containerForAppending).append(`
      <section class="profile-information">
          <section class="contact-information-layout">
            <div class="flex-container">
              <div>
                <figure class="profile-pic-container ${this.user.departmentName
                  .toLowerCase()
                  .split(" ", 2)[0] + "-team"}">
                  <img src="img/${this.user.firstName}_${this.user
      .lastName}_profile.jpg" alt="${this.user.fullName}" class="profile-pic">
                </figure>
              </div>
              <div>
                <h1 class="text-center">${this.user.firstName} ${this.user
      .lastName}</h1>
                <p class="text-center">${this.user.biography}</p>
              </div>
              <div>
                <p>
                  <span class="profile-category-headline">Email address:</span>
                  <a href="mailto:${this.user.email}" class="email-address">
                  ${this.user.email}
                  </a>
                </p>
                <p>
                  <span class="profile-category-headline">Telephone:</span>
                  <a href="tel:${this.user.telephone}" class="telephone">
                    ${this.user.telephone}
                  </a>
                </p>
                <p>
                  <span class="profile-category-headline">State:</span> ${this
                    .user.state}
                </p>
                <p>
                  <span class="profile-category-headline">Country:</span> ${this
                    .user.country}
                </p>
              </div>
              <div>
                <p>
                  <span class="profile-category-headline">
                    Department:
                  </span> ${this.user.departmentName}
                </p>
                <p>
                  <span class="profile-category-headline">
                    Postition title:
                  </span> ${this.user.position}
                </p>
              </div>
            </div>
            <div class="personal-information">
              <span class="profile-category-headline">
                Favorite part of the day:
              </span>
              <p>
                ${this.user.favoritePartOfDay}
              </p>
            </div>
            <div class="personal-information">
              <span class="profile-category-headline">
                Hobbies:
              </span>
              <p>
                ${this.user.hobbies}
              </p>
            </div>
          </section>
        </section>
    `);
  }

  renderUserProfileEdit(containerForAppending) {
    this.verifyUserData(this.user);
    $(containerForAppending).append(`
      <header role="banner" class="profile-edit-header">
        <figure class="profile-pic-container ${this.user.departmentName
          .toLowerCase()
          .split(" ", 2)[0] + "-team"}">
          <img src="img/${this.user.firstName}_${this.user
      .lastName}_profile.jpg" alt="${this.user.firstName} ${this.user
      .lastName}" class="profile-pic">
        </figure>
      </header>
      <main role="main">
        <section class="profile-information">
          <form class="profile-edit-form text-left" action="" method="put" id="profile-form">
            <fieldset>
              <section class="flex-container">
                <div>
                  <label for="firstName">First name:</label>
                  <input type="text" id="firstName" name="firstName" value="${this
                    .user.firstName}" aria-describedby="first-name-format"
                    pattern="^[a-zA-Z]*$" title="Firstname">
                  <span id="first-name-format" class="help">Format: Firstname</span>
                </div>
                <div>
                  <label for="lastName">Last name:</label>
                  <input type="text" id="lastName" name="lastName" value="${this
                    .user.lastName}" aria-describedby="last-name-format"
                    pattern="^[a-zA-Z]*$" title="Lastname">
                  <span id="last-name-format" class="help">Format: Lastname</span>
                </div>
                <div>
                  <label for="password">Password:</label>
                  <input type="password" id="password" name="password" value="${this
                    .user.password}" title="password">
                </div>
                <div>
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" value="${this.user
                    .email}" aria-describedby="email-format">
                  <span id="email-format" class="help">Format: jdoe@email.com</span>
                </div>
                <div>
                  <label for="telephone">Telephone:</label>
                  <input type="tel" id="telephone" name="telephone" value="${this
                    .user.telephone}" aria-describedby="telephone-format"
                    title="123-456-7890, +91 123-456-7890">
                  <span id="telephone-format" class="help">Format: 123-456-7890</span>
                </div>
                <div>
                  <label for="position">Position Title:</label>
                  <input type="text" id="position" name="position" value="${this
                    .user.position}">
                </div>
              </section>
              <section class="flex-container">
                <div>
                  <label for="state">State:</label>
                  <select id="state" name="state">
                    ${renderStates("#state", this.user.state)}
                  </select>
                </div>
                <div>
                  <label for="country">Country:</label>
                  <select id="country" name="country">
                    ${renderCountries("#country", this.user.country)}
                  </select>
                </div>
              </section>
              <div>
                <label for="departmentName">Department:</label>
                <select id="departmentName" name="departmentName">
                 ${getAllDepartments(this.user.departmentId)}
                </select>
              </div>
              <div>
                <label for="biography">Introduce yourself:</label>
                <textarea id="biography" name="biography" value="${this.user
                  .biography}" rows="5" cols="20" placeholder="${this.user
      .biography}"></textarea>
              </div>
              <div>
                <label for="favoritePartOfDay">Favorite part of the day:</label>
                <textarea id="favoritePartOfDay" name="favoritePartOfDay" value="${this
                  .user
                  .favoritePartOfDay}" rows="5" cols="20" placeholder="${this
      .user.favoritePartOfDay}"></textarea>
              </div>
              <div>
                <label for="hobbies">Hobbies:</label>
                <textarea id="hobbies" name="hobbies" value="${this.user
                  .hobbies}" rows="5" cols="20" placeholder="${this.user
      .hobbies}"></textarea>
              </div>
              <div>
                <button name="profile-edit-submit" type="submit" value="" id="profile-edit-submit" class="profile-submit">Submit</button>
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    `);
  }

  verifyUserData(obj) {
    var result = "";
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result += key + " : " + obj[key] + "\n";
      }
    }
    console.log(result);
  }

  renderUserLink(containerForAppending) {
    $(containerForAppending).append(`
      <a href="profile-edit.html?id=${this.user.id}">
        <i class="fa fa-user fa-2x" aria-hidden="true" ></i>
        edit ${this.user.firstName}'s profile
      </a>
    `);
  }
}
