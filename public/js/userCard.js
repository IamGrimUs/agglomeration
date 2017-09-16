import $ from 'jquery';
import Cookies from 'js-cookie';
import { getAllDepartments } from './index';
import { renderStates } from './index';
import { renderCountries } from './index';

export default class UserCard {
  constructor(user) {
    this.user = user;
  }

  setHandlers(itemToClick) {
    $(itemToClick).on('click', '.profile-card', function(event) {
      event.preventDefault();
      window.location = `profile.html?id=${$(this).attr('data-userId')}`;
    });
  }

  renderUserCard(containerForAppending) {
    $(containerForAppending).prepend(`
      <div data-userId="${this.user
        .id}" class="profile-card ${this.user.departmentName
      .toLowerCase()
      .split(' ', 2)[0] + '-team'}" id="${this.user.id}">
        <div class="profile-card-header">
          <h2>${this.user.firstName} ${this.user.lastName}</h2>
          <p>${this.user.departmentName}</p>
        </div>
        <figure>
          <img src="img/profile/${this.user.imageUrl}" alt="${this.user
      .firstName} ${this.user.lastName}">
          <figcaption>
            <p>${this.user.position}</p>
            <p>${this.user.email}</p>
            <p class="telephone">${this.user.telephone}</p>
          </figcaption>
        </figure>
      </div>
    `);
  }

  renderSingleUserProfile(containerForAppending) {
    let biography;
    let hobbies;
    let favoritePartOfDay;
    let state;
    if (!this.user.biography) {
      biography = 'awaiting user input...';
    } else {
      biography = this.user.biography;
    }
    if (!this.user.hobbies) {
      hobbies = 'awaiting user input...';
    } else {
      hobbies = this.user.hobbies;
    }
    if (!this.user.favoritePartOfDay) {
      favoritePartOfDay = 'awaiting user input...';
    } else {
      favoritePartOfDay = this.user.favoritePartOfDay;
    }
    if (this.user.state == 'Not applicable') {
      $(containerForAppending).append(`
      <section class="profile-information">
          <section class="contact-information-layout">
            <div class="flex-container">
              <div>
                <figure style="background-image:url('img/profile/${this.user
                  .imageUrl}');background-size:cover;background-position:center center" class="profile-pic-container ${this.user.departmentName
        .toLowerCase()
        .split(' ', 2)[0] + '-team'}">
                </figure>
              </div>
              <div>
                <h1 class="text-center">${this.user.firstName} ${this.user
        .lastName}</h1>
                <p class="text-center">${biography}</p>
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
                ${favoritePartOfDay}
              </p>
            </div>
            <div class="personal-information ${this.user.hobbies
              ? ''
              : 'hidden'}">
              <span class="profile-category-headline">
                Hobbies:
              </span>
              <p>
                ${hobbies}
              </p>
            </div>
          </section>
        </section>
    `);
    } else {
      state = this.user.state;
      $(containerForAppending).append(`
      <section class="profile-information">
          <section class="contact-information-layout">
            <div class="flex-container">
              <div>
                <figure style="background-image:url('img/profile/${this.user
                  .imageUrl}');background-size:cover;background-position:center center" class="profile-pic-container ${this.user.departmentName
        .toLowerCase()
        .split(' ', 2)[0] + '-team'}">
                </figure>
              </div>
              <div>
                <h1 class="text-center">${this.user.firstName} ${this.user
        .lastName}</h1>
                <p class="text-center">${biography}</p>
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
                  <span class="profile-category-headline ${this.user.state ===
                  'Not applicable'
                    ? 'hidden'
                    : ''}">State:</span> ${state}
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
                ${favoritePartOfDay}
              </p>
            </div>
            <div class="personal-information">
              <span class="profile-category-headline">
                Hobbies:
              </span>
              <p>
                ${hobbies}
              </p>
            </div>
          </section>
        </section>
    `);
    }
  }

  renderUserProfileEdit(containerForAppending) {
    this.verifyUserData(this.user);
    $(containerForAppending).append(`
      <main role="main" class="profile-edit-main">
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
                  <label for="password">New Password:</label>
                  <input type="password" id="password" name="password" value="" title="password">
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
                    .user.telephone}">
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
                    ${renderStates(this.user.state)}
                  </select>
                </div>
                <div>
                  <label for="country">Country:</label>
                  <select id="country" name="country">
                    ${renderCountries(this.user.country)}
                  </select>
                </div>
              </section>
              <div>
                <label for="departmentId">Department:</label>
                <select id="departmentId" name="departmentId">
                 ${getAllDepartments(this.user.departmentId)}
                </select>
              </div>
              <div>
                <label for="biography">Introduce yourself:</label>
                <textarea id="biography" name="biography" rows="5" cols="20">${this
                  .user.biography}</textarea>
              </div>
              <div>
                <label for="favoritePartOfDay">Favorite part of the day:</label>
                <textarea id="favoritePartOfDay" name="favoritePartOfDay" rows="5" cols="20">${this
                  .user.favoritePartOfDay}</textarea>
              </div>
              <div>
                <label for="hobbies">Hobbies:</label>
                <textarea id="hobbies" name="hobbies" rows="5" cols="20">${this
                  .user.hobbies}</textarea>
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

  renderUserProfileDelete(containerForAppending, userList) {
    //console.log(userList);

    function SortByName(a, b) {
      var aName = a.fullName.toLowerCase();
      var bName = b.fullName.toLowerCase();
      return aName < bName ? -1 : aName > bName ? 1 : 0;
    }

    userList.sort(SortByName);

    let renderString = `
      <option value="" disabled="disabled" selected>Please select a user</option>
    `;
    for (let i = 0; i < userList.length; i++) {
      let option = `<option value="${userList[i].id}">${userList[i]
        .fullName}</option>`;
      renderString += option;
    }

    $(containerForAppending).append(renderString);
  }

  verifyUserData(obj) {
    var result = '';
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result += key + ' : ' + obj[key] + '\n';
      }
    }
    //console.log(result);
  }

  renderUserLink(containerForAppending) {
    let userId = Cookies.get('loggedInUserId');
    let thisUserId = this.user.id;
    // let thisUserPermission = this.user.permission;
    if (Cookies.get('permission') == 1 || userId === thisUserId) {
      $(containerForAppending).append(`
        <a href="profile-edit.html?id=${this.user.id}">
          <i class="fa fa-user-o fa-2x" aria-hidden="true" ></i>
          edit ${this.user.firstName}'s profile
        </a>
      `);
    }
  }
}
