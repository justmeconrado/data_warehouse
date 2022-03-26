"use strict";

var headUs = document.getElementById('headUs');
var usersList = document.getElementById('usersList');
var newUserBtn = document.getElementById('newUserBtn');
var darkImageNewUser = document.getElementById('darkImageNewUser');
var closeNewUser = document.getElementById('closeNewUser');
var cancelUser = document.getElementById('cancelUser');
var userName = document.getElementById('userName');
var userLastname = document.getElementById('userLastname');
var userEmail = document.getElementById('userEmail');
var userPass = document.getElementById('userPass');
var userPassRep = document.getElementById('userPassRep');
var perfilSlt = document.getElementById('perfilSlt');
var perfilList = document.getElementById('perfilList');
var saveUser = document.getElementById('saveUser');
var msgUserEmail = document.getElementById('msgUserEmail');
var msgUserName = document.getElementById('msgUserName');
var msgUserLastname = document.getElementById('msgUserLastname');
var msgUserPass = document.getElementById('msgUserPass');
var msgUserPassRep = document.getElementById('msgUserPassRep');
var darkImageUsers = document.getElementById('darkImageUsers');
var cancelDltUserBtn = document.getElementById('cancelDltUserBtn');
var deleteUserBtn = document.getElementById('deleteUserBtn');
var darkImageEditUser = document.getElementById('darkImageEditUser');
var userNameEdit = document.getElementById('userNameEdit');
var userLastnameEdit = document.getElementById('userLastnameEdit');
var userEmailEdit = document.getElementById('userEmailEdit');
var perfilSltEdit = document.getElementById('perfilSltEdit');
var closeEditUser = document.getElementById('closeEditUser');
var msgUserNameEdit = document.getElementById('msgUserNameEdit');
var msgUserLastnameEdit = document.getElementById('msgUserLastnameEdit');
var msgUserEmailEdit = document.getElementById('msgUserEmailEdit');
var perfilListEdit = document.getElementById('perfilListEdit');
var saveEditedUser = document.getElementById('saveEditedUser');
var userPassEdit = document.getElementById('userPassEdit');
var userPassRepEdit = document.getElementById('userPassRepEdit');
var msgUserPassRepEdit = document.getElementById('msgUserPassRepEdit');
var msgUserPassEdit = document.getElementById('msgUserPassEdit');
var varUserId = null;
var varSelectPerfil = 0;
var uId = {}; //show users

function getUsers() {
  var options, response, data;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          usersList.innerHTML = '';
          console.log(JSON.parse(sessionStorage.getItem('Token')));
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/users', options));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          data.forEach(function (element) {
            var info = {
              userId: element.user_id,
              firstname: element.firstname,
              lastname: element.lastname,
              email: element.email,
              perfil: element.perfil
            };
            var row = document.createElement('li');
            var user = document.createElement('div');
            var email = document.createElement('div');
            var perfil = document.createElement('div');
            var actions = document.createElement('div');
            var ellipsis = document.createElement('i');
            var trash = document.createElement('i');
            var pen = document.createElement('i');
            user.innerText = info.firstname + ' ' + info.lastname;
            email.innerText = info.email;
            perfil.innerText = info.perfil;
            row.classList.add('row-user');
            user.classList.add('u-item');
            email.classList.add('u-item');
            perfil.classList.add('u-item');
            actions.classList = 'u-item action';
            ellipsis.classList = 'fas fa-ellipsis-h';
            trash.classList = 'fas fa-trash none';
            pen.classList = 'fas fa-pen none';
            actions.appendChild(ellipsis);
            actions.appendChild(trash);
            actions.appendChild(pen);
            usersList.appendChild(row);
            row.appendChild(user);
            row.appendChild(email);
            row.appendChild(perfil);
            row.appendChild(actions);
            row.addEventListener('mouseover', function () {
              return hoverRow(ellipsis, trash, pen);
            });
            row.addEventListener('mouseout', function () {
              return outRow(ellipsis, trash, pen);
            });
            trash.addEventListener('click', function () {
              uId = {
                userId: element.user_id
              };
              modalDeleteUser();
            });
            pen.addEventListener('click', function () {
              return userEdition(info);
            });
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function hoverRow(ellipsis, trash, pen) {
  ellipsis.classList.add('none');
  trash.classList.remove('none');
  pen.classList.remove('none');
}

function outRow(ellipsis, trash, pen) {
  ellipsis.classList.remove('none');
  trash.classList.add('none');
  pen.classList.add('none');
} //add user


newUserBtn.addEventListener('click', function () {
  window.scrollTo(0, 0);
  darkImageNewUser.classList.remove('none');
});
closeNewUser.addEventListener('click', function (event) {
  return closeWindowNewUser(event);
});
cancelUser.addEventListener('click', function (event) {
  return closeWindowNewUser(event);
});

function closeWindowNewUser(event) {
  event.preventDefault();
  userName.value = '';
  userLastname.value = '';
  userEmail.value = '';
  userPass.value = '';
  userPassRep.value = '';
  perfilSlt.innerHTML = 'Seleccionar perfil<i class="fas fa-caret-down"></i>';
  msgUserEmail.innerText = 'Error en datos ingresados';
  userName.classList.remove('border-wrong');
  msgUserName.classList.remove('visible');
  userLastname.classList.remove('border-wrong');
  msgUserLastname.classList.remove('visible');
  userEmail.classList.remove('border-wrong');
  msgUserEmail.classList.remove('visible');
  userPass.classList.remove('border-wrong');
  msgUserPass.style.color = '#333333';
  userPassRep.classList.remove('border-wrong');
  msgUserPassRep.classList.remove('visible');
  perfilSlt.classList.remove('border-wrong');
  darkImageNewUser.classList.add('none');
  perfilList.classList.add('no-visible');
  varSelectPerfil = 0;
} //select perfil


perfilSlt.addEventListener('click', function () {
  if (varSelectPerfil === 0) {
    var perfilClass = 'perfil';
    showPerfil(perfilList, perfilSlt, perfilClass);
  } else if (varSelectPerfil === 1) {
    perfilList.classList.add('no-visible');
    varSelectPerfil = 0;
  }
});

function showPerfil(perfList, perfSlt, perfilC) {
  perfList.classList.remove('no-visible');
  varSelectPerfil = 1;
  perfArray = document.querySelectorAll(".".concat(perfilC));
  perfArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPerfilFunction(element.innerHTML, perfList, perfSlt);
    });
  });
}

function selectPerfilFunction(perfil, perfList, perfSlt) {
  varSelectPerfil = 0;
  perfList.classList.add('no-visible');
  perfSlt.innerHTML = "".concat(perfil, "<i class=\"fas fa-caret-down\"></i>");
} //save user


saveUser.addEventListener('click', function (event) {
  return addUsers(event);
});

function addUsers(event) {
  var user, options, response, data;
  return regeneratorRuntime.async(function addUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          msgUserEmail.innerText = 'Error en datos ingresados';
          event.preventDefault();
          user = {
            firstname: userName.value,
            lastname: userLastname.value,
            email: userEmail.value,
            perfil: perfilSlt.innerText,
            password: userPass.value,
            repeated_password: userPassRep.value
          };
          validateUserData(user, userName, msgUserName, userLastname, msgUserLastname, userEmail, msgUserEmail, perfilSlt, perfilList, userPass, msgUserPass, userPassRep, msgUserPassRep);
          options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/users/register', options));

        case 8:
          response = _context2.sent;

          if (response.status === 409) {
            userEmail.classList.add('border-wrong');
            msgUserEmail.classList.add('visible');
            msgUserEmail.innerText = 'El email ya existe';
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context2.sent;
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](5);
          return _context2.abrupt("return", _context2.t0);

        case 18:
          closeWindowNewUser(event);
          getUsers();

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 15]]);
}

function validateUserData(user, usName, msgUsName, usLastname, msgUsLastname, usEmail, msgUsEmail, perfilSlt, perfilList, usPass, msgUsPass, usPassRep, msgUsPassRep) {
  if (usName.value === '') {
    usName.classList.add('border-wrong');
    msgUsName.classList.add('visible');
    usName.addEventListener('keyup', function () {
      if (usName.value !== '') {
        usName.classList.remove('border-wrong');
        msgUsName.classList.remove('visible');
      }
    });
  }

  if (usLastname.value === '') {
    usLastname.classList.add('border-wrong');
    msgUsLastname.classList.add('visible');
    usLastname.addEventListener('keyup', function () {
      if (usLastname.value !== '') {
        usLastname.classList.remove('border-wrong');
        msgUsLastname.classList.remove('visible');
      }
    });
  }

  if (usEmail.value === '' || !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usEmail.value)) {
    usEmail.classList.add('border-wrong');
    msgUsEmail.classList.add('visible');
    usEmail.addEventListener('keyup', function () {
      if (usEmail.value !== '' && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(usEmail.value)) {
        usEmail.classList.remove('border-wrong');
        msgUsEmail.classList.remove('visible');
      }
    });
  }

  if (perfilSlt.innerText === 'Seleccionar perfil') {
    perfilSlt.classList.add('border-wrong');
    perfilList.addEventListener('click', function () {
      if (perfilSlt.innerText !== 'Seleccionar ciudad') {
        perfilSlt.classList.remove('border-wrong');
      }
    });
  }

  if (usPass.value === '' || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPass.value)) {
    usPass.classList.add('border-wrong');
    msgUsPass.style.color = '#F03738';
    usPass.addEventListener('keyup', function () {
      if (usPass.value !== '' && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPass.value)) {
        usPass.classList.remove('border-wrong');
        msgUsPass.style.color = '#333333';
      }
    });
  }

  if (usPassRep.value === '' || usPassRep.value !== usPass.value || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPassRep.value)) {
    usPassRep.classList.add('border-wrong');
    msgUsPassRep.classList.add('visible');
    usPassRep.addEventListener('keyup', function () {
      if (usPassRep.value !== '' && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(usPassRep.value)) {
        usPassRep.classList.remove('border-wrong');
        msgUsPassRep.classList.remove('visible');
      }
    });
  }
}

function validatePass(userPassEdit, msgUserPassRep, userPassRepEdit, msgUserPassRepEdit) {
  if (userPassEdit.value === '') {
    userPassEdit.classList.remove('border-wrong');
    msgUserPassRep.style.color = '#333333';
  }

  if (userPassEdit.value !== '' && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(userPassEdit.value)) {
    userPassEdit.classList.add('border-wrong');
    msgUserPassRep.style.color = '#F03738';
    userPassEdit.addEventListener('keyup', function () {
      if (userPassEdit.value === '') {
        userPassEdit.classList.remove('border-wrong');
        msgUserPassRep.style.color = '#333333';
      }

      if (userPassEdit.value !== '' && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(userPassEdit.value)) {
        userPassEdit.classList.remove('border-wrong');
        msgUserPassRep.style.color = '#333333';
      }
    });
  }

  if (userPassRepEdit.value === '') {
    userPassRepEdit.classList.remove('border-wrong');
    msgUserPassRepEdit.classList.remove('visible');
  }

  if (userPassRepEdit.value !== '' && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(userPassRepEdit.value) || userPassRepEdit.value !== userPassEdit.value) {
    userPassRepEdit.classList.add('border-wrong');
    msgUserPassRepEdit.classList.add('visible');
    userPassRepEdit.addEventListener('keyup', function () {
      if (userPassRepEdit.value !== '' && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(userPassRepEdit.value) && userPassRepEdit.value !== userPassEdit.value) {
        userPassRepEdit.classList.remove('border-wrong');
        msgUserPassRepEdit.classList.remove('visible');
      }
    });
  }
} //delete user


function modalDeleteUser() {
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageUsers.classList.remove('none');
  cancelDltUserBtn.addEventListener('click', function () {
    body.classList.remove('modal');
    darkImageUsers.classList.add('none');
  });
}

deleteUserBtn.addEventListener('click', function (event) {
  body.classList.remove('modal');
  darkImageUsers.classList.add('none');
  darkImageEditUser.classList.add('none');
  deleteUser(uId, event);
});

function deleteUser(info, event) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/users/".concat(info.userId), options));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context3.sent;
          closeWindowNewUser(event);
          getUsers();

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
} //edit user


function userEdition(info) {
  var options, response, data;
  return regeneratorRuntime.async(function userEdition$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          varUserId = +info.userId;
          window.scrollTo(0, 0);
          darkImageEditUser.classList.remove('none');
          darkImageEditUser.style.visibility = 'visible';
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context4.next = 7;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/users/".concat(varUserId), options));

        case 7:
          response = _context4.sent;
          _context4.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context4.sent;
          loadUserData(data);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function loadUserData(data) {
  userNameEdit.value = data.firstname;
  userLastnameEdit.value = data.lastname;
  userEmailEdit.value = data.email;

  if (data.perfil === '') {
    perfilSltEdit.innerHTML = 'Seleccionar perfil<i class="fas fa-caret-down"></i>';
  } else {
    perfilSltEdit.innerHTML = "".concat(data.perfil, "<i class=\"fas fa-caret-down\"></i>");
  }
} //close window edit user


closeEditUser.addEventListener('click', function (event) {
  return closeWindowEditUser(event);
});

function closeWindowEditUser(event) {
  event.preventDefault();
  darkImageEditUser.classList.add('none');
  userNameEdit.classList.remove('border-wrong');
  msgUserNameEdit.classList.remove('visible');
  userLastnameEdit.classList.remove('border-wrong');
  msgUserLastnameEdit.classList.remove('visible');
  userEmailEdit.classList.remove('border-wrong');
  msgUserEmailEdit.classList.remove('visible');
  perfilSltEdit.classList.remove('border-wrong');
  userPassEdit.classList.remove('border-wrong');
  msgUserPassEdit.style.color = '#333333';
  userPassRepEdit.classList.remove('border-wrong');
  msgUserPassRepEdit.classList.remove('visible');
  msgUserEmailEdit.innerText = 'Error en datos ingresados';
  varUserId = null;
} //select perfil


perfilSltEdit.addEventListener('click', function () {
  if (varSelectPerfil === 0) {
    var perfilClass = 'perfil-edit';
    showPerfil(perfilListEdit, perfilSltEdit, perfilClass);
  } else if (varSelectPerfil === 1) {
    perfilListEdit.classList.add('no-visible');
    varSelectPerfil = 0;
  }
}); //save edited user

saveEditedUser.addEventListener('click', function (event) {
  return editUser(event);
});

function editUser(event) {
  var modifiedUser, options, response, data;
  return regeneratorRuntime.async(function editUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          event.preventDefault();
          modifiedUser = {
            firstname: userNameEdit.value,
            lastname: userLastnameEdit.value,
            email: userEmailEdit.value,
            perfil: perfilSltEdit.innerText,
            password: userPassEdit.value
          };
          validateUserData(modifiedUser, userNameEdit, msgUserNameEdit, userLastnameEdit, msgUserLastnameEdit, userEmailEdit, msgUserEmailEdit, perfilSltEdit, perfilListEdit, userPassEdit, msgUserPassRep, userPassRepEdit, msgUserPassRepEdit);
          validatePass(userPassEdit, msgUserPassRep, userPassRepEdit, msgUserPassRepEdit);
          options = {
            method: 'PUT',
            body: JSON.stringify(modifiedUser),
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token'))),
              "Content-Type": "application/json"
            }
          };
          _context5.next = 7;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/users/".concat(varUserId), options));

        case 7:
          response = _context5.sent;

          if (response.status === 409) {
            userEmailEdit.classList.add('border-wrong');
            msgUserEmailEdit.classList.add('visible');
            msgUserEmailEdit.innerText = 'El email ya existe';
          }

          _context5.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          data = _context5.sent;
          closeWindowEditUser(event);
          getUsers();

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  });
} //delete user (edition)


var deleteUserEdit = document.getElementById('deleteUserEdit');
deleteUserEdit.addEventListener('click', function (event) {
  event.preventDefault();
  uId = {
    userId: varUserId
  };
  darkImageEditUser.style.visibility = 'hidden';
  modalDeleteUser();
});