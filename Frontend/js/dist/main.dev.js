"use strict";

sessionStorage.clear();
var varSect = 'log';
var submit = document.getElementById('submit');
var username = document.getElementById('username');
var password = document.getElementById('password');
var login = document.getElementById('login');
var usersSection = document.getElementById('usersSection');
var contacts = document.getElementById('contacts');
var companies = document.getElementById('companies');
var users = document.getElementById('users');
var locations = document.getElementById('location');
var locationSection = document.getElementById('locationSection');
var companiesSection = document.getElementById('companiesSection');
var contactsSection = document.getElementById('contactsSection');
var usersLink = document.getElementById('usersLink');
submit.addEventListener('click', function (event) {
  event.preventDefault();
  loginFunction();
});

function loginFunction() {
  var user, options, response, data;
  return regeneratorRuntime.async(function loginFunction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = {
            username: username.value,
            password: password.value
          };
          options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json"
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/users/login', options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;

          if (response.status === 200) {
            saveToken(data);
            login.classList.add('none');
            varSect = 'noLog';
            contactsSection.classList.remove('none');
            getContacts();
            contacts.classList.add('bold');
          }

          if (data.perf === 'Admin') {
            usersLink.classList.remove('none');
          } else {
            usersLink.classList.add('none');
          }

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function saveToken(data) {
  sessionStorage.setItem('Token', JSON.stringify(data.token));
}

contacts.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.add('bold');
    companies.classList.remove('bold');
    users.classList.remove('bold');
    locations.classList.remove('bold');
    contactsSection.classList.remove('none');
    companiesSection.classList.add('none');
    usersSection.classList.add('none');
    locationSection.classList.add('none');
    searchInput.value = '';
  }
});
companies.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.remove('bold');
    companies.classList.add('bold');
    users.classList.remove('bold');
    locations.classList.remove('bold');
    contactsSection.classList.add('none');
    companiesSection.classList.remove('none');
    usersSection.classList.add('none');
    locationSection.classList.add('none');
  }
});
users.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.remove('bold');
    companies.classList.remove('bold');
    users.classList.add('bold');
    locations.classList.remove('bold');
    contactsSection.classList.add('none');
    companiesSection.classList.add('none');
    usersSection.classList.remove('none');
    locationSection.classList.add('none');
    getUsers();
  }
});
locations.addEventListener('click', function () {
  if (varSect !== 'log') {
    contacts.classList.remove('bold');
    companies.classList.remove('bold');
    users.classList.remove('bold');
    locations.classList.add('bold');
    contactsSection.classList.add('none');
    companiesSection.classList.add('none');
    usersSection.classList.add('none');
    locationSection.classList.remove('none');
    getLocations();
  }
});