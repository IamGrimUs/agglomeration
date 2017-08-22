import $ from "jquery";

export default class departmentCard {
  constructor(department) {
    this.department = department;
    this.setHandlers();
  }

  setHandlers() {
    $(".profile-card").on("click", function(event) {
      event.preventDefault();
      console.log(this.id);
      window.location = "profile.html";
    });
  }

  renderUserCard(containerForAppending) {
    // console.log("this is the userDepartment from userCard: ");
    $(containerForAppending).append(`
      <div class="profile-card ${this.user.departmentName
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
                <figure class="profile-pic-container campaign-team ">
                  <img src="img/${this.user.firstName}_${this.user
      .lastName}_profile.jpg" alt="${this.user.fullName} " class="profile-pic ">
                </figure>
              </div>
              <div>
                <h1>${this.user.firstName} ${this.user.lastName}</h1>
                <p>${this.user.biography}</p>
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
                <p>
                  <span class="profile-category-headline">Manager:</span> ${this
                    .user.managerName}
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
}
