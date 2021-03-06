import $ from 'jquery';
import Cookies from 'js-cookie';
import { setupDropZone } from './dropzone.service';

import UserCard from './userCard';
import DepartmentOptions from './departmentOptions';
import './menu';

function getAllUsers() {
  $.ajax({
    url: '/user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    },
    dataType: 'json'
  })
    .then(showAllUsers)
    .catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
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

function getSingleUser(userId) {
  $.ajax({
    url: `/user/${userId}`,
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    }
  })
    .then(showSingleUser)
    .catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
}

function showSingleUser(data) {
  const card = new UserCard(data);
  card.renderSingleUserProfile('.main');
  card.renderUserLink('.edit-link-containter');
}

function getSingleUserEdit(userId) {
  return $.ajax({
    url: `/user/${userId}`,
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    }
  })
    .then(showSingleUserEdit)
    .catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
}

function showSingleUserEdit(data) {
  const card = new UserCard(data);
  card.renderUserProfileEdit('.profile-edit-container');
}

function getAllDepartments(selectDepartmentId) {
  $.ajax({
    url: '/department',
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    }
  })
    .then(data => {
      showDepartmentOptions(data, selectDepartmentId);
    })
    .catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
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
        '#departmentId',
        departmentOptionsArray,
        selectDepartmentId
      );
    }
  }
}

function getAllDepartmentsIndexMenu() {
  $.ajax({
    url: '/department',
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    }
  })
    .then(data => {
      showDepartmentOptionsIndexMenu(data);
    })
    .catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
}

function showDepartmentOptionsIndexMenu(data) {
  let counter = 0;
  let departmentOptionsArray = [];
  for (let department of data.departments) {
    const departmentModel = new DepartmentOptions(department);
    counter++;
    departmentOptionsArray.push(departmentModel);
    if (counter >= data.departments.length) {
      departmentModel.renderDepartmentOptions(
        '#departmentId',
        departmentOptionsArray
      );
    }
  }
}

function renderStates(userState) {
  let statesArray = [
    'AK',
    'AL',
    'AR',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MS',
    'MT',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NM',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'UT',
    'VA',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY'
  ];
  let renderString = `<option value="Not applicable"  ${userState
    ? ''
    : 'selected'}>Not applicable</option>`;
  for (let i = 0; i < statesArray.length; i++) {
    let option = `<option value="${statesArray[i]}" ${userState ===
    statesArray[i]
      ? 'selected'
      : ''}>${statesArray[i]}</option>`;
    renderString += option;
  }
  return renderString;
}

function renderCountries(userCountry) {
  let countriesArray = [
    'Afghanistan',
    'Åland Islands',
    'Albania',
    'Algeria',
    'Andorra',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia, Plurinational State of',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo, the Democratic Republic of the',
    'Cook Islands',
    'Costa Rica',
    "Côte d'Ivoire",
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See (Vatican City State)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran, Islamic Republic of',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea, Democratic People's Republic of",
    'Korea, Republic of',
    'Kuwait',
    'Kyrgyzstan',
    "Lao People's Democratic Republic",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Macedonia, the former Yugoslav Republic of',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova, Republic of',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestinian Territory, Occupied',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Réunion',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin (French part)',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten (Dutch part)',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan, Province of China',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela, Bolivarian Republic of',
    'Viet Nam',
    'Virgin Islands, British',
    'Virgin Islands, U.S.',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];
  let renderString = `<option value="" disabled="disabled" ${userCountry
    ? ''
    : 'selected'}>Please select a Country</option>`;
  for (let i = 0; i < countriesArray.length; i++) {
    let option = `<option value="${countriesArray[i]}" ${userCountry ===
    countriesArray[i]
      ? 'selected'
      : ''}>${countriesArray[i]}</option>`;
    renderString += option;
  }
  return renderString;
}

function captureUserSubmission() {
  $('#profile-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/user/',
      type: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
      },
      data: $('#profile-form').serialize(),
      success: function(json) {
        console.log('data recieved');
        showSubmitSuccess(json);
      },
      error: function() {
        showSubmitError();
      }
    }).catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
  });
}

function showSubmitSuccess(json) {
  //console.log(json);
  $('.successMessage').toggleClass('hidden');
  setTimeout(function() {
    window.location = `profile.html?id=${json.id}`;
  }, 3000);
}

function showEditSubmitSuccess(userId) {
  //console.log(userId);
  $('.successMessage').toggleClass('hidden');
  setTimeout(function() {
    window.location = `profile.html?id=${userId}`;
  }, 3000);
}

function showSubmitError() {
  $('.errorMessage').toggleClass('hidden');
  setTimeout(function() {
    $('.errorMessage').toggleClass('hidden');
  }, 5000);
}

function captureUserEdit(userId) {
  $('#profile-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: `/user/${userId}`,
      type: 'PUT',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
      },
      data: $('#profile-form').serialize(),
      success: function() {
        console.log('User profile updated');
        showEditSubmitSuccess(userId);
      },
      error: function() {
        showSubmitError();
      }
    }).catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
  });
}

function captureDepartmentSubmission() {
  $('#profile-form').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
      url: '/department/',
      type: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
      },
      data: $('#profile-form').serialize(),
      success: function() {
        console.log('department created');
        showDepartmentSubmitSuccess();
      },
      error: function() {
        showSubmitError();
      }
    }).catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
  });
}

function showUsersForDeletion() {
  $.ajax({
    url: '/user',
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    }
  })
    .then(showUserList)
    .catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
}

function showUserList(data) {
  const card = new UserCard(data);
  let userList = [];
  for (let i = 0; i < data.users.length; i++) {
    userList.push(data.users[i]);
  }
  card.renderUserProfileDelete('#userId', userList);
}

function captureUserForDelete() {
  $('#profile-form').on('submit', function(e) {
    e.preventDefault();
    let userId = $(this)
      .find('[name=userId]')
      .val();
    //console.log(userId);
    $.ajax({
      url: `/user/${userId}`,
      type: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
      },
      data: $('#profile-form').serialize(),
      success: function() {
        showUserDeleteSubmitSuccess();
      },
      error: function() {
        showSubmitError();
      }
    }).catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
  });
}

function showUserDeleteSubmitSuccess() {
  $('.successMessage').toggleClass('hidden');
  setTimeout(function() {
    window.location = 'index.html';
  }, 1500);
}

function showDepartmentSubmitSuccess() {
  $('.successMessage').toggleClass('hidden');
  $('#name').val('');
  setTimeout(function() {
    $('.successMessage').toggleClass('hidden');
  }, 1500);
}

function captureDepartmentForDeletion() {
  $('#profile-form').on('submit', function(e) {
    e.preventDefault();
    let departmentId = $(this)
      .find('[name=departmentId]')
      .val();
    //console.log(departmentId);
    $.ajax({
      url: `/department/${departmentId}`,
      type: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
      },
      data: $('#profile-form').serialize(),
      success: function() {
        showDepartmentForDeletionSubmitSuccess();
      },
      error: function() {
        showSubmitError();
      }
    }).catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
  });
}

function showDepartmentForDeletionSubmitSuccess() {
  $('.successMessage').toggleClass('hidden');
  $('#name').val('');
  setTimeout(function() {
    window.location = 'index.html';
  }, 1500);
}

function searchMenu() {
  $('#site-search-menu').on('submit', function(e) {
    e.preventDefault();
    let email = $('#searchEmail').val();
    let name = $('#searchName')
      .val()
      .toLowerCase();
    let [firstName, lastName] = name.split(' ');
    let departmentId = $('#departmentId').val();
    let searchTerm = '?';
    if (email != '') {
      searchTerm += `email=${email}&`;
    }
    if (firstName != '') {
      searchTerm += `firstName=${firstName}&`;
    }
    if (lastName) {
      searchTerm += `lastName=${lastName}&`;
    }
    if (departmentId) {
      searchTerm += `departmentId=${departmentId}`;
    }
    if (searchTerm[searchTerm.length - 1] === '&') {
      searchTerm.substr(0, searchTerm.length - 1);
    }

    $.ajax({
      url: `/user/search/${searchTerm}`,
      type: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
      },
      data: $('#profile-form').serialize(),
      success: function(json) {
        console.log('data recieved');
        showAllUsers(json);
      },
      error: function() {
        console.log('error');
        showSubmitError();
      }
    }).catch(err => {
      if (err.status === 401) {
        window.location = '/login.html';
      }
    });
  });
  searchReset();
}

function searchReset() {
  $('#reset-button').click(() => {
    getAllUsers();
    $('#searchEmail').val('');
    $('#searchName').val('');
    $('#departmentId').val('');
  });
}

function captureUserlogin() {
  $('.user-login').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/auth/login',
      type: 'POST',
      data: $('.user-login').serialize(),
      success: function(json) {
        Cookies.set('jwt', json.authToken);
        Cookies.set('loggedInUserId', json.userId);
        Cookies.set('permission', json.permission);
        window.location = 'index.html';
      },
      error: function(json) {
        let errorMessage = json.responseJSON.message;
        showLoginErrorMessage(errorMessage);
      }
    });
  });
}

function showLoginErrorMessage(errorMessage) {
  $('.error-message')
    .html('')
    .removeClass('hidden').append(`
      <p>${errorMessage} Please check your entries and try again.</p>
    `);
  setTimeout(() => {
    $('.error-message').addClass('hidden');
  }, 5000);
}

function permissionCheck() {
  let permission = Cookies.get('permission');
  if (permission == 1) {
    $('.permission--js').toggleClass('hidden');
  }
}

function renderProfileMenuButton() {
  let userId = Cookies.get('loggedInUserId');
  //(userId);
  let container = $('.profile-menu--edit');
  $(container).append(`
      <a href="profile-edit.html?id=${userId}">
        <i class="fa fa-user-o fa-2x" aria-hidden="true"></i>
        edit user profile
      </a>
    `);
}

function watchForLogout() {
  $(document).ready(() => {
    $('.profile-menu--logout').click(() => {
      Cookies.remove('jwt');
      window.location = 'login.html';
    });
  });
}

export { getAllDepartments, renderStates, renderCountries };

(function(window) {
  const entryPoints = {};

  entryPoints.runIndex = () => {
    watchForLogout();
    getAllUsers();
    getAllDepartmentsIndexMenu();
    searchMenu();
    permissionCheck();
    renderProfileMenuButton();
  };

  entryPoints.runProfile = () => {
    let queries = {};
    $.each(document.location.search.substr(1).split('&'), function(c, q) {
      let i = q.split('=');
      queries[i[0].toString()] = i[1].toString();
    });
    getSingleUser(queries['id']);
  };

  entryPoints.runProfileCreate = () => {
    getAllDepartments();
    captureUserSubmission();
  };

  entryPoints.runProfileEdit = () => {
    let queries = {};
    $.each(document.location.search.substr(1).split('&'), function(c, q) {
      let i = q.split('=');
      queries[i[0].toString()] = i[1].toString();
    });
    getSingleUserEdit(queries['id']).then(() => {
      captureUserEdit(queries['id']);
    });
    setupDropZone(queries['id']);
  };

  entryPoints.runProfileDelete = () => {
    showUsersForDeletion();
    captureUserForDelete();
  };

  entryPoints.runDepartmentCreate = () => {
    captureDepartmentSubmission();
  };

  entryPoints.runDepartmentDelete = () => {
    getAllDepartments();
    captureDepartmentForDeletion();
  };

  entryPoints.runUserLogin = () => {
    captureUserlogin();
  };
  window.EntryPoints = entryPoints;
})(window);
