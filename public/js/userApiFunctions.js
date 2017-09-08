function getSingleUser(userId) {
  $.get(`/user/${userId}`).then(showSingleUser);
}

function showAllUsers(data) {
  $('.wrapper1').html('');
  let counter = 0;
  for (let user of data.users) {
    const card = new UserCard(user);
    card.renderUserCard('.wrapper1');
    counter++;
    if (counter >= data.users.length) {
      card.setHandlers('.wrapper1');
    }
  }
}

export { getSingleUser, showAllUsers };
