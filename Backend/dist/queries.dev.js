"use strict";

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("./db"),
    db = _require2.db;

var jwt = require('jsonwebtoken');

var _require3 = require("express"),
    query = _require3.query;

var authorizationPassword = 'tmo$Q$bG5xR56'; //users

function selectUserLogin(username, password, req, res) {
  var user, perfil, user_id;
  return regeneratorRuntime.async(function selectUserLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE email = :username && password = :password", {
            replacements: {
              username: username,
              password: password
            },
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context.sent;
          perfil = user[0].perfil;
          user_id = user[0].user_id;
          res.status(200).json(Object.assign({}, {
            token: jwt.sign({
              username: username,
              perfil: perfil,
              user_id: user_id
            }, authorizationPassword)
          }, {
            perf: perfil
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function validateLoginQuery(req, res, next) {
  var _req$body, username, password, user;

  return regeneratorRuntime.async(function validateLoginQuery$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE email = :username && password = :password", {
            replacements: {
              username: username,
              password: password
            },
            type: QueryTypes.SELECT
          }));

        case 3:
          user = _context2.sent;
          if (user[0]) next();else res.status(400).send("Invalid credentials").end();

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT user_id, firstname, lastname, email, perfil FROM users\n    ", {
            type: QueryTypes.SELECT
          }));

        case 2:
          users = _context3.sent;
          res.status(200).json(users);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function createUser(newUser, req, res) {
  var inserted, firstname, lastname, email;
  return regeneratorRuntime.async(function createUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO users (firstname, lastname, email, perfil, password)\n    VALUES (:firstname, :lastname, :email, :perfil, :password)\n    ", {
            replacements: newUser,
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context4.sent;
          firstname = newUser.firstname, lastname = newUser.lastname, email = newUser.email;
          res.status(201).json(Object.assign({}, {
            user_id: inserted[0]
          }, {
            firstname: firstname,
            lastname: lastname,
            email: email
          }, {
            perfil: "Básico"
          }));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function validateEmailQuery(req, res, next) {
  var email, emails, emailsArray;
  return regeneratorRuntime.async(function validateEmailQuery$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = req.body.email;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT email FROM users", {
            type: QueryTypes.SELECT
          }));

        case 3:
          emails = _context5.sent;
          emailsArray = emails.map(function (user) {
            return user.email;
          });

          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
            if (emailsArray.every(function (e) {
              return e != email;
            })) next();else res.status(409).send("The email already exists").end();
          } else res.status(400).send("The email is wrong").end();

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function validateUserIdQuery(req, res, next) {
  var userId, users, usersArray;
  return regeneratorRuntime.async(function validateUserIdQuery$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = +req.params.userId;
          _context6.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT user_id FROM users", {
            type: QueryTypes.SELECT
          }));

        case 3:
          users = _context6.sent;
          usersArray = users.map(function (id) {
            return id.user_id;
          });
          if (usersArray.includes(userId)) next();else res.status(404).send("The user does not exist").end();

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getUser(userId, req, res) {
  var user;
  return regeneratorRuntime.async(function getUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT user_id, firstname, lastname, email, perfil FROM users WHERE user_id = ?\n    ", {
            replacements: [userId],
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context7.sent;
          res.status(200).json(user[0]);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function validateEmailPutQuery(req, res, next) {
  var email, emails, emailsArray;
  return regeneratorRuntime.async(function validateEmailPutQuery$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          email = req.body.email;
          _context8.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT email FROM users WHERE user_id != ".concat(req.params.userId), {
            type: QueryTypes.SELECT
          }));

        case 3:
          emails = _context8.sent;
          emailsArray = emails.map(function (user) {
            return user.email;
          });

          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
            if (emailsArray.every(function (e) {
              return e != email;
            })) next();else res.status(409).send("The email already exists").end();
          } else res.status(400).send("The email is wrong").end();

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function modifyUser(userId, req, res) {
  var user, password, newUser, modified;
  return regeneratorRuntime.async(function modifyUser$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE user_id = ?", {
            replacements: [userId],
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context9.sent;
          password = req.body.password || user[0].password;
          newUser = {
            user_id: userId,
            firstname: req.body.firstname || user[0].firstname,
            lastname: req.body.lastname || user[0].lastname,
            email: req.body.email || user[0].email,
            perfil: req.body.perfil || user[0].perfil,
            password: req.body.password
          };
          _context9.next = 7;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, perfil = :perfil, \n    password = :password WHERE user_id = :user_id\n    ", {
            replacements: Object.assign({}, newUser, {
              password: password
            }),
            type: QueryTypes.UPDATE
          }));

        case 7:
          modified = _context9.sent;
          res.status(200).json({
            user_id: newUser.user_id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            perfil: newUser.perfil
          });

        case 9:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function deleteUser(userId, req, res) {
  var user, deleted, _user$, user_id, firstname, lastname, email, perfil;

  return regeneratorRuntime.async(function deleteUser$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE user_id = ?", {
            replacements: [userId],
            type: QueryTypes.SELECT
          }));

        case 2:
          user = _context10.sent;
          _context10.next = 5;
          return regeneratorRuntime.awrap(db.query("DELETE FROM users WHERE user_id = ?", {
            replacements: [userId],
            type: QueryTypes.DELETE
          }));

        case 5:
          deleted = _context10.sent;
          _user$ = user[0], user_id = _user$.user_id, firstname = _user$.firstname, lastname = _user$.lastname, email = _user$.email, perfil = _user$.perfil;
          res.status(200).json({
            user_id: user_id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            perfil: perfil
          });

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  });
} //regions


function getRegions(req, res) {
  var regions;
  return regeneratorRuntime.async(function getRegions$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 2:
          regions = _context11.sent;
          res.status(200).json(regions);

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
}

function validateRegionNameQuery(req, res, next) {
  var region, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionNameQuery$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          region = req.body.region_name;
          _context12.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT region_name FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 3:
          regions = _context12.sent;
          regionsArray = regions.map(function (region) {
            return region.region_name;
          });

          if (req.body.region_name.length >= 1 && req.body.region_name.length <= 64) {
            if (regionsArray.every(function (name) {
              return name !== region;
            })) next();else res.status(409).send("The region already exists").end();
          } else res.status(400).send("The region name length is wrong").end();

        case 6:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function createRegion(newRegion, req, res) {
  var inserted;
  return regeneratorRuntime.async(function createRegion$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO regions (region_name)\n    VALUES (:newRegion)\n    ", {
            replacements: {
              newRegion: newRegion
            },
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context13.sent;
          res.status(201).json(Object.assign({}, {
            region_id: inserted[0]
          }, {
            newRegion: newRegion
          }));

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function validateRegionIdQuery(req, res, next) {
  var regionId, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionIdQuery$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          regionId = +req.params.regionId || +req.body.region_id;
          _context14.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT region_id FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 3:
          regions = _context14.sent;
          regionsArray = regions.map(function (id) {
            return id.region_id;
          });
          if (regionsArray.includes(regionId)) next();else res.status(404).send("The region does not exist").end();

        case 6:
        case "end":
          return _context14.stop();
      }
    }
  });
}

function getRegion(regionId, req, res) {
  var region;
  return regeneratorRuntime.async(function getRegion$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM regions WHERE region_id = ?\n    ", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          region = _context15.sent;
          res.status(200).json(region[0]);

        case 4:
        case "end":
          return _context15.stop();
      }
    }
  });
}

function validateRegionNamePutQuery(req, res, next) {
  var region, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionNamePutQuery$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          region = req.body.region_name;
          _context16.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT region_name FROM regions WHERE region_id != ".concat(req.params.regionId), {
            type: QueryTypes.SELECT
          }));

        case 3:
          regions = _context16.sent;
          regionsArray = regions.map(function (region) {
            return region.region_name;
          });

          if (req.body.region_name.length >= 1 && req.body.region_name.length <= 64) {
            if (regionsArray.every(function (name) {
              return name !== region;
            })) next();else res.status(409).send("The region already exists").end();
          } else res.status(400).send("The region name length is wrong").end();

        case 6:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function modifyRegion(regionId, req, res) {
  var region, newRegion, modified;
  return regeneratorRuntime.async(function modifyRegion$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM regions WHERE region_id = ?", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          region = _context17.sent;
          newRegion = {
            regionId: regionId,
            regionName: req.body.region_name || region[0].region_name
          };
          _context17.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE regions SET region_name = :regionName WHERE region_id = :regionId\n    ", {
            replacements: newRegion,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context17.sent;
          res.status(200).json(newRegion);

        case 8:
        case "end":
          return _context17.stop();
      }
    }
  });
}

function deleteRegion(regionId, req, res) {
  var region, regionsId, ids, deleted;
  return regeneratorRuntime.async(function deleteRegion$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM regions WHERE region_id = ?", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          region = _context18.sent;
          _context18.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT region_id FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 5:
          regionsId = _context18.sent;
          ids = regionsId.map(function (id) {
            return id.region_id;
          });

          if (ids.includes(regionId)) {
            _context18.next = 14;
            break;
          }

          _context18.next = 10;
          return regeneratorRuntime.awrap(db.query("DELETE FROM regions WHERE region_id = ?", {
            replacements: [regionId],
            type: QueryTypes.DELETE
          }));

        case 10:
          deleted = _context18.sent;
          res.status(200).json(region);
          _context18.next = 15;
          break;

        case 14:
          res.status(400).send("You cannot delete this region").end();

        case 15:
        case "end":
          return _context18.stop();
      }
    }
  });
}

function getCountriesRegion(regionId, req, res) {
  var countries;
  return regeneratorRuntime.async(function getCountriesRegion$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM countries WHERE region_id = ?\n    ", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          countries = _context19.sent;
          res.status(200).json(countries);

        case 4:
        case "end":
          return _context19.stop();
      }
    }
  });
}

function getCitiesRegion(regionId, req, res) {
  var cities;
  return regeneratorRuntime.async(function getCitiesRegion$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT city_id, co.country_id, re.region_id, city_name \n    FROM cities ci\n    JOIN countries co ON co.country_id = ci.country_id \n    JOIN regions re ON re.region_id = co.region_id \n    WHERE re.region_id = ?\n    ", {
            replacements: [regionId],
            type: QueryTypes.SELECT
          }));

        case 2:
          cities = _context20.sent;
          res.status(200).json(cities);

        case 4:
        case "end":
          return _context20.stop();
      }
    }
  });
}

function getRegionsCountriesCities(req, res) {
  var regions, countries, cities, countriesAndCities, regionsCountriesAndCities;
  return regeneratorRuntime.async(function getRegionsCountriesCities$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 2:
          regions = _context21.sent;
          _context21.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 5:
          countries = _context21.sent;
          _context21.next = 8;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 8:
          cities = _context21.sent;
          countriesAndCities = countries.map(function (country) {
            return Object.assign({}, country, {
              cities: cities.filter(function (city) {
                return city.country_id === country.country_id;
              })
            });
          });
          regionsCountriesAndCities = regions.map(function (region) {
            return Object.assign({}, region, {
              countries: countriesAndCities.filter(function (country) {
                return country.region_id === region.region_id;
              })
            });
          });
          res.status(200).json(regionsCountriesAndCities);

        case 12:
        case "end":
          return _context21.stop();
      }
    }
  });
} //countries


function getCountries(req, res) {
  var countries;
  return regeneratorRuntime.async(function getCountries$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 2:
          countries = _context22.sent;
          res.status(200).json(countries);

        case 4:
        case "end":
          return _context22.stop();
      }
    }
  });
}

function validateCountryNameQuery(req, res, next) {
  var country, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryNameQuery$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          country = req.body.country_name;
          _context23.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT country_name FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 3:
          countries = _context23.sent;
          countriesArray = countries.map(function (country) {
            return country.country_name;
          });

          if (req.body.country_name.length >= 1 && req.body.country_name.length <= 64) {
            if (countriesArray.every(function (name) {
              return name !== country;
            })) next();else res.status(409).send("The country already exists").end();
          } else res.status(400).send("The country name length is wrong").end();

        case 6:
        case "end":
          return _context23.stop();
      }
    }
  });
}

function createCountry(country_name, region_id, req, res) {
  var inserted;
  return regeneratorRuntime.async(function createCountry$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO countries (region_id, country_name)\n    VALUES (:region_id, :country_name)\n    ", {
            replacements: {
              country_name: country_name,
              region_id: region_id
            },
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context24.sent;
          res.status(201).json(Object.assign({}, {
            country_id: inserted[0],
            region_id: region_id,
            country_name: country_name
          }));

        case 4:
        case "end":
          return _context24.stop();
      }
    }
  });
}

function validateCountryIdQuery(req, res, next) {
  var countryId, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryIdQuery$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          countryId = +req.params.countryId || req.body.country_id;
          _context25.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT country_id FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 3:
          countries = _context25.sent;
          countriesArray = countries.map(function (id) {
            return id.country_id;
          });
          if (countriesArray.includes(countryId)) next();else res.status(404).send("The country does not exist").end();

        case 6:
        case "end":
          return _context25.stop();
      }
    }
  });
}

function getCountry(countryId, req, res) {
  var country;
  return regeneratorRuntime.async(function getCountry$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM countries WHERE country_id = ?\n    ", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          country = _context26.sent;
          res.status(200).json(country[0]);

        case 4:
        case "end":
          return _context26.stop();
      }
    }
  });
}

function validateCountryNamePutQuery(req, res, next) {
  var country, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryNamePutQuery$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          country = req.body.country_name;
          _context27.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT country_name FROM countries WHERE country_id != ".concat(req.params.countryId), {
            type: QueryTypes.SELECT
          }));

        case 3:
          countries = _context27.sent;
          countriesArray = countries.map(function (country) {
            return country.country_name;
          });

          if (req.body.country_name.length >= 1 && req.body.country_name.length <= 64) {
            if (countriesArray.every(function (name) {
              return name !== country;
            })) next();else res.status(409).send("The country already exists").end();
          } else res.status(400).send("The country name length is wrong").end();

        case 6:
        case "end":
          return _context27.stop();
      }
    }
  });
}

function modifyCountry(countryId, req, res) {
  var country, newCountry, modified;
  return regeneratorRuntime.async(function modifyCountry$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM countries WHERE country_id = ?", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          country = _context28.sent;
          newCountry = {
            country_id: countryId,
            region_id: req.body.region_id || country[0].region_id,
            country_name: req.body.country_name || country[0].country_name
          };
          _context28.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE countries SET country_name = :country_name, region_id = :region_id \n    WHERE country_id = :country_id\n    ", {
            replacements: newCountry,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context28.sent;
          res.status(200).json(newCountry);

        case 8:
        case "end":
          return _context28.stop();
      }
    }
  });
}

function validateRegionIdCountryQuery(req, res, next) {
  var regionId, regions, regionsArray;
  return regeneratorRuntime.async(function validateRegionIdCountryQuery$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          if (!req.body.region_id) {
            _context29.next = 9;
            break;
          }

          regionId = req.body.region_id;
          _context29.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT region_id FROM regions", {
            type: QueryTypes.SELECT
          }));

        case 4:
          regions = _context29.sent;
          regionsArray = regions.map(function (id) {
            return id.region_id;
          });
          if (regionsArray.includes(regionId)) next();else res.status(404).send("The region does not exist").end();
          _context29.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context29.stop();
      }
    }
  });
}

function deleteCountry(countryId, req, res) {
  var country, countriesId, ids, deleted;
  return regeneratorRuntime.async(function deleteCountry$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM countries WHERE country_id = ?", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          country = _context30.sent;
          _context30.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT country_id FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 5:
          countriesId = _context30.sent;
          ids = countriesId.map(function (id) {
            return id.country_id;
          });

          if (ids.includes(countryId)) {
            _context30.next = 14;
            break;
          }

          _context30.next = 10;
          return regeneratorRuntime.awrap(db.query("DELETE FROM countries WHERE country_id = ?", {
            replacements: [countryId],
            type: QueryTypes.DELETE
          }));

        case 10:
          deleted = _context30.sent;
          res.status(200).json(country[0]);
          _context30.next = 15;
          break;

        case 14:
          res.status(400).send("You cannot delete this country").end();

        case 15:
        case "end":
          return _context30.stop();
      }
    }
  });
}

function getCitiesCountry(countryId, req, res) {
  var cities;
  return regeneratorRuntime.async(function getCitiesCountry$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM cities WHERE country_id = ?\n    ", {
            replacements: [countryId],
            type: QueryTypes.SELECT
          }));

        case 2:
          cities = _context31.sent;
          res.status(200).json(cities);

        case 4:
        case "end":
          return _context31.stop();
      }
    }
  });
} //cities


function getCities(req, res) {
  var cities;
  return regeneratorRuntime.async(function getCities$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 2:
          cities = _context32.sent;
          res.status(200).json(cities);

        case 4:
        case "end":
          return _context32.stop();
      }
    }
  });
}

function validateCityNameQuery(req, res, next) {
  var city, cities, citiesArray;
  return regeneratorRuntime.async(function validateCityNameQuery$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          city = req.body.city_name;
          _context33.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT city_name FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 3:
          cities = _context33.sent;
          citiesArray = cities.map(function (city) {
            return city.city_name;
          });

          if (req.body.city_name.length >= 1 && req.body.city_name.length <= 64) {
            if (citiesArray.every(function (name) {
              return name !== city;
            })) next();else res.status(409).send("The city already exists").end();
          } else res.status(400).send("The city name length is wrong").end();

        case 6:
        case "end":
          return _context33.stop();
      }
    }
  });
}

function createCity(country_id, city_name, req, res) {
  var inserted;
  return regeneratorRuntime.async(function createCity$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO cities (country_id, city_name)\n    VALUES (:country_id, :city_name)\n    ", {
            replacements: {
              country_id: country_id,
              city_name: city_name
            },
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context34.sent;
          res.status(201).json(Object.assign({}, {
            city_id: inserted[0],
            country_id: country_id,
            city_name: city_name
          }));

        case 4:
        case "end":
          return _context34.stop();
      }
    }
  });
}

function validateCityIdQuery(req, res, next) {
  var cityId, cities, citiesArray;
  return regeneratorRuntime.async(function validateCityIdQuery$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          cityId = +req.params.cityId || req.body.city_id;
          _context35.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT city_id FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 3:
          cities = _context35.sent;
          citiesArray = cities.map(function (id) {
            return id.city_id;
          });
          if (citiesArray.includes(cityId)) next();else res.status(404).send("The city does not exist").end();

        case 6:
        case "end":
          return _context35.stop();
      }
    }
  });
}

function getCity(cityId, req, res) {
  var city;
  return regeneratorRuntime.async(function getCity$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM cities WHERE city_id = ?\n    ", {
            replacements: [cityId],
            type: QueryTypes.SELECT
          }));

        case 2:
          city = _context36.sent;
          res.status(200).json(city[0]);

        case 4:
        case "end":
          return _context36.stop();
      }
    }
  });
}

function validateCountryIdCityQuery(req, res, next) {
  var countryId, countries, countriesArray;
  return regeneratorRuntime.async(function validateCountryIdCityQuery$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          if (!req.body.country_id) {
            _context37.next = 9;
            break;
          }

          countryId = req.body.country_id;
          _context37.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT country_id FROM countries", {
            type: QueryTypes.SELECT
          }));

        case 4:
          countries = _context37.sent;
          countriesArray = countries.map(function (id) {
            return id.country_id;
          });
          if (countriesArray.includes(countryId)) next();else res.status(404).send("The country does not exist").end();
          _context37.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context37.stop();
      }
    }
  });
}

function validateCityNamePutQuery(req, res, next) {
  var city, cities, citiesArray;
  return regeneratorRuntime.async(function validateCityNamePutQuery$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          city = req.body.city_name;
          _context38.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT city_name FROM cities WHERE city_id != ".concat(req.params.cityId), {
            type: QueryTypes.SELECT
          }));

        case 3:
          cities = _context38.sent;
          citiesArray = cities.map(function (city) {
            return city.city_name;
          });

          if (req.body.city_name.length >= 1 && req.body.city_name.length <= 64) {
            if (citiesArray.every(function (name) {
              return name !== city;
            })) next();else res.status(409).send("The city already exists").end();
          } else res.status(400).send("The city name length is wrong").end();

        case 6:
        case "end":
          return _context38.stop();
      }
    }
  });
}

function modifyCity(cityId, req, res) {
  var city, newCity, modified;
  return regeneratorRuntime.async(function modifyCity$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM cities WHERE city_id = ?", {
            replacements: [cityId],
            type: QueryTypes.SELECT
          }));

        case 2:
          city = _context39.sent;
          newCity = {
            city_id: cityId,
            country_id: req.body.country_id || city[0].country_id,
            city_name: req.body.city_name || city[0].city_name
          };
          _context39.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE cities SET city_name = :city_name, country_id = :country_id \n    WHERE city_id = :city_id\n    ", {
            replacements: newCity,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context39.sent;
          res.status(200).json(newCity);

        case 8:
        case "end":
          return _context39.stop();
      }
    }
  });
}

function deleteCity(cityId, req, res) {
  var city, citiesIdContacts, idsContacts, citiesIdCompanies, idsCompanies, deleted;
  return regeneratorRuntime.async(function deleteCity$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM cities WHERE city_id = ?", {
            replacements: [cityId],
            type: QueryTypes.SELECT
          }));

        case 2:
          city = _context40.sent;
          _context40.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT city_id FROM contacts", {
            type: QueryTypes.SELECT
          }));

        case 5:
          citiesIdContacts = _context40.sent;
          idsContacts = citiesIdContacts.map(function (id) {
            return id.city_id;
          });
          _context40.next = 9;
          return regeneratorRuntime.awrap(db.query("SELECT city_id FROM companies", {
            type: QueryTypes.SELECT
          }));

        case 9:
          citiesIdCompanies = _context40.sent;
          idsCompanies = citiesIdCompanies.map(function (id) {
            return id.city_id;
          });

          if (!(!idsContacts.includes(cityId) && !idsCompanies.includes(cityId))) {
            _context40.next = 18;
            break;
          }

          _context40.next = 14;
          return regeneratorRuntime.awrap(db.query("DELETE FROM cities WHERE city_id = ?", {
            replacements: [cityId],
            type: QueryTypes.DELETE
          }));

        case 14:
          deleted = _context40.sent;
          res.status(200).json(city);
          _context40.next = 19;
          break;

        case 18:
          res.status(400).send("You cannot delete this city").end();

        case 19:
        case "end":
          return _context40.stop();
      }
    }
  });
} //companies


function getCompanies(req, res) {
  var companies;
  return regeneratorRuntime.async(function getCompanies$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT company_id, company_name, c.email, c.city_id, city_name, ci.country_id, country_name, \n    co.region_id, region_name, address, telephone\n    FROM companies c\n    JOIN cities ci ON ci.city_id = c.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    ", {
            type: QueryTypes.SELECT
          }));

        case 2:
          companies = _context41.sent;
          res.status(200).json(companies);

        case 4:
        case "end":
          return _context41.stop();
      }
    }
  });
}

function validateCompanyNameQuery(req, res, next) {
  var company, companies, companiesArray;
  return regeneratorRuntime.async(function validateCompanyNameQuery$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          company = req.body.company_name;
          _context42.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT company_name FROM companies", {
            type: QueryTypes.SELECT
          }));

        case 3:
          companies = _context42.sent;
          companiesArray = companies.map(function (company) {
            return company.company_name;
          });

          if (req.body.company_name.length >= 1 && req.body.company_name.length <= 64) {
            if (companiesArray.every(function (name) {
              return name !== company;
            })) next();else res.status(409).send("The company already exists").end();
          } else res.status(400).send("The company name length is wrong").end();

        case 6:
        case "end":
          return _context42.stop();
      }
    }
  });
}

function createCompany(newCompany, req, res) {
  var inserted, company;
  return regeneratorRuntime.async(function createCompany$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO companies (company_name, city_id, address, email, telephone)\n    VALUES (:company_name, :city_id, :address, :email, :telephone)\n    ", {
            replacements: newCompany,
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context43.sent;
          _context43.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    SELECT company_id, company_name, email, c.city_id, city_name, ci.country_id, country_name, \n    co.region_id, region_name, address, telephone\n    FROM companies c\n    JOIN cities ci ON ci.city_id = c.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    WHERE company_id = ?\n    ", {
            replacements: [inserted[0]],
            type: QueryTypes.SELECT
          }));

        case 5:
          company = _context43.sent;
          res.status(201).json(company[0]);

        case 7:
        case "end":
          return _context43.stop();
      }
    }
  });
}

function validateCompanyIdQuery(req, res, next) {
  var companyId, companies, companiesArray;
  return regeneratorRuntime.async(function validateCompanyIdQuery$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          companyId = +req.params.companyId || req.body.company_id;
          _context44.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT company_id FROM companies", {
            type: QueryTypes.SELECT
          }));

        case 3:
          companies = _context44.sent;
          companiesArray = companies.map(function (id) {
            return id.company_id;
          });
          if (companiesArray.includes(companyId)) next();else res.status(404).send("The company does not exist").end();

        case 6:
        case "end":
          return _context44.stop();
      }
    }
  });
}

function getCompany(companyId, req, res) {
  var company;
  return regeneratorRuntime.async(function getCompany$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          _context45.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT company_id, company_name, email, comp.city_id, city_name, ci.country_id, country_name, \n    co.region_id, region_name, address, telephone \n    FROM companies comp\n    JOIN cities ci ON ci.city_id = comp.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    WHERE company_id = ?\n    ", {
            replacements: [companyId],
            type: QueryTypes.SELECT
          }));

        case 2:
          company = _context45.sent;
          res.status(200).json(company[0]);

        case 4:
        case "end":
          return _context45.stop();
      }
    }
  });
}

function validateCompanyNamePutQuery(req, res, next) {
  var company, companies, companiesArray;
  return regeneratorRuntime.async(function validateCompanyNamePutQuery$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          if (!req.body.company_name) {
            _context46.next = 9;
            break;
          }

          company = req.body.company_name;
          _context46.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT company_name FROM companies WHERE company_id != ".concat(req.params.companyId), {
            type: QueryTypes.SELECT
          }));

        case 4:
          companies = _context46.sent;
          companiesArray = companies.map(function (company) {
            return company.company_name;
          });

          if (req.body.company_name.length >= 1 && req.body.company_name.length <= 64) {
            if (companiesArray.every(function (name) {
              return name !== company;
            })) next();else res.status(400).send("The company already exists").end();
          } else res.status(400).send("The company name length is wrong").end();

          _context46.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context46.stop();
      }
    }
  });
}

function validateCityIdPutQuery(req, res, next) {
  var cityId, cities, citiesArray;
  return regeneratorRuntime.async(function validateCityIdPutQuery$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          if (!req.body.city_id) {
            _context47.next = 9;
            break;
          }

          cityId = req.body.city_id;
          _context47.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT city_id FROM cities", {
            type: QueryTypes.SELECT
          }));

        case 4:
          cities = _context47.sent;
          citiesArray = cities.map(function (id) {
            return id.city_id;
          });
          if (citiesArray.includes(cityId)) next();else res.status(404).send("The city does not exist").end();
          _context47.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context47.stop();
      }
    }
  });
}

function modifyCompany(companyId, req, res) {
  var company, newcompany, modified, companyRes;
  return regeneratorRuntime.async(function modifyCompany$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          _context48.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM companies WHERE company_id = ?", {
            replacements: [companyId],
            type: QueryTypes.SELECT
          }));

        case 2:
          company = _context48.sent;
          newcompany = {
            company_id: companyId,
            company_name: req.body.company_name || company[0].company_name,
            email: req.body.email || company[0].email,
            address: req.body.address || company[0].address,
            telephone: req.body.telephone || company[0].telephone,
            city_id: req.body.city_id || company[0].city_id
          };
          _context48.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE companies SET company_name = :company_name, city_id = :city_id, address = :address, \n    email = :email, telephone = :telephone\n    WHERE company_id = :company_id\n    ", {
            replacements: newcompany,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context48.sent;
          _context48.next = 9;
          return regeneratorRuntime.awrap(db.query("\n    SELECT company_id, company_name, email, c.city_id, city_name, ci.country_id, country_name, \n    co.region_id, region_name, address, telephone\n    FROM companies c\n    JOIN cities ci ON ci.city_id = c.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    WHERE company_id = :company_id\n    ", {
            replacements: newcompany,
            type: QueryTypes.SELECT
          }));

        case 9:
          companyRes = _context48.sent;
          res.status(200).json(companyRes);

        case 11:
        case "end":
          return _context48.stop();
      }
    }
  });
}

function deleteCompany(companyId, req, res) {
  var companiesId, ids, company, deleted;
  return regeneratorRuntime.async(function deleteCompany$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          _context49.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT company_id FROM contacts", {
            type: QueryTypes.SELECT
          }));

        case 2:
          companiesId = _context49.sent;
          ids = companiesId.map(function (id) {
            return id.company_id;
          });

          if (ids.includes(companyId)) {
            _context49.next = 14;
            break;
          }

          _context49.next = 7;
          return regeneratorRuntime.awrap(db.query("\n        SELECT company_id, company_name, email, c.city_id, city_name, ci.country_id, country_name, \n        co.region_id, region_name, address, telephone\n        FROM companies c\n        JOIN cities ci ON ci.city_id = c.city_id\n        JOIN countries co ON co.country_id = ci.country_id\n        JOIN regions re ON re.region_id = co.region_id\n        WHERE company_id = ?\n        ", {
            replacements: [companyId],
            type: QueryTypes.SELECT
          }));

        case 7:
          company = _context49.sent;
          _context49.next = 10;
          return regeneratorRuntime.awrap(db.query("DELETE FROM companies WHERE company_id = ?", {
            replacements: [companyId],
            type: QueryTypes.DELETE
          }));

        case 10:
          deleted = _context49.sent;
          res.status(200).json(company[0]);
          _context49.next = 15;
          break;

        case 14:
          res.status(400).send("You cannot delete this company").end();

        case 15:
        case "end":
          return _context49.stop();
      }
    }
  });
} //contacts


function getContacts(req, res) {
  var contacts, channels, contactsAndChannels;
  return regeneratorRuntime.async(function getContacts$(_context50) {
    while (1) {
      switch (_context50.prev = _context50.next) {
        case 0:
          _context50.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,\n    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,\n    position, interest\n    FROM contacts cont \n    JOIN cities ci ON ci.city_id = cont.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    JOIN companies comp ON comp.company_id = cont.company_id\n    ", {
            type: QueryTypes.SELECT
          }));

        case 2:
          contacts = _context50.sent;
          _context50.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM contacts_channels cc \n    INNER JOIN channels ch ON cc.channel_id = ch.channel_id", {
            type: QueryTypes.SELECT
          }));

        case 5:
          channels = _context50.sent;
          contactsAndChannels = contacts.map(function (contact) {
            return Object.assign({}, contact, {
              preferred_channels: channels.filter(function (channel) {
                return channel.contact_id === contact.contact_id;
              })
            });
          });
          res.status(200).json(contactsAndChannels);

        case 8:
        case "end":
          return _context50.stop();
      }
    }
  });
}

function validateEmailContactsQuery(req, res, next) {
  var email, emails, emailsArray;
  return regeneratorRuntime.async(function validateEmailContactsQuery$(_context51) {
    while (1) {
      switch (_context51.prev = _context51.next) {
        case 0:
          email = req.body.email;
          _context51.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT email FROM contacts", {
            type: QueryTypes.SELECT
          }));

        case 3:
          emails = _context51.sent;
          emailsArray = emails.map(function (contact) {
            return contact.email;
          });

          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
            if (emailsArray.every(function (e) {
              return e != email;
            })) next();else res.status(409).send("The email already exists").end();
          } else res.status(400).send("The email is wrong").end();

        case 6:
        case "end":
          return _context51.stop();
      }
    }
  });
}

function validateChannelIdQuery(req, res, next) {
  var channelsBody, idsBody, channelsIdDB, channelsArray;
  return regeneratorRuntime.async(function validateChannelIdQuery$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          channelsBody = req.body.preferred_channels;
          idsBody = channelsBody.map(function (channel) {
            return channel.channel_id;
          });
          _context52.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT channel_id FROM channels", {
            type: QueryTypes.SELECT
          }));

        case 4:
          channelsIdDB = _context52.sent;
          channelsArray = channelsIdDB.map(function (id) {
            return id.channel_id;
          });

          if (idsBody.every(function (id) {
            return typeof id === "number" && channelsArray.includes(id);
          })) {
            if (idsBody.every(different)) next();else res.status(400).send("The channelId is wrong").end();
          } else res.status(400).send("The channelId is wrong").end();

        case 7:
        case "end":
          return _context52.stop();
      }
    }
  });
}

function different(value, index, list) {
  return list.indexOf(value) === index;
}

function createContact(newContact, req, res) {
  var contactInserted;
  return regeneratorRuntime.async(function createContact$(_context53) {
    while (1) {
      switch (_context53.prev = _context53.next) {
        case 0:
          _context53.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO contacts (firstname, lastname, email, city_id, address, company_id, position, interest)\n    VALUES (:firstname, :lastname, :email, :city_id, :address, :company_id, :position, :interest)\n    ", {
            replacements: newContact,
            type: QueryTypes.INSERT
          }));

        case 2:
          contactInserted = _context53.sent;
          return _context53.abrupt("return", contactInserted[0]);

        case 4:
        case "end":
          return _context53.stop();
      }
    }
  });
}

function addChannelsContacts(newContact, contactId, req, res) {
  return regeneratorRuntime.async(function addChannelsContacts$(_context55) {
    while (1) {
      switch (_context55.prev = _context55.next) {
        case 0:
          req.body.preferred_channels.forEach(function _callee(channel) {
            return regeneratorRuntime.async(function _callee$(_context54) {
              while (1) {
                switch (_context54.prev = _context54.next) {
                  case 0:
                    _context54.next = 2;
                    return regeneratorRuntime.awrap(db.query("\n    INSERT INTO contacts_channels (contact_id, channel_id, user_account, preference)\n    VALUES (".concat(contactId, ", ").concat(channel.channel_id, ", '").concat(channel.user_account, "', '").concat(channel.preference, "')\n    "), {
                      replacements: req.body.preferred_channels,
                      type: QueryTypes.INSERT
                    }));

                  case 2:
                    return _context54.abrupt("return", _context54.sent);

                  case 3:
                  case "end":
                    return _context54.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context55.stop();
      }
    }
  });
}

function getContactInserted(contactId, req, res) {
  var contact;
  return regeneratorRuntime.async(function getContactInserted$(_context56) {
    while (1) {
      switch (_context56.prev = _context56.next) {
        case 0:
          _context56.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,\n    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,\n    position, interest\n    FROM contacts cont \n    JOIN cities ci ON ci.city_id = cont.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    JOIN companies comp ON comp.company_id = cont.company_id\n    WHERE contact_id = ?\n    ", {
            replacements: [contactId],
            type: QueryTypes.SELECT
          }));

        case 2:
          contact = _context56.sent;
          return _context56.abrupt("return", contact);

        case 4:
        case "end":
          return _context56.stop();
      }
    }
  });
}

function getChannelsInserted(contactId, req, res) {
  var channels;
  return regeneratorRuntime.async(function getChannelsInserted$(_context57) {
    while (1) {
      switch (_context57.prev = _context57.next) {
        case 0:
          _context57.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM contacts_channels cc \n    INNER JOIN channels ch ON cc.channel_id = ch.channel_id\n    WHERE contact_id = ?", {
            replacements: [contactId],
            type: QueryTypes.SELECT
          }));

        case 2:
          channels = _context57.sent;
          return _context57.abrupt("return", channels);

        case 4:
        case "end":
          return _context57.stop();
      }
    }
  });
}

function validateContactIdQuery(req, res, next) {
  var contactId, contacts, contactsArray;
  return regeneratorRuntime.async(function validateContactIdQuery$(_context58) {
    while (1) {
      switch (_context58.prev = _context58.next) {
        case 0:
          contactId = +req.params.contactId;
          _context58.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT contact_id FROM contacts", {
            type: QueryTypes.SELECT
          }));

        case 3:
          contacts = _context58.sent;
          contactsArray = contacts.map(function (id) {
            return id.contact_id;
          });
          if (contactsArray.includes(contactId)) next();else res.status(404).send("The contact does not exist").end();

        case 6:
        case "end":
          return _context58.stop();
      }
    }
  });
}

function getContact(contactId, req, res) {
  var contact, channels, contactAndChannels;
  return regeneratorRuntime.async(function getContact$(_context59) {
    while (1) {
      switch (_context59.prev = _context59.next) {
        case 0:
          _context59.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,\n    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,\n    position, interest\n    FROM contacts cont \n    JOIN cities ci ON ci.city_id = cont.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    JOIN companies comp ON comp.company_id = cont.company_id\n    WHERE contact_id = ?\n    ", {
            replacements: [contactId],
            type: QueryTypes.SELECT
          }));

        case 2:
          contact = _context59.sent;
          _context59.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM contacts_channels cc \n    INNER JOIN channels ch ON cc.channel_id = ch.channel_id\n    WHERE contact_id = ?", {
            replacements: [contactId],
            type: QueryTypes.SELECT
          }));

        case 5:
          channels = _context59.sent;
          contactAndChannels = Object.assign({}, contact[0], {
            preferred_channels: channels
          });
          res.status(201).json(Object.assign(contactAndChannels));

        case 8:
        case "end":
          return _context59.stop();
      }
    }
  });
}

function validateEmailContactsPutQuery(req, res, next) {
  var email, emails, emailsArray;
  return regeneratorRuntime.async(function validateEmailContactsPutQuery$(_context60) {
    while (1) {
      switch (_context60.prev = _context60.next) {
        case 0:
          if (!req.body.email) {
            _context60.next = 9;
            break;
          }

          email = req.body.email;
          _context60.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT email FROM contacts WHERE contact_id != ".concat(req.params.contactId), {
            type: QueryTypes.SELECT
          }));

        case 4:
          emails = _context60.sent;
          emailsArray = emails.map(function (contact) {
            return contact.email;
          });

          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
            if (emailsArray.every(function (e) {
              return e != email;
            })) next();else res.status(409).send("The email already exists").end();
          } else res.status(400).send("The email is wrong").end();

          _context60.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context60.stop();
      }
    }
  });
}

function validateCompanyIdPutQuery(req, res, next) {
  var companyId, companies, companiesArray;
  return regeneratorRuntime.async(function validateCompanyIdPutQuery$(_context61) {
    while (1) {
      switch (_context61.prev = _context61.next) {
        case 0:
          if (!req.body.company_id) {
            _context61.next = 9;
            break;
          }

          companyId = req.body.company_id;
          _context61.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT company_id FROM companies", {
            type: QueryTypes.SELECT
          }));

        case 4:
          companies = _context61.sent;
          companiesArray = companies.map(function (id) {
            return id.company_id;
          });
          if (companiesArray.includes(companyId)) next();else res.status(404).send("The company does not exist").end();
          _context61.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context61.stop();
      }
    }
  });
}

function validateChannelIdPutQuery(req, res, next) {
  var channelsBody, idsBody, channelsIdDB, channelsArray;
  return regeneratorRuntime.async(function validateChannelIdPutQuery$(_context62) {
    while (1) {
      switch (_context62.prev = _context62.next) {
        case 0:
          if (!req.body.preferred_channels) {
            _context62.next = 10;
            break;
          }

          channelsBody = req.body.preferred_channels;
          idsBody = channelsBody.map(function (channel) {
            return channel.channel_id;
          });
          _context62.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT channel_id FROM channels", {
            type: QueryTypes.SELECT
          }));

        case 5:
          channelsIdDB = _context62.sent;
          channelsArray = channelsIdDB.map(function (id) {
            return id.channel_id;
          });

          if (idsBody.every(function (id) {
            return typeof id === "number" && channelsArray.includes(id);
          })) {
            if (idsBody.every(different)) next();else res.status(400).send("The channelId is wrong").end();
          } else res.status(400).send("The channelId is wrong").end();

          _context62.next = 11;
          break;

        case 10:
          next();

        case 11:
        case "end":
          return _context62.stop();
      }
    }
  });
}

function modifyContact(req, res) {
  var contact, modifiedContact, modified, deleteChannels, contactRes, channels, contactAndChannels;
  return regeneratorRuntime.async(function modifyContact$(_context64) {
    while (1) {
      switch (_context64.prev = _context64.next) {
        case 0:
          _context64.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM contacts WHERE contact_id = ?", {
            replacements: [req.params.contactId],
            type: QueryTypes.SELECT
          }));

        case 2:
          contact = _context64.sent;
          modifiedContact = {
            contact_id: req.params.contactId,
            firstname: req.body.firstname || contact[0].firstname,
            lastname: req.body.lastname || contact[0].lastname,
            email: req.body.email || contact[0].email,
            city_id: req.body.city_id || contact[0].city_id,
            address: req.body.address || contact[0].address,
            company_id: req.body.company_id || contact[0].company_id,
            position: req.body.position || contact[0].position,
            interest: +req.body.interest,
            preferred_channels: req.body.preferred_channels
          };
          _context64.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE contacts SET firstname = :firstname, lastname = :lastname, email = :email, city_id = :city_id, \n    address = :address, company_id = :company_id, position = :position, interest = :interest\n    WHERE contact_id = :contact_id\n    ", {
            replacements: modifiedContact,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context64.sent;
          _context64.next = 9;
          return regeneratorRuntime.awrap(db.query("\n    DELETE FROM contacts_channels WHERE contact_id = ".concat(req.params.contactId, "\n    "), {
            type: QueryTypes.DELETE
          }));

        case 9:
          deleteChannels = _context64.sent;
          req.body.preferred_channels.forEach(function _callee2(chan) {
            return regeneratorRuntime.async(function _callee2$(_context63) {
              while (1) {
                switch (_context63.prev = _context63.next) {
                  case 0:
                    _context63.next = 2;
                    return regeneratorRuntime.awrap(db.query("\n    INSERT INTO contacts_channels (contact_id, channel_id, user_account, preference) \n    VALUES (".concat(req.params.contactId, ", ").concat(chan.channel_id, ", '").concat(chan.user_account, "', '").concat(chan.preference, "')\n    "), {
                      replacements: req.body.preferred_channels,
                      type: QueryTypes.INSERT
                    }));

                  case 2:
                  case "end":
                    return _context63.stop();
                }
              }
            });
          });
          _context64.next = 13;
          return regeneratorRuntime.awrap(db.query("\n    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,\n    co.country_name, co.region_id, re.region_name, cont.company_id, cont.address, comp.company_name,\n    position, interest\n    FROM contacts cont \n    JOIN cities ci ON ci.city_id = cont.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    JOIN companies comp ON comp.company_id = cont.company_id\n    WHERE contact_id = ?\n    ", {
            replacements: [req.params.contactId],
            type: QueryTypes.SELECT
          }));

        case 13:
          contactRes = _context64.sent;
          _context64.next = 16;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM contacts_channels cc \n    INNER JOIN channels ch ON cc.channel_id = ch.channel_id\n    WHERE contact_id = ?", {
            replacements: [req.params.contactId],
            type: QueryTypes.SELECT
          }));

        case 16:
          channels = _context64.sent;
          contactAndChannels = Object.assign({}, contactRes[0], {
            preferred_channels: channels
          });
          res.status(201).json(Object.assign(contactAndChannels));

        case 19:
        case "end":
          return _context64.stop();
      }
    }
  });
}

function deleteContact(contactId, req, res) {
  var contact, channels, deleted, deletedChannels, contactAndChannels;
  return regeneratorRuntime.async(function deleteContact$(_context65) {
    while (1) {
      switch (_context65.prev = _context65.next) {
        case 0:
          _context65.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM contacts WHERE contact_id = ?", {
            replacements: [contactId],
            type: QueryTypes.SELECT
          }));

        case 2:
          contact = _context65.sent;
          _context65.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM contacts_channels WHERE contact_id = ?", {
            replacements: [contactId],
            type: QueryTypes.SELECT
          }));

        case 5:
          channels = _context65.sent;
          _context65.next = 8;
          return regeneratorRuntime.awrap(db.query("DELETE FROM contacts WHERE contact_id = ?", {
            replacements: [contactId],
            type: QueryTypes.DELETE
          }));

        case 8:
          deleted = _context65.sent;
          _context65.next = 11;
          return regeneratorRuntime.awrap(db.query("DELETE FROM contacts_channels WHERE contact_id = ?", {
            replacements: [contactId],
            type: QueryTypes.DELETE
          }));

        case 11:
          deletedChannels = _context65.sent;
          contactAndChannels = Object.assign({}, contact[0], {
            preferred_channels: channels
          });
          res.status(200).json(Object.assign(contactAndChannels));

        case 14:
        case "end":
          return _context65.stop();
      }
    }
  });
}

function validateChannelIdAddQuery(req, res, next) {
  var channelId, channels, channelsArray, channelsContact, channelsContactArray;
  return regeneratorRuntime.async(function validateChannelIdAddQuery$(_context66) {
    while (1) {
      switch (_context66.prev = _context66.next) {
        case 0:
          channelId = req.body.channel_id;
          _context66.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT channel_id FROM channels", {
            type: QueryTypes.SELECT
          }));

        case 3:
          channels = _context66.sent;
          channelsArray = channels.map(function (id) {
            return id.channel_id;
          });
          _context66.next = 7;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM contacts_channels cc \n    INNER JOIN channels ch ON cc.channel_id = ch.channel_id\n    WHERE contact_id = ?", {
            replacements: [req.params.contactId],
            type: QueryTypes.SELECT
          }));

        case 7:
          channelsContact = _context66.sent;
          channelsContactArray = channelsContact.map(function (cc) {
            return cc.channel_id;
          });

          if (channelsArray.includes(channelId)) {
            if (channelsContactArray.includes(channelId)) {
              res.status(400).send("The contact already has that channel").end();
            } else next();
          } else res.status(404).send("The channel does not exist").end();

        case 10:
        case "end":
          return _context66.stop();
      }
    }
  });
}

function validateChannelIdDelQuery(req, res, next) {
  var channelId, channelsContact, channelsContactArray;
  return regeneratorRuntime.async(function validateChannelIdDelQuery$(_context67) {
    while (1) {
      switch (_context67.prev = _context67.next) {
        case 0:
          channelId = +req.params.channelId;
          _context67.next = 3;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM contacts_channels cc \n    INNER JOIN channels ch ON cc.channel_id = ch.channel_id\n    WHERE contact_id = ?", {
            replacements: [+req.params.contactId],
            type: QueryTypes.SELECT
          }));

        case 3:
          channelsContact = _context67.sent;
          channelsContactArray = channelsContact.map(function (cc) {
            return cc.channel_id;
          });
          if (channelsContactArray.includes(channelId)) next();else res.status(404).send("The contact does not have that channel").end();

        case 6:
        case "end":
          return _context67.stop();
      }
    }
  });
}

function addChannel(newContChan, req, res) {
  var inserted, channels;
  return regeneratorRuntime.async(function addChannel$(_context68) {
    while (1) {
      switch (_context68.prev = _context68.next) {
        case 0:
          _context68.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO contacts_channels (contact_id, channel_id, user_account, preference)\n    VALUES (:contact_id, :channel_id, :user_account, :preference)\n    ", {
            replacements: newContChan,
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context68.sent;
          _context68.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    SELECT contact_id, cc.channel_id, channel_name, user_account, preference\n    FROM contacts_channels cc \n    JOIN channels ch ON cc.channel_id = ch.channel_id \n    WHERE contact_id = :contact_id\n    ", {
            replacements: newContChan,
            type: QueryTypes.SELECT
          }));

        case 5:
          channels = _context68.sent;
          res.status(201).json(channels);

        case 7:
        case "end":
          return _context68.stop();
      }
    }
  });
}

function deleteChannelContact(newContChan, req, res) {
  var deleted;
  return regeneratorRuntime.async(function deleteChannelContact$(_context69) {
    while (1) {
      switch (_context69.prev = _context69.next) {
        case 0:
          _context69.next = 2;
          return regeneratorRuntime.awrap(db.query("DELETE FROM contacts_channels \n    WHERE contact_id = :contact_id AND channel_id = :channel_id", {
            replacements: newContChan,
            type: QueryTypes.DELETE
          }));

        case 2:
          deleted = _context69.sent;
          res.status(200).send("Channel successfully removed").end();

        case 4:
        case "end":
          return _context69.stop();
      }
    }
  });
}

function getResults(req, res) {
  var searchValue, contacts, channels, contactsAndChannels;
  return regeneratorRuntime.async(function getResults$(_context70) {
    while (1) {
      switch (_context70.prev = _context70.next) {
        case 0:
          searchValue = req.body.search_value;
          _context70.next = 3;
          return regeneratorRuntime.awrap(db.query("\n    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,\n    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,\n    position, interest\n    FROM contacts cont \n    JOIN cities ci ON ci.city_id = cont.city_id\n    JOIN countries co ON co.country_id = ci.country_id\n    JOIN regions re ON re.region_id = co.region_id\n    JOIN companies comp ON comp.company_id = cont.company_id\n    WHERE firstname LIKE '%".concat(searchValue, "%' OR lastname LIKE '%").concat(searchValue, "%' OR cont.email LIKE '%").concat(searchValue, "%'\n    OR ci.city_name LIKE '").concat(searchValue, "%' OR co.country_name LIKE '").concat(searchValue, "%' OR re.region_name LIKE '").concat(searchValue, "%'\n    OR cont.address LIKE '").concat(searchValue, "%' OR comp.company_name LIKE '").concat(searchValue, "%' OR position LIKE '%").concat(searchValue, "%'\n    OR interest LIKE '").concat(searchValue, "%'\n    "), {
            replacements: [searchValue],
            type: QueryTypes.SELECT
          }));

        case 3:
          contacts = _context70.sent;
          _context70.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM contacts_channels cc \n    INNER JOIN channels ch ON cc.channel_id = ch.channel_id", {
            type: QueryTypes.SELECT
          }));

        case 6:
          channels = _context70.sent;
          contactsAndChannels = contacts.map(function (contact) {
            return Object.assign({}, contact, {
              preferred_channels: channels.filter(function (channel) {
                return channel.contact_id === contact.contact_id;
              })
            });
          });
          res.status(200).json(contactsAndChannels);

        case 9:
        case "end":
          return _context70.stop();
      }
    }
  });
} //channels


function getChannels(req, res) {
  var channels;
  return regeneratorRuntime.async(function getChannels$(_context71) {
    while (1) {
      switch (_context71.prev = _context71.next) {
        case 0:
          _context71.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM channels", {
            type: QueryTypes.SELECT
          }));

        case 2:
          channels = _context71.sent;
          res.status(200).json(channels);

        case 4:
        case "end":
          return _context71.stop();
      }
    }
  });
}

function validateChannelNameQuery(req, res, next) {
  var channel, channels, channelsArray;
  return regeneratorRuntime.async(function validateChannelNameQuery$(_context72) {
    while (1) {
      switch (_context72.prev = _context72.next) {
        case 0:
          channel = req.body.channel_name;
          _context72.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT channel_name FROM channels", {
            type: QueryTypes.SELECT
          }));

        case 3:
          channels = _context72.sent;
          channelsArray = channels.map(function (channel) {
            return channel.channel_name;
          });

          if (req.body.channel_name.length >= 1 && req.body.channel_name.length <= 64) {
            if (channelsArray.every(function (name) {
              return name !== channel;
            })) next();else res.status(400).send("The channel already exists").end();
          } else res.status(400).send("The channel name length is wrong").end();

        case 6:
        case "end":
          return _context72.stop();
      }
    }
  });
}

function createChannel(channel_name, req, res) {
  var inserted;
  return regeneratorRuntime.async(function createChannel$(_context73) {
    while (1) {
      switch (_context73.prev = _context73.next) {
        case 0:
          _context73.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO channels (channel_name)\n    VALUES (:channel_name)\n    ", {
            replacements: {
              channel_name: channel_name
            },
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context73.sent;
          res.status(201).json(Object.assign({}, {
            channel_id: inserted[0]
          }, {
            channel_name: channel_name
          }));

        case 4:
        case "end":
          return _context73.stop();
      }
    }
  });
}

function validateChannelIdExQuery(req, res, next) {
  var channelId, channels, channelsArray;
  return regeneratorRuntime.async(function validateChannelIdExQuery$(_context74) {
    while (1) {
      switch (_context74.prev = _context74.next) {
        case 0:
          channelId = +req.params.channelId;
          _context74.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT channel_id FROM channels", {
            type: QueryTypes.SELECT
          }));

        case 3:
          channels = _context74.sent;
          channelsArray = channels.map(function (id) {
            return id.channel_id;
          });
          if (channelsArray.includes(channelId)) next();else res.status(404).send("The channel does not exist").end();

        case 6:
        case "end":
          return _context74.stop();
      }
    }
  });
}

function getChannel(channelId, req, res) {
  var channel;
  return regeneratorRuntime.async(function getChannel$(_context75) {
    while (1) {
      switch (_context75.prev = _context75.next) {
        case 0:
          _context75.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * FROM channels WHERE channel_id = ?\n    ", {
            replacements: [channelId],
            type: QueryTypes.SELECT
          }));

        case 2:
          channel = _context75.sent;
          res.status(200).json(channel[0]);

        case 4:
        case "end":
          return _context75.stop();
      }
    }
  });
}

function validateChannelNamePutQuery(req, res, next) {
  var channel, channels, channelsArray;
  return regeneratorRuntime.async(function validateChannelNamePutQuery$(_context76) {
    while (1) {
      switch (_context76.prev = _context76.next) {
        case 0:
          if (!req.body.channel_name) {
            _context76.next = 9;
            break;
          }

          channel = req.body.channel_name;
          _context76.next = 4;
          return regeneratorRuntime.awrap(db.query("SELECT channel_name FROM channels", {
            type: QueryTypes.SELECT
          }));

        case 4:
          channels = _context76.sent;
          channelsArray = channels.map(function (channel) {
            return channel.channel_name;
          });

          if (req.body.channel_name.length >= 1 && req.body.channel_name.length <= 64) {
            if (channelsArray.every(function (name) {
              return name !== channel;
            })) next();else res.status(400).send("The channel already exists").end();
          } else res.status(400).send("The channel name length is wrong").end();

          _context76.next = 10;
          break;

        case 9:
          next();

        case 10:
        case "end":
          return _context76.stop();
      }
    }
  });
}

function modifyChannel(channelId, req, res) {
  var channel, newChannel, modified;
  return regeneratorRuntime.async(function modifyChannel$(_context77) {
    while (1) {
      switch (_context77.prev = _context77.next) {
        case 0:
          _context77.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM channels WHERE channel_id = ?", {
            replacements: [channelId],
            type: QueryTypes.SELECT
          }));

        case 2:
          channel = _context77.sent;
          newChannel = {
            channelId: channelId,
            channelName: req.body.channel_name || channel[0].channel_name
          };
          _context77.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    UPDATE channels SET channel_name = :channelName WHERE channel_id = :channelId\n    ", {
            replacements: newChannel,
            type: QueryTypes.UPDATE
          }));

        case 6:
          modified = _context77.sent;
          res.status(200).json(newChannel);

        case 8:
        case "end":
          return _context77.stop();
      }
    }
  });
}

function deleteChannel(channelId, req, res) {
  var channel, deleted;
  return regeneratorRuntime.async(function deleteChannel$(_context78) {
    while (1) {
      switch (_context78.prev = _context78.next) {
        case 0:
          _context78.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM channels WHERE channel_id = ?", {
            replacements: [channelId],
            type: QueryTypes.SELECT
          }));

        case 2:
          channel = _context78.sent;
          _context78.next = 5;
          return regeneratorRuntime.awrap(db.query("DELETE FROM channels WHERE channel_id = ?", {
            replacements: [channelId],
            type: QueryTypes.DELETE
          }));

        case 5:
          deleted = _context78.sent;
          res.status(200).json(channel);

        case 7:
        case "end":
          return _context78.stop();
      }
    }
  });
}

module.exports = {
  selectUserLogin: selectUserLogin,
  validateLoginQuery: validateLoginQuery,
  getUsers: getUsers,
  createUser: createUser,
  validateEmailQuery: validateEmailQuery,
  validateUserIdQuery: validateUserIdQuery,
  getUser: getUser,
  modifyUser: modifyUser,
  validateEmailPutQuery: validateEmailPutQuery,
  deleteUser: deleteUser,
  getRegions: getRegions,
  createRegion: createRegion,
  validateRegionNameQuery: validateRegionNameQuery,
  validateRegionIdQuery: validateRegionIdQuery,
  getRegion: getRegion,
  validateRegionNamePutQuery: validateRegionNamePutQuery,
  modifyRegion: modifyRegion,
  deleteRegion: deleteRegion,
  getCountriesRegion: getCountriesRegion,
  getCitiesRegion: getCitiesRegion,
  getRegionsCountriesCities: getRegionsCountriesCities,
  getCountries: getCountries,
  validateCountryNameQuery: validateCountryNameQuery,
  createCountry: createCountry,
  validateCountryIdQuery: validateCountryIdQuery,
  getCountry: getCountry,
  validateCountryNamePutQuery: validateCountryNamePutQuery,
  modifyCountry: modifyCountry,
  validateRegionIdCountryQuery: validateRegionIdCountryQuery,
  deleteCountry: deleteCountry,
  getCitiesCountry: getCitiesCountry,
  getCities: getCities,
  validateCityNameQuery: validateCityNameQuery,
  createCity: createCity,
  validateCityIdQuery: validateCityIdQuery,
  getCity: getCity,
  validateCountryIdCityQuery: validateCountryIdCityQuery,
  validateCityNamePutQuery: validateCityNamePutQuery,
  modifyCity: modifyCity,
  deleteCity: deleteCity,
  getCompanies: getCompanies,
  validateCompanyNameQuery: validateCompanyNameQuery,
  createCompany: createCompany,
  validateCompanyIdQuery: validateCompanyIdQuery,
  getCompany: getCompany,
  validateCompanyNamePutQuery: validateCompanyNamePutQuery,
  modifyCompany: modifyCompany,
  validateCityIdPutQuery: validateCityIdPutQuery,
  deleteCompany: deleteCompany,
  getContacts: getContacts,
  validateEmailContactsQuery: validateEmailContactsQuery,
  validateChannelIdQuery: validateChannelIdQuery,
  createContact: createContact,
  addChannelsContacts: addChannelsContacts,
  getContactInserted: getContactInserted,
  getChannelsInserted: getChannelsInserted,
  validateContactIdQuery: validateContactIdQuery,
  getContact: getContact,
  validateEmailContactsPutQuery: validateEmailContactsPutQuery,
  validateCompanyIdPutQuery: validateCompanyIdPutQuery,
  validateChannelIdPutQuery: validateChannelIdPutQuery,
  modifyContact: modifyContact,
  deleteContact: deleteContact,
  validateChannelIdAddQuery: validateChannelIdAddQuery,
  addChannel: addChannel,
  deleteChannelContact: deleteChannelContact,
  validateChannelIdDelQuery: validateChannelIdDelQuery,
  getResults: getResults,
  getChannels: getChannels,
  validateChannelNameQuery: validateChannelNameQuery,
  createChannel: createChannel,
  validateChannelIdExQuery: validateChannelIdExQuery,
  getChannel: getChannel,
  validateChannelNamePutQuery: validateChannelNamePutQuery,
  modifyChannel: modifyChannel,
  deleteChannel: deleteChannel
};