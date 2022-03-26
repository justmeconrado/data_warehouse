"use strict";

var darkImageContacts = document.getElementById('darkImageContacts');
var cancelDltContBtn = document.getElementById('cancelDltContBtn');
var deleteContactBtn = document.getElementById('deleteContactBtn');
var contactsList = document.getElementById('contactsList');
var sortName = document.getElementById('sortName');
var sortCountry = document.getElementById('sortCountry');
var sortCompany = document.getElementById('sortCompany');
var sortPosition = document.getElementById('sortPosition');
var sortInterest = document.getElementById('sortInterest');
var search = document.getElementById('search');
var searchInput = document.getElementById('searchInput');
var checkboxAll = document.getElementById('checkboxAll');
var contCounter = document.getElementById('contCounter');
var counterAndDelete = document.getElementById('counterAndDelete');
var dltCtcBtn = document.getElementById('dltCtcBtn');
var newCntBtn = document.getElementById('newCntBtn');
var company = document.getElementById('company');
var selectCompany = document.getElementById('selectCompany');
var compLbl = document.getElementById('compLbl');
var regionSelect = document.getElementById('regionSelect');
var regionsList = document.getElementById('regionsList');
var countrySelect = document.getElementById('countrySelect');
var countriesList = document.getElementById('countriesList');
var citySelect = document.getElementById('citySelect');
var citiesList = document.getElementById('citiesList');
var address = document.getElementById('address');
var interestSelect = document.getElementById('interestSelect');
var interestsList = document.getElementById('interestsList');
var telephone = document.getElementById('telephone');
var selectTelephone = document.getElementById('selectTelephone');
var prefTelephoneList = document.getElementById('prefTelephoneList');
var whatsapp = document.getElementById('whatsapp');
var selectWhatsapp = document.getElementById('selectWhatsapp');
var prefWhatsappList = document.getElementById('prefWhatsappList');
var instagram = document.getElementById('instagram');
var selectInstagram = document.getElementById('selectInstagram');
var prefInstagramList = document.getElementById('prefInstagramList');
var facebook = document.getElementById('facebook');
var selectFacebook = document.getElementById('selectFacebook');
var prefFacebookList = document.getElementById('prefFacebookList');
var linkedin = document.getElementById('linkedin');
var selectLinkedin = document.getElementById('selectLinkedin');
var prefLinkedinList = document.getElementById('prefLinkedinList');
var cancelContact = document.getElementById('cancelContact');
var closeNewCtc = document.getElementById('closeNewCtc');
var darkImageAddCtc = document.getElementById('darkImageAddCtc');
var saveContact = document.getElementById('saveContact');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var position = document.getElementById('position');
var email = document.getElementById('email');
var main = document.querySelector('main');
var msgFirst = document.getElementById('msgFirst');
var msgLast = document.getElementById('msgLast');
var msgPos = document.getElementById('msgPos');
var msgEmail = document.getElementById('msgEmail');
var msgAddress = document.getElementById('msgAddress');
var darkImageEditCtc = document.getElementById('darkImageEditCtc');
var closeEditCtc = document.getElementById('closeEditCtc');
var deleteContactEdit = document.getElementById('deleteContactEdit');
var firstnameEdit = document.getElementById('firstnameEdit');
var lastnameEdit = document.getElementById('lastnameEdit');
var positionEdit = document.getElementById('positionEdit');
var emailEdit = document.getElementById('emailEdit');
var addressEdit = document.getElementById('addressEdit');
var companyEdit = document.getElementById('companyEdit');
var regionSelectEdit = document.getElementById('regionSelectEdit');
var countrySelectEdit = document.getElementById('countrySelectEdit');
var citySelectEdit = document.getElementById('citySelectEdit');
var interestSelectEdit = document.getElementById('interestSelectEdit');
var tel = document.getElementById('tel');
var telephoneEdit = document.getElementById('telephoneEdit');
var selectTelephoneEdit = document.getElementById('selectTelephoneEdit');
var wsp = document.getElementById('wsp');
var whatsappEdit = document.getElementById('whatsappEdit');
var selectWhatsappEdit = document.getElementById('selectWhatsappEdit');
var inst = document.getElementById('inst');
var instagramEdit = document.getElementById('instagramEdit');
var selectInstagramEdit = document.getElementById('selectInstagramEdit');
var face = document.getElementById('face');
var facebookEdit = document.getElementById('facebookEdit');
var selectFacebookEdit = document.getElementById('selectFacebookEdit');
var link = document.getElementById('link');
var linkedinEdit = document.getElementById('linkedinEdit');
var selectLinkedinEdit = document.getElementById('selectLinkedinEdit');
var compLblEdit = document.getElementById('compLblEdit');
var selectCompanyEdit = document.getElementById('selectCompanyEdit');
var regionsListEdit = document.getElementById('regionsListEdit');
var countriesListEdit = document.getElementById('countriesListEdit');
var citiesListEdit = document.getElementById('citiesListEdit');
var interestsListEdit = document.getElementById('interestsListEdit');
var prefTelephoneListEdit = document.getElementById('prefTelephoneListEdit');
var prefWhatsappListEdit = document.getElementById('prefWhatsappListEdit');
var prefInstagramListEdit = document.getElementById('prefInstagramListEdit');
var prefFacabookListEdit = document.getElementById('prefFacabookListEdit');
var prefLinkedinListEdit = document.getElementById('prefLinkedinListEdit');
var saveContactEdit = document.getElementById('saveContactEdit');
var msgFirstEdit = document.getElementById('msgFirstEdit');
var msgLastEdit = document.getElementById('msgLastEdit');
var msgPosEdit = document.getElementById('msgPosEdit');
var msgEmailEdit = document.getElementById('msgEmailEdit');
var msgAddressEdit = document.getElementById('msgAddressEdit');
var contIdArray = [];
var dataCheckbox = [];
var channelsDB = [];
var newData = [];
var cId = {};
var varSortName = 0;
var varSortCountry = 0;
var varSortCompany = 0;
var varSortPosition = 0;
var varSortInterest = 0;
var varDelete = 0;
var varSelectCompany = 0;
var varSelectRegion = 0;
var varSelectCountry = 0;
var varEnableCountry = 0;
var varEnableCity = 0;
var varSelectCity = 0;
var varSelectInterest = 0;
var varPrefTel = 0;
var varPrefWsp = 0;
var varPrefInst = 0;
var varPrefFace = 0;
var varPrefLink = 0;
var varEnablePrefT = 0;
var varEnablePrefW = 0;
var varEnablePrefI = 0;
var varEnablePrefF = 0;
var varEnablePrefL = 0;
var varRegId;
var varCountId;
var varCityId;
var varEditContact;
var varCompanyId = null;
var varCheckboxAll = 'unselected'; //show contacts 

contacts.addEventListener('click', function () {
  getContacts();
  checkboxAll.classList = 'far fa-square';
  counterAndDelete.classList.add('hidden');
  varCheckboxAll = 'unselected';
  contIdArray = [];
});

function getContacts() {
  var options, response, data;
  return regeneratorRuntime.async(function getContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          contactsList.innerHTML = '';
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/contacts', options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          dataCheckbox = data;
          renderResults(data);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function checkAfterSortAndSearch(data) {
  counterAndDelete.classList.add('hidden');
  varCheckboxAll = 'indeterminate';
  checkboxAllFunction(data);
}

checkboxAll.addEventListener('click', function () {
  return checkboxAllFunction(dataCheckbox);
});

function renderResults(data) {
  newData = data;
  contactsList.innerHTML = '';
  data.forEach(function _callee(element) {
    var info, row, checkbox, contact, country, company, position, interest, actions, ellipsis, trash, pen;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            info = {
              contactId: element.contact_id,
              firstname: element.firstname,
              lastname: element.lastname,
              email: element.email,
              cityId: element.city_id,
              cityName: element.city_name,
              countryId: element.country_id,
              countryName: element.country_name,
              regionId: element.region_id,
              regionName: element.region_name,
              companyId: element.company_id,
              companyName: element.company_name,
              position: element.position,
              preferredChannel: element.preferred_channels,
              interest: element.interest,
              varSelectContact: 0
            };
            row = document.createElement('li');
            checkbox = document.createElement('i');
            contact = document.createElement('div');
            country = document.createElement('div');
            company = document.createElement('div');
            position = document.createElement('div');
            interest = document.createElement('div');
            actions = document.createElement('div');
            ellipsis = document.createElement('i');
            trash = document.createElement('i');
            pen = document.createElement('i');
            contact.innerHTML = "<p>".concat(info.firstname, " ").concat(info.lastname, "</p><p class=\"grey-info\">").concat(info.email, "</p>");
            country.innerHTML = "<p>".concat(info.countryName, "</p><p class=\"grey-info\">").concat(info.regionName, "</p>");
            company.innerText = info.companyName;
            position.innerText = info.position;
            row.classList.add('row-contact');
            contact.classList = 'u-item col-item';
            country.classList = 'u-item col-item';
            company.classList.add('u-item');
            position.classList.add('u-item');
            interest.classList.add('u-item');
            checkbox.classList = 'far fa-square u-item select';
            actions.classList = 'u-item action';
            ellipsis.classList = 'fas fa-ellipsis-h';
            trash.classList = 'fas fa-trash none';
            pen.classList = 'fas fa-pen none';

            if (+info.interest === 100) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (75 <= +info.interest && +info.interest < 100) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress orange\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (50 <= +info.interest && +info.interest < 75) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress yellow\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (25 <= +info.interest && +info.interest < 50) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress blue\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            } else if (0 <= +info.interest && +info.interest < 25) {
              interest.innerHTML = "<label class=\"percentage\" for=\"progressBar\">".concat(info.interest, "%</label>\n                                <progress id=\"progressBar\" class=\"progress grey\" max=\"100\" value=").concat(info.interest, ">").concat(info.interest, "%</progress>");
            }

            actions.appendChild(ellipsis);
            actions.appendChild(trash);
            actions.appendChild(pen);
            contactsList.appendChild(row);
            row.appendChild(checkbox);
            row.appendChild(contact);
            row.appendChild(country);
            row.appendChild(company);
            row.appendChild(position);
            row.appendChild(interest);
            row.appendChild(actions);
            row.addEventListener('mouseover', function () {
              return hoverRow(ellipsis, trash, pen);
            });
            row.addEventListener('mouseout', function () {
              return outRow(ellipsis, trash, pen);
            });
            trash.addEventListener('click', function () {
              cId = {
                contactId: element.contact_id
              };
              modalDelete();
            });
            pen.addEventListener('click', function () {
              return contactEdition(info);
            });
            checkbox.addEventListener('click', function () {
              return selectContact(checkbox, info, data, row);
            });

          case 44:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
} //delete contact


function modalDelete() {
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageContacts.classList.remove('none');
  cancelDltContBtn.addEventListener('click', function () {
    body.classList.remove('modal');
    darkImageContacts.classList.add('none');
    darkImageEditCtc.style.visibility = 'visible';
    varDelete = 0;
  });
}

function deleteContact(info) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteContact$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/contacts/".concat(info.contactId), options));

        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context3.sent;
          checkAfterSortAndSearch();
          darkImageEditCtc.style.visibility = 'visible';
          main.classList.remove('height-add-ctc');
          searchInput.value = '';
          getContacts();
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", _context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

dltCtcBtn.addEventListener('click', function () {
  varDelete = 1;
  modalDelete();
});

function deleteContacts() {
  contIdArray.forEach(function _callee2(ctc) {
    var info, options, response, data;
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            info = {
              contactId: ctc
            };
            options = {
              method: 'DELETE',
              headers: {
                Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
              }
            };
            _context4.next = 4;
            return regeneratorRuntime.awrap(fetch("http://localhost:3000/contacts/".concat(info.contactId), options));

          case 4:
            response = _context4.sent;
            _context4.next = 7;
            return regeneratorRuntime.awrap(response.json());

          case 7:
            data = _context4.sent;

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  searchInput.value = '';
  setTimeout(function () {
    getContacts();
  }, 500);
  checkAfterSortAndSearch();
  varDelete = 0;
} //sort columns


sortName.addEventListener('click', function () {
  if (varSortName === 0) {
    sortByName(newData);
  } else if (varSortName === 1) {
    sortByNameReverse(newData);
  }

  checkAfterSortAndSearch(newData);
  varSortCountry = 0;
  varSortCompany = 0;
  varSortPosition = 0;
  varSortInterest = 0;
});
sortCountry.addEventListener('click', function () {
  if (varSortCountry === 0) {
    sortByCountry(newData);
  } else if (varSortCountry === 1) {
    sortByCountryReverse(newData);
  }

  checkAfterSortAndSearch(newData);
  varSortName = 0;
  varSortCompany = 0;
  varSortPosition = 0;
  varSortInterest = 0;
});
sortCompany.addEventListener('click', function () {
  if (varSortCompany === 0) {
    sortByCompany(newData);
  } else if (varSortCompany === 1) {
    sortByCompanyReverse(newData);
  }

  checkAfterSortAndSearch(newData);
  varSortName = 0;
  varSortCountry = 0;
  varSortPosition = 0;
  varSortInterest = 0;
});
sortPosition.addEventListener('click', function () {
  if (varSortPosition === 0) {
    sortByPosition(newData);
  } else if (varSortPosition === 1) {
    sortByPositionReverse(newData);
  }

  checkAfterSortAndSearch(newData);
  varSortName = 0;
  varSortCountry = 0;
  varSortCompany = 0;
  varSortInterest = 0;
});
sortInterest.addEventListener('click', function () {
  if (varSortInterest === 0) {
    sortByInterest(newData);
  } else if (varSortInterest === 1) {
    sortByInterestReverse(newData);
  }

  checkAfterSortAndSearch(newData);
  varSortName = 0;
  varSortCountry = 0;
  varSortCompany = 0;
  varSortPosition = 0;
});

function sortByName(data) {
  var sortedNames = data.sort(function (a, b) {
    if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) {
      return 1;
    }

    if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedNames);
  varSortName = 1;
}

function sortByNameReverse(data) {
  var sortedNames = data.reverse(function (a, b) {
    if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) {
      return 1;
    }

    if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedNames);
  varSortName = 0;
}

function sortByCountry(data) {
  var sortedCountries = data.sort(function (a, b) {
    if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) {
      return 1;
    }

    if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCountries);
  varSortCountry = 1;
}

function sortByCountryReverse(data) {
  var sortedCountries = data.reverse(function (a, b) {
    if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) {
      return 1;
    }

    if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCountries);
  varSortCountry = 0;
}

function sortByCompany(data) {
  var sortedCompanies = data.sort(function (a, b) {
    if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) {
      return 1;
    }

    if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCompanies);
  varSortCompany = 1;
}

function sortByCompanyReverse(data) {
  var sortedCompanies = data.reverse(function (a, b) {
    if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) {
      return 1;
    }

    if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedCompanies);
  varSortCompany = 0;
}

function sortByPosition(data) {
  var sortedPositions = data.sort(function (a, b) {
    if (a.position.toUpperCase() > b.position.toUpperCase()) {
      return 1;
    }

    if (a.position.toUpperCase() < b.position.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedPositions);
  varSortPosition = 1;
}

function sortByPositionReverse(data) {
  var sortedPositions = data.reverse(function (a, b) {
    if (a.position.toUpperCase() > b.position.toUpperCase()) {
      return 1;
    }

    if (a.position.toUpperCase() < b.position.toUpperCase()) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedPositions);
  varSortPosition = 0;
}

function sortByInterest(data) {
  var sortedInterests = data.sort(function (a, b) {
    if (a.interest > b.interest) {
      return 1;
    }

    if (a.interest < b.interest) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedInterests);
  varSortInterest = 1;
}

function sortByInterestReverse(data) {
  var sortedInterests = data.reverse(function (a, b) {
    if (a.interest > b.interest) {
      return 1;
    }

    if (a.interest < b.interest) {
      return -1;
    }

    return 0;
  });
  renderResults(sortedInterests);
  varSortInterest = 0;
} //search contacts


search.addEventListener('click', function () {
  return getSearchResults();
});
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') getSearchResults();
});
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Backspace' && searchInput.value === '') getSearchResults();
});

function getSearchResults() {
  var search, options, response, data;
  return regeneratorRuntime.async(function getSearchResults$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          search = {
            search_value: searchInput.value
          };
          options = {
            method: 'POST',
            body: JSON.stringify(search),
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token'))),
              "Content-Type": "application/json"
            }
          };
          _context5.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/search', options));

        case 4:
          response = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context5.sent;
          renderResults(data);
          dataCheckbox = data;
          checkAfterSortAndSearch(data);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
} //select contacts 


function selectContact(checkbox, info, data, row) {
  if (checkbox.classList == 'far fa-square u-item select') {
    check(checkbox, info, data, row);
  } else if (checkbox.classList == 'fas fa-check-square u-item select') {
    uncheck(checkbox, info, data, row);
  }
}

function check(checkbox, info, data, row) {
  checkbox.classList = 'fas fa-check-square u-item select';
  row.classList.add('selected-row');
  contIdArray = contIdArray.concat(info.contactId);
  contactCounter(contIdArray);
  allContacts(data);
}

function uncheck(checkbox, info, data, row) {
  checkbox.classList = 'far fa-square u-item select';
  row.classList.remove('selected-row');
  var index = contIdArray.indexOf(info.contactId);
  contIdArray.splice(index, 1);
  contactCounter(contIdArray);
  allContacts(data);
}

function contactCounter(contIdArray) {
  contCounter.innerText = "".concat(contIdArray.length, " seleccionados");

  if (contIdArray.length !== 0) {
    counterAndDelete.classList.remove('hidden');
  } else if (contIdArray.length === 0) {
    counterAndDelete.classList.add('hidden');
  }
}

function allContacts(data) {
  if (contIdArray.length === data.length) {
    checkboxAll.classList = 'fas fa-check-square';
    varCheckboxAll = 'selected';
  } else if (contIdArray.length !== 0 && contIdArray.length !== data.length) {
    checkboxAll.classList = 'fas fa-minus-square';
    varCheckboxAll = 'indeterminate';
  } else if (contIdArray.length === 0) {
    checkboxAll.classList = 'far fa-square';
    varCheckboxAll = 'unselected';
  }
}

function checkboxAllFunction(data) {
  var allConts = document.querySelectorAll('.select');
  var rowContact = document.querySelectorAll('.row-contact');

  if (varCheckboxAll === 'unselected') {
    contIdArray = [];
    checkboxAll.classList = 'fas fa-check-square';
    allConts.forEach(function (element) {
      element.classList = 'fas fa-check-square u-item select';
    });
    data.forEach(function (element) {
      contIdArray = contIdArray.concat(element.contact_id);
    });
    rowContact.forEach(function (row) {
      return row.classList.add('selected-row');
    });
    contactCounter(contIdArray);
    varCheckboxAll = 'selected';
  } else if (varCheckboxAll === 'selected') {
    checkboxAll.classList = 'far fa-square';
    contIdArray = [];
    allConts.forEach(function (element) {
      element.classList = 'far fa-square u-item select';
    });
    rowContact.forEach(function (row) {
      return row.classList.remove('selected-row');
    });
    contactCounter(contIdArray);
    varCheckboxAll = 'unselected';
  } else if (varCheckboxAll === 'indeterminate') {
    checkboxAll.classList = 'far fa-square';
    contIdArray = [];
    allConts.forEach(function (element) {
      element.classList = 'far fa-square u-item select';
    });
    rowContact.forEach(function (row) {
      return row.classList.remove('selected-row');
    });
    contactCounter(contIdArray);
    varCheckboxAll = 'unselected';
  }
} //add contact


newCntBtn.addEventListener('click', function () {
  darkImageAddCtc.classList.remove('none');
  main.classList.add('height-add-ctc');
  var sChannel = 's-channel';
  var chan = 'chan';
  getAllChannels(sChannel, chan);
});

function getAllChannels(sChannel, chan) {
  var options, response, data, chanArray, chansArray;
  return regeneratorRuntime.async(function getAllChannels$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          channelsDB = [];
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context6.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/channels', options));

        case 4:
          response = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context6.sent;
          data.map(function (element) {
            channelsDB = channelsDB.concat({
              channelName: element.channel_name,
              channelId: element.channel_id
            });
          });
          chanArray = document.querySelectorAll(".".concat(sChannel));
          chansArray = document.querySelectorAll(".".concat(chan));
          chansArray.forEach(function (el, i) {
            el.addEventListener('click', function () {
              return console.log(channelsDB[i].channelId);
            });
          });
          chanArray.forEach(function (el, i) {
            el.innerText = channelsDB[i].channelName;
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
} //select company


company.addEventListener('click', function () {
  if (varSelectCompany === 0) {
    selectCompany.innerHTML = '';
    getCompanies(selectCompany, company, compLbl);
  } else if (varSelectCompany === 1) {
    selectCompany.classList.add('none');
    selectCompany.innerHTML = '';
    compLbl.style.top = '0px';
    varSelectCompany = 0;
  }
});

function getCompanies(slctCompany, compan, compLb) {
  var options, response, data;
  return regeneratorRuntime.async(function getCompanies$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/companies', options));

        case 3:
          response = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context7.sent;
          renderSelectCompanies(data, slctCompany, compan, compLb);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function renderSelectCompanies(data, slctCompany, compan, compLb) {
  varSelectCompany = 1;
  slctCompany.classList.remove('none');
  var hcomp = (data.length * 24 + 6) / 2;
  compLb.style.top = "".concat(hcomp, "px");
  data.forEach(function (element) {
    var info = {
      companyId: element.company_id,
      companyName: element.company_name,
      cityId: element.city_id,
      cityName: element.city_name,
      countryId: element.country_id,
      countryName: element.country_name,
      regionId: element.region_id,
      regionName: element.region_name
    };
    var compItem = document.createElement('li');
    compItem.innerText = info.companyName;
    compItem.classList.add('sug-comp');
    slctCompany.appendChild(compItem);
    compItem.addEventListener('click', function () {
      return selectCompanyFunction(info, slctCompany, compan);
    });
  });
}

function selectCompanyFunction(info, slctCompany, compan) {
  slctCompany.classList.add('none');
  slctCompany.innerHTML = '';
  compLbl.style.top = '0px';
  compLblEdit.style.top = '0px';
  compan.innerHTML = "".concat(info.companyName, "<i class=\"fas fa-caret-down\"></i>");
  varSelectCompany = 0;
  varCompanyId = info.companyId;
} //select region


regionSelect.addEventListener('click', function () {
  if (varSelectRegion === 0) {
    getRegions(regionsList, regionSelect);
  } else if (varSelectRegion === 1) {
    regionsList.classList.add('none');
    regionsList.innerHTML = '';
    varSelectRegion = 0;
  }
});

function getRegions(regList, regSelect) {
  var options, response, data;
  return regeneratorRuntime.async(function getRegions$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context8.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/regions', options));

        case 3:
          response = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context8.sent;
          renderSelectRegions(data, regList, regSelect);

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function renderSelectRegions(data, regList, regSelect) {
  varSelectRegion = 1;
  regList.classList.remove('none');
  data.forEach(function (element) {
    var info = {
      regionId: element.region_id,
      regionName: element.region_name
    };
    var regionItem = document.createElement('li');
    regionItem.innerText = info.regionName;
    regionItem.classList.add('sug-comp');
    regList.appendChild(regionItem);
    regionItem.addEventListener('click', function () {
      return selectRegionFunction(info, regList, regSelect);
    });
  });
}

function selectRegionFunction(info, regList, regSelect) {
  varSelectRegion = 0;
  regList.classList.add('none');
  regList.innerHTML = '';
  regSelect.innerHTML = "".concat(info.regionName, "<i class=\"fas fa-caret-down\"></i>");
  countrySelect.classList.remove('disable');
  citySelect.classList.add('disable');
  citySelectEdit.classList.add('disable');
  address.disabled = true;
  address.classList.add('disable');
  addressEdit.disabled = true;
  addressEdit.classList.add('disable');
  countrySelect.innerHTML = "Seleccionar pa\xEDs<i class=\"fas fa-caret-down\"></i>";
  countrySelectEdit.innerHTML = "Seleccionar pa\xEDs<i class=\"fas fa-caret-down\"></i>";
  citySelect.innerHTML = "Seleccionar ciudad<i class=\"fas fa-caret-down\"></i>";
  citySelectEdit.innerHTML = "Seleccionar ciudad<i class=\"fas fa-caret-down\"></i>";
  countriesList.classList.add('none');
  citiesList.classList.add('none');
  countriesListEdit.classList.add('none');
  citiesListEdit.classList.add('none');
  varEnableCity = 0;
  varSelectCity = 0;
  varSelectCountry = 0;
  varEnableCountry = 1;
  varRegId = +info.regionId;
  varCountId = null;
  varCityId = null;
} //select country


countrySelect.addEventListener('click', function () {
  if (varEnableCountry === 1) {
    if (varSelectCountry === 0) {
      getCountries(countriesList, countrySelect);
    } else if (varSelectCountry === 1) {
      countriesList.classList.add('none');
      countriesList.innerHTML = '';
      varSelectCountry = 0;
    }
  }
});

function getCountries(countList, countSelect) {
  var options, response, data;
  return regeneratorRuntime.async(function getCountries$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context9.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/regions/".concat(varRegId, "/countries"), options));

        case 3:
          response = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context9.sent;
          renderSelectCountries(data, countList, countSelect);

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function renderSelectCountries(data, countList, countSelect) {
  varSelectCountry = 1;
  countList.innerHTML = '';
  countList.classList.remove('none');
  data.forEach(function (element) {
    var info = {
      countryId: element.country_id,
      countryName: element.country_name
    };
    var countryItem = document.createElement('li');
    countryItem.innerText = info.countryName;
    countryItem.classList.add('sug-comp');
    countList.appendChild(countryItem);
    countryItem.addEventListener('click', function () {
      return selectCountryFunction(info, countList, countSelect);
    });
  });
}

function selectCountryFunction(info, countList, countSelect) {
  varSelectCountry = 0;
  countList.classList.add('none');
  countList.innerHTML = '';
  countSelect.innerHTML = "".concat(info.countryName, "<i class=\"fas fa-caret-down\"></i>");
  citySelect.classList.remove('disable');
  citySelectEdit.classList.remove('disable');
  address.disabled = true;
  addressEdit.disabled = true;
  address.classList.add('disable');
  addressEdit.classList.add('disable');
  citySelect.innerHTML = "Seleccionar ciudad<i class=\"fas fa-caret-down\"></i>";
  citySelectEdit.innerHTML = "Seleccionar ciudad<i class=\"fas fa-caret-down\"></i>";
  citiesList.classList.add('none');
  citiesListEdit.classList.add('none');
  varEnableCity = 1;
  varCountId = +info.countryId;
} //select city


citySelect.addEventListener('click', function () {
  if (varEnableCity === 1) {
    if (varSelectCity === 0) {
      getCities(citiesList, citySelect);
    } else if (varSelectCity === 1) {
      citiesList.classList.add('none');
      citiesList.innerHTML = '';
      varSelectCity = 0;
    }
  }
});

function getCities(citList, citSelect) {
  var options, response, data;
  return regeneratorRuntime.async(function getCities$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context10.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/countries/".concat(varCountId, "/cities"), options));

        case 3:
          response = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context10.sent;
          renderSelectCities(data, citList, citSelect);

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function renderSelectCities(data, citList, citSelect) {
  varSelectCity = 1;
  citList.innerHTML = '';
  citList.classList.remove('none');
  data.forEach(function (element) {
    var info = {
      cityId: element.city_id,
      cityName: element.city_name
    };
    var cityItem = document.createElement('li');
    cityItem.innerText = info.cityName;
    cityItem.classList.add('sug-comp');
    citList.appendChild(cityItem);
    cityItem.addEventListener('click', function () {
      return selectCityFunction(info, citList, citSelect);
    });
  });
}

function selectCityFunction(info, citList, citSelect) {
  varSelectCity = 0;
  citList.classList.add('none');
  citList.innerHTML = '';
  citSelect.innerHTML = "".concat(info.cityName, "<i class=\"fas fa-caret-down\"></i>");
  address.disabled = false;
  addressEdit.disabled = false;
  address.classList.remove('disable');
  addressEdit.classList.remove('disable');
  varCityId = +info.cityId;
} //select interest


interestSelect.addEventListener('click', function () {
  if (varSelectInterest === 0) {
    var intC = 'int';
    showInterest(interestsList, interestSelect, intC);
  } else if (varSelectInterest === 1) {
    interestsList.classList.add('none');
    varSelectInterest = 0;
  }
});

function showInterest(intList, intSelect, intC) {
  intList.classList.remove('none');
  varSelectInterest = 1;
  var intArray = document.querySelectorAll(".".concat(intC));
  intArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectInterestFunction(element.innerText, intList, intSelect);
    });
  });
}

function selectInterestFunction(interest, intList, intSelect) {
  varSelectInterest = 0;
  intList.classList.add('none');
  intSelect.innerHTML = "".concat(interest, "<i class=\"fas fa-caret-down\"></i>");
} //contact channels
//telephone


telephone.addEventListener('keyup', function () {
  return enablePrefTel(telephone, selectTelephone);
});

function enablePrefTel(teleph, selectTeleph) {
  if (teleph.value !== '') {
    selectTeleph.classList.remove('disable');
    varEnablePrefT = 1;
  } else if (teleph.value === '') {
    selectTeleph.classList.add('disable');
    selectTeleph.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefT = 0;
  }
}

selectTelephone.addEventListener('click', function () {
  if (varEnablePrefT === 1) {
    if (varPrefTel === 0) {
      var preference = 'pref-tel';
      showPrefTel(prefTelephoneList, preference, selectTelephone);
    } else if (varPrefTel === 1) {
      prefTelephoneList.classList.add('none');
      varPrefTel = 0;
    }
  }
});

function showPrefTel(prefTelList, preference, selectTeleph) {
  prefTelList.classList.remove('none');
  varPrefTel = 1;
  var prefArray = document.querySelectorAll(".".concat(preference));
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefTelFunction(element.innerText, prefTelList, selectTeleph);
    });
  });
}

function selectPrefTelFunction(pref, prefTelList, selectTeleph) {
  varPrefTel = 0;
  prefTelList.classList.add('none');
  preferenceIcons(pref, selectTeleph);
} //whatsapp


whatsapp.addEventListener('keyup', function () {
  return enablePrefWsp(whatsapp, selectWhatsapp);
});

function enablePrefWsp(whats, selectWhats) {
  if (whats.value !== '') {
    selectWhats.classList.remove('disable');
    varEnablePrefW = 1;
  } else if (whats.value === '') {
    selectWhats.classList.add('disable');
    selectWhats.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefW = 0;
  }
}

selectWhatsapp.addEventListener('click', function () {
  if (varEnablePrefW === 1) {
    if (varPrefWsp === 0) {
      var preference = 'pref-wsp';
      showPrefWsp(prefWhatsappList, preference, selectWhatsapp);
    } else if (varPrefWsp === 1) {
      prefWhatsappList.classList.add('none');
      varPrefWsp = 0;
    }
  }
});

function showPrefWsp(prefWhatsList, preference, selectWhats) {
  prefWhatsList.classList.remove('none');
  varPrefWsp = 1;
  var prefArray = document.querySelectorAll(".".concat(preference));
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefWspFunction(element.innerText, prefWhatsList, selectWhats);
    });
  });
}

function selectPrefWspFunction(pref, prefWhatsList, selectWhats) {
  varPrefWsp = 0;
  prefWhatsList.classList.add('none');
  preferenceIcons(pref, selectWhats);
} //instagram


instagram.addEventListener('keyup', function () {
  return enablePrefInst(instagram, selectInstagram);
});

function enablePrefInst(instag, selectInstag) {
  if (instag.value !== '') {
    selectInstag.classList.remove('disable');
    varEnablePrefI = 1;
  } else if (instag.value === '') {
    selectInstag.classList.add('disable');
    selectInstag.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefI = 0;
  }
}

selectInstagram.addEventListener('click', function () {
  if (varEnablePrefI === 1) {
    if (varPrefInst === 0) {
      var preference = 'pref-inst';
      showPrefInst(prefInstagramList, preference, selectInstagram);
    } else if (varPrefInst === 1) {
      prefInstagramList.classList.add('none');
      varPrefInst = 0;
    }
  }
});

function showPrefInst(prefInstList, preference, selectInst) {
  prefInstList.classList.remove('none');
  varPrefInst = 1;
  var prefArray = document.querySelectorAll(".".concat(preference));
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefInstFunction(element.innerText, prefInstList, selectInst);
    });
  });
}

function selectPrefInstFunction(pref, prefInstList, selectInst) {
  varPrefInst = 0;
  prefInstList.classList.add('none');
  preferenceIcons(pref, selectInst);
} //facebook


facebook.addEventListener('keyup', function () {
  return enablePrefFace(facebook, selectFacebook);
});

function enablePrefFace(faceb, selectFaceb) {
  if (faceb.value !== '') {
    selectFaceb.classList.remove('disable');
    varEnablePrefF = 1;
  } else if (faceb.value === '') {
    selectFaceb.classList.add('disable');
    selectFaceb.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefF = 0;
  }
}

selectFacebook.addEventListener('click', function () {
  if (varEnablePrefF === 1) {
    if (varPrefFace === 0) {
      var preference = 'pref-face';
      showPrefFace(prefFacebookList, preference, selectFacebook);
    } else if (varPrefFace === 1) {
      prefFacebookList.classList.add('none');
      varPrefFace = 0;
    }
  }
});

function showPrefFace(prefFaceList, preference, selectFace) {
  prefFaceList.classList.remove('none');
  varPrefFace = 1;
  var prefArray = document.querySelectorAll(".".concat(preference));
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefFaceFunction(element.innerText, prefFaceList, selectFace);
    });
  });
}

function selectPrefFaceFunction(pref, prefFaceList, selectFace) {
  varPrefFace = 0;
  prefFaceList.classList.add('none');
  preferenceIcons(pref, selectFace);
} //linkedin


linkedin.addEventListener('keyup', function () {
  return enablePrefLink(linkedin, selectLinkedin);
});

function enablePrefLink(linked, selectLinked) {
  if (linked.value !== '') {
    selectLinked.classList.remove('disable');
    varEnablePrefL = 1;
  } else if (linked.value === '') {
    selectLinked.classList.add('disable');
    selectLinked.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
    varEnablePrefL = 0;
  }
}

selectLinkedin.addEventListener('click', function () {
  if (varEnablePrefL === 1) {
    if (varPrefLink === 0) {
      var preference = 'pref-link';
      showPrefLink(prefLinkedinList, preference, selectLinkedin);
    } else if (varPrefLink === 1) {
      prefLinkedinList.classList.add('none');
      varPrefLink = 0;
    }
  }
});

function showPrefLink(prefLinkList, preference, selectLink) {
  prefLinkList.classList.remove('none');
  varPrefLink = 1;
  var prefArray = document.querySelectorAll(".".concat(preference));
  prefArray.forEach(function (element) {
    element.addEventListener('click', function () {
      return selectPrefLinkFunction(element.innerText, prefLinkList, selectLink);
    });
  });
}

function selectPrefLinkFunction(pref, prefLinkList, selectLink) {
  varPrefLink = 0;
  prefLinkList.classList.add('none');
  preferenceIcons(pref, selectLink);
}

function preferenceIcons(pref, select) {
  if (pref === 'Sin preferencia') {
    select.innerHTML = "".concat(pref, "<i class=\"fas fa-caret-down\"></i>");
  } else if (pref === 'Canal favorito') {
    select.innerHTML = "<i class=\"fas fa-heart\"></i><p>".concat(pref, "</p><i class=\"fas fa-caret-down\"></i>");
  } else if (pref === 'No molestar') {
    select.innerHTML = "<i class=\"fas fa-ban\"></i><p>".concat(pref, "</p><i class=\"fas fa-caret-down\"></i>");
  }
} //close window new contact 


cancelContact.addEventListener('click', function (event) {
  return closeWindowNewContact(event);
});
closeNewCtc.addEventListener('click', function (event) {
  return closeWindowNewContact(event);
});

function closeWindowNewContact(event) {
  event.preventDefault();
  searchInput.value = '';
  firstname.value = '';
  lastname.value = '';
  position.value = '';
  email.value = '';
  address.value = '';
  telephone.value = '';
  whatsapp.value = '';
  instagram.value = '';
  facebook.value = '';
  linkedin.value = '';
  compLbl.style.top = '0px';
  compLblEdit.style.top = '0px';
  company.innerHTML = 'Seleccionar compañía<i class="fas fa-caret-down"></i>';
  regionSelect.innerHTML = 'Seleccionar región<i class="fas fa-caret-down"></i>';
  countrySelect.innerHTML = 'Seleccionar país<i class="fas fa-caret-down"></i>';
  citySelect.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>';
  interestSelect.innerHTML = '0%<i class="fas fa-caret-down"></i>';
  selectTelephone.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
  selectWhatsapp.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
  selectInstagram.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
  selectFacebook.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
  selectLinkedin.innerHTML = "Sin preferencia<i class=\"fas fa-caret-down\"></i>";
  varCompanyId = null;
  varRegId = null;
  varCountId = null;
  varCityId = null;
  address.disabled = true;
  darkImageAddCtc.classList.add('none');
  main.classList.remove('height-add-ctc');
  address.classList.add('disable');
  citySelect.classList.add('disable');
  countrySelect.classList.add('disable');
  regionsList.classList.add('none');
  countriesList.classList.add('none');
  citiesList.classList.add('none');
  selectTelephone.classList.add('disable');
  selectWhatsapp.classList.add('disable');
  selectInstagram.classList.add('disable');
  selectFacebook.classList.add('disable');
  selectLinkedin.classList.add('disable');
  prefTelephoneList.classList.add('none');
  prefWhatsappList.classList.add('none');
  prefInstagramList.classList.add('none');
  prefFacebookList.classList.add('none');
  prefLinkedinList.classList.add('none');
  selectCompany.classList.add('none');
  interestsList.classList.add('none');
  interestsListEdit.classList.add('none');
  firstname.classList.remove('border-wrong');
  msgFirst.classList.remove('visible');
  lastname.classList.remove('border-wrong');
  msgLast.classList.remove('visible');
  position.classList.remove('border-wrong');
  msgPos.classList.remove('visible');
  email.classList.remove('border-wrong');
  msgEmail.classList.remove('visible');
  msgEmail.innerText = 'Error en datos ingresados';
  company.classList.remove('border-wrong');
  regionSelect.classList.remove('border-wrong');
  countrySelect.classList.remove('border-wrong');
  citySelect.classList.remove('border-wrong');
  address.classList.remove('border-wrong');
  msgAddress.classList.remove('visible');
  varSelectRegion = 0;
  varSelectCountry = 0;
  varEnablePrefT = 0;
  varEnablePrefW = 0;
  varEnablePrefI = 0;
  varEnablePrefF = 0;
  varEnablePrefL = 0;
  varSelectCompany = 0;
  varSelectInterest = 0;
  counterAndDelete.classList.add('hidden');
  checkboxAll.classList = 'far fa-square';
  varCheckboxAll = 'unselected';
  contIdArray = [];
  varSortName = 0;
  varSortCountry = 0;
  varSortCompany = 0;
  varSortPosition = 0;
  varSortInterest = 0;
  getContacts();
} //save contact


saveContact.addEventListener('click', function (event) {
  return addContact(event);
});

function addContact(event) {
  var channels, filteredChannels, contact, options, response, data;
  return regeneratorRuntime.async(function addContact$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          msgEmail.innerText = 'Error en datos ingresados';
          event.preventDefault();
          channels = [{
            channel_id: channelsDB[0].channelId,
            user_account: telephone.value,
            preference: selectTelephone.innerText
          }, {
            channel_id: channelsDB[1].channelId,
            user_account: whatsapp.value,
            preference: selectWhatsapp.innerText
          }, {
            channel_id: channelsDB[2].channelId,
            user_account: instagram.value,
            preference: selectInstagram.innerText
          }, {
            channel_id: channelsDB[3].channelId,
            user_account: facebook.value,
            preference: selectFacebook.innerText
          }, {
            channel_id: channelsDB[4].channelId,
            user_account: linkedin.value,
            preference: selectLinkedin.innerText
          }];
          filteredChannels = [];
          channels.forEach(function (chan) {
            if (chan.user_account !== '') {
              filteredChannels = filteredChannels.concat(chan);
            }
          });
          contact = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            city_id: varCityId,
            address: address.value,
            company_id: varCompanyId,
            position: position.value,
            interest: +interestSelect.innerText.slice(0, -1),
            preferred_channels: filteredChannels
          };
          validateData(contact, firstname, msgFirst, lastname, msgLast, position, msgPos, email, msgEmail, company, selectCompany, regionSelect, regionsList, countrySelect, countriesList, citySelect, citiesList, address, msgAddress);
          options = {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context11.prev = 8;
          _context11.next = 11;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/contacts', options));

        case 11:
          response = _context11.sent;

          if (response.status === 409) {
            email.classList.add('border-wrong');
            msgEmail.classList.add('visible');
            msgEmail.innerText = 'El email ya existe';
          }

          _context11.next = 15;
          return regeneratorRuntime.awrap(response.json());

        case 15:
          data = _context11.sent;
          _context11.next = 21;
          break;

        case 18:
          _context11.prev = 18;
          _context11.t0 = _context11["catch"](8);
          return _context11.abrupt("return", _context11.t0);

        case 21:
          closeWindowNewContact(event);
          getContacts();

        case 23:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[8, 18]]);
}

function validateData(contact, first, msgFirst, last, msgLast, pos, msgPos, email, msgEmail, comp, selectComp, regSelect, regList, countSelect, countList, citSelect, citList, address, msgAddress) {
  if (contact.firstname === '') {
    first.classList.add('border-wrong');
    msgFirst.classList.add('visible');
    first.addEventListener('keyup', function () {
      if (first.value !== '') {
        first.classList.remove('border-wrong');
        msgFirst.classList.remove('visible');
      }
    });
  }

  if (contact.lastname === '') {
    last.classList.add('border-wrong');
    msgLast.classList.add('visible');
    last.addEventListener('keyup', function () {
      if (last.value !== '') {
        last.classList.remove('border-wrong');
        msgLast.classList.remove('visible');
      }
    });
  }

  if (contact.position === '') {
    pos.classList.add('border-wrong');
    msgPos.classList.add('visible');
    pos.addEventListener('keyup', function () {
      if (pos.value !== '') {
        pos.classList.remove('border-wrong');
        msgPos.classList.remove('visible');
      }
    });
  }

  if (contact.email === '' || !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value)) {
    email.classList.add('border-wrong');
    msgEmail.classList.add('visible');
    email.addEventListener('keyup', function () {
      if (email.value !== '' && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value)) {
        email.classList.remove('border-wrong');
        msgEmail.classList.remove('visible');
      }
    });
  }

  if (contact.company_id === null) {
    comp.classList.add('border-wrong');
    selectComp.addEventListener('click', function () {
      if (comp.innerText !== 'Seleccionar compañía') {
        comp.classList.remove('border-wrong');
      }
    });
  }

  if (regSelect.innerText === 'Seleccionar región') {
    regSelect.classList.add('border-wrong');
    regList.addEventListener('click', function () {
      if (regSelect.innerText !== 'Seleccionar región') {
        regSelect.classList.remove('border-wrong');
      }
    });
  }

  if (countSelect.innerText === 'Seleccionar país') {
    countSelect.classList.add('border-wrong');
    countList.addEventListener('click', function () {
      if (countSelect.innerText !== 'Seleccionar país') {
        countSelect.classList.remove('border-wrong');
      }
    });
  }

  if (contact.city_id === undefined || contact.city_id === null) {
    citSelect.classList.add('border-wrong');
    citList.addEventListener('click', function () {
      if (citSelect.innerText !== 'Seleccionar ciudad') {
        citSelect.classList.remove('border-wrong');
      }
    });
  }

  if (contact.address === '') {
    address.classList.add('border-wrong');
    msgAddress.classList.add('visible');
    address.addEventListener('keyup', function () {
      if (address.value !== '') {
        address.classList.remove('border-wrong');
        msgAddress.classList.remove('visible');
      }
    });
  }
} //edit contact


function contactEdition(info) {
  var sChannel, chan, options, response, data;
  return regeneratorRuntime.async(function contactEdition$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          varRegId = +info.regionId;
          varCountId = +info.countryId;
          varCityId = +info.cityId;
          varCompanyId = +info.companyId;
          varEditContact = info.contactId;
          varEnableCity = 1;

          if (info.cityName !== '') {
            addressEdit.classList.remove('disable');
            addressEdit.disabled = false;
          }

          darkImageEditCtc.classList.remove('none');
          main.classList.add('height-add-ctc');
          sChannel = 's-channel-edit';
          chan = 'chan-edit';
          getAllChannels(sChannel, chan);
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context12.next = 15;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/contacts/".concat(info.contactId), options));

        case 15:
          response = _context12.sent;
          _context12.next = 18;
          return regeneratorRuntime.awrap(response.json());

        case 18:
          data = _context12.sent;
          loadData(data);
          enablePrefTel(telephoneEdit, selectTelephoneEdit);
          enablePrefWsp(whatsappEdit, selectWhatsappEdit);
          enablePrefInst(instagramEdit, selectInstagramEdit);
          enablePrefFace(facebookEdit, selectFacebookEdit);
          enablePrefLink(linkedinEdit, selectLinkedinEdit);

        case 25:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function loadData(data) {
  firstnameEdit.value = data.firstname;
  lastnameEdit.value = data.lastname;
  positionEdit.value = data.position;
  emailEdit.value = data.email;
  addressEdit.value = data.address;
  interestSelectEdit.innerHTML = "".concat(data.interest, "%<i class=\"fas fa-caret-down\"></i>");

  if (data.company_name === '') {
    companyEdit.innerHTML = 'Seleccionar compañía<i class="fas fa-caret-down"></i>';
  } else {
    companyEdit.innerHTML = "".concat(data.company_name, "<i class=\"fas fa-caret-down\"></i>");
  }

  if (data.region_name === '') {
    regionSelectEdit.innerHTML = 'Seleccionar región<i class="fas fa-caret-down"></i>';
  } else {
    regionSelectEdit.innerHTML = "".concat(data.region_name, "<i class=\"fas fa-caret-down\"></i>");
  }

  if (data.country_name === '') {
    countrySelectEdit.innerHTML = 'Seleccionar país<i class="fas fa-caret-down"></i>';
  } else {
    countrySelectEdit.innerHTML = "".concat(data.country_name, "<i class=\"fas fa-caret-down\"></i>");
  }

  if (data.city_name === '') {
    citySelectEdit.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>';
  } else {
    citySelectEdit.innerHTML = "".concat(data.city_name, "<i class=\"fas fa-caret-down\"></i>");
  }

  data.preferred_channels.forEach(function (chan, i) {
    if (chan.channel_name === tel.innerText) {
      telephoneEdit.value = data.preferred_channels[i].user_account;
      preferenceIcons(data.preferred_channels[i].preference, selectTelephoneEdit);
    }
  });
  data.preferred_channels.forEach(function (chan, i) {
    if (chan.channel_name === wsp.innerText) {
      whatsappEdit.value = data.preferred_channels[i].user_account;
      preferenceIcons(data.preferred_channels[i].preference, selectWhatsappEdit);
    }
  });
  data.preferred_channels.forEach(function (chan, i) {
    if (chan.channel_name === inst.innerText) {
      instagramEdit.value = data.preferred_channels[i].user_account;
      preferenceIcons(data.preferred_channels[i].preference, selectInstagramEdit);
    }
  });
  data.preferred_channels.forEach(function (chan, i) {
    if (chan.channel_name === face.innerText) {
      facebookEdit.value = data.preferred_channels[i].user_account;
      preferenceIcons(data.preferred_channels[i].preference, selectFacebookEdit);
    }
  });
  data.preferred_channels.forEach(function (chan, i) {
    if (chan.channel_name === link.innerText) {
      linkedinEdit.value = data.preferred_channels[i].user_account;
      preferenceIcons(data.preferred_channels[i].preference, selectLinkedinEdit);
    }
  });
} //close window edit contact 


closeEditCtc.addEventListener('click', function (event) {
  return closeWindowEditContact(event);
});

function closeWindowEditContact(event) {
  event.preventDefault();
  darkImageEditCtc.classList.add('none');
  selectCompanyEdit.classList.add('none');
  regionsListEdit.classList.add('none');
  countriesList.classList.add('none');
  countrySelect.classList.add('disable');
  citySelect.classList.add('disable');
  interestsList.classList.add('none');
  interestsListEdit.classList.add('none');
  main.classList.remove('height-add-ctc');
  firstnameEdit.classList.remove('border-wrong');
  msgFirstEdit.classList.remove('visible');
  lastnameEdit.classList.remove('border-wrong');
  msgLastEdit.classList.remove('visible');
  positionEdit.classList.remove('border-wrong');
  msgPosEdit.classList.remove('visible');
  emailEdit.classList.remove('border-wrong');
  msgEmailEdit.classList.remove('visible');
  msgEmailEdit.innerText = 'Error en datos ingresados';
  companyEdit.classList.remove('border-wrong');
  regionSelectEdit.classList.remove('border-wrong');
  countrySelectEdit.classList.remove('border-wrong');
  citySelectEdit.classList.remove('border-wrong');
  addressEdit.classList.remove('border-wrong');
  msgAddressEdit.classList.remove('visible');
  citySelectEdit.classList.remove('disable');
  searchInput.value = '';
  telephoneEdit.value = '';
  whatsappEdit.value = '';
  instagramEdit.value = '';
  facebookEdit.value = '';
  linkedinEdit.value = '';
  compLbl.style.top = '0px';
  compLblEdit.style.top = '0px';
  varSelectCompany = 0;
  varSelectRegion = 0;
  varSelectCity = 0;
  varSelectInterest = 0;
  varEnableCountry = 0;
  varEnableCity = 0;
  varEnablePrefT = 0;
  varEnablePrefW = 0;
  varEnablePrefI = 0;
  varEnablePrefF = 0;
  varEnablePrefL = 0;
  varSortName = 0;
  varSortCountry = 0;
  varSortCompany = 0;
  varSortPosition = 0;
  varSortInterest = 0;
  varCompanyId = null;
  varRegId = null;
  varCountId = null;
  varCityId = null;
  counterAndDelete.classList.add('hidden');
  checkboxAll.classList = 'far fa-square';
  varCheckboxAll = 'unselected';
  contIdArray = [];
  getContacts();
} //select company


companyEdit.addEventListener('click', function () {
  if (varSelectCompany === 0) {
    selectCompanyEdit.innerHTML = '';
    getCompanies(selectCompanyEdit, companyEdit, compLblEdit);
  } else if (varSelectCompany === 1) {
    selectCompanyEdit.classList.add('none');
    selectCompanyEdit.innerHTML = '';
    compLblEdit.style.top = '0px';
    varSelectCompany = 0;
  }
}); //select region

regionSelectEdit.addEventListener('click', function () {
  if (varSelectRegion === 0) {
    regionsListEdit.innerHTML = '';
    getRegions(regionsListEdit, regionSelectEdit);
  } else if (varSelectRegion === 1) {
    regionsListEdit.classList.add('none');
    regionsListEdit.innerHTML = '';
    varSelectRegion = 0;
  }
}); //select country

countrySelectEdit.addEventListener('click', function () {
  if (varSelectCountry === 0) {
    countriesListEdit.innerHTML = '';
    getCountries(countriesListEdit, countrySelectEdit);
  } else if (varSelectCountry === 1) {
    countriesListEdit.classList.add('none');
    countriesListEdit.innerHTML = '';
    varSelectCountry = 0;
  }
}); //select city

citySelectEdit.addEventListener('click', function () {
  if (varEnableCity === 1) {
    if (varSelectCity === 0) {
      citiesListEdit.innerHTML = '';
      getCities(citiesListEdit, citySelectEdit);
    } else if (varSelectCity === 1) {
      citiesListEdit.classList.add('none');
      citiesListEdit.innerHTML = '';
      varSelectCity = 0;
    }
  }
}); //select interest

interestSelectEdit.addEventListener('click', function () {
  if (varSelectInterest === 0) {
    var intC = 'int-edit';
    showInterest(interestsListEdit, interestSelectEdit, intC);
  } else if (varSelectInterest === 1) {
    interestsListEdit.classList.add('none');
    varSelectInterest = 0;
  }
}); //select preferences
//telephone

telephoneEdit.addEventListener('keyup', function () {
  return enablePrefTel(telephoneEdit, selectTelephoneEdit);
});
selectTelephoneEdit.addEventListener('click', function () {
  if (varEnablePrefT === 1) {
    if (varPrefTel === 0) {
      var preference = 'pref-tel-edit';
      showPrefTel(prefTelephoneListEdit, preference, selectTelephoneEdit);
    } else if (varPrefTel === 1) {
      prefTelephoneListEdit.classList.add('none');
      varPrefTel = 0;
    }
  }
}); //whatsapp

whatsappEdit.addEventListener('keyup', function () {
  return enablePrefWsp(whatsappEdit, selectWhatsappEdit);
});
selectWhatsappEdit.addEventListener('click', function () {
  if (varEnablePrefW === 1) {
    if (varPrefWsp === 0) {
      var preference = 'pref-wsp-edit';
      showPrefWsp(prefWhatsappListEdit, preference, selectWhatsappEdit);
    } else if (varPrefWsp === 1) {
      prefWhatsappListEdit.classList.add('none');
      varPrefWsp = 0;
    }
  }
}); //instagram

instagramEdit.addEventListener('keyup', function () {
  return enablePrefInst(instagramEdit, selectInstagramEdit);
});
selectInstagramEdit.addEventListener('click', function () {
  if (varEnablePrefI === 1) {
    if (varPrefInst === 0) {
      var preference = 'pref-inst-edit';
      showPrefInst(prefInstagramListEdit, preference, selectInstagramEdit);
    } else if (varPrefInst === 1) {
      prefInstagramListEdit.classList.add('none');
      varPrefInst = 0;
    }
  }
}); //facebook

facebookEdit.addEventListener('keyup', function () {
  return enablePrefFace(facebookEdit, selectFacebookEdit);
});
selectFacebookEdit.addEventListener('click', function () {
  if (varEnablePrefF === 1) {
    if (varPrefFace === 0) {
      var preference = 'pref-face-edit';
      showPrefFace(prefFacebookListEdit, preference, selectFacebookEdit);
    } else if (varPrefFace === 1) {
      prefFacebookListEdit.classList.add('none');
      varPrefFace = 0;
    }
  }
}); //linkedin

linkedinEdit.addEventListener('keyup', function () {
  return enablePrefLink(linkedinEdit, selectLinkedinEdit);
});
selectLinkedinEdit.addEventListener('click', function () {
  if (varEnablePrefL === 1) {
    if (varPrefLink === 0) {
      var preference = 'pref-link-edit';
      showPrefLink(prefLinkedinListEdit, preference, selectLinkedinEdit);
    } else if (varPrefLink === 1) {
      prefLinkedinListEdit.classList.add('none');
      varPrefLink = 0;
    }
  }
}); //save edited contact

saveContactEdit.addEventListener('click', function (event) {
  return editContact(event);
});

function editContact(event) {
  var channels, filteredChannels, modifiedContact, options, response, data;
  return regeneratorRuntime.async(function editContact$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          event.preventDefault();
          channels = [{
            channel_id: channelsDB[0].channelId,
            user_account: telephoneEdit.value,
            preference: selectTelephoneEdit.innerText
          }, {
            channel_id: channelsDB[1].channelId,
            user_account: whatsappEdit.value,
            preference: selectWhatsappEdit.innerText
          }, {
            channel_id: channelsDB[2].channelId,
            user_account: instagramEdit.value,
            preference: selectInstagramEdit.innerText
          }, {
            channel_id: channelsDB[3].channelId,
            user_account: facebookEdit.value,
            preference: selectFacebookEdit.innerText
          }, {
            channel_id: channelsDB[4].channelId,
            user_account: linkedinEdit.value,
            preference: selectLinkedinEdit.innerText
          }];
          filteredChannels = [];
          channels.forEach(function (chan) {
            if (chan.user_account !== '') {
              filteredChannels = filteredChannels.concat(chan);
            }
          });
          modifiedContact = {
            firstname: firstnameEdit.value,
            lastname: lastnameEdit.value,
            email: emailEdit.value,
            city_id: varCityId,
            address: addressEdit.value,
            company_id: varCompanyId,
            position: positionEdit.value,
            interest: +interestSelectEdit.innerText.slice(0, -1),
            preferred_channels: filteredChannels
          };
          validateData(modifiedContact, firstnameEdit, msgFirstEdit, lastnameEdit, msgLastEdit, positionEdit, msgPosEdit, emailEdit, msgEmailEdit, companyEdit, selectCompanyEdit, regionSelectEdit, regionsListEdit, countrySelectEdit, countriesListEdit, citySelectEdit, citiesListEdit, addressEdit, msgAddressEdit);
          options = {
            method: 'PUT',
            body: JSON.stringify(modifiedContact),
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token'))),
              "Content-Type": "application/json"
            }
          };
          _context13.next = 9;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/contacts/".concat(varEditContact), options));

        case 9:
          response = _context13.sent;

          if (response.status === 409) {
            emailEdit.classList.add('border-wrong');
            msgEmailEdit.classList.add('visible');
            msgEmailEdit.innerText = 'El email ya existe';
          }

          _context13.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          data = _context13.sent;
          closeWindowEditContact(event);

        case 15:
        case "end":
          return _context13.stop();
      }
    }
  });
} //delete contact (contact edition)


deleteContactEdit.addEventListener('click', function (event) {
  event.preventDefault();
  cId = {
    contactId: varEditContact
  };
  darkImageEditCtc.style.visibility = 'hidden';
  modalDelete();
});
deleteContactBtn.addEventListener('click', function () {
  body.classList.remove('modal');
  darkImageContacts.classList.add('none');
  darkImageEditCtc.classList.add('none');

  if (varDelete === 0) {
    deleteContact(cId);
  } else if (varDelete === 1) {
    deleteContacts();
  }
});