const darkImageContacts = document.getElementById('darkImageContacts')
const cancelDltContBtn = document.getElementById('cancelDltContBtn')
const deleteContactBtn = document.getElementById('deleteContactBtn')
const contactsList = document.getElementById('contactsList')
const sortName = document.getElementById('sortName')
const sortCountry = document.getElementById('sortCountry')
const sortCompany = document.getElementById('sortCompany')
const sortPosition = document.getElementById('sortPosition')
const sortInterest = document.getElementById('sortInterest')
const search = document.getElementById('search')
const searchInput = document.getElementById('searchInput')
const checkboxAll = document.getElementById('checkboxAll')
const contCounter = document.getElementById('contCounter')
const counterAndDelete = document.getElementById('counterAndDelete')
const dltCtcBtn = document.getElementById('dltCtcBtn')
const newCntBtn = document.getElementById('newCntBtn')
const company = document.getElementById('company')
const selectCompany = document.getElementById('selectCompany')
const compLbl = document.getElementById('compLbl')
const regionSelect = document.getElementById('regionSelect')
const regionsList = document.getElementById('regionsList')
const countrySelect = document.getElementById('countrySelect')
const countriesList = document.getElementById('countriesList')
const citySelect = document.getElementById('citySelect')
const citiesList = document.getElementById('citiesList')
const address = document.getElementById('address')
const interestSelect = document.getElementById('interestSelect')
const interestsList = document.getElementById('interestsList')
const telephone = document.getElementById('telephone')
const selectTelephone = document.getElementById('selectTelephone')
const prefTelephoneList = document.getElementById('prefTelephoneList')
const whatsapp = document.getElementById('whatsapp')
const selectWhatsapp = document.getElementById('selectWhatsapp')
const prefWhatsappList = document.getElementById('prefWhatsappList')
const instagram = document.getElementById('instagram')
const selectInstagram = document.getElementById('selectInstagram')
const prefInstagramList = document.getElementById('prefInstagramList')
const facebook = document.getElementById('facebook')
const selectFacebook = document.getElementById('selectFacebook')
const prefFacebookList = document.getElementById('prefFacebookList')
const linkedin = document.getElementById('linkedin')
const selectLinkedin = document.getElementById('selectLinkedin')
const prefLinkedinList = document.getElementById('prefLinkedinList')
const cancelContact = document.getElementById('cancelContact')
const closeNewCtc = document.getElementById('closeNewCtc')
const darkImageAddCtc = document.getElementById('darkImageAddCtc')
const saveContact = document.getElementById('saveContact')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const position = document.getElementById('position')
const email = document.getElementById('email')
const main = document.querySelector('main')
const msgFirst = document.getElementById('msgFirst')
const msgLast = document.getElementById('msgLast')
const msgPos = document.getElementById('msgPos')
const msgEmail = document.getElementById('msgEmail')
const msgAddress = document.getElementById('msgAddress')
const darkImageEditCtc = document.getElementById('darkImageEditCtc')
const closeEditCtc = document.getElementById('closeEditCtc')
const deleteContactEdit = document.getElementById('deleteContactEdit')
const firstnameEdit = document.getElementById('firstnameEdit')
const lastnameEdit = document.getElementById('lastnameEdit')
const positionEdit = document.getElementById('positionEdit')
const emailEdit = document.getElementById('emailEdit')
const addressEdit = document.getElementById('addressEdit')
const companyEdit = document.getElementById('companyEdit')
const regionSelectEdit = document.getElementById('regionSelectEdit')
const countrySelectEdit = document.getElementById('countrySelectEdit')
const citySelectEdit = document.getElementById('citySelectEdit')
const interestSelectEdit = document.getElementById('interestSelectEdit')
const tel = document.getElementById('tel')
const telephoneEdit = document.getElementById('telephoneEdit')
const selectTelephoneEdit = document.getElementById('selectTelephoneEdit')
const wsp = document.getElementById('wsp')
const whatsappEdit = document.getElementById('whatsappEdit')
const selectWhatsappEdit = document.getElementById('selectWhatsappEdit')
const inst = document.getElementById('inst')
const instagramEdit = document.getElementById('instagramEdit')
const selectInstagramEdit = document.getElementById('selectInstagramEdit')
const face = document.getElementById('face')
const facebookEdit = document.getElementById('facebookEdit')
const selectFacebookEdit = document.getElementById('selectFacebookEdit')
const link = document.getElementById('link')
const linkedinEdit = document.getElementById('linkedinEdit')
const selectLinkedinEdit = document.getElementById('selectLinkedinEdit')
const compLblEdit = document.getElementById('compLblEdit')
const selectCompanyEdit = document.getElementById('selectCompanyEdit')
const regionsListEdit = document.getElementById('regionsListEdit')
const countriesListEdit = document.getElementById('countriesListEdit')
const citiesListEdit = document.getElementById('citiesListEdit')
const interestsListEdit = document.getElementById('interestsListEdit')
const prefTelephoneListEdit = document.getElementById('prefTelephoneListEdit')
const prefWhatsappListEdit = document.getElementById('prefWhatsappListEdit')
const prefInstagramListEdit = document.getElementById('prefInstagramListEdit')
const prefFacabookListEdit = document.getElementById('prefFacabookListEdit')
const prefLinkedinListEdit = document.getElementById('prefLinkedinListEdit')
const saveContactEdit = document.getElementById('saveContactEdit')
const msgFirstEdit = document.getElementById('msgFirstEdit')
const msgLastEdit = document.getElementById('msgLastEdit')
const msgPosEdit = document.getElementById('msgPosEdit')
const msgEmailEdit = document.getElementById('msgEmailEdit')
const msgAddressEdit = document.getElementById('msgAddressEdit')

let contIdArray = []
let dataCheckbox = []
let channelsDB = []
let newData = []
let cId = {}

let varSortName = 0
let varSortCountry = 0
let varSortCompany = 0
let varSortPosition = 0
let varSortInterest = 0
let varDelete = 0
let varSelectCompany = 0
let varSelectRegion = 0
let varSelectCountry = 0
let varEnableCountry = 0
let varEnableCity = 0
let varSelectCity = 0
let varSelectInterest = 0
let varPrefTel = 0
let varPrefWsp = 0
let varPrefInst = 0
let varPrefFace = 0
let varPrefLink = 0
let varEnablePrefT = 0
let varEnablePrefW = 0
let varEnablePrefI = 0
let varEnablePrefF = 0
let varEnablePrefL = 0

let varRegId
let varCountId
let varCityId
let varEditContact
let varCompanyId = null

let varCheckboxAll = 'unselected'

//show contacts 
contacts.addEventListener('click', () => {
    getContacts()
    checkboxAll.classList = 'far fa-square'
    counterAndDelete.classList.add('hidden')
    varCheckboxAll = 'unselected'
    contIdArray = []
})

async function getContacts() {
    contactsList.innerHTML = ''
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/contacts', options)
    const data = await response.json()
    dataCheckbox = data
    renderResults(data)
}

function checkAfterSortAndSearch(data) {
    counterAndDelete.classList.add('hidden')
    varCheckboxAll = 'indeterminate'
    checkboxAllFunction(data)
}

checkboxAll.addEventListener('click', () => checkboxAllFunction(dataCheckbox))

function renderResults(data) {
    newData = data
    contactsList.innerHTML = ''
    data.forEach(async element => {
        const info = {
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
            varSelectContact : 0
        }
        
        
        const row = document.createElement('li')
        const checkbox = document.createElement('i')
        const contact = document.createElement('div')
        const country = document.createElement('div')
        const company = document.createElement('div')
        const position = document.createElement('div')
        const interest = document.createElement('div')
        const actions = document.createElement('div')
        const ellipsis = document.createElement('i')
        const trash = document.createElement('i')
        const pen = document.createElement('i')

        contact.innerHTML = `<p>${info.firstname} ${info.lastname}</p><p class="grey-info">${info.email}</p>`
        country.innerHTML = `<p>${info.countryName}</p><p class="grey-info">${info.regionName}</p>`
        company.innerText = info.companyName
        position.innerText = info.position

        row.classList.add('row-contact')
        contact.classList = 'u-item col-item'        
        country.classList = 'u-item col-item'     
        company.classList.add('u-item')        
        position.classList.add('u-item')  
        interest.classList.add('u-item')            
        checkbox.classList = 'far fa-square u-item select'
        actions.classList = 'u-item action'
        ellipsis.classList = 'fas fa-ellipsis-h'
        trash.classList = 'fas fa-trash none'
        pen.classList = 'fas fa-pen none'

        if(+info.interest === 100) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(75 <= +info.interest && +info.interest < 100) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress orange" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(50 <= +info.interest && +info.interest < 75) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress yellow" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(25 <= +info.interest && +info.interest < 50) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress blue" max="100" value=${info.interest}>${info.interest}%</progress>`
        } else if(0 <= +info.interest && +info.interest < 25) {
            interest.innerHTML = `<label class="percentage" for="progressBar">${info.interest}%</label>
                                <progress id="progressBar" class="progress grey" max="100" value=${info.interest}>${info.interest}%</progress>`
        }

        actions.appendChild(ellipsis)
        actions.appendChild(trash)
        actions.appendChild(pen)
        contactsList.appendChild(row)
        row.appendChild(checkbox)
        row.appendChild(contact)
        row.appendChild(country)
        row.appendChild(company)
        row.appendChild(position)
        row.appendChild(interest)
        row.appendChild(actions)

        row.addEventListener('mouseover', () => hoverRow(ellipsis, trash, pen))
        row.addEventListener('mouseout', () => outRow(ellipsis, trash, pen))

        trash.addEventListener('click', () => {
            cId = {
                contactId: element.contact_id
            }
            modalDelete()
        })
        pen.addEventListener('click', () => contactEdition(info))

        checkbox.addEventListener('click', () => selectContact(checkbox, info, data, row))
    })
}

//delete contact
function modalDelete() {
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageContacts.classList.remove('none')
    
    cancelDltContBtn.addEventListener('click', () => {
        body.classList.remove('modal')
        darkImageContacts.classList.add('none')
        darkImageEditCtc.style.visibility = 'visible'
        varDelete = 0
    })
}

async function deleteContact(info) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
        const data = await response.json()
        checkAfterSortAndSearch()
        darkImageEditCtc.style.visibility = 'visible'
        main.classList.remove('height-add-ctc')
        searchInput.value = ''
        getContacts()
    } catch(reason) {
        return reason
    }
}

dltCtcBtn.addEventListener('click', () => {
    varDelete = 1
    modalDelete()
})

function deleteContacts() {
    contIdArray.forEach(async ctc => {
        const info = {
            contactId: ctc
        }
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
            }
        }
        const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
        const data = await response.json()
    })
    searchInput.value = ''
    
    setTimeout(function(){ getContacts() }, 500)
    checkAfterSortAndSearch()
    varDelete = 0
}

//sort columns
sortName.addEventListener('click', () => {
    if(varSortName === 0) {
        sortByName(newData)
    } else if(varSortName === 1) {
        sortByNameReverse(newData)
    }
    checkAfterSortAndSearch(newData) 
    varSortCountry = 0
    varSortCompany = 0
    varSortPosition = 0
    varSortInterest = 0
})

sortCountry.addEventListener('click', () => {
    if(varSortCountry === 0) {
        sortByCountry(newData)
    } else if(varSortCountry === 1) {
        sortByCountryReverse(newData)
    }
    checkAfterSortAndSearch(newData)
    varSortName = 0
    varSortCompany = 0
    varSortPosition = 0
    varSortInterest = 0
})

sortCompany.addEventListener('click', () => {
    if(varSortCompany === 0) {
        sortByCompany(newData)
    } else if(varSortCompany === 1) {
        sortByCompanyReverse(newData)
    }
    checkAfterSortAndSearch(newData)
    varSortName = 0
    varSortCountry = 0
    varSortPosition = 0
    varSortInterest = 0
})

sortPosition.addEventListener('click', () => {
    if(varSortPosition === 0) {
        sortByPosition(newData)
    } else if(varSortPosition === 1) {
        sortByPositionReverse(newData)
    }
    checkAfterSortAndSearch(newData)
    varSortName = 0
    varSortCountry = 0
    varSortCompany = 0
    varSortInterest = 0
})

sortInterest.addEventListener('click', () => {
    if(varSortInterest === 0) {
        sortByInterest(newData)
    } else if(varSortInterest === 1) {
        sortByInterestReverse(newData)
    }
    checkAfterSortAndSearch(newData)
    varSortName = 0
    varSortCountry = 0
    varSortCompany = 0
    varSortPosition = 0
})

function sortByName(data) {
    const sortedNames = data.sort(function (a, b) {
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) { 
            return 1
        }
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedNames)
    varSortName = 1
}

function sortByNameReverse(data) {
    const sortedNames = data.reverse(function (a, b) {
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) { 
            return 1
        }
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedNames)
    varSortName = 0
}

function sortByCountry(data) {
    const sortedCountries = data.sort(function (a, b) {
        if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) { 
            return 1
        }
        if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCountries)
    varSortCountry = 1
}

function sortByCountryReverse(data) {
    const sortedCountries = data.reverse(function (a, b) {
        if (a.country_name.toUpperCase() > b.country_name.toUpperCase()) { 
            return 1
        }
        if (a.country_name.toUpperCase() < b.country_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCountries)
    varSortCountry = 0
}

function sortByCompany(data) {
    const sortedCompanies = data.sort(function (a, b) {
        if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) { 
            return 1
        }
        if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCompanies)
    varSortCompany = 1
}

function sortByCompanyReverse(data) {
    const sortedCompanies = data.reverse(function (a, b) {
        if (a.company_name.toUpperCase() > b.company_name.toUpperCase()) { 
            return 1
        }
        if (a.company_name.toUpperCase() < b.company_name.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedCompanies)
    varSortCompany = 0
}

function sortByPosition(data) {
    const sortedPositions = data.sort(function (a, b) {
        if (a.position.toUpperCase() > b.position.toUpperCase()) { 
            return 1
        }
        if (a.position.toUpperCase() < b.position.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedPositions)
    varSortPosition = 1
}

function sortByPositionReverse(data) {
    const sortedPositions = data.reverse(function (a, b) {
        if (a.position.toUpperCase() > b.position.toUpperCase()) { 
            return 1
        }
        if (a.position.toUpperCase() < b.position.toUpperCase()) {
          return -1
        }
        return 0
    })
    renderResults(sortedPositions)
    varSortPosition = 0
}

function sortByInterest(data) {
    const sortedInterests = data.sort(function (a, b) {
        if (a.interest > b.interest) { 
            return 1
        }
        if (a.interest < b.interest) {
          return -1
        }
        return 0
    })
    renderResults(sortedInterests)
    varSortInterest = 1
}

function sortByInterestReverse(data) {
    const sortedInterests = data.reverse(function (a, b) {
        if (a.interest > b.interest) { 
            return 1
        }
        if (a.interest < b.interest) {
          return -1
        }
        return 0
    })
    renderResults(sortedInterests)
    varSortInterest = 0
}

//search contacts
search.addEventListener('click', () => getSearchResults())

searchInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') getSearchResults()
})

searchInput.addEventListener('keyup', (event) => {
    if(event.key === 'Backspace' && searchInput.value === '') getSearchResults()
})

async function getSearchResults() {
    const search = {
        search_value: searchInput.value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(search),
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`,
            "Content-Type": "application/json"
        }
    }
    const response = await fetch('http://localhost:3000/search', options)
    const data = await response.json()
    renderResults(data)
    dataCheckbox = data
    checkAfterSortAndSearch(data)
}

//select contacts 
function selectContact(checkbox, info, data, row) {
    if(checkbox.classList == 'far fa-square u-item select') {
        check(checkbox, info, data, row)
    } else if(checkbox.classList == 'fas fa-check-square u-item select') { 
        uncheck(checkbox, info, data, row)
    }
}

function check(checkbox, info, data, row) {
    checkbox.classList = 'fas fa-check-square u-item select'
    row.classList.add('selected-row')
    contIdArray = contIdArray.concat(info.contactId)
    contactCounter(contIdArray)
    allContacts(data)
}

function uncheck(checkbox, info, data, row) {
    checkbox.classList = 'far fa-square u-item select'
    row.classList.remove('selected-row')
    const index = contIdArray.indexOf(info.contactId)
    contIdArray.splice(index, 1)
    contactCounter(contIdArray)
    allContacts(data)
}

function contactCounter(contIdArray) {
    contCounter.innerText = `${contIdArray.length} seleccionados`
    if(contIdArray.length !== 0) {
        counterAndDelete.classList.remove('hidden')
    } else if(contIdArray.length === 0) {
        counterAndDelete.classList.add('hidden')
    }
}

function allContacts(data) {
    if(contIdArray.length === data.length) {
        checkboxAll.classList = 'fas fa-check-square'
        varCheckboxAll = 'selected'
    } else if(contIdArray.length !== 0 && contIdArray.length !== data.length) {
        checkboxAll.classList = 'fas fa-minus-square'
        varCheckboxAll = 'indeterminate'
    } else if (contIdArray.length === 0) {
        checkboxAll.classList = 'far fa-square'
        varCheckboxAll = 'unselected'
    }
}

function checkboxAllFunction(data) {
    const allConts = document.querySelectorAll('.select')
    const rowContact = document.querySelectorAll('.row-contact')
    if(varCheckboxAll === 'unselected') {
        contIdArray = []
        checkboxAll.classList = 'fas fa-check-square'
        allConts.forEach(element => {
            element.classList = 'fas fa-check-square u-item select'
        })
        data.forEach(element => {
            contIdArray = contIdArray.concat(element.contact_id)
        })
        rowContact.forEach(row => row.classList.add('selected-row'))
        contactCounter(contIdArray)
        varCheckboxAll = 'selected'
    } else if(varCheckboxAll === 'selected') {
        checkboxAll.classList = 'far fa-square'
        contIdArray = []
        allConts.forEach(element => {
            element.classList = 'far fa-square u-item select'
        })
        rowContact.forEach(row => row.classList.remove('selected-row'))
        contactCounter(contIdArray)
        varCheckboxAll = 'unselected'

    } else if(varCheckboxAll === 'indeterminate') {
        checkboxAll.classList = 'far fa-square'
        contIdArray = []
        allConts.forEach(element => {
            element.classList = 'far fa-square u-item select'
        })
        rowContact.forEach(row => row.classList.remove('selected-row'))
        contactCounter(contIdArray)
        varCheckboxAll = 'unselected'
    }
}

//add contact
newCntBtn.addEventListener('click', () => {
    darkImageAddCtc.classList.remove('none')
    main.classList.add('height-add-ctc')
    const sChannel = 's-channel'
    const chan = 'chan'
    getAllChannels(sChannel, chan)
})

async function getAllChannels(sChannel, chan) {
    channelsDB = []
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/channels', options)
    const data = await response.json()
    data.map(element => {
        channelsDB = channelsDB.concat({channelName: element.channel_name, channelId: element.channel_id})
    })
    const chanArray = document.querySelectorAll(`.${sChannel}`)
    const chansArray = document.querySelectorAll(`.${chan}`)
    chansArray.forEach((el, i) => {
        el.addEventListener('click', () => console.log(channelsDB[i].channelId))
    })
    chanArray.forEach((el, i) => {
        el.innerText = channelsDB[i].channelName
    })
}

//select company
company.addEventListener('click', () => {
    if(varSelectCompany === 0) {
        selectCompany.innerHTML = ''
        getCompanies(selectCompany, company, compLbl)
    } else if(varSelectCompany === 1) {
        selectCompany.classList.add('none')
        selectCompany.innerHTML = ''
        compLbl.style.top = '0px'
        varSelectCompany = 0
    }
})

async function getCompanies(slctCompany, compan, compLb) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/companies', options)
    const data = await response.json()
    renderSelectCompanies(data, slctCompany, compan, compLb)
}

function renderSelectCompanies(data, slctCompany, compan, compLb) {
    varSelectCompany = 1
    slctCompany.classList.remove('none')

    const hcomp = (data.length * 24 + 6) / 2
    compLb.style.top = `${hcomp}px`

    data.forEach(element => {
        const info = {
            companyId: element.company_id,
            companyName: element.company_name,
            cityId: element.city_id,
            cityName: element.city_name,
            countryId: element.country_id,
            countryName: element.country_name,
            regionId: element.region_id,
            regionName: element.region_name
        }
        const compItem = document.createElement('li')
        compItem.innerText = info.companyName
        compItem.classList.add('sug-comp')
        slctCompany.appendChild(compItem)

        compItem.addEventListener('click', () => selectCompanyFunction(info, slctCompany, compan))
    })
}

function selectCompanyFunction(info, slctCompany, compan) {
    slctCompany.classList.add('none')
    slctCompany.innerHTML = ''
    compLbl.style.top = '0px'
    compLblEdit.style.top = '0px'
    compan.innerHTML = `${info.companyName}<i class="fas fa-caret-down"></i>`
    varSelectCompany = 0
    varCompanyId = info.companyId
}

//select region
regionSelect.addEventListener('click', () => {
    if(varSelectRegion === 0) {
        getRegions(regionsList, regionSelect)
    } else if(varSelectRegion === 1) {
        regionsList.classList.add('none')
        regionsList.innerHTML = ''
        varSelectRegion = 0
    }
})

async function getRegions(regList, regSelect) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/regions', options)
    const data = await response.json()
    renderSelectRegions(data, regList, regSelect)
}

function renderSelectRegions(data, regList, regSelect) {
    varSelectRegion = 1
    regList.classList.remove('none')
    data.forEach(element => {
        const info = {
            regionId: element.region_id,
            regionName: element.region_name,
        }
        const regionItem = document.createElement('li')
        regionItem.innerText = info.regionName
        regionItem.classList.add('sug-comp')
        regList.appendChild(regionItem)

        regionItem.addEventListener('click', () => selectRegionFunction(info, regList, regSelect))
    })
}

function selectRegionFunction(info, regList, regSelect) {
    varSelectRegion = 0
    regList.classList.add('none')
    regList.innerHTML = ''
    regSelect.innerHTML = `${info.regionName}<i class="fas fa-caret-down"></i>`

    countrySelect.classList.remove('disable')
    citySelect.classList.add('disable')
    citySelectEdit.classList.add('disable')
    address.disabled = true
    address.classList.add('disable')
    addressEdit.disabled = true
    addressEdit.classList.add('disable')
    countrySelect.innerHTML = `Seleccionar país<i class="fas fa-caret-down"></i>`
    countrySelectEdit.innerHTML = `Seleccionar país<i class="fas fa-caret-down"></i>`
    citySelect.innerHTML = `Seleccionar ciudad<i class="fas fa-caret-down"></i>`
    citySelectEdit.innerHTML = `Seleccionar ciudad<i class="fas fa-caret-down"></i>`
    countriesList.classList.add('none')
    citiesList.classList.add('none')
    countriesListEdit.classList.add('none')
    citiesListEdit.classList.add('none')

    varEnableCity = 0
    varSelectCity = 0
    varSelectCountry = 0
    varEnableCountry = 1
    varRegId = +info.regionId
    varCountId = null
    varCityId = null
}

//select country
countrySelect.addEventListener('click', () => {
    if(varEnableCountry === 1) {
        if(varSelectCountry === 0) {
            getCountries(countriesList, countrySelect)
        } else if(varSelectCountry === 1) {
            countriesList.classList.add('none')
            countriesList.innerHTML = ''
            varSelectCountry = 0
        }
    }
})

async function getCountries(countList, countSelect) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/regions/${varRegId}/countries`, options)
    const data = await response.json()
    renderSelectCountries(data, countList, countSelect)
}

function renderSelectCountries(data, countList, countSelect) {
    varSelectCountry = 1
    countList.innerHTML = ''
    countList.classList.remove('none')
    data.forEach(element => {
        const info = {
            countryId: element.country_id,
            countryName: element.country_name,
        }
        const countryItem = document.createElement('li')
        countryItem.innerText = info.countryName
        countryItem.classList.add('sug-comp')
        countList.appendChild(countryItem)

        countryItem.addEventListener('click', () => selectCountryFunction(info, countList, countSelect))
    })
}

function selectCountryFunction(info, countList, countSelect) {
    varSelectCountry = 0
    countList.classList.add('none')
    countList.innerHTML = ''
    countSelect.innerHTML = `${info.countryName}<i class="fas fa-caret-down"></i>`

    citySelect.classList.remove('disable')
    citySelectEdit.classList.remove('disable')
    address.disabled = true
    addressEdit.disabled = true
    address.classList.add('disable')
    addressEdit.classList.add('disable')
    citySelect.innerHTML = `Seleccionar ciudad<i class="fas fa-caret-down"></i>`
    citySelectEdit.innerHTML = `Seleccionar ciudad<i class="fas fa-caret-down"></i>`
    citiesList.classList.add('none')
    citiesListEdit.classList.add('none')

    varEnableCity = 1
    varCountId = +info.countryId
}

//select city
citySelect.addEventListener('click', () => {
    if(varEnableCity === 1) {
        if(varSelectCity === 0) {
            getCities(citiesList, citySelect)
        } else if(varSelectCity === 1) {
            citiesList.classList.add('none')
            citiesList.innerHTML = ''
            varSelectCity = 0
        }
    }
})

async function getCities(citList, citSelect) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/countries/${varCountId}/cities`, options)
    const data = await response.json()
    renderSelectCities(data, citList, citSelect)
}

function renderSelectCities(data, citList, citSelect) {
    varSelectCity = 1
    citList.innerHTML = ''
    citList.classList.remove('none')
    data.forEach(element => {
        const info = {
            cityId: element.city_id,
            cityName: element.city_name,
        }
        const cityItem = document.createElement('li')
        cityItem.innerText = info.cityName
        cityItem.classList.add('sug-comp')
        citList.appendChild(cityItem)

        cityItem.addEventListener('click', () => selectCityFunction(info, citList, citSelect))
    })
}

function selectCityFunction(info, citList, citSelect) {
    varSelectCity = 0
    citList.classList.add('none')
    citList.innerHTML = ''
    citSelect.innerHTML = `${info.cityName}<i class="fas fa-caret-down"></i>`
    address.disabled = false
    addressEdit.disabled = false
    address.classList.remove('disable')
    addressEdit.classList.remove('disable')
    varCityId = +info.cityId
}

//select interest
interestSelect.addEventListener('click', () => {
    if(varSelectInterest === 0) {
        const intC = 'int'
        showInterest(interestsList, interestSelect, intC)
    } else if(varSelectInterest === 1) {
        interestsList.classList.add('none')
        varSelectInterest = 0
    }
})

function showInterest(intList, intSelect, intC) {
    intList.classList.remove('none')
    varSelectInterest = 1
    const intArray = document.querySelectorAll(`.${intC}`)
    intArray.forEach(element => {
        element.addEventListener('click', () => selectInterestFunction(element.innerText, intList, intSelect))
    })
}

function selectInterestFunction(interest, intList, intSelect) {
    varSelectInterest = 0
    intList.classList.add('none')
    intSelect.innerHTML = `${interest}<i class="fas fa-caret-down"></i>`
}

//contact channels
//telephone
telephone.addEventListener('keyup', () => enablePrefTel(telephone, selectTelephone))

function enablePrefTel(teleph, selectTeleph) {
    if(teleph.value !== '') {
        selectTeleph.classList.remove('disable')
        varEnablePrefT = 1
    } else if(teleph.value === '') {
        selectTeleph.classList.add('disable')
        selectTeleph.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefT = 0
    }
}

selectTelephone.addEventListener('click', () => {
    if(varEnablePrefT === 1) {
        if(varPrefTel === 0) {
            const preference = 'pref-tel'
            showPrefTel(prefTelephoneList, preference, selectTelephone)
        } else if(varPrefTel === 1) {
            prefTelephoneList.classList.add('none')
            varPrefTel = 0
        }
    }
})

function showPrefTel(prefTelList, preference, selectTeleph) {
    prefTelList.classList.remove('none')
    varPrefTel = 1
    const prefArray = document.querySelectorAll(`.${preference}`)
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefTelFunction(element.innerText, prefTelList, selectTeleph))
    })
}

function selectPrefTelFunction(pref, prefTelList, selectTeleph) {
    varPrefTel = 0
    prefTelList.classList.add('none')
    preferenceIcons(pref, selectTeleph)
}

//whatsapp
whatsapp.addEventListener('keyup', () => enablePrefWsp(whatsapp, selectWhatsapp))

function enablePrefWsp(whats, selectWhats) {
    if(whats.value !== '') {
        selectWhats.classList.remove('disable')
        varEnablePrefW = 1
    } else if(whats.value === '') {
        selectWhats.classList.add('disable')
        selectWhats.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefW = 0
    }
}

selectWhatsapp.addEventListener('click', () => {
    if(varEnablePrefW === 1) {
        if(varPrefWsp === 0) {
            const preference = 'pref-wsp'
            showPrefWsp(prefWhatsappList, preference, selectWhatsapp)
        } else if(varPrefWsp === 1) {
            prefWhatsappList.classList.add('none')
            varPrefWsp = 0
        }
    }
})

function showPrefWsp(prefWhatsList, preference, selectWhats) {
    prefWhatsList.classList.remove('none')
    varPrefWsp = 1
    const prefArray = document.querySelectorAll(`.${preference}`)
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefWspFunction(element.innerText, prefWhatsList, selectWhats))
    })
}

function selectPrefWspFunction(pref, prefWhatsList, selectWhats) {
    varPrefWsp = 0
    prefWhatsList.classList.add('none')
    preferenceIcons(pref, selectWhats)
}

//instagram
instagram.addEventListener('keyup', () => enablePrefInst(instagram, selectInstagram))

function enablePrefInst(instag, selectInstag) {
    if(instag.value !== '') {
        selectInstag.classList.remove('disable')
        varEnablePrefI = 1
    } else if(instag.value === '') {
        selectInstag.classList.add('disable')
        selectInstag.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefI = 0
    }
}

selectInstagram.addEventListener('click', () => {
    if(varEnablePrefI === 1) {
        if(varPrefInst === 0) {
            const preference = 'pref-inst'
            showPrefInst(prefInstagramList, preference, selectInstagram)
        } else if(varPrefInst === 1) {
            prefInstagramList.classList.add('none')
            varPrefInst = 0
        }
    }
})

function showPrefInst(prefInstList, preference, selectInst) {
    prefInstList.classList.remove('none')
    varPrefInst = 1
    const prefArray = document.querySelectorAll(`.${preference}`)
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefInstFunction(element.innerText, prefInstList, selectInst))
    })
}

function selectPrefInstFunction(pref, prefInstList, selectInst) {
    varPrefInst = 0
    prefInstList.classList.add('none')
    preferenceIcons(pref, selectInst)
}

//facebook
facebook.addEventListener('keyup', () => enablePrefFace(facebook, selectFacebook))

function enablePrefFace(faceb, selectFaceb) {
    if(faceb.value !== '') {
        selectFaceb.classList.remove('disable')
        varEnablePrefF = 1
    } else if(faceb.value === '') {
        selectFaceb.classList.add('disable')
        selectFaceb.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefF = 0
    }
}

selectFacebook.addEventListener('click', () => {
    if(varEnablePrefF === 1) {
        if(varPrefFace === 0) {
            const preference = 'pref-face'
            showPrefFace(prefFacebookList, preference, selectFacebook)
        } else if(varPrefFace === 1) {
            prefFacebookList.classList.add('none')
            varPrefFace = 0
        }
    }
})

function showPrefFace(prefFaceList, preference, selectFace) {
    prefFaceList.classList.remove('none')
    varPrefFace = 1
    const prefArray = document.querySelectorAll(`.${preference}`)
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefFaceFunction(element.innerText, prefFaceList, selectFace))
    })
}

function selectPrefFaceFunction(pref, prefFaceList, selectFace) {
    varPrefFace = 0
    prefFaceList.classList.add('none')
    preferenceIcons(pref, selectFace)
}

//linkedin
linkedin.addEventListener('keyup', () => enablePrefLink(linkedin, selectLinkedin))

function enablePrefLink(linked, selectLinked) {
    if(linked.value !== '') {
        selectLinked.classList.remove('disable')
        varEnablePrefL = 1
    } else if(linked.value === '') {
        selectLinked.classList.add('disable')
        selectLinked.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
        varEnablePrefL = 0
    }
}

selectLinkedin.addEventListener('click', () => {
    if(varEnablePrefL === 1) {
        if(varPrefLink === 0) {
            const preference = 'pref-link'
            showPrefLink(prefLinkedinList, preference, selectLinkedin)
        } else if(varPrefLink === 1) {
            prefLinkedinList.classList.add('none')
            varPrefLink = 0
        }
    }
})

function showPrefLink(prefLinkList, preference, selectLink) {
    prefLinkList.classList.remove('none')
    varPrefLink = 1
    const prefArray = document.querySelectorAll(`.${preference}`)
    prefArray.forEach(element => {
        element.addEventListener('click', () => selectPrefLinkFunction(element.innerText, prefLinkList, selectLink))
    })
}

function selectPrefLinkFunction(pref, prefLinkList, selectLink) {
    varPrefLink = 0
    prefLinkList.classList.add('none')
    preferenceIcons(pref, selectLink)
}

function preferenceIcons(pref, select) {
    if(pref === 'Sin preferencia') {
        select.innerHTML = `${pref}<i class="fas fa-caret-down"></i>`
    } else if(pref === 'Canal favorito') {
        select.innerHTML = `<i class="fas fa-heart"></i><p>${pref}</p><i class="fas fa-caret-down"></i>`
    } else if (pref === 'No molestar') {
        select.innerHTML = `<i class="fas fa-ban"></i><p>${pref}</p><i class="fas fa-caret-down"></i>`
    }
}

//close window new contact 
cancelContact.addEventListener('click', (event) => closeWindowNewContact(event))
closeNewCtc.addEventListener('click', (event) => closeWindowNewContact(event))

function closeWindowNewContact(event) {
    event.preventDefault()
    searchInput.value = ''
    firstname.value = ''
    lastname.value = ''
    position.value = ''
    email.value = ''
    address.value = ''
    telephone.value = ''
    whatsapp.value = ''
    instagram.value = ''
    facebook.value = ''
    linkedin.value = ''
    compLbl.style.top = '0px'
    compLblEdit.style.top = '0px'
    company.innerHTML = 'Seleccionar compañía<i class="fas fa-caret-down"></i>'
    regionSelect.innerHTML = 'Seleccionar región<i class="fas fa-caret-down"></i>'
    countrySelect.innerHTML = 'Seleccionar país<i class="fas fa-caret-down"></i>'
    citySelect.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>'
    interestSelect.innerHTML = '0%<i class="fas fa-caret-down"></i>'
    selectTelephone.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectWhatsapp.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectInstagram.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectFacebook.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    selectLinkedin.innerHTML = `Sin preferencia<i class="fas fa-caret-down"></i>`
    varCompanyId = null
    varRegId = null
    varCountId = null
    varCityId = null
    
    address.disabled = true
    darkImageAddCtc.classList.add('none')
    main.classList.remove('height-add-ctc')
    address.classList.add('disable')
    citySelect.classList.add('disable')
    countrySelect.classList.add('disable')
    regionsList.classList.add('none')
    countriesList.classList.add('none')
    citiesList.classList.add('none')
    selectTelephone.classList.add('disable')
    selectWhatsapp.classList.add('disable')
    selectInstagram.classList.add('disable')
    selectFacebook.classList.add('disable')
    selectLinkedin.classList.add('disable')
    prefTelephoneList.classList.add('none')
    prefWhatsappList.classList.add('none')
    prefInstagramList.classList.add('none')
    prefFacebookList.classList.add('none')
    prefLinkedinList.classList.add('none')
    selectCompany.classList.add('none')
    interestsList.classList.add('none')
    interestsListEdit.classList.add('none')
    
    firstname.classList.remove('border-wrong')
    msgFirst.classList.remove('visible')
    lastname.classList.remove('border-wrong')
    msgLast.classList.remove('visible')
    position.classList.remove('border-wrong')
    msgPos.classList.remove('visible')
    email.classList.remove('border-wrong')
    msgEmail.classList.remove('visible')
    msgEmail.innerText = 'Error en datos ingresados'
    company.classList.remove('border-wrong')
    regionSelect.classList.remove('border-wrong')
    countrySelect.classList.remove('border-wrong')
    citySelect.classList.remove('border-wrong')
    address.classList.remove('border-wrong')
    msgAddress.classList.remove('visible')

    varSelectRegion = 0
    varSelectCountry = 0
    varEnablePrefT = 0
    varEnablePrefW = 0
    varEnablePrefI = 0
    varEnablePrefF = 0
    varEnablePrefL = 0
    varSelectCompany = 0
    varSelectInterest = 0

    counterAndDelete.classList.add('hidden')
    checkboxAll.classList = 'far fa-square'
    varCheckboxAll = 'unselected'
    contIdArray = []
    varSortName = 0
    varSortCountry = 0
    varSortCompany = 0
    varSortPosition = 0
    varSortInterest = 0
    getContacts()
}

//save contact
saveContact.addEventListener('click', (event) => addContact(event))

async function addContact(event) {
    msgEmail.innerText = 'Error en datos ingresados'
    event.preventDefault()
    const channels = [
        { channel_id: channelsDB[0].channelId, user_account: telephone.value, preference: selectTelephone.innerText },
        { channel_id: channelsDB[1].channelId, user_account: whatsapp.value, preference: selectWhatsapp.innerText },
        { channel_id: channelsDB[2].channelId, user_account: instagram.value, preference: selectInstagram.innerText },
        { channel_id: channelsDB[3].channelId, user_account: facebook.value, preference: selectFacebook.innerText },
        { channel_id: channelsDB[4].channelId, user_account: linkedin.value, preference: selectLinkedin.innerText }
    ]
    let filteredChannels = []
    channels.forEach(chan => {
        if(chan.user_account !== '') {
            filteredChannels = filteredChannels.concat(chan)
        }
    })
    
    const contact = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        city_id: varCityId,
        address: address.value,
        company_id: varCompanyId,
        position: position.value,
        interest: +interestSelect.innerText.slice(0, -1),
        preferred_channels: filteredChannels
    }
    
    validateData(contact, firstname, msgFirst, lastname, msgLast, position, msgPos, email, msgEmail, 
        company, selectCompany, regionSelect, regionsList, countrySelect, countriesList, citySelect, 
        citiesList, address, msgAddress)

    const options = {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch('http://localhost:3000/contacts', options)
        if(response.status === 409) {
            email.classList.add('border-wrong')
            msgEmail.classList.add('visible')
            msgEmail.innerText = 'El email ya existe'
        }
        
        const data = await response.json()
    } catch(reason) {
        return reason
    }
    closeWindowNewContact(event)
    getContacts()
}

function validateData(contact, first, msgFirst, last, msgLast, pos, msgPos, email, msgEmail, comp, 
    selectComp, regSelect, regList, countSelect, countList, citSelect, citList, address, msgAddress) {
    if(contact.firstname === '') {
        first.classList.add('border-wrong')
        msgFirst.classList.add('visible')
        first.addEventListener('keyup', () => {
            if(first.value !== '') {
                first.classList.remove('border-wrong')
                msgFirst.classList.remove('visible')
            }
        })
    }
    if(contact.lastname === '') {
        last.classList.add('border-wrong')
        msgLast.classList.add('visible')
        last.addEventListener('keyup', () => {
            if(last.value !== '') {
                last.classList.remove('border-wrong')
                msgLast.classList.remove('visible')
            }
        })
    }
    if(contact.position === '') {
        pos.classList.add('border-wrong')
        msgPos.classList.add('visible')
        pos.addEventListener('keyup', () => {
            if(pos.value !== '') {
                pos.classList.remove('border-wrong')
                msgPos.classList.remove('visible')
            }
        })
    }
    if(contact.email === '' || !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value))) {
        email.classList.add('border-wrong')
        msgEmail.classList.add('visible')
        email.addEventListener('keyup', () => {
            if(email.value !== '' && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value))) {
                email.classList.remove('border-wrong')
                msgEmail.classList.remove('visible')
            }
        })
    }
    if(contact.company_id === null) {
        comp.classList.add('border-wrong')
        selectComp.addEventListener('click', () => {
            if(comp.innerText !== 'Seleccionar compañía') {
                comp.classList.remove('border-wrong')
            }
        })
    }
    if(regSelect.innerText === 'Seleccionar región') {
        regSelect.classList.add('border-wrong')
        regList.addEventListener('click', () => {
            if(regSelect.innerText !== 'Seleccionar región') {
                regSelect.classList.remove('border-wrong')
            }
        })
    }
    if(countSelect.innerText === 'Seleccionar país') {
        countSelect.classList.add('border-wrong')
        countList.addEventListener('click', () => {
            if(countSelect.innerText !== 'Seleccionar país') {
                countSelect.classList.remove('border-wrong')
            }
        })
    }
    if(contact.city_id === undefined || contact.city_id === null) {
        citSelect.classList.add('border-wrong')
        citList.addEventListener('click', () => {
            if(citSelect.innerText !== 'Seleccionar ciudad') {
                citSelect.classList.remove('border-wrong')
            }
        })
    }
    if(contact.address === '') {
        address.classList.add('border-wrong')
        msgAddress.classList.add('visible')
        address.addEventListener('keyup', () => {
            if(address.value !== '') {
                address.classList.remove('border-wrong')
                msgAddress.classList.remove('visible')
            }
        })
    }
}

//edit contact
async function contactEdition(info) {
    varRegId = +info.regionId
    varCountId = +info.countryId
    varCityId = +info.cityId
    varCompanyId = +info.companyId
    varEditContact = info.contactId
    varEnableCity = 1
    if(info.cityName !== '') {
        addressEdit.classList.remove('disable')
        addressEdit.disabled = false
    }
    darkImageEditCtc.classList.remove('none')
    main.classList.add('height-add-ctc')
    const sChannel = 's-channel-edit'
    const chan = 'chan-edit'
    getAllChannels(sChannel, chan)
    const options = {                   
        method: 'GET',  
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/contacts/${info.contactId}`, options)
    const data = await response.json()
    loadData(data)
    enablePrefTel(telephoneEdit, selectTelephoneEdit)
    enablePrefWsp(whatsappEdit, selectWhatsappEdit)
    enablePrefInst(instagramEdit, selectInstagramEdit)
    enablePrefFace(facebookEdit, selectFacebookEdit)
    enablePrefLink(linkedinEdit, selectLinkedinEdit)
}

function loadData(data) {
    firstnameEdit.value = data.firstname
    lastnameEdit.value = data.lastname
    positionEdit.value = data.position
    emailEdit.value = data.email
    addressEdit.value = data.address
    interestSelectEdit.innerHTML = `${data.interest}%<i class="fas fa-caret-down"></i>`
    if(data.company_name === '') {
        companyEdit.innerHTML = 'Seleccionar compañía<i class="fas fa-caret-down"></i>'
    } else {
        companyEdit.innerHTML = `${data.company_name}<i class="fas fa-caret-down"></i>`
    }
    if(data.region_name === '') {
        regionSelectEdit.innerHTML = 'Seleccionar región<i class="fas fa-caret-down"></i>'
    } else {
        regionSelectEdit.innerHTML = `${data.region_name}<i class="fas fa-caret-down"></i>`
    }
    if(data.country_name === '') {
        countrySelectEdit.innerHTML = 'Seleccionar país<i class="fas fa-caret-down"></i>'
    } else {
        countrySelectEdit.innerHTML = `${data.country_name}<i class="fas fa-caret-down"></i>`
    }
    if(data.city_name === '') {
        citySelectEdit.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>'
    } else {
        citySelectEdit.innerHTML = `${data.city_name}<i class="fas fa-caret-down"></i>`
    }
    data.preferred_channels.forEach((chan, i) => {
        if(chan.channel_name === tel.innerText) {
            telephoneEdit.value = data.preferred_channels[i].user_account
            preferenceIcons(data.preferred_channels[i].preference, selectTelephoneEdit)
        }
    })
    data.preferred_channels.forEach((chan, i) => {
        if(chan.channel_name === wsp.innerText) {
            whatsappEdit.value = data.preferred_channels[i].user_account
            preferenceIcons(data.preferred_channels[i].preference, selectWhatsappEdit)
        }
    })
    data.preferred_channels.forEach((chan, i) => {
        if(chan.channel_name === inst.innerText) {
            instagramEdit.value = data.preferred_channels[i].user_account
            preferenceIcons(data.preferred_channels[i].preference, selectInstagramEdit)
        }
    })
    data.preferred_channels.forEach((chan, i) => {
        if(chan.channel_name === face.innerText) {
            facebookEdit.value = data.preferred_channels[i].user_account
            preferenceIcons(data.preferred_channels[i].preference, selectFacebookEdit)
        }
    })
    data.preferred_channels.forEach((chan, i) => {
        if(chan.channel_name === link.innerText) {
            linkedinEdit.value = data.preferred_channels[i].user_account
            preferenceIcons(data.preferred_channels[i].preference, selectLinkedinEdit)
        }
    })
}

//close window edit contact 
closeEditCtc.addEventListener('click', (event) => closeWindowEditContact(event))

function closeWindowEditContact(event) {
    event.preventDefault()
    darkImageEditCtc.classList.add('none')
    selectCompanyEdit.classList.add('none')
    regionsListEdit.classList.add('none')
    countriesList.classList.add('none')
    countrySelect.classList.add('disable')
    citySelect.classList.add('disable')
    interestsList.classList.add('none')
    interestsListEdit.classList.add('none')

    main.classList.remove('height-add-ctc')
    firstnameEdit.classList.remove('border-wrong')
    msgFirstEdit.classList.remove('visible')
    lastnameEdit.classList.remove('border-wrong')
    msgLastEdit.classList.remove('visible')
    positionEdit.classList.remove('border-wrong')
    msgPosEdit.classList.remove('visible')
    emailEdit.classList.remove('border-wrong')
    msgEmailEdit.classList.remove('visible')
    msgEmailEdit.innerText = 'Error en datos ingresados'
    companyEdit.classList.remove('border-wrong')
    regionSelectEdit.classList.remove('border-wrong')
    countrySelectEdit.classList.remove('border-wrong')
    citySelectEdit.classList.remove('border-wrong')
    addressEdit.classList.remove('border-wrong')
    msgAddressEdit.classList.remove('visible')
    citySelectEdit.classList.remove('disable')

    searchInput.value = ''
    telephoneEdit.value = ''
    whatsappEdit.value = ''
    instagramEdit.value = ''
    facebookEdit.value = ''
    linkedinEdit.value = ''
    compLbl.style.top = '0px'
    compLblEdit.style.top = '0px'
    varSelectCompany = 0
    varSelectRegion = 0
    varSelectCity = 0
    varSelectInterest = 0
    varEnableCountry = 0
    varEnableCity = 0
    varEnablePrefT = 0
    varEnablePrefW = 0
    varEnablePrefI = 0
    varEnablePrefF = 0
    varEnablePrefL = 0
    varSortName = 0
    varSortCountry = 0
    varSortCompany = 0
    varSortPosition = 0
    varSortInterest = 0

    varCompanyId = null
    varRegId = null
    varCountId = null
    varCityId = null

    counterAndDelete.classList.add('hidden')
    checkboxAll.classList = 'far fa-square'
    varCheckboxAll = 'unselected'
    contIdArray = []
    getContacts()
}

//select company
companyEdit.addEventListener('click', () => {
    if(varSelectCompany === 0) {
        selectCompanyEdit.innerHTML = ''
        getCompanies(selectCompanyEdit, companyEdit, compLblEdit)
    } else if(varSelectCompany === 1) {
        selectCompanyEdit.classList.add('none')
        selectCompanyEdit.innerHTML = ''
        compLblEdit.style.top = '0px'
        varSelectCompany = 0
    }
})

//select region
regionSelectEdit.addEventListener('click', () => {
    if(varSelectRegion === 0) {
        regionsListEdit.innerHTML = ''
        getRegions(regionsListEdit, regionSelectEdit)
    } else if(varSelectRegion === 1) {
        regionsListEdit.classList.add('none')
        regionsListEdit.innerHTML = ''
        varSelectRegion = 0
    }
})

//select country
countrySelectEdit.addEventListener('click', () => {
    if(varSelectCountry === 0) {
        countriesListEdit.innerHTML = ''
        getCountries(countriesListEdit, countrySelectEdit)
    } else if(varSelectCountry === 1) {
        countriesListEdit.classList.add('none')
        countriesListEdit.innerHTML = ''
        varSelectCountry = 0
    }
})

//select city
citySelectEdit.addEventListener('click', () => {
    if(varEnableCity === 1) {
        if(varSelectCity === 0) {
            citiesListEdit.innerHTML = ''
            getCities(citiesListEdit, citySelectEdit)
        } else if(varSelectCity === 1) {
            citiesListEdit.classList.add('none')
            citiesListEdit.innerHTML = ''
            varSelectCity = 0
        }
    }
})

//select interest
interestSelectEdit.addEventListener('click', () => {
    if(varSelectInterest === 0) {
        const intC = 'int-edit'
        showInterest(interestsListEdit, interestSelectEdit, intC)
    } else if(varSelectInterest === 1) {
        interestsListEdit.classList.add('none')
        varSelectInterest = 0
    }
})

//select preferences
//telephone
telephoneEdit.addEventListener('keyup', () => enablePrefTel(telephoneEdit, selectTelephoneEdit))

selectTelephoneEdit.addEventListener('click', () => {
    if(varEnablePrefT === 1) {
        if(varPrefTel === 0) {
            const preference = 'pref-tel-edit'
            showPrefTel(prefTelephoneListEdit, preference, selectTelephoneEdit)
        } else if(varPrefTel === 1) {
            prefTelephoneListEdit.classList.add('none')
            varPrefTel = 0
        }
    }
})

//whatsapp
whatsappEdit.addEventListener('keyup', () => enablePrefWsp(whatsappEdit, selectWhatsappEdit))

selectWhatsappEdit.addEventListener('click', () => {
    if(varEnablePrefW === 1) {
        if(varPrefWsp === 0) {
            const preference = 'pref-wsp-edit'
            showPrefWsp(prefWhatsappListEdit, preference, selectWhatsappEdit)
        } else if(varPrefWsp === 1) {
            prefWhatsappListEdit.classList.add('none')
            varPrefWsp = 0
        }
    }
})

//instagram
instagramEdit.addEventListener('keyup', () => enablePrefInst(instagramEdit, selectInstagramEdit))

selectInstagramEdit.addEventListener('click', () => {
    if(varEnablePrefI === 1) {
        if(varPrefInst === 0) {
            const preference = 'pref-inst-edit'
            showPrefInst(prefInstagramListEdit, preference, selectInstagramEdit)
        } else if(varPrefInst === 1) {
            prefInstagramListEdit.classList.add('none')
            varPrefInst = 0
        }
    }
})

//facebook
facebookEdit.addEventListener('keyup', () => enablePrefFace(facebookEdit, selectFacebookEdit))

selectFacebookEdit.addEventListener('click', () => {
    if(varEnablePrefF === 1) {
        if(varPrefFace === 0) {
            const preference = 'pref-face-edit'
            showPrefFace(prefFacebookListEdit, preference, selectFacebookEdit)
        } else if(varPrefFace === 1) {
            prefFacebookListEdit.classList.add('none')
            varPrefFace = 0
        }
    }
})

//linkedin
linkedinEdit.addEventListener('keyup', () => enablePrefLink(linkedinEdit, selectLinkedinEdit))

selectLinkedinEdit.addEventListener('click', () => {
    if(varEnablePrefL === 1) {
        if(varPrefLink === 0) {
            const preference = 'pref-link-edit'
            showPrefLink(prefLinkedinListEdit, preference, selectLinkedinEdit)
        } else if(varPrefLink === 1) {
            prefLinkedinListEdit.classList.add('none')
            varPrefLink = 0
        }
    }
})

//save edited contact
saveContactEdit.addEventListener('click', (event) => editContact(event))

async function editContact(event) {
    event.preventDefault()  
    const channels = [
        { channel_id: channelsDB[0].channelId, user_account: telephoneEdit.value, preference: selectTelephoneEdit.innerText },
        { channel_id: channelsDB[1].channelId, user_account: whatsappEdit.value, preference: selectWhatsappEdit.innerText },
        { channel_id: channelsDB[2].channelId, user_account: instagramEdit.value, preference: selectInstagramEdit.innerText },
        { channel_id: channelsDB[3].channelId, user_account: facebookEdit.value, preference: selectFacebookEdit.innerText },
        { channel_id: channelsDB[4].channelId, user_account: linkedinEdit.value, preference: selectLinkedinEdit.innerText }
    ]
    let filteredChannels = []
    channels.forEach(chan => {
        if(chan.user_account !== '') {
            filteredChannels = filteredChannels.concat(chan)
        }
    })
    const modifiedContact = {
        firstname: firstnameEdit.value,
        lastname: lastnameEdit.value,
        email: emailEdit.value,
        city_id: varCityId,
        address: addressEdit.value,
        company_id: varCompanyId,
        position: positionEdit.value,
        interest: +interestSelectEdit.innerText.slice(0, -1),
        preferred_channels: filteredChannels
    }
    validateData(modifiedContact, firstnameEdit, msgFirstEdit, lastnameEdit, msgLastEdit, positionEdit, 
        msgPosEdit, emailEdit, msgEmailEdit, companyEdit, selectCompanyEdit, regionSelectEdit, regionsListEdit,
        countrySelectEdit, countriesListEdit, citySelectEdit, citiesListEdit, addressEdit, msgAddressEdit)
    const options = {                   
        method: 'PUT',  
        body: JSON.stringify(modifiedContact),
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`,
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`http://localhost:3000/contacts/${varEditContact}`, options)
    if(response.status === 409) {
        emailEdit.classList.add('border-wrong')
        msgEmailEdit.classList.add('visible')
        msgEmailEdit.innerText = 'El email ya existe'
    }
    const data = await response.json()
    closeWindowEditContact(event)
}

//delete contact (contact edition)
deleteContactEdit.addEventListener('click', (event) => {
    event.preventDefault()
    cId = {
        contactId: varEditContact
    }
    darkImageEditCtc.style.visibility = 'hidden'
    modalDelete()
})

deleteContactBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageContacts.classList.add('none')
    darkImageEditCtc.classList.add('none')
    if(varDelete === 0) {
        deleteContact(cId)
    } else if (varDelete === 1) {
        deleteContacts()
    }
})