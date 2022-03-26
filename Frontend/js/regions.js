const regionList = document.getElementById('regionList')
const addRegBtn = document.getElementById('addRegBtn')
const locContainer = document.getElementById('locContainer')
const body = document.querySelector('body')
const darkImage = document.getElementById('darkImage')
const newRegion = document.getElementById('newRegion')
const saveRegion = document.getElementById('saveRegion')
const cancelRegion = document.getElementById('cancelRegion')
const newRegForm = document.getElementById('newRegForm')
const msgContainer = document.getElementById('msgContainer')
const closeNewRegion = document.getElementById('closeNewRegion')
const msgNReg = document.getElementById('msgNReg')
const darkImageRegions = document.getElementById('darkImageRegions')
const cancelDltRegBtn = document.getElementById('cancelDltRegBtn')
const deleteRegBtn = document.getElementById('deleteRegBtn')
const darkImageEditReg = document.getElementById('darkImageEditReg')
const regionEdit = document.getElementById('regionEdit')
const closeEditRegion = document.getElementById('closeEditRegion')
const deleteRegEdit = document.getElementById('deleteRegEdit')
const msgEReg = document.getElementById('msgEReg')
const darkImageNewCountry = document.getElementById('darkImageNewCountry')
const closeNewCountry = document.getElementById('closeNewCountry')
const cancelCountry = document.getElementById('cancelCountry')
const newCountry = document.getElementById('newCountry')
const msgNCount = document.getElementById('msgNCount')
const saveCountry = document.getElementById('saveCountry')
const darkImageCountries = document.getElementById('darkImageCountries')
const cancelDltCountBtn = document.getElementById('cancelDltCountBtn')
const darkImageEditCount = document.getElementById('darkImageEditCount')
const deleteCountBtn = document.getElementById('deleteCountBtn')
const closeEditCountry = document.getElementById('closeEditCountry')
const countryEdit = document.getElementById('countryEdit')
const msgECount = document.getElementById('msgECount')
const deleteCountEdit = document.getElementById('deleteCountEdit')
const saveRegionEdit = document.getElementById('saveRegionEdit')
const saveCountryEdit = document.getElementById('saveCountryEdit')
const darkImageNewCity = document.getElementById('darkImageNewCity')
const closeNewCity = document.getElementById('closeNewCity')
const cancelCity = document.getElementById('cancelCity')
const newCity = document.getElementById('newCity')
const msgNCit = document.getElementById('msgNCit')
const saveCity = document.getElementById('saveCity')
const darkImageCities = document.getElementById('darkImageCities')
const cancelDltCitBtn = document.getElementById('cancelDltCitBtn')
const darkImageEditCity = document.getElementById('darkImageEditCity')
const deleteCitBtn = document.getElementById('deleteCitBtn')
const cityEdit = document.getElementById('cityEdit')
const closeEditCity = document.getElementById('closeEditCity')
const msgECit = document.getElementById('msgECit')
const saveCityEdit = document.getElementById('saveCityEdit')

let varRegionId = null
let varCountryId = null
let varCitId = null
let varEditRegion = 0
let varEditCountry = 0
let varEditCity = 0

//show regions, countries and cities
async function getLocations() {
    regionList.innerHTML = ''
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/regionsCountriesCities', options)
    const data = await response.json()
    
    data.forEach(reg => {
        const region = document.createElement('li')
        const countryList = document.createElement('ul')
        const btnEditRegion = document.createElement('button')
        const btnDeleteRegion = document.createElement('button')
        const btnAddCountry = document.createElement('button')
        const regionAndButtons = document.createElement('div')
        const regContainer = document.createElement('div')
        const regTitle = document.createElement('h4')

        regTitle.innerText = reg.region_name
        btnEditRegion.innerText = 'Editar'
        btnDeleteRegion.innerText = 'Eliminar'
        btnAddCountry.innerText = 'Agregar país'

        region.classList.add('l-item')
        btnEditRegion.classList = 'btn edit'
        btnDeleteRegion.classList = 'btn delete'
        btnAddCountry.classList = 'btn add'
        regContainer.classList.add('reg-container')
        regTitle.classList.add('reg-title')
        regionAndButtons.classList.add('reg-btn')

        regionAndButtons.appendChild(regTitle)
        regionAndButtons.appendChild(btnEditRegion)
        regionAndButtons.appendChild(btnDeleteRegion)
        regContainer.appendChild(regionAndButtons)
        regContainer.appendChild(btnAddCountry)
        region.appendChild(regContainer)
        region.appendChild(countryList)
        regionList.appendChild(region)

        btnDeleteRegion.addEventListener('click', () => modalDeleteRegion(reg.region_id))
        btnEditRegion.addEventListener('click', () => regionEdition(reg))

        btnAddCountry.addEventListener('click', () => {
            window.scrollTo(0, 0)
            body.classList.add('modal')
            darkImageNewCountry.classList.remove('none')
            varRegionId = +reg.region_id
        })


        reg.countries.forEach(count => {
            const country = document.createElement('li')
            const countContainer = document.createElement('div')
            const countryAndBtn = document.createElement('div')
            const countTitle = document.createElement('h5')
            const btnEditCountry = document.createElement('button')
            const btnDeleteCountry = document.createElement('button')
            const btnAddCity = document.createElement('button')
            const cityList = document.createElement('ul')

            countTitle.innerText = count.country_name
            btnEditCountry.innerText = 'Editar'
            btnDeleteCountry.innerText = 'Eliminar'
            btnAddCity.innerText = 'Agregar ciudad'

            country.classList.add('l-item')
            btnEditCountry.classList = 'btn edit'
            btnDeleteCountry.classList = 'btn delete'
            btnAddCity.classList = 'btn add'
            countTitle.classList.add('count-title')
            countContainer.classList.add('count-container')
            countryAndBtn.classList.add('count-btn')

            countryAndBtn.appendChild(countTitle)
            countryAndBtn.appendChild(btnEditCountry)
            countryAndBtn.appendChild(btnDeleteCountry)
            countContainer.appendChild(countryAndBtn)
            countContainer.appendChild(btnAddCity)
            country.appendChild(countContainer)
            country.appendChild(cityList)
            countryList.appendChild(country)

            btnDeleteCountry.addEventListener('click', () => modalDeleteCountry(count.country_id))
            btnEditCountry.addEventListener('click', () => countryEdition(count))

            btnAddCity.addEventListener('click', () => {
                window.scrollTo(0, 0)
                body.classList.add('modal')
                darkImageNewCity.classList.remove('none')
                varCountryId = +count.country_id
            })

            count.cities.forEach(cit => {
                const city = document.createElement('li')
                const cityTitle = document.createElement('h6')
                const btnEditCity = document.createElement('button')
                const btnDeleteCity = document.createElement('button')

                cityTitle.innerText = cit.city_name
                btnEditCity.innerText = 'Editar'
                btnDeleteCity.innerText = 'Eliminar'

                city.classList = 'l-item city-container'
                cityTitle.classList.add('city-title')
                btnEditCity.classList = 'btn edit'
                btnDeleteCity.classList = 'btn delete'

                city.appendChild(cityTitle)
                city.appendChild(btnEditCity)
                city.appendChild(btnDeleteCity)
                cityList.appendChild(city)

                btnDeleteCity.addEventListener('click', () => modalDeleteCity(cit.city_id))
                btnEditCity.addEventListener('click', () => cityEdition(cit))
            })
        })
    })
}

//add region
addRegBtn.addEventListener('click', () => {
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImage.classList.remove('none')
})

saveRegion.addEventListener('click', (event) => addRegion(event))

async function addRegion(event) {
    const region = { region_name: newRegion.value }
    const options = {
        method: 'POST',
        body: JSON.stringify(region),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    validateLocation(newRegion, msgNReg)
    try {
        const response = await fetch('http://localhost:3000/regions', options)
        if(response.status === 409) {
            newRegion.classList.add('border-wrong')
            msgNReg.classList.add('visible')
            msgNReg.innerText = 'La región ya existe'
        }
        const data = await response.json()
        closeWindowNewRegion(event)
        getLocations()
    } catch(reason) {
        return reason
    }
}

//validate region
function validateLocation(location, msg) {
    if(location.value === '') {
        location.classList.add('border-wrong')
        msg.classList.add('visible')
        location.addEventListener('keyup', () => {
            if(location.value !== '') {
                location.classList.remove('border-wrong')
                msg.classList.remove('visible')
            }
        })
    }
}

//close window new region
closeNewRegion.addEventListener('click', (event) => closeWindowNewRegion(event))
cancelRegion.addEventListener('click', (event) => closeWindowNewRegion(event))

function closeWindowNewRegion(event) {
    event.preventDefault()
    darkImage.classList.add('none')
    body.classList.remove('modal')
    msgNReg.classList.remove('visible')
    newRegion.classList.remove('border-wrong')

    newRegion.value = ''
    msgNReg.innerText = 'Este campo es obligatorio'
}

//delete region 
function modalDeleteRegion(regionId) {
    varRegionId = regionId
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageRegions.classList.remove('none')
}

cancelDltRegBtn.addEventListener('click', () => {
    cancelDeleteReg()
})

function cancelDeleteReg() {
    if(varEditRegion === 0) {
        body.classList.remove('modal')
        darkImageEditReg.style.visibility = 'hidden'
        darkImageEditReg.classList.add('none')
    } else if(varEditRegion === 1) {
        window.scrollTo(0, 0)
        body.classList.add('modal')
        darkImageEditReg.style.visibility = 'visible'
        darkImageEditReg.classList.remove('none')
    }
    darkImageRegions.classList.add('none')
}

function cancelReg() {
    body.classList.remove('modal')
    darkImageRegions.classList.add('none')
    varRegionId = null
}

deleteRegBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageRegions.classList.add('none')
    deleteRegion(varRegionId)
})

async function deleteRegion(regId) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/regions/${regId}`, options)
        const data = await response.json()
        cancelReg()
        getLocations()
    } catch(reason) {
        return reason
    }
}

//edit region
function regionEdition(reg) {
    window.scrollTo(0, 0)
    darkImageEditReg.classList.remove('none')
    darkImageEditReg.style.visibility = 'visible'
    body.classList.add('modal')
    regionEdit.value = reg.region_name
    varRegionId = reg.region_id
    varEditRegion = 1
}

//close window edit region
closeEditRegion.addEventListener('click', () => closeWindowEditRegion())

function closeWindowEditRegion() {
    darkImageEditReg.classList.add('none')
    body.classList.remove('modal')
    regionEdit.classList.remove('border-wrong')
    msgEReg.classList.remove('visible')
    varEditRegion = 0
    msgEReg.innerText = 'Este campo es obligatorio'
}

deleteRegEdit.addEventListener('click', () => {
    darkImageEditReg.style.visibility = 'visible'
    darkImageEditReg.classList.add('none')
    modalDeleteRegion(varRegionId)
})

//save edited region
saveRegionEdit.addEventListener('click', () => editRegion())

async function editRegion() {
    const modifiedRegion = { region_name: regionEdit.value}
    msgEReg.innerText = 'Este campo es obligatorio'
    validateLocation(regionEdit, msgEReg)
    const options = {                   
        method: 'PUT',  
        body: JSON.stringify(modifiedRegion),
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`,
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/regions/${varRegionId}`, options)
        if(response.status === 409) {
            regionEdit.classList.add('border-wrong')
            msgEReg.classList.add('visible')
            msgEReg.innerText = 'La región ya existe'
        }
        const data = await response.json()
        closeWindowEditRegion()
        getLocations()
    } catch (reason) {
        return reason
    }
}

//add country 
async function addCountry(event, reg) {
    event.preventDefault()
    const country = { 
        region_id: +reg,
        country_name: newCountry.value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(country),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    msgNCount.innerText = 'Este campo es obligatorio'
    validateLocation(newCountry, msgNCount)
    try {
        const response = await fetch('http://localhost:3000/countries', options)
        if(response.status === 409) {
            newCountry.classList.add('border-wrong')
            msgNCount.classList.add('visible')
            msgNCount.innerText = 'El país ya existe'
        }
        const data = await response.json()
        closeWindowNewCountry()
        getLocations()
    } catch(reason) {
        return reason
    }
}

//close new country window
closeNewCountry.addEventListener('click', () => closeWindowNewCountry())
cancelCountry.addEventListener('click', () => closeWindowNewCountry())

function closeWindowNewCountry() {
    darkImageNewCountry.classList.add('none')
    newCountry.classList.remove('border-wrong')
    msgNCount.classList.remove('visible')
    body.classList.remove('modal')
    newCountry.value = ''
    msgNCount.innerText = 'Este campo es obligatorio'
    varRegionId = null
}

saveCountry.addEventListener('click', (event) => addCountry(event, varRegionId))

//delete country
function modalDeleteCountry(countryId) {
    varCountryId = countryId
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageCountries.classList.remove('none')
}

cancelDltCountBtn.addEventListener('click', () => {
    cancelDeleteCount()
})

function cancelDeleteCount() {
    if(varEditCountry === 0) {
        body.classList.remove('modal')
        darkImageEditCount.style.visibility = 'hidden'
        darkImageEditCount.classList.add('none')
    } else if(varEditCountry === 1) {
        window.scrollTo(0, 0)
        body.classList.add('modal')
        darkImageEditCount.style.visibility = 'visible'
        darkImageEditCount.classList.remove('none')
    }
    darkImageCountries.classList.add('none')
}

deleteCountBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageCountries.classList.add('none')
    deleteCountry(varCountryId)
})

async function deleteCountry(countId) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/countries/${countId}`, options)
        const data = await response.json()
        cancelCount()
        getLocations()
    } catch(reason) {
        return reason
    }
}

function cancelCount() {
    body.classList.remove('modal')
    darkImageCountries.classList.add('none')
    varCountryId = null
}

//edit country
function countryEdition(count) {
    window.scrollTo(0, 0)
    darkImageEditCount.classList.remove('none')
    darkImageEditCount.style.visibility = 'visible'
    body.classList.add('modal')
    countryEdit.value = count.country_name
    varCountryId = count.country_id
    varEditCountry = 1
}

//close window edit country
closeEditCountry.addEventListener('click', () => closeWindowEditCountry())

function closeWindowEditCountry() {
    darkImageEditCount.classList.add('none')
    body.classList.remove('modal')
    countryEdit.classList.remove('border-wrong')
    msgECount.classList.remove('visible')
    varEditCountry = 0
    msgECount.innerText = 'Este campo es obligatorio'
    varCountryId = null
}

deleteCountEdit.addEventListener('click', () => {
    darkImageEditCount.style.visibility = 'visible'
    darkImageEditCount.classList.add('none')
    modalDeleteCountry(varCountryId)
})

//save edited country
saveCountryEdit.addEventListener('click', () => editCountry())

async function editCountry() {
    const modifiedCountry = { country_name: countryEdit.value}
    msgECount.innerText = 'Este campo es obligatorio'
    validateLocation(countryEdit, msgECount)
    const options = {                   
        method: 'PUT',  
        body: JSON.stringify(modifiedCountry),
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`,
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/countries/${varCountryId}`, options)
        if(response.status === 409) {
            countryEdit.classList.add('border-wrong')
            msgECount.classList.add('visible')
            msgECount.innerText = 'El país ya existe'
        }
        const data = await response.json()
        closeWindowEditCountry()
        getLocations()
    } catch (reason) {
        return reason
    }
}

//add city
async function addCity(event, count) {
    event.preventDefault()
    const city = { 
        country_id: +count,
        city_name: newCity.value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    msgNCit.innerText = 'Este campo es obligatorio'
    validateLocation(newCity, msgNCit)
    try {
        const response = await fetch('http://localhost:3000/cities', options)
        if(response.status === 409) {
            newCity.classList.add('border-wrong')
            msgNCit.classList.add('visible')
            msgNCit.innerText = 'La ciudad ya existe'
        }
        const data = await response.json()
        closeWindowNewCity()
        getLocations()
    } catch(reason) {
        return reason
    }
}

//close new city window
closeNewCity.addEventListener('click', () => closeWindowNewCity())
cancelCity.addEventListener('click', () => closeWindowNewCity())

function closeWindowNewCity() {
    darkImageNewCity.classList.add('none')
    newCity.classList.remove('border-wrong')
    msgNCit.classList.remove('visible')
    body.classList.remove('modal')
    newCity.value = ''
    msgNCit.innerText = 'Este campo es obligatorio'
    varCountryId = null
}

saveCity.addEventListener('click', (event) => addCity(event, varCountryId))

//delete city
function modalDeleteCity(cityId) {
    varCitId = cityId
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageCities.classList.remove('none')
}

cancelDltCitBtn.addEventListener('click', () => {
    cancelDeleteCity()
})

function cancelDeleteCity() {
    if(varEditCity === 0) {
        body.classList.remove('modal')
        darkImageEditCity.style.visibility = 'hidden'
        darkImageEditCity.classList.add('none')
    } else if(varEditCity === 1) {
        window.scrollTo(0, 0)
        body.classList.add('modal')
        darkImageEditCity.style.visibility = 'visible'
        darkImageEditCity.classList.remove('none')
    }
    darkImageCities.classList.add('none')
}

deleteCitBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageCities.classList.add('none')
    deleteCity(varCitId)
})

async function deleteCity(citId) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/cities/${citId}`, options)
        const data = await response.json()
        cancelCit()
        getLocations()
    } catch(reason) {
        return reason
    }
}

function cancelCit() {
    body.classList.remove('modal')
    darkImageCities.classList.add('none')
    varCitId = null
}
//edit city
function cityEdition(cit) {
    window.scrollTo(0, 0)
    darkImageEditCity.classList.remove('none')
    darkImageEditCity.style.visibility = 'visible'
    body.classList.add('modal')
    cityEdit.value = cit.city_name
    varCitId = cit.city_id
    varEditCity = 1
}

//close window edit country
closeEditCity.addEventListener('click', () => closeWindowEditCity())

function closeWindowEditCity() {
    darkImageEditCity.classList.add('none')
    body.classList.remove('modal')
    cityEdit.classList.remove('border-wrong')
    msgECit.classList.remove('visible')
    varEditCity = 0
    msgECit.innerText = 'Este campo es obligatorio'
    varCitId = null
}

deleteCitEdit.addEventListener('click', () => {
    darkImageEditCity.style.visibility = 'visible'
    darkImageEditCity.classList.add('none')
    modalDeleteCity(varCitId)
})

//save edited city
saveCityEdit.addEventListener('click', () => editCity())

async function editCity() {
    const modifiedCity = { city_name: cityEdit.value}
    msgECit.innerText = 'Este campo es obligatorio'
    validateLocation(cityEdit, msgECit)
    const options = {                   
        method: 'PUT',  
        body: JSON.stringify(modifiedCity),
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`,
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/cities/${varCitId}`, options)
        if(response.status === 409) {
            cityEdit.classList.add('border-wrong')
            msgECit.classList.add('visible')
            msgECit.innerText = 'La ciudad ya existe'
        }
        const data = await response.json()
        closeWindowEditCity()
        getLocations()
    } catch (reason) {
        return reason
    }
}