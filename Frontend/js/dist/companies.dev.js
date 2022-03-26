"use strict";

var companiesList = document.getElementById('companiesList');
var newCompanyBtn = document.getElementById('newCompanyBtn');
var darkImageNewCompany = document.getElementById('darkImageNewCompany');
var closeNewComp = document.getElementById('closeNewComp');
var cancelCompany = document.getElementById('cancelCompany');
var msgCompanyName = document.getElementById('msgCompanyName');
var msgCompanyEmail = document.getElementById('msgCompanyEmail');
var msgCompAddress = document.getElementById('msgCompAddress');
var msgCompTelephone = document.getElementById('msgCompTelephone');
var companySlt = document.getElementById('companySlt');
var saveCompany = document.getElementById('saveCompany');
var companyList = document.getElementById('companyList');
var companyName = document.getElementById('companyName');
var companyEmail = document.getElementById('companyEmail');
var compAddress = document.getElementById('compAddress');
var compTelephone = document.getElementById('compTelephone');
var companyCity = document.getElementById('companyCity');
var darkImageCompanies = document.getElementById('darkImageCompanies');
var cancelDltCompBtn = document.getElementById('cancelDltCompBtn');
var deleteCompBtn = document.getElementById('deleteCompBtn');
var darkImageEditComp = document.getElementById('darkImageEditComp');
var companyNameEdit = document.getElementById('companyNameEdit');
var companyEmailEdit = document.getElementById('companyEmailEdit');
var compAddressEdit = document.getElementById('compAddressEdit');
var compTelephoneEdit = document.getElementById('compTelephoneEdit');
var companySltEdit = document.getElementById('companySltEdit');
var closeEditComp = document.getElementById('closeEditComp');
var companyListEdit = document.getElementById('companyListEdit');
var msgCompanyNameEdit = document.getElementById('msgCompanyNameEdit');
var msgCompanyEmailEdit = document.getElementById('msgCompanyEmailEdit');
var msgCompAddressEdit = document.getElementById('msgCompAddressEdit');
var msgCompTelephoneEdit = document.getElementById('msgCompTelephoneEdit');
var companyCityEdit = document.getElementById('companyCityEdit');
var saveEditCompany = document.getElementById('saveEditCompany');
var deleteEditCompany = document.getElementById('deleteEditCompany');
var varSelectCityComp = 0;
var varEditCompany = 0;
var varCompId = null;
var varCompCityId = null; //show companies

companies.addEventListener('click', function () {
  return showCompanies();
});

function showCompanies() {
  var options, response, data;
  return regeneratorRuntime.async(function showCompanies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          companiesList.innerHTML = '';
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/companies', options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          renderCompanies(data);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderCompanies(data) {
  companiesList.innerHTML = '';
  data.forEach(function _callee(element) {
    var info, row, company, country, address, telephone, actions, ellipsis, trash, pen;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            info = {
              companyId: element.company_id,
              companyName: element.company_name,
              cityId: element.city_id,
              cityName: element.city_name,
              countryId: element.country_id,
              countryName: element.country_name,
              regionId: element.region_id,
              regionName: element.region_name,
              address: element.address,
              email: element.email,
              telephone: element.telephone
            };
            row = document.createElement('li');
            company = document.createElement('div');
            country = document.createElement('div');
            address = document.createElement('div');
            telephone = document.createElement('div');
            actions = document.createElement('div');
            ellipsis = document.createElement('i');
            trash = document.createElement('i');
            pen = document.createElement('i');
            company.innerHTML = "<p>".concat(info.companyName, "</p><p class=\"grey-info\">").concat(info.email, "</p>");
            country.innerHTML = "<p>".concat(info.countryName, "</p><p class=\"grey-info\">").concat(info.regionName, "</p>");
            address.innerText = info.address;
            telephone.innerText = info.telephone;
            row.classList.add('row-companies');
            company.classList = 'u-item col-item';
            country.classList = 'u-item col-item';
            address.classList = 'u-item col-item comp-item';
            telephone.classList = 'u-item col-item comp-item';
            actions.classList = 'u-item action';
            ellipsis.classList = 'fas fa-ellipsis-h';
            trash.classList = 'fas fa-trash none';
            pen.classList = 'fas fa-pen none';
            actions.appendChild(ellipsis);
            actions.appendChild(trash);
            actions.appendChild(pen);
            companiesList.appendChild(row);
            row.appendChild(company);
            row.appendChild(country);
            row.appendChild(address);
            row.appendChild(telephone);
            row.appendChild(actions);
            row.addEventListener('mouseover', function () {
              return hoverRow(ellipsis, trash, pen);
            });
            row.addEventListener('mouseout', function () {
              return outRow(ellipsis, trash, pen);
            });
            trash.addEventListener('click', function () {
              return modalDeleteCompany(info.companyId);
            });
            pen.addEventListener('click', function () {
              return companyEdition(info);
            });

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
} //add company


newCompanyBtn.addEventListener('click', function () {
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageNewCompany.classList.remove('none');
  companyCity.style.top = '0px';
}); //close window new company

cancelCompany.addEventListener('click', function (event) {
  return closeWindowNewCompany(event);
});
closeNewComp.addEventListener('click', function (event) {
  return closeWindowNewCompany(event);
});

function closeWindowNewCompany(event) {
  event.preventDefault();
  companyName.value = '';
  companyEmail.value = '';
  compTelephone.value = '';
  compAddress.value = '';
  companySlt.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>';
  msgCompanyName.innerText = 'Este campo es obligatorio';
  body.classList.remove('modal');
  companyName.classList.remove('border-wrong');
  msgCompanyName.classList.remove('visible');
  companyEmail.classList.remove('border-wrong');
  msgCompanyEmail.classList.remove('visible');
  compAddress.classList.remove('border-wrong');
  msgCompAddress.classList.remove('visible');
  compTelephone.classList.remove('border-wrong');
  msgCompTelephone.classList.remove('visible');
  companySlt.classList.remove('border-wrong');
  darkImageNewCompany.classList.add('none');
  companyList.classList.add('none');
  companyCity.style.top = '0px';
  varCompCityId = null;
  varSelectCityComp = 0;
} //save company


saveCompany.addEventListener('click', function (event) {
  return addCompany(event);
});

function addCompany(event) {
  var company, options, response, data;
  return regeneratorRuntime.async(function addCompany$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          msgEmail.innerText = 'Error en datos ingresados';
          event.preventDefault();
          company = {
            company_name: companyName.value,
            email: companyEmail.value,
            address: compAddress.value,
            telephone: compTelephone.value,
            city_id: varCompCityId
          };
          validateCompanyData(company, companyName, msgCompanyName, companyEmail, msgCompanyEmail, compAddress, msgCompAddress, compTelephone, msgCompTelephone, companySlt, companyList);
          options = {
            method: 'POST',
            body: JSON.stringify(company),
            headers: {
              "Content-Type": "application/json",
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/companies', options));

        case 8:
          response = _context3.sent;

          if (response.status === 409) {
            companyName.classList.add('border-wrong');
            msgCompanyName.classList.add('visible');
            msgCompanyName.innerText = 'La empresa ya existe';
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context3.sent;
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](5);
          return _context3.abrupt("return", _context3.t0);

        case 18:
          closeWindowNewCompany(event);
          showCompanies();

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 15]]);
}

function validateCompanyData(company, compName, msgCom, compEmail, msgEmail, comAddress, msgAddress, compTeleph, msgCompTeleph, compSlt, compList) {
  if (compName.value === '') {
    compName.classList.add('border-wrong');
    msgCom.classList.add('visible');
    compName.addEventListener('keyup', function () {
      if (compName.value !== '') {
        compName.classList.remove('border-wrong');
        msgCom.classList.remove('visible');
      }
    });
  }

  if (compEmail.value === '' || !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value)) {
    compEmail.classList.add('border-wrong');
    msgEmail.classList.add('visible');
    compEmail.addEventListener('keyup', function () {
      if (compEmail.value !== '' && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value)) {
        compEmail.classList.remove('border-wrong');
        msgEmail.classList.remove('visible');
      }
    });
  }

  if (comAddress.value === '') {
    comAddress.classList.add('border-wrong');
    msgAddress.classList.add('visible');
    comAddress.addEventListener('keyup', function () {
      if (comAddress.value !== '') {
        comAddress.classList.remove('border-wrong');
        msgAddress.classList.remove('visible');
      }
    });
  }

  if (compTeleph.value === '') {
    compTeleph.classList.add('border-wrong');
    msgCompTeleph.classList.add('visible');
    compTeleph.addEventListener('keyup', function () {
      if (compTeleph.value !== '') {
        compTeleph.classList.remove('border-wrong');
        msgCompTeleph.classList.remove('visible');
      }
    });
  }

  if (company.city_id === undefined || company.city_id === null) {
    compSlt.classList.add('border-wrong');
    compList.addEventListener('click', function () {
      if (compSlt.innerText !== 'Seleccionar ciudad') {
        compSlt.classList.remove('border-wrong');
      }
    });
  }
} //select city 


companySlt.addEventListener('click', function () {
  if (varSelectCityComp === 0) {
    getCitiesComp(companyList, companySlt, companyCity);
  } else if (varSelectCityComp === 1) {
    companyList.classList.add('none');
    companyCity.style.top = '0px';
    companyList.innerHTML = '';
    varSelectCityComp = 0;
  }
});

function getCitiesComp(citList, citSelect, compCity) {
  var options, response, data;
  return regeneratorRuntime.async(function getCitiesComp$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/cities", options));

        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context4.sent;
          renderSelectCitiesComp(data, citList, citSelect, compCity);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function renderSelectCitiesComp(data, citList, citSelect, compCity) {
  varSelectCityComp = 1;
  citList.innerHTML = '';
  citList.classList.remove('none');
  var hcit = (data.length * 24 + 6) / 2;
  compCity.style.top = "".concat(hcit, "px");
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
      return selectCityCompFunction(info, citList, citSelect, compCity);
    });
  });
}

function selectCityCompFunction(info, citList, citSelect, compCity) {
  varSelectCityComp = 0;
  citList.classList.add('none');
  compCity.style.top = '0px';
  citList.innerHTML = '';
  citSelect.innerHTML = "".concat(info.cityName, "<i class=\"fas fa-caret-down\"></i>");
  varCompCityId = +info.cityId;
} //delete company


function modalDeleteCompany(companyId) {
  varCompId = companyId;
  window.scrollTo(0, 0);
  body.classList.add('modal');
  darkImageCompanies.classList.remove('none');
}

cancelDltCompBtn.addEventListener('click', function () {
  cancelDeleteComp();
});

function cancelDeleteComp() {
  if (varEditCompany === 0) {
    body.classList.remove('modal');
    darkImageEditComp.style.visibility = 'hidden';
    darkImageEditComp.classList.add('none');
  } else if (varEditCompany === 1) {
    window.scrollTo(0, 0);
    body.classList.add('modal');
    darkImageEditComp.style.visibility = 'visible';
    darkImageEditComp.classList.remove('none');
  }

  darkImageCompanies.classList.add('none');
}

function cancelComp() {
  body.classList.remove('modal');
  darkImageCompanies.classList.add('none');
  varCompId = null;
}

deleteCompBtn.addEventListener('click', function () {
  body.classList.remove('modal');
  darkImageCompanies.classList.add('none');
  deleteCompany(varCompId);
});

function deleteCompany(compId) {
  var options, response, data;
  return regeneratorRuntime.async(function deleteCompany$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          options = {
            method: 'DELETE',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/companies/".concat(compId), options));

        case 4:
          response = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context5.sent;
          cancelComp();
          showCompanies();
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", _context5.t0);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 12]]);
} //edit company


function companyEdition(info) {
  var options, response, data;
  return regeneratorRuntime.async(function companyEdition$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          varCompCityId = +info.cityId;
          varCompId = +info.companyId;
          window.scrollTo(0, 0);
          body.classList.add('modal');
          darkImageEditComp.classList.remove('none');
          darkImageEditComp.style.visibility = 'visible';
          companyCityEdit.style.top = '0px';
          options = {
            method: 'GET',
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token')))
            }
          };
          _context6.next = 10;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/companies/".concat(varCompId), options));

        case 10:
          response = _context6.sent;
          _context6.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          data = _context6.sent;
          loadDataCompany(data);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function loadDataCompany(data) {
  companyNameEdit.value = data.company_name;
  companyEmailEdit.value = data.email;
  compAddressEdit.value = data.address;
  compTelephoneEdit.value = data.telephone;

  if (data.city_name === '') {
    companySltEdit.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>';
  } else {
    companySltEdit.innerHTML = "".concat(data.city_name, "<i class=\"fas fa-caret-down\"></i>");
  }
} //close window edit company


closeEditComp.addEventListener('click', function (event) {
  return closeWindowEditCompany(event);
});

function closeWindowEditCompany(event) {
  event.preventDefault();
  darkImageEditComp.classList.add('none');
  companyListEdit.classList.add('none');
  body.classList.remove('modal');
  companyNameEdit.classList.remove('border-wrong');
  msgCompanyNameEdit.classList.remove('visible');
  companyEmailEdit.classList.remove('border-wrong');
  msgCompanyEmailEdit.classList.remove('visible');
  compAddressEdit.classList.remove('border-wrong');
  msgCompAddressEdit.classList.remove('visible');
  compTelephoneEdit.classList.remove('border-wrong');
  msgCompTelephoneEdit.classList.remove('visible');
  companySltEdit.classList.remove('border-wrong');
  msgCompanyEmailEdit.innerText = 'Error en datos ingresados';
  companyCityEdit.style.top = '0px';
  varSelectCityComp = 0;
} //select city


companySltEdit.addEventListener('click', function () {
  if (varSelectCityComp === 0) {
    companyListEdit.innerHTML = '';
    getCitiesComp(companyListEdit, companySltEdit, companyCityEdit);
  } else if (varSelectCityComp === 1) {
    companyListEdit.classList.add('none');
    companyCityEdit.style.top = '0px';
    companyListEdit.innerHTML = '';
    varSelectCityComp = 0;
  }
}); //save edited contact

saveEditCompany.addEventListener('click', function (event) {
  return editCompany(event);
});

function editCompany(event) {
  var modifiedCompany, options, response, data;
  return regeneratorRuntime.async(function editCompany$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          event.preventDefault();
          modifiedCompany = {
            company_name: companyNameEdit.value,
            email: companyEmailEdit.value,
            address: compAddressEdit.value,
            telephone: compTelephoneEdit.value,
            city_id: varCompCityId
          };
          validateCompanyData(modifiedCompany, companyNameEdit, msgCompanyNameEdit, companyEmailEdit, msgCompanyEmailEdit, compAddressEdit, msgCompAddressEdit, compTelephoneEdit, msgCompTelephoneEdit, companySltEdit, companyListEdit);
          options = {
            method: 'PUT',
            body: JSON.stringify(modifiedCompany),
            headers: {
              Authorization: "token ".concat(JSON.parse(sessionStorage.getItem('Token'))),
              "Content-Type": "application/json"
            }
          };
          _context7.next = 6;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/companies/".concat(varCompId), options));

        case 6:
          response = _context7.sent;

          if (response.status === 409) {
            companyNameEdit.classList.add('border-wrong');
            msgCompanyNameEdit.classList.add('visible');
            msgCompanyNameEdit.innerText = 'La empresa ya existe';
          }

          _context7.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context7.sent;
          closeWindowEditCompany(event);
          showCompanies();

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  });
} //delete contact (contact edition)


deleteEditCompany.addEventListener('click', function (event) {
  event.preventDefault();
  darkImageEditComp.style.visibility = 'hidden';
  modalDeleteCompany(varCompId);
});
deleteCompBtn.addEventListener('click', function () {
  body.classList.remove('modal');
  darkImageContacts.classList.add('none');
  darkImageEditCtc.classList.add('none');
  deleteCompany(varCompId);
});