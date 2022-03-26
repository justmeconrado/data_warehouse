const { QueryTypes } = require("sequelize")
const { db } = require("./db")
const jwt = require('jsonwebtoken')
const { query } = require("express")

const authorizationPassword = 'tmo$Q$bG5xR56'

//users
async function selectUserLogin(username, password, req, res) {
    const user = await db.query(`SELECT * FROM users WHERE email = :username && password = :password`, { 
        replacements: { username, password },
        type: QueryTypes.SELECT 
    })
    const perfil = user[0].perfil
    const user_id = user[0].user_id
    res.status(200).json(Object.assign({}, {token: jwt.sign({ username, perfil, user_id} , authorizationPassword)}, {perf: perfil}))
}

async function validateLoginQuery(req, res, next) {
    const { username, password } = req.body
    const user = await db.query(`SELECT * FROM users WHERE email = :username && password = :password`, { 
        replacements: { username, password },
        type: QueryTypes.SELECT 
    })
    if(user[0]) next()
    else res.status(400).send("Invalid credentials").end()
}

async function getUsers(req, res) {
    const users = await db.query(`
    SELECT user_id, firstname, lastname, email, perfil FROM users
    `, { 
        type: QueryTypes.SELECT 
    })
    res.status(200).json(users)
}

async function createUser(newUser, req, res) {
    const inserted = await db.query(`
    INSERT INTO users (firstname, lastname, email, perfil, password)
    VALUES (:firstname, :lastname, :email, :perfil, :password)
    `, {
        replacements: newUser,
        type: QueryTypes.INSERT
    })
    const { firstname , lastname, email  } = newUser
    res.status(201).json(Object.assign({}, { user_id: inserted[0] } , 
        { firstname: firstname , lastname: lastname, email: email}, {perfil: "Básico"}))
}

async function validateEmailQuery(req, res, next) {
    const email = req.body.email
    const emails = await db.query(`SELECT email FROM users`, {
        type: QueryTypes.SELECT
    })
    const emailsArray = emails.map(user => user.email)
    if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        if(emailsArray.every(e => e != email)) next()
        else res.status(409).send("The email already exists").end()
    } else res.status(400).send("The email is wrong").end()
}

async function validateUserIdQuery(req, res, next) {
    const userId = +req.params.userId
    const users = await db.query(`SELECT user_id FROM users`, {
        type: QueryTypes.SELECT
    })
    const usersArray = users.map(id => id.user_id)
    if(usersArray.includes(userId)) next()
    else res.status(404).send("The user does not exist").end()
}

async function getUser(userId, req, res) {
    const user = await db.query(`
    SELECT user_id, firstname, lastname, email, perfil FROM users WHERE user_id = ?
    `, { 
        replacements: [userId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(user[0])
}

async function validateEmailPutQuery(req, res, next) {
    const email = req.body.email
    const emails = await db.query(`SELECT email FROM users WHERE user_id != ${req.params.userId}`, {
        type: QueryTypes.SELECT
    })
    const emailsArray = emails.map(user => user.email)
    if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        if(emailsArray.every(e => e != email)) next()
        else res.status(409).send("The email already exists").end()
    } else res.status(400).send("The email is wrong").end()
}

async function modifyUser(userId, req, res) {
    const user = await db.query(`SELECT * FROM users WHERE user_id = ?`, {
        replacements: [userId],
        type: QueryTypes.SELECT 
    })
    const password = req.body.password || user[0].password
    const newUser = {
        user_id: userId,
        firstname: req.body.firstname || user[0].firstname,
        lastname: req.body.lastname || user[0].lastname,
        email: req.body.email || user[0].email,
        perfil: req.body.perfil || user[0].perfil,
        password: req.body.password

    }
    const modified = await db.query(`
    UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email, perfil = :perfil, 
    password = :password WHERE user_id = :user_id
    `, {
        replacements: Object.assign( {}, newUser, {password: password} ),
        type: QueryTypes.UPDATE
    })
    res.status(200).json({user_id: newUser.user_id, firstname: newUser.firstname, lastname: newUser.lastname, 
        email: newUser.email, perfil: newUser.perfil})
}

async function deleteUser(userId, req, res) {
    const user = await db.query(`SELECT * FROM users WHERE user_id = ?`, {
        replacements: [userId],
        type: QueryTypes.SELECT 
    })
    const deleted = await db.query(`DELETE FROM users WHERE user_id = ?`, {
        replacements: [userId],
        type: QueryTypes.DELETE
    })
    const {user_id, firstname, lastname, email, perfil} = user[0]
    res.status(200).json({ user_id, firstname, lastname, email, perfil })
}

//regions
async function getRegions(req, res) {
    const regions = await db.query(`SELECT * FROM regions`, { type: QueryTypes.SELECT })
    res.status(200).json(regions)
}

async function validateRegionNameQuery(req, res, next) {
    const region = req.body.region_name
    const regions = await db.query(`SELECT region_name FROM regions`, {
        type: QueryTypes.SELECT
    })
    const regionsArray = regions.map(region => region.region_name)
    if(req.body.region_name.length >= 1 && req.body.region_name.length <= 64) {
        if(regionsArray.every(name => name !== region)) next()
        else res.status(409).send("The region already exists").end()
    } else res.status(400).send("The region name length is wrong").end()
}

async function createRegion(newRegion, req, res) {
    const inserted = await db.query(`
    INSERT INTO regions (region_name)
    VALUES (:newRegion)
    `, {
        replacements: {newRegion},
        type: QueryTypes.INSERT
    })
    res.status(201).json(Object.assign({}, { region_id: inserted[0] } , { newRegion }))
}

async function validateRegionIdQuery(req, res, next) {
    const regionId = +req.params.regionId || +req.body.region_id
    const regions = await db.query(`SELECT region_id FROM regions`, {
        type: QueryTypes.SELECT
    })
    const regionsArray = regions.map(id => id.region_id)
    if(regionsArray.includes(regionId)) next()
    else res.status(404).send("The region does not exist").end()
}

async function getRegion(regionId, req, res) {
    const region = await db.query(`
    SELECT * FROM regions WHERE region_id = ?
    `, { 
        replacements: [regionId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(region[0])
}

async function validateRegionNamePutQuery(req, res, next) {
    const region = req.body.region_name
    const regions = await db.query(`SELECT region_name FROM regions WHERE region_id != ${req.params.regionId}`, {
        type: QueryTypes.SELECT
    })
    const regionsArray = regions.map(region => region.region_name)
    if(req.body.region_name.length >= 1 && req.body.region_name.length <= 64) {
        if(regionsArray.every(name => name !== region)) next()
        else res.status(409).send("The region already exists").end()
    } else res.status(400).send("The region name length is wrong").end()
}

async function modifyRegion(regionId, req, res) {
    const region = await db.query(`SELECT * FROM regions WHERE region_id = ?`, {
        replacements: [regionId],
        type: QueryTypes.SELECT 
    })
    const newRegion = {
        regionId: regionId,
        regionName: req.body.region_name || region[0].region_name
    }
    const modified = await db.query(`
    UPDATE regions SET region_name = :regionName WHERE region_id = :regionId
    `, {
        replacements:  newRegion,
        type: QueryTypes.UPDATE
    })
    res.status(200).json(newRegion)
}

async function deleteRegion(regionId, req, res) {
    const region = await db.query(`SELECT * FROM regions WHERE region_id = ?`, {
        replacements: [regionId],
        type: QueryTypes.SELECT 
    })

    const regionsId = await db.query(`SELECT region_id FROM countries`, { 
        type: QueryTypes.SELECT 
    })
    const ids = regionsId.map(id => id.region_id)
    if(!ids.includes(regionId)) {
        const deleted = await db.query(`DELETE FROM regions WHERE region_id = ?`, {
            replacements: [regionId],
            type: QueryTypes.DELETE
        })
        res.status(200).json(region)
    } else res.status(400).send("You cannot delete this region").end()
}

async function getCountriesRegion(regionId, req, res) {
    const countries = await db.query(`
    SELECT * FROM countries WHERE region_id = ?
    `, { replacements: [regionId],
        type: QueryTypes.SELECT })
    res.status(200).json(countries)
}

async function getCitiesRegion(regionId, req, res) {
    const cities = await db.query(`
    SELECT city_id, co.country_id, re.region_id, city_name 
    FROM cities ci
    JOIN countries co ON co.country_id = ci.country_id 
    JOIN regions re ON re.region_id = co.region_id 
    WHERE re.region_id = ?
    `, { replacements: [regionId],
        type: QueryTypes.SELECT })
    res.status(200).json(cities)
}

async function getRegionsCountriesCities(req, res) {
    const regions = await db.query(`SELECT * FROM regions`, { type: QueryTypes.SELECT })
    const countries = await db.query(`SELECT * FROM countries`, { type: QueryTypes.SELECT })
    const cities = await db.query(`SELECT * FROM cities`, { type: QueryTypes.SELECT })
    
    const countriesAndCities = countries.map(country => 
        Object.assign( {} , country, { cities: cities.filter(city => 
            city.country_id === country.country_id)}
        ))

    const regionsCountriesAndCities = regions.map(region => 
        Object.assign( {} , region, { countries: countriesAndCities.filter(country => 
            country.region_id === region.region_id)}
        ))
    res.status(200).json(regionsCountriesAndCities)
}

//countries
async function getCountries(req, res) {
    const countries = await db.query(`SELECT * FROM countries`, { type: QueryTypes.SELECT })
    res.status(200).json(countries)
}

async function validateCountryNameQuery(req, res, next) {
    const country = req.body.country_name
    const countries = await db.query(`SELECT country_name FROM countries`, {
        type: QueryTypes.SELECT
    })
    const countriesArray = countries.map(country => country.country_name)
    if(req.body.country_name.length >= 1 && req.body.country_name.length <= 64) {
        if(countriesArray.every(name => name !== country)) next()
        else res.status(409).send("The country already exists").end()
    } else res.status(400).send("The country name length is wrong").end()
}

async function createCountry(country_name, region_id, req, res) {
    const inserted = await db.query(`
    INSERT INTO countries (region_id, country_name)
    VALUES (:region_id, :country_name)
    `, {
        replacements: { country_name, region_id },
        type: QueryTypes.INSERT
    })
    res.status(201).json(Object.assign({}, { country_id: inserted[0], region_id: region_id, country_name: country_name }))
}

async function validateCountryIdQuery(req, res, next) {
    const countryId = +req.params.countryId || req.body.country_id
    const countries = await db.query(`SELECT country_id FROM countries`, {
        type: QueryTypes.SELECT
    })
    const countriesArray = countries.map(id => id.country_id)
    if(countriesArray.includes(countryId)) next()
    else res.status(404).send("The country does not exist").end()
}

async function getCountry(countryId, req, res) {
    const country = await db.query(`
    SELECT * FROM countries WHERE country_id = ?
    `, { 
        replacements: [countryId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(country[0])
}

async function validateCountryNamePutQuery(req, res, next) {
    const country = req.body.country_name
    const countries = await db.query(`SELECT country_name FROM countries WHERE country_id != ${req.params.countryId}`, {
        type: QueryTypes.SELECT
    })
    const countriesArray = countries.map(country => country.country_name)
    if(req.body.country_name.length >= 1 && req.body.country_name.length <= 64) {
        if(countriesArray.every(name => name !== country)) next()
        else res.status(409).send("The country already exists").end()
    } else res.status(400).send("The country name length is wrong").end()
}

async function modifyCountry(countryId, req, res) {
    const country = await db.query(`SELECT * FROM countries WHERE country_id = ?`, {
        replacements: [countryId],
        type: QueryTypes.SELECT 
    })
    const newCountry = {
        country_id: countryId,
        region_id: req.body.region_id || country[0].region_id,
        country_name: req.body.country_name || country[0].country_name
    }
    const modified = await db.query(`
    UPDATE countries SET country_name = :country_name, region_id = :region_id 
    WHERE country_id = :country_id
    `, {
        replacements: newCountry,
        type: QueryTypes.UPDATE
    })
    res.status(200).json(newCountry)
}

async function validateRegionIdCountryQuery(req, res, next) {
    if(req.body.region_id) {
        const regionId = req.body.region_id
        const regions = await db.query(`SELECT region_id FROM regions`, {
            type: QueryTypes.SELECT
        })
        const regionsArray = regions.map(id => id.region_id)
        if(regionsArray.includes(regionId)) next()
        else res.status(404).send("The region does not exist").end()
    } else next()
}

async function deleteCountry(countryId, req, res) {
    const country = await db.query(`SELECT * FROM countries WHERE country_id = ?`, {
        replacements: [countryId],
        type: QueryTypes.SELECT 
    })

    const countriesId = await db.query(`SELECT country_id FROM cities`, { 
        type: QueryTypes.SELECT 
    })
    const ids = countriesId.map(id => id.country_id)

    if(!ids.includes(countryId)) {
        const deleted = await db.query(`DELETE FROM countries WHERE country_id = ?`, {
            replacements: [countryId],
            type: QueryTypes.DELETE
        })
        res.status(200).json(country[0])
    } else res.status(400).send("You cannot delete this country").end()
}

async function getCitiesCountry(countryId, req, res) {
    const cities = await db.query(`
    SELECT * FROM cities WHERE country_id = ?
    `, { replacements: [countryId],
        type: QueryTypes.SELECT })
    res.status(200).json(cities)
}

//cities
async function getCities(req, res) {
    const cities = await db.query(`SELECT * FROM cities`, { type: QueryTypes.SELECT })
    res.status(200).json(cities)
}

async function validateCityNameQuery(req, res, next) {
    const city = req.body.city_name
    const cities = await db.query(`SELECT city_name FROM cities`, {
        type: QueryTypes.SELECT
    })
    const citiesArray = cities.map(city => city.city_name)
    if(req.body.city_name.length >= 1 && req.body.city_name.length <= 64) {
        if(citiesArray.every(name => name !== city)) next()
        else res.status(409).send("The city already exists").end()
    } else res.status(400).send("The city name length is wrong").end()
}

async function createCity(country_id, city_name, req, res) {
    const inserted = await db.query(`
    INSERT INTO cities (country_id, city_name)
    VALUES (:country_id, :city_name)
    `, {
        replacements: { country_id, city_name },
        type: QueryTypes.INSERT
    })
    res.status(201).json(Object.assign({}, { city_id: inserted[0], country_id: country_id, city_name: city_name }))
}

async function validateCityIdQuery(req, res, next) {
    const cityId = +req.params.cityId || req.body.city_id
    const cities = await db.query(`SELECT city_id FROM cities`, {
        type: QueryTypes.SELECT
    })
    const citiesArray = cities.map(id => id.city_id)
    if(citiesArray.includes(cityId)) next()
    else res.status(404).send("The city does not exist").end()
}

async function getCity(cityId, req, res) {
    const city = await db.query(`
    SELECT * FROM cities WHERE city_id = ?
    `, { 
        replacements: [cityId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(city[0])
}

async function validateCountryIdCityQuery(req, res, next) {
    if(req.body.country_id) {
        const countryId = req.body.country_id
        const countries = await db.query(`SELECT country_id FROM countries`, {
            type: QueryTypes.SELECT
        })
        const countriesArray = countries.map(id => id.country_id)
        if(countriesArray.includes(countryId)) next()
        else res.status(404).send("The country does not exist").end()
    } else next()
}

async function validateCityNamePutQuery(req, res, next) {
    const city = req.body.city_name
    const cities = await db.query(`SELECT city_name FROM cities WHERE city_id != ${req.params.cityId}`, {
        type: QueryTypes.SELECT
    })
    const citiesArray = cities.map(city => city.city_name)
    if(req.body.city_name.length >= 1 && req.body.city_name.length <= 64) {
        if(citiesArray.every(name => name !== city)) next()
        else res.status(409).send("The city already exists").end()
    } else res.status(400).send("The city name length is wrong").end()
}

async function modifyCity(cityId, req, res) {
    const city = await db.query(`SELECT * FROM cities WHERE city_id = ?`, {
        replacements: [cityId],
        type: QueryTypes.SELECT 
    })
    const newCity = {
        city_id: cityId,
        country_id: req.body.country_id || city[0].country_id,
        city_name: req.body.city_name || city[0].city_name
    }
    const modified = await db.query(`
    UPDATE cities SET city_name = :city_name, country_id = :country_id 
    WHERE city_id = :city_id
    `, {
        replacements: newCity,
        type: QueryTypes.UPDATE
    })
    res.status(200).json(newCity)
}

async function deleteCity(cityId, req, res) {
    const city = await db.query(`SELECT * FROM cities WHERE city_id = ?`, {
        replacements: [cityId],
        type: QueryTypes.SELECT 
    })

    const citiesIdContacts = await db.query(`SELECT city_id FROM contacts`, { 
        type: QueryTypes.SELECT 
    })
    const idsContacts = citiesIdContacts.map(id => id.city_id)

    const citiesIdCompanies = await db.query(`SELECT city_id FROM companies`, { 
        type: QueryTypes.SELECT 
    })
    const idsCompanies = citiesIdCompanies.map(id => id.city_id)

    if(!idsContacts.includes(cityId) && !idsCompanies.includes(cityId)) {
        const deleted = await db.query(`DELETE FROM cities WHERE city_id = ?`, {
            replacements: [cityId],
            type: QueryTypes.DELETE
        })
        res.status(200).json(city)
    } else res.status(400).send("You cannot delete this city").end()
}

//companies
async function getCompanies(req, res) {
    const companies = await db.query(`
    SELECT company_id, company_name, c.email, c.city_id, city_name, ci.country_id, country_name, 
    co.region_id, region_name, address, telephone
    FROM companies c
    JOIN cities ci ON ci.city_id = c.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    `, { type: QueryTypes.SELECT })
    res.status(200).json(companies)
}

async function validateCompanyNameQuery(req, res, next) {
    const company = req.body.company_name
    const companies = await db.query(`SELECT company_name FROM companies`, {
        type: QueryTypes.SELECT
    })
    const companiesArray = companies.map(company => company.company_name)
    if(req.body.company_name.length >= 1 && req.body.company_name.length <= 64) {
        if(companiesArray.every(name => name !== company)) next()
        else res.status(409).send("The company already exists").end()
    } else res.status(400).send("The company name length is wrong").end()
}

async function createCompany(newCompany, req, res) {
    const inserted = await db.query(`
    INSERT INTO companies (company_name, city_id, address, email, telephone)
    VALUES (:company_name, :city_id, :address, :email, :telephone)
    `, {
        replacements: newCompany,
        type: QueryTypes.INSERT
    })
    const company = await db.query(`
    SELECT company_id, company_name, email, c.city_id, city_name, ci.country_id, country_name, 
    co.region_id, region_name, address, telephone
    FROM companies c
    JOIN cities ci ON ci.city_id = c.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    WHERE company_id = ?
    `, { replacements: [inserted[0]], type: QueryTypes.SELECT })
    
    res.status(201).json(company[0])
}

async function validateCompanyIdQuery(req, res, next) {
    const companyId = +req.params.companyId || req.body.company_id
    const companies = await db.query(`SELECT company_id FROM companies`, {
        type: QueryTypes.SELECT
    })
    const companiesArray = companies.map(id => id.company_id)
    if(companiesArray.includes(companyId)) next()
    else res.status(404).send("The company does not exist").end()
}

async function getCompany(companyId, req, res) {
    const company = await db.query(`
    SELECT company_id, company_name, email, comp.city_id, city_name, ci.country_id, country_name, 
    co.region_id, region_name, address, telephone 
    FROM companies comp
    JOIN cities ci ON ci.city_id = comp.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    WHERE company_id = ?
    `, { 
        replacements: [companyId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(company[0])
}

async function validateCompanyNamePutQuery(req, res, next) {
    if(req.body.company_name){
        const company = req.body.company_name
        const companies = await db.query(`SELECT company_name FROM companies WHERE company_id != ${req.params.companyId}`, {
            type: QueryTypes.SELECT
        })
        const companiesArray = companies.map(company => company.company_name)
        if(req.body.company_name.length >= 1 && req.body.company_name.length <= 64) {
            if(companiesArray.every(name => name !== company)) next()
            else res.status(400).send("The company already exists").end()
        } else res.status(400).send("The company name length is wrong").end()
    } else next()
}

async function validateCityIdPutQuery(req, res, next) { 
    if(req.body.city_id) {
        const cityId = req.body.city_id
        const cities = await db.query(`SELECT city_id FROM cities`, {
            type: QueryTypes.SELECT
        })
        const citiesArray = cities.map(id => id.city_id)
        if(citiesArray.includes(cityId)) next()
        else res.status(404).send("The city does not exist").end()
    } else next()
}

async function modifyCompany(companyId, req, res) {
    const company = await db.query(`SELECT * FROM companies WHERE company_id = ?`, {
        replacements: [companyId],
        type: QueryTypes.SELECT 
    })
    const newcompany = {
        company_id: companyId,
        company_name: req.body.company_name || company[0].company_name,
        email: req.body.email || company[0].email,
        address: req.body.address || company[0].address,
        telephone: req.body.telephone || company[0].telephone,
        city_id: req.body.city_id || company[0].city_id
    }
    const modified = await db.query(`
    UPDATE companies SET company_name = :company_name, city_id = :city_id, address = :address, 
    email = :email, telephone = :telephone
    WHERE company_id = :company_id
    `, {
        replacements: newcompany,
        type: QueryTypes.UPDATE
    })
    const companyRes = await db.query(`
    SELECT company_id, company_name, email, c.city_id, city_name, ci.country_id, country_name, 
    co.region_id, region_name, address, telephone
    FROM companies c
    JOIN cities ci ON ci.city_id = c.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    WHERE company_id = :company_id
    `, { replacements: newcompany, type: QueryTypes.SELECT })
    res.status(200).json(companyRes)
}

async function deleteCompany(companyId, req, res) {
    const companiesId = await db.query(`SELECT company_id FROM contacts`, { 
        type: QueryTypes.SELECT 
    })
    const ids = companiesId.map(id => id.company_id)
    if(!ids.includes(companyId)) {
        const company = await db.query(`
        SELECT company_id, company_name, email, c.city_id, city_name, ci.country_id, country_name, 
        co.region_id, region_name, address, telephone
        FROM companies c
        JOIN cities ci ON ci.city_id = c.city_id
        JOIN countries co ON co.country_id = ci.country_id
        JOIN regions re ON re.region_id = co.region_id
        WHERE company_id = ?
        `, { replacements: [companyId], type: QueryTypes.SELECT })
        const deleted = await db.query(`DELETE FROM companies WHERE company_id = ?`, {
            replacements: [companyId],
            type: QueryTypes.DELETE
        })
        res.status(200).json(company[0])
    } else res.status(400).send("You cannot delete this company").end()
}

//contacts
async function getContacts(req, res) {
    const contacts = await db.query(`
    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,
    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,
    position, interest
    FROM contacts cont 
    JOIN cities ci ON ci.city_id = cont.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    JOIN companies comp ON comp.company_id = cont.company_id
    `, {
        type: QueryTypes.SELECT 
    })
    const channels = await db.query(`
    SELECT * FROM contacts_channels cc 
    INNER JOIN channels ch ON cc.channel_id = ch.channel_id`, { 
        type: QueryTypes.SELECT 
    })
    const contactsAndChannels = contacts.map(contact => 
        Object.assign( {} , contact, { preferred_channels: channels.filter(channel => 
            channel.contact_id === contact.contact_id)}
        ))
    res.status(200).json(contactsAndChannels)
}
        
async function validateEmailContactsQuery(req, res, next) {
    const email = req.body.email
    const emails = await db.query(`SELECT email FROM contacts`, {
        type: QueryTypes.SELECT
    })
    const emailsArray = emails.map(contact => contact.email)
    if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        if(emailsArray.every(e => e != email)) next()
        else res.status(409).send("The email already exists").end()
    } else res.status(400).send("The email is wrong").end()
}
        
async function validateChannelIdQuery(req, res, next) {
    const channelsBody = req.body.preferred_channels
    const idsBody = channelsBody.map(channel => channel.channel_id)
    
    const channelsIdDB = await db.query(`SELECT channel_id FROM channels`, {
        type: QueryTypes.SELECT
    })
    const channelsArray = channelsIdDB.map(id => id.channel_id)
    if(idsBody.every(id => typeof(id) === "number" && channelsArray.includes(id))) {
        if(idsBody.every(different)) next()
        else res.status(400).send("The channelId is wrong").end()
    } else res.status(400).send("The channelId is wrong").end()
}

function different(value, index, list) {
    return list.indexOf(value) === index
}

async function createContact(newContact, req, res) {
    const contactInserted = await db.query(`
    INSERT INTO contacts (firstname, lastname, email, city_id, address, company_id, position, interest)
    VALUES (:firstname, :lastname, :email, :city_id, :address, :company_id, :position, :interest)
    `, {
        replacements: newContact,
        type: QueryTypes.INSERT
    })
    return contactInserted[0]
}

async function addChannelsContacts(newContact, contactId, req, res) {
    req.body.preferred_channels.forEach(async channel => await db.query(`
    INSERT INTO contacts_channels (contact_id, channel_id, user_account, preference)
    VALUES (${contactId}, ${channel.channel_id}, '${channel.user_account}', '${channel.preference}')
    `, {
        replacements: req.body.preferred_channels,
        type: QueryTypes.INSERT
    }))
}

async function getContactInserted(contactId, req, res) {
    const contact = await db.query(`
    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,
    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,
    position, interest
    FROM contacts cont 
    JOIN cities ci ON ci.city_id = cont.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    JOIN companies comp ON comp.company_id = cont.company_id
    WHERE contact_id = ?
    `, {
        replacements: [contactId],
        type: QueryTypes.SELECT 
    })
    return contact
}

async function getChannelsInserted(contactId, req, res) {
    const channels = await db.query(`
    SELECT * FROM contacts_channels cc 
    INNER JOIN channels ch ON cc.channel_id = ch.channel_id
    WHERE contact_id = ?`, { 
        replacements: [contactId],
        type: QueryTypes.SELECT 
    })
    return channels
}

async function validateContactIdQuery(req, res, next) {
    const contactId = +req.params.contactId
    const contacts = await db.query(`SELECT contact_id FROM contacts`, {
        type: QueryTypes.SELECT
    })
    const contactsArray = contacts.map(id => id.contact_id)
    if(contactsArray.includes(contactId)) next()
    else res.status(404).send("The contact does not exist").end()
}

async function getContact(contactId, req, res) {
    const contact = await db.query(`
    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,
    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,
    position, interest
    FROM contacts cont 
    JOIN cities ci ON ci.city_id = cont.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    JOIN companies comp ON comp.company_id = cont.company_id
    WHERE contact_id = ?
    `, {
        replacements: [contactId],
        type: QueryTypes.SELECT 
    })
    const channels = await db.query(`
    SELECT * FROM contacts_channels cc 
    INNER JOIN channels ch ON cc.channel_id = ch.channel_id
    WHERE contact_id = ?`, { 
        replacements: [contactId],
        type: QueryTypes.SELECT 
    })
    const contactAndChannels = Object.assign( {} , contact[0], { preferred_channels: channels})
    res.status(201).json(Object.assign( contactAndChannels ))
}

async function validateEmailContactsPutQuery(req, res, next) {
    if(req.body.email) {
        const email = req.body.email
        const emails = await db.query(`SELECT email FROM contacts WHERE contact_id != ${req.params.contactId}`, {
            type: QueryTypes.SELECT
        })
        const emailsArray = emails.map(contact => contact.email)
        if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
            if(emailsArray.every(e => e != email)) next()
            else res.status(409).send("The email already exists").end()
        } else res.status(400).send("The email is wrong").end()
    } else next()
}

async function validateCompanyIdPutQuery(req, res, next) { 
    if(req.body.company_id) {
        const companyId = req.body.company_id
        const companies = await db.query(`SELECT company_id FROM companies`, {
            type: QueryTypes.SELECT
        })
        const companiesArray = companies.map(id => id.company_id)
        if(companiesArray.includes(companyId)) next()
        else res.status(404).send("The company does not exist").end()
    } else next()
}

async function validateChannelIdPutQuery(req, res, next) {
    if(req.body.preferred_channels) {
        const channelsBody = req.body.preferred_channels
        const idsBody = channelsBody.map(channel => channel.channel_id)
        
        const channelsIdDB = await db.query(`SELECT channel_id FROM channels`, {
            type: QueryTypes.SELECT
        })
        const channelsArray = channelsIdDB.map(id => id.channel_id)
        if(idsBody.every(id => typeof(id) === "number" && channelsArray.includes(id))) {
            if(idsBody.every(different)) next()
            else res.status(400).send("The channelId is wrong").end()
        } else res.status(400).send("The channelId is wrong").end()
    } else next()
}

async function modifyContact(req, res) {
    const contact = await db.query(`SELECT * FROM contacts WHERE contact_id = ?`, {
        replacements: [req.params.contactId],
        type: QueryTypes.SELECT
    })
    
    const modifiedContact = {
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
    }
    const modified = await db.query(`
    UPDATE contacts SET firstname = :firstname, lastname = :lastname, email = :email, city_id = :city_id, 
    address = :address, company_id = :company_id, position = :position, interest = :interest
    WHERE contact_id = :contact_id
    `, {
        replacements: modifiedContact,
        type: QueryTypes.UPDATE
    })
    const deleteChannels = await db.query(`
    DELETE FROM contacts_channels WHERE contact_id = ${req.params.contactId}
    `, { type: QueryTypes.DELETE })

    req.body.preferred_channels.forEach(async chan => {
        await db.query(`
    INSERT INTO contacts_channels (contact_id, channel_id, user_account, preference) 
    VALUES (${req.params.contactId}, ${chan.channel_id}, '${chan.user_account}', '${chan.preference}')
    `, {
        replacements: req.body.preferred_channels,
        type: QueryTypes.INSERT
    })})
    
    const contactRes = await db.query(`
    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,
    co.country_name, co.region_id, re.region_name, cont.company_id, cont.address, comp.company_name,
    position, interest
    FROM contacts cont 
    JOIN cities ci ON ci.city_id = cont.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    JOIN companies comp ON comp.company_id = cont.company_id
    WHERE contact_id = ?
    `, {
        replacements: [req.params.contactId],
        type: QueryTypes.SELECT 
    })
    const channels = await db.query(`
    SELECT * FROM contacts_channels cc 
    INNER JOIN channels ch ON cc.channel_id = ch.channel_id
    WHERE contact_id = ?`, { 
        replacements: [req.params.contactId],
        type: QueryTypes.SELECT 
    })
    const contactAndChannels = Object.assign( {} , contactRes[0], { preferred_channels: channels})
    res.status(201).json(Object.assign( contactAndChannels ))
}

async function deleteContact(contactId, req, res) {
    const contact = await db.query(`SELECT * FROM contacts WHERE contact_id = ?`, {
        replacements: [contactId],
        type: QueryTypes.SELECT 
    })
    const channels = await db.query(`SELECT * FROM contacts_channels WHERE contact_id = ?`, {
        replacements: [contactId],
        type: QueryTypes.SELECT 
    })
    const deleted = await db.query(`DELETE FROM contacts WHERE contact_id = ?`, {
        replacements: [contactId],
        type: QueryTypes.DELETE
    })
    const deletedChannels = await db.query(`DELETE FROM contacts_channels WHERE contact_id = ?`, {
        replacements: [contactId],
        type: QueryTypes.DELETE
    })
    const contactAndChannels = Object.assign( {} , contact[0], { preferred_channels: channels})
    res.status(200).json(Object.assign( contactAndChannels ))
}

async function validateChannelIdAddQuery(req, res, next) {
    const channelId = req.body.channel_id
    const channels = await db.query(`SELECT channel_id FROM channels`, {
        type: QueryTypes.SELECT
    })
    const channelsArray = channels.map(id => id.channel_id)

    const channelsContact = await db.query(`
    SELECT * FROM contacts_channels cc 
    INNER JOIN channels ch ON cc.channel_id = ch.channel_id
    WHERE contact_id = ?`, { 
        replacements: [req.params.contactId],
        type: QueryTypes.SELECT 
    })
    const channelsContactArray = channelsContact.map(cc => cc.channel_id)

    if(channelsArray.includes(channelId)) {
        if(channelsContactArray.includes(channelId)) {
            res.status(400).send("The contact already has that channel").end()
        } else next()
    } else res.status(404).send("The channel does not exist").end()
}

async function validateChannelIdDelQuery(req, res, next) {
    const channelId = +req.params.channelId
    const channelsContact = await db.query(`
    SELECT * FROM contacts_channels cc 
    INNER JOIN channels ch ON cc.channel_id = ch.channel_id
    WHERE contact_id = ?`, { 
        replacements: [+req.params.contactId],
        type: QueryTypes.SELECT 
    })
    const channelsContactArray = channelsContact.map(cc => cc.channel_id)
    if(channelsContactArray.includes(channelId)) next()
    else res.status(404).send("The contact does not have that channel").end()
}

async function addChannel(newContChan, req, res) {
    const inserted = await db.query(`
    INSERT INTO contacts_channels (contact_id, channel_id, user_account, preference)
    VALUES (:contact_id, :channel_id, :user_account, :preference)
    `, {
        replacements: newContChan,
        type: QueryTypes.INSERT
    })
    const channels = await db.query(`
    SELECT contact_id, cc.channel_id, channel_name, user_account, preference
    FROM contacts_channels cc 
    JOIN channels ch ON cc.channel_id = ch.channel_id 
    WHERE contact_id = :contact_id
    `, {
        replacements: newContChan,
        type: QueryTypes.SELECT
    })
    res.status(201).json(channels)
}

async function deleteChannelContact(newContChan, req, res) {
    const deleted = await db.query(`DELETE FROM contacts_channels 
    WHERE contact_id = :contact_id AND channel_id = :channel_id`, {
        replacements: newContChan,
        type: QueryTypes.DELETE
    })
    res.status(200).send("Channel successfully removed").end()
}

async function getResults(req, res) {
    const searchValue = req.body.search_value
    const contacts = await db.query(`
    SELECT contact_id, firstname, lastname, cont.email, cont.city_id, ci.city_name, ci.country_id,
    co.country_name, co.region_id, re.region_name, cont.address, cont.company_id, comp.company_name,
    position, interest
    FROM contacts cont 
    JOIN cities ci ON ci.city_id = cont.city_id
    JOIN countries co ON co.country_id = ci.country_id
    JOIN regions re ON re.region_id = co.region_id
    JOIN companies comp ON comp.company_id = cont.company_id
    WHERE firstname LIKE '%${searchValue}%' OR lastname LIKE '%${searchValue}%' OR cont.email LIKE '%${searchValue}%'
    OR ci.city_name LIKE '${searchValue}%' OR co.country_name LIKE '${searchValue}%' OR re.region_name LIKE '${searchValue}%'
    OR cont.address LIKE '${searchValue}%' OR comp.company_name LIKE '${searchValue}%' OR position LIKE '%${searchValue}%'
    OR interest LIKE '${searchValue}%'
    `, {
        replacements: [searchValue],
        type: QueryTypes.SELECT 
    })
    const channels = await db.query(`
    SELECT * FROM contacts_channels cc 
    INNER JOIN channels ch ON cc.channel_id = ch.channel_id`, { 
        type: QueryTypes.SELECT 
    })
    const contactsAndChannels = contacts.map(contact => 
        Object.assign( {} , contact, { preferred_channels: channels.filter(channel => 
            channel.contact_id === contact.contact_id)}
        ))
    res.status(200).json(contactsAndChannels)
}

//channels
async function getChannels(req, res) {
    const channels = await db.query(`SELECT * FROM channels`, { type: QueryTypes.SELECT })
    res.status(200).json(channels)
}

async function validateChannelNameQuery(req, res, next) {
    const channel = req.body.channel_name
    const channels = await db.query(`SELECT channel_name FROM channels`, {
        type: QueryTypes.SELECT
    })
    const channelsArray = channels.map(channel => channel.channel_name)
    if(req.body.channel_name.length >= 1 && req.body.channel_name.length <= 64) {
        if(channelsArray.every(name => name !== channel)) next()
        else res.status(400).send("The channel already exists").end()
    } else res.status(400).send("The channel name length is wrong").end()
}

async function createChannel(channel_name, req, res) {
    const inserted = await db.query(`
    INSERT INTO channels (channel_name)
    VALUES (:channel_name)
    `, {
        replacements: {channel_name},
        type: QueryTypes.INSERT
    })
    res.status(201).json(Object.assign({}, { channel_id: inserted[0] } , { channel_name }))
}

async function validateChannelIdExQuery(req, res, next) {
    const channelId = +req.params.channelId
    const channels = await db.query(`SELECT channel_id FROM channels`, {
        type: QueryTypes.SELECT
    })
    const channelsArray = channels.map(id => id.channel_id)
    if(channelsArray.includes(channelId)) next ()
    else res.status(404).send("The channel does not exist").end()
}

async function getChannel(channelId, req, res) {
    const channel = await db.query(`
    SELECT * FROM channels WHERE channel_id = ?
    `, { 
        replacements: [channelId],
        type: QueryTypes.SELECT 
    })
    res.status(200).json(channel[0])
}

async function validateChannelNamePutQuery(req, res, next) {
    if(req.body.channel_name) {
        const channel = req.body.channel_name
        const channels = await db.query(`SELECT channel_name FROM channels`, {
            type: QueryTypes.SELECT
        })
        const channelsArray = channels.map(channel => channel.channel_name)
        if(req.body.channel_name.length >= 1 && req.body.channel_name.length <= 64) {
            if(channelsArray.every(name => name !== channel)) next()
            else res.status(400).send("The channel already exists").end()
        } else res.status(400).send("The channel name length is wrong").end()
    } else next()
}

async function modifyChannel(channelId, req, res) {
    const channel = await db.query(`SELECT * FROM channels WHERE channel_id = ?`, {
        replacements: [channelId],
        type: QueryTypes.SELECT 
    })
    const newChannel = {
        channelId: channelId,
        channelName: req.body.channel_name || channel[0].channel_name
    }
    const modified = await db.query(`
    UPDATE channels SET channel_name = :channelName WHERE channel_id = :channelId
    `, {
        replacements:  newChannel,
        type: QueryTypes.UPDATE
    })
    res.status(200).json(newChannel)
}

async function deleteChannel(channelId, req, res) {
    const channel = await db.query(`SELECT * FROM channels WHERE channel_id = ?`, {
        replacements: [channelId],
        type: QueryTypes.SELECT 
    })
    const deleted = await db.query(`DELETE FROM channels WHERE channel_id = ?`, {
        replacements: [channelId],
        type: QueryTypes.DELETE
    })
    res.status(200).json(channel)
}

module.exports = { selectUserLogin, validateLoginQuery, getUsers, createUser, 
    validateEmailQuery, validateUserIdQuery, getUser, modifyUser, validateEmailPutQuery,
    deleteUser, getRegions, createRegion, validateRegionNameQuery, validateRegionIdQuery, 
    getRegion, validateRegionNamePutQuery, modifyRegion, deleteRegion, getCountriesRegion, 
    getCitiesRegion, getRegionsCountriesCities, getCountries, validateCountryNameQuery, 
    createCountry, validateCountryIdQuery, getCountry, validateCountryNamePutQuery, 
    modifyCountry, validateRegionIdCountryQuery, deleteCountry, getCitiesCountry, 
    getCities, validateCityNameQuery, createCity, validateCityIdQuery, getCity, 
    validateCountryIdCityQuery, validateCityNamePutQuery, modifyCity, deleteCity, 
    getCompanies, validateCompanyNameQuery, createCompany, validateCompanyIdQuery, 
    getCompany, validateCompanyNamePutQuery, modifyCompany, validateCityIdPutQuery, 
    deleteCompany, getContacts, validateEmailContactsQuery, validateChannelIdQuery, 
    createContact, addChannelsContacts, getContactInserted, getChannelsInserted, 
    validateContactIdQuery, getContact, validateEmailContactsPutQuery, 
    validateCompanyIdPutQuery, validateChannelIdPutQuery, modifyContact, deleteContact, 
    validateChannelIdAddQuery, addChannel, deleteChannelContact, validateChannelIdDelQuery, 
    getResults, getChannels, validateChannelNameQuery, createChannel, validateChannelIdExQuery, 
    getChannel, validateChannelNamePutQuery, modifyChannel, deleteChannel }