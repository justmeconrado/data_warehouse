const express = require('express')
const app = express()
const helmet = require('helmet')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const { selectUserLogin, getUsers, createUser, getUser, modifyUser, deleteUser, getRegions,
    createRegion, getRegion, modifyRegion, deleteRegion, getCountriesRegion, getCitiesRegion, 
    getRegionsCountriesCities, getCountries, createCountry, getCountry, modifyCountry,
    deleteCountry, getCitiesCountry, getCities, createCity, getCity, modifyCity, deleteCity, 
    getCompanies, createCompany, getCompany, modifyCompany, deleteCompany, getContacts, 
    createContact, addChannelsContacts, getContactInserted, getChannelsInserted, getContact, 
    modifyContact, deleteContact, addChannel, deleteChannelContact, getResults, getChannels, 
    createChannel, getChannel, modifyChannel, deleteChannel } = require('./queries.js')

const { validateLogin, verifyToken, filterAdmin, validateFirstname, validateLastname, 
    validateEmail, validatePassword, validateUser, validateUserId, validateFirstnamePut,
    validateLastnamePut, validateEmailPut, validatePerfil, validatePasswordPut, 
    validateRegionName, validateRegionId, validateRegionNamePut, validateCountryName, 
    validateCountryId, validateCountryNamePut, validateRegionIdCountry, validateCityName, 
    validateCityId, validateCountryIdCity, validateCityNamePut, validateCompanyName, 
    validateAddress, validateCompanyId, validateCompanyNamePut, validateCityIdPut, 
    validateAddressPut, validateEmailContacts, validatePosition, validateInterest, 
    validateChannelId, validateContactId, validateUserAccount, validatePreference, 
    validateEmailContactsPut, validateCompanyIdPut, validatePositionPut, validateInterestPut, 
    validateChannelIdPut, validateChannelIdAdd, validateChannelIdDel, validateChannelName, 
    validateChannelIdEx, validateChannelNamePut, validateEmailCompanies,
    validateTelephone } = require('./functions.js')

app.use(express.json())
app.use(helmet())

app.listen(process.env.PORT || 3000, () => console.log('server started'))

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(cors())

//login
app.post('/users/login', validateLogin, async (req, res) => {
    const { username, password } = req.body
    selectUserLogin(username, password, req, res)
})

app.use(verifyToken)

//users
app.get('/users', filterAdmin, async (req, res) => {
    getUsers(req, res)
})

app.post('/users/register', filterAdmin, validateFirstname,  validateLastname, validateEmail, 
validatePassword, async (req, res) => {
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        perfil: req.body.perfil,
        password: req.body.password
    }
    createUser(newUser, req, res)
})

app.get('/users/:userId', validateUser, validateUserId, async (req, res) => {
    const userId = +req.params.userId
    getUser(userId, req, res)
}) 

app.put('/users/:userId', validateUser, validateUserId, validateFirstnamePut, 
validateLastnamePut, validateEmailPut, validatePerfil, validatePasswordPut, async (req, res) => {
    const userId = +req.params.userId
    modifyUser(userId, req, res)
})

app.delete('/users/:userId', validateUser, validateUserId, async (req, res) => {
    const userId = +req.params.userId
    deleteUser(userId, req, res)
})

//regions
app.get('/regions', async (req, res) => {    
    getRegions(req, res)                                 
})

app.post('/regions', validateRegionName,  async (req, res) => {
    const newRegion = req.body.region_name
    createRegion(newRegion, req, res)
})

app.get('/regions/:regionId', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    getRegion(regionId, req, res)
}) 

app.put('/regions/:regionId', validateRegionId, validateRegionNamePut, async (req, res) => {
    const regionId = +req.params.regionId
    modifyRegion(regionId, req, res)
})

app.delete('/regions/:regionId', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    deleteRegion(regionId, req, res)
})

app.get('/regions/:regionId/countries', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    getCountriesRegion(regionId, req, res)
}) 

app.get('/regions/:regionId/cities', validateRegionId, async (req, res) => {
    const regionId = +req.params.regionId
    getCitiesRegion(regionId, req, res)
}) 

app.get('/regionsCountriesCities', async (req, res) => {
    getRegionsCountriesCities(req, res)
}) 

//countries
app.get('/countries', async (req, res) => {    
    getCountries(req, res)                                 
})

app.post('/countries', validateCountryName, validateRegionId, async (req, res) => {
    const { region_id, country_name } = req.body
    createCountry(country_name, region_id, req, res)
})

app.get('/countries/:countryId', validateCountryId, async (req, res) => {
    const countryId = +req.params.countryId
    getCountry(countryId, req, res)
}) 

app.put('/countries/:countryId', validateCountryId, validateRegionIdCountry, 
validateCountryNamePut, async (req, res) => {
    const countryId = +req.params.countryId
    modifyCountry(countryId, req, res)
})

app.delete('/countries/:countryId', validateCountryId, async (req, res) => {
    const countryId = +req.params.countryId
    deleteCountry(countryId, req, res)
})

app.get('/countries/:countryId/cities', validateCountryId, async (req, res) => {
    const countryId = +req.params.countryId
    getCitiesCountry(countryId, req, res)
}) 

//cities 
app.get('/cities', async (req, res) => {    
    getCities(req, res)                                 
})

app.post('/cities', validateCityName, validateCountryId, async (req, res) => {
    const { country_id, city_name } = req.body
    createCity(country_id, city_name, req, res)
})

app.get('/cities/:cityId', validateCityId, async (req, res) => {
    const cityId = +req.params.cityId
    getCity(cityId, req, res)
}) 

app.put('/cities/:cityId', validateCityId, validateCountryIdCity, 
validateCityNamePut, async (req, res) => {
    const cityId = +req.params.cityId
    modifyCity(cityId, req, res)
})

app.delete('/cities/:cityId', validateCityId, async (req, res) => {
    const cityId = +req.params.cityId
    deleteCity(cityId, req, res)
})

//companies
app.get('/companies', async (req, res) => {    
    getCompanies(req, res)                                 
})

app.post('/companies', validateCompanyName, validateEmailCompanies, validateAddress, validateTelephone, 
validateCityId, async (req, res) => {
    const newCompany = {
        company_name: req.body.company_name, 
        city_id: req.body.city_id, 
        address: req.body.address,
        email: req.body.email,
        telephone: req.body.telephone
    }
    createCompany(newCompany, req, res)
})

app.get('/companies/:companyId', validateCompanyId, async (req, res) => {
    const companyId = +req.params.companyId
    getCompany(companyId, req, res)
}) 

app.put('/companies/:companyId', validateCompanyId, validateCompanyNamePut, validateEmailCompanies, 
validateAddressPut, validateTelephone, validateCityIdPut,  async (req, res) => {
    const companyId = +req.params.companyId
    modifyCompany(companyId, req, res)
})

app.delete('/companies/:companyId', validateCompanyId, async (req, res) => {
    const companyId = +req.params.companyId
    deleteCompany(companyId, req, res)
})

//contacts
app.get('/contacts', async (req, res) => {    
    getContacts(req, res)                                 
})

app.post('/contacts', validateFirstname, validateLastname, validatePosition, validateEmailContacts, 
validateCompanyId, validateCityId, validateAddress, validateInterest, /* validateChannelId, 
validateUserAccount, validatePreference, */ async (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        city_id: req.body.city_id,
        address: req.body.address,
        company_id: req.body.company_id,
        position: req.body.position,
        interest: req.body.interest,
        preferred_channels: req.body.preferred_channels
    }
    const contactId = await createContact(newContact, req, res)
    const insertChannels = await addChannelsContacts(newContact, contactId, req, res)
    const insertedContact = await getContactInserted(contactId, req, res)
    const insertedChannels = await getChannelsInserted(contactId, req, res)
    
    const contactAndChannels = Object.assign( {} , insertedContact[0], { preferred_channels: insertedChannels})
    res.status(201).json(contactAndChannels)
})

app.get('/contacts/:contactId', validateContactId, async (req, res) => {    
    const contactId = req.params.contactId
    getContact(contactId, req, res)                                 
})

app.put('/contacts/:contactId', validateContactId, validateFirstnamePut, validateLastnamePut,
validateEmailContactsPut, validateCityIdPut, validateAddressPut,validateCompanyIdPut, validatePositionPut, 
validateInterestPut, validateChannelIdPut, async (req, res) => {
    modifyContact(req, res)
})

app.delete('/contacts/:contactId', validateContactId, async (req, res) => {
    const contactId = +req.params.contactId
    deleteContact(contactId, req, res)
})

app.post('/contacts/:contactId/channels', validateContactId, validateChannelIdAdd, async (req, res) => {
    const newContChan = {
        contact_id: +req.params.contactId,
        channel_id: req.body.channel_id,
        user_account: req.body.user_account,
        preference: req.body.preference
    }
    addChannel(newContChan, req, res)
})

app.delete('/contacts/:contactId/channels/:channelId', validateContactId, validateChannelIdDel, 
async (req, res) => {
    const newContChan = {
        contact_id: +req.params.contactId,
        channel_id: +req.params.channelId
    }
    deleteChannelContact(newContChan, req, res)
})

app.post('/search', async (req, res) => {    
    getResults(req, res)                                 
})

//channels
app.get('/channels', async (req, res) => {    
    getChannels(req, res)                                 
})

app.post('/channels', validateChannelName,  async (req, res) => {
    const channel_name = req.body.channel_name
    createChannel(channel_name, req, res)
})

app.get('/channels/:channelId', validateChannelIdEx, async (req, res) => {
    const channelId = +req.params.channelId
    getChannel(channelId, req, res)
}) 

app.put('/channels/:channelId', validateChannelIdEx, validateChannelNamePut, async (req, res) => {
    const channelId = +req.params.channelId
    modifyChannel(channelId, req, res)
})

app.delete('/channels/:channelId', validateChannelIdEx, async (req, res) => {
    const channelId = +req.params.channelId
    deleteChannel(channelId, req, res)
})