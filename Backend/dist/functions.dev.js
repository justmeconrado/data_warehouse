"use strict";

var jwt = require('jsonwebtoken');

var authorizationPassword = 'tmo$Q$bG5xR56';

var _require = require('./queries.js'),
    validateLoginQuery = _require.validateLoginQuery,
    validateEmailQuery = _require.validateEmailQuery,
    validateUserIdQuery = _require.validateUserIdQuery,
    validateEmailPutQuery = _require.validateEmailPutQuery,
    validateRegionNameQuery = _require.validateRegionNameQuery,
    validateRegionIdQuery = _require.validateRegionIdQuery,
    validateRegionNamePutQuery = _require.validateRegionNamePutQuery,
    validateCountryNameQuery = _require.validateCountryNameQuery,
    validateCountryIdQuery = _require.validateCountryIdQuery,
    validateCountryNamePutQuery = _require.validateCountryNamePutQuery,
    validateRegionIdCountryQuery = _require.validateRegionIdCountryQuery,
    validateCityNameQuery = _require.validateCityNameQuery,
    validateCityIdQuery = _require.validateCityIdQuery,
    validateCountryIdCityQuery = _require.validateCountryIdCityQuery,
    validateCityNamePutQuery = _require.validateCityNamePutQuery,
    validateCompanyNameQuery = _require.validateCompanyNameQuery,
    validateCompanyIdQuery = _require.validateCompanyIdQuery,
    validateCompanyNamePutQuery = _require.validateCompanyNamePutQuery,
    validateCityIdPutQuery = _require.validateCityIdPutQuery,
    validateEmailContactsQuery = _require.validateEmailContactsQuery,
    validateChannelIdQuery = _require.validateChannelIdQuery,
    validateContactIdQuery = _require.validateContactIdQuery,
    validateEmailContactsPutQuery = _require.validateEmailContactsPutQuery,
    validateCompanyIdPutQuery = _require.validateCompanyIdPutQuery,
    validateChannelIdPutQuery = _require.validateChannelIdPutQuery,
    validateChannelIdAddQuery = _require.validateChannelIdAddQuery,
    validateChannelIdDelQuery = _require.validateChannelIdDelQuery,
    validateChannelNameQuery = _require.validateChannelNameQuery,
    validateChannelIdExQuery = _require.validateChannelIdExQuery,
    validateChannelNamePutQuery = _require.validateChannelNamePutQuery; //users


function validateLogin(req, res, next) {
  return regeneratorRuntime.async(function validateLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(validateLoginQuery(req, res, next));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function verifyToken(req, res, next) {
  var fullToken = req.headers.authorization || "0.0.0";
  var token = fullToken.split(' ')[1];

  try {
    jwt.verify(token, authorizationPassword);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}

function filterAdmin(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  var user = jwt.verify(token, authorizationPassword);

  if (user.perfil === "Admin") {
    next();
  } else {
    res.status(403).send("You do not have administrator permissions").end();
  }
}

function validateFirstname(req, res, next) {
  var firstname = req.body.firstname;
  if (firstname.length >= 1 && firstname.length <= 64) next();else res.status(400).send("The firstname length is wrong").end();
}

function validateLastname(req, res, next) {
  var lastname = req.body.lastname;
  if (lastname.length >= 1 && lastname.length <= 64) next();else res.status(400).send("The lastname length is wrong").end();
}

function validateEmail(req, res, next) {
  return regeneratorRuntime.async(function validateEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(validateEmailQuery(req, res, next));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function validatePassword(req, res, next) {
  var password = req.body.password;
  if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(password)) next();else res.status(400).send("The password is wrong").end();
} // Minimum 4 characters
// Maximum 15 characters
// At least 1 character
// At least 1 digit
// No blank spaces


function validateUser(req, res, next) {
  var userId = +req.params.userId;
  var token = jwt.verify(req.headers.authorization.split(' ')[1], authorizationPassword);
  if (token.user_id === userId || token.perfil === "Admin") next();else res.status(401).send("You do not have enough permissions").end();
}

function validateUserId(req, res, next) {
  return regeneratorRuntime.async(function validateUserId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(validateUserIdQuery(req, res, next));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function validateFirstnamePut(req, res, next) {
  if (req.body.firstname.length >= 1 && req.body.firstname.length <= 64) next();else res.status(400).send("The firstname length is wrong").end();
}

function validateLastnamePut(req, res, next) {
  if (req.body.lastname.length >= 1 && req.body.lastname.length <= 64) next();else res.status(400).send("The lastname length is wrong").end();
}

function validateEmailPut(req, res, next) {
  return regeneratorRuntime.async(function validateEmailPut$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(validateEmailPutQuery(req, res, next));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function validatePerfil(req, res, next) {
  if (req.body.perfil === 'Admin' || req.body.perfil === 'Básico') next();else res.status(400).send("The perfil is wrong").end();
}

function validatePasswordPut(req, res, next) {
  if (req.body.password) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/.test(req.body.password)) next();else res.status(400).send("The password is wrong").end();
  } else next();
} //regions


function validateRegionName(req, res, next) {
  return regeneratorRuntime.async(function validateRegionName$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(validateRegionNameQuery(req, res, next));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function validateRegionId(req, res, next) {
  return regeneratorRuntime.async(function validateRegionId$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(validateRegionIdQuery(req, res, next));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function validateRegionNamePut(req, res, next) {
  return regeneratorRuntime.async(function validateRegionNamePut$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(validateRegionNamePutQuery(req, res, next));

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
} //countries 


function validateCountryName(req, res, next) {
  return regeneratorRuntime.async(function validateCountryName$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(validateCountryNameQuery(req, res, next));

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function validateCountryId(req, res, next) {
  return regeneratorRuntime.async(function validateCountryId$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(validateCountryIdQuery(req, res, next));

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function validateCountryNamePut(req, res, next) {
  return regeneratorRuntime.async(function validateCountryNamePut$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(validateCountryNamePutQuery(req, res, next));

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function validateRegionIdCountry(req, res, next) {
  return regeneratorRuntime.async(function validateRegionIdCountry$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(validateRegionIdCountryQuery(req, res, next));

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  });
} //cities


function validateCityName(req, res, next) {
  return regeneratorRuntime.async(function validateCityName$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(validateCityNameQuery(req, res, next));

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function validateCityId(req, res, next) {
  return regeneratorRuntime.async(function validateCityId$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(validateCityIdQuery(req, res, next));

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function validateCountryIdCity(req, res, next) {
  return regeneratorRuntime.async(function validateCountryIdCity$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(validateCountryIdCityQuery(req, res, next));

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  });
}

function validateCityNamePut(req, res, next) {
  return regeneratorRuntime.async(function validateCityNamePut$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(validateCityNamePutQuery(req, res, next));

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  });
} //companies


function validateCompanyName(req, res, next) {
  return regeneratorRuntime.async(function validateCompanyName$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(validateCompanyNameQuery(req, res, next));

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function validateAddress(req, res, next) {
  var address = req.body.address;
  if (address.length >= 1 && address.length <= 64) next();else res.status(400).send("The address is wrong").end();
}

function validateEmailCompanies(req, res, next) {
  var email;
  return regeneratorRuntime.async(function validateEmailCompanies$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          email = req.body.email;
          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) next();else res.status(400).send("The email is wrong").end();

        case 2:
        case "end":
          return _context17.stop();
      }
    }
  });
}

function validateTelephone(req, res, next) {
  var telephone = req.body.telephone;
  if (telephone.length >= 1 && telephone.length <= 64) next();else res.status(400).send("The telephone is wrong").end();
}

function validateCompanyId(req, res, next) {
  return regeneratorRuntime.async(function validateCompanyId$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(validateCompanyIdQuery(req, res, next));

        case 2:
        case "end":
          return _context18.stop();
      }
    }
  });
}

function validateCompanyNamePut(req, res, next) {
  return regeneratorRuntime.async(function validateCompanyNamePut$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(validateCompanyNamePutQuery(req, res, next));

        case 2:
        case "end":
          return _context19.stop();
      }
    }
  });
}

function validateCityIdPut(req, res, next) {
  return regeneratorRuntime.async(function validateCityIdPut$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(validateCityIdPutQuery(req, res, next));

        case 2:
        case "end":
          return _context20.stop();
      }
    }
  });
}

function validateAddressPut(req, res, next) {
  var address;
  return regeneratorRuntime.async(function validateAddressPut$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          address = req.body.address;
          if (address.length >= 1 && address.length <= 64) next();else res.status(400).send("The address is wrong").end();

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  });
} //contacts


function validateEmailContacts(req, res, next) {
  return regeneratorRuntime.async(function validateEmailContacts$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(validateEmailContactsQuery(req, res, next));

        case 2:
        case "end":
          return _context22.stop();
      }
    }
  });
}

function validatePosition(req, res, next) {
  var position = req.body.position;
  if (position.length >= 1 && position.length <= 64) next();else res.status(400).send("The position is wrong").end();
}

function validateInterest(req, res, next) {
  var interest = req.body.interest;
  if (Number.isInteger(interest) && interest >= 0 && interest <= 100) next();else res.status(400).send("The interest is wrong").end();
}

function validateChannelId(req, res, next) {
  return regeneratorRuntime.async(function validateChannelId$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return regeneratorRuntime.awrap(validateChannelIdQuery(req, res, next));

        case 2:
        case "end":
          return _context23.stop();
      }
    }
  });
}

function validateContactId(req, res, next) {
  return regeneratorRuntime.async(function validateContactId$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return regeneratorRuntime.awrap(validateContactIdQuery(req, res, next));

        case 2:
        case "end":
          return _context24.stop();
      }
    }
  });
}

function validateUserAccount(req, res, next) {
  var channelsBody = req.body.preferred_channels;
  channelsBody.every(function (element) {
    if (element.user_account.length >= 1 && element.user_account.length <= 64) next();else res.status(400).send("The userAccount length is wrong").end();
  });
}

function validatePreference(req, res, next) {
  var channelsBody;
  return regeneratorRuntime.async(function validatePreference$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          channelsBody = req.body.preferred_channels;
          channelsBody.every(function (element) {
            if (element.preference === 'Sin preferencia' || element.preference === 'Canal favorito' || element.preference === 'No molestar') next();else res.status(400).send("The preference is wrong").end();
          });

        case 2:
        case "end":
          return _context25.stop();
      }
    }
  });
}

function validateEmailContactsPut(req, res, next) {
  return regeneratorRuntime.async(function validateEmailContactsPut$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return regeneratorRuntime.awrap(validateEmailContactsPutQuery(req, res, next));

        case 2:
        case "end":
          return _context26.stop();
      }
    }
  });
}

function validateCompanyIdPut(req, res, next) {
  return regeneratorRuntime.async(function validateCompanyIdPut$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return regeneratorRuntime.awrap(validateCompanyIdPutQuery(req, res, next));

        case 2:
        case "end":
          return _context27.stop();
      }
    }
  });
}

function validatePositionPut(req, res, next) {
  if (req.body.position) {
    var position = req.body.position;
    if (position.length >= 1 && position.length <= 64) next();else res.status(400).send("The position is wrong").end();
  } else next();
}

function validateInterestPut(req, res, next) {
  if (req.body.interest) {
    var interest = req.body.interest;
    if (Number.isInteger(interest) && interest >= 0 && interest <= 100) next();else res.status(400).send("The interest is wrong").end();
  } else next();
}

function validateChannelIdPut(req, res, next) {
  return regeneratorRuntime.async(function validateChannelIdPut$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return regeneratorRuntime.awrap(validateChannelIdPutQuery(req, res, next));

        case 2:
        case "end":
          return _context28.stop();
      }
    }
  });
}

function validateChannelIdAdd(req, res, next) {
  return regeneratorRuntime.async(function validateChannelIdAdd$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.next = 2;
          return regeneratorRuntime.awrap(validateChannelIdAddQuery(req, res, next));

        case 2:
        case "end":
          return _context29.stop();
      }
    }
  });
}

function validateChannelIdDel(req, res, next) {
  return regeneratorRuntime.async(function validateChannelIdDel$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return regeneratorRuntime.awrap(validateChannelIdDelQuery(req, res, next));

        case 2:
        case "end":
          return _context30.stop();
      }
    }
  });
}

function validateChannelName(req, res, next) {
  return regeneratorRuntime.async(function validateChannelName$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.next = 2;
          return regeneratorRuntime.awrap(validateChannelNameQuery(req, res, next));

        case 2:
        case "end":
          return _context31.stop();
      }
    }
  });
}

function validateChannelIdEx(req, res, next) {
  return regeneratorRuntime.async(function validateChannelIdEx$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return regeneratorRuntime.awrap(validateChannelIdExQuery(req, res, next));

        case 2:
        case "end":
          return _context32.stop();
      }
    }
  });
}

function validateChannelNamePut(req, res, next) {
  return regeneratorRuntime.async(function validateChannelNamePut$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.next = 2;
          return regeneratorRuntime.awrap(validateChannelNamePutQuery(req, res, next));

        case 2:
        case "end":
          return _context33.stop();
      }
    }
  });
}

module.exports = {
  validateLogin: validateLogin,
  verifyToken: verifyToken,
  filterAdmin: filterAdmin,
  validateFirstname: validateFirstname,
  validateLastname: validateLastname,
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validateUser: validateUser,
  validateUserId: validateUserId,
  validateFirstnamePut: validateFirstnamePut,
  validateLastnamePut: validateLastnamePut,
  validateEmailPut: validateEmailPut,
  validatePerfil: validatePerfil,
  validatePasswordPut: validatePasswordPut,
  validateRegionName: validateRegionName,
  validateRegionId: validateRegionId,
  validateRegionNamePut: validateRegionNamePut,
  validateCountryName: validateCountryName,
  validateCountryId: validateCountryId,
  validateCountryNamePut: validateCountryNamePut,
  validateRegionIdCountry: validateRegionIdCountry,
  validateCityName: validateCityName,
  validateCityId: validateCityId,
  validateCountryIdCity: validateCountryIdCity,
  validateCityNamePut: validateCityNamePut,
  validateCompanyName: validateCompanyName,
  validateAddress: validateAddress,
  validateEmailCompanies: validateEmailCompanies,
  validateCompanyId: validateCompanyId,
  validateTelephone: validateTelephone,
  validateCompanyNamePut: validateCompanyNamePut,
  validateCityIdPut: validateCityIdPut,
  validateAddressPut: validateAddressPut,
  validateEmailContacts: validateEmailContacts,
  validatePosition: validatePosition,
  validateInterest: validateInterest,
  validateChannelId: validateChannelId,
  validateUserAccount: validateUserAccount,
  validatePreference: validatePreference,
  validateContactId: validateContactId,
  validateEmailContactsPut: validateEmailContactsPut,
  validateCompanyIdPut: validateCompanyIdPut,
  validatePositionPut: validatePositionPut,
  validateInterestPut: validateInterestPut,
  validateChannelIdPut: validateChannelIdPut,
  validateChannelIdAdd: validateChannelIdAdd,
  validateChannelIdDel: validateChannelIdDel,
  validateChannelName: validateChannelName,
  validateChannelIdEx: validateChannelIdEx,
  validateChannelNamePut: validateChannelNamePut
};