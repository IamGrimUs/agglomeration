import $ from "jquery";

export default class UserCard {
  constructor(userName, departmentName) {
    this.userName = userName;
    this.departmentName = departmentName;
    this.setHandlers();
  }

  setHandlers() {
    $(".profile-container").hover(() => {
      // do the flippy thang
    });

    $(".profile-container").click(() => {
      // go to page
    });
  }

  render(conatinerIndentifier) {
    $(conatinerIndentifier).append(`
    <div class="profile-container">
      <figure>
        <img src="img/1152x1728_Sarah_Park_silly_bw.jpg" alt="Sarah Park">
        <figcaption>
          <p class="front-page-name">${this.fullName}</p>
          <p class="front-page-title">${this.departmentName}</p>
        </figcaption>
      </figure>
    </div>
    `);
  }
}

/* frontend api call to get users
// $.ajax('/users').then((users) => {
  for (const user of users) {
    const card = new UserCard(user.firstName + ' ' user.lastName, 'Account Management');
    card.render('.wrapper-1');
  }
});
// user.render('.wrapper-1');
*/
