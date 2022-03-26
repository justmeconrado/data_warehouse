const companiesList = document.getElementById('companiesList')
const newCompanyBtn = document.getElementById('newCompanyBtn')
const darkImageNewCompany = document.getElementById('darkImageNewCompany')
const closeNewComp = document.getElementById('closeNewComp')
const cancelCompany = document.getElementById('cancelCompany')
const msgCompanyName = document.getElementById('msgCompanyName')
const msgCompanyEmail = document.getElementById('msgCompanyEmail')
const msgCompAddress = document.getElementById('msgCompAddress')
const msgCompTelephone = document.getElementById('msgCompTelephone')
const companySlt = document.getElementById('companySlt')
const saveCompany = document.getElementById('saveCompany')
const companyList = document.getElementById('companyList')
const companyName = document.getElementById('companyName')
const companyEmail = document.getElementById('companyEmail')
const compAddress = document.getElementById('compAddress')
const compTelephone = document.getElementById('compTelephone')
const companyCity = document.getElementById('companyCity')
const darkImageCompanies = document.getElementById('darkImageCompanies')
const cancelDltCompBtn = document.getElementById('cancelDltCompBtn')
const deleteCompBtn = document.getElementById('deleteCompBtn')
const darkImageEditComp = document.getElementById('darkImageEditComp')
const companyNameEdit = document.getElementById('companyNameEdit')
const companyEmailEdit = document.getElementById('companyEmailEdit')
const compAddressEdit = document.getElementById('compAddressEdit')
const compTelephoneEdit = document.getElementById('compTelephoneEdit')
const companySltEdit = document.getElementById('companySltEdit')
const closeEditComp = document.getElementById('closeEditComp')
const companyListEdit = document.getElementById('companyListEdit')
const msgCompanyNameEdit = document.getElementById('msgCompanyNameEdit')
const msgCompanyEmailEdit = document.getElementById('msgCompanyEmailEdit')
const msgCompAddressEdit = document.getElementById('msgCompAddressEdit')
const msgCompTelephoneEdit = document.getElementById('msgCompTelephoneEdit')
const companyCityEdit = document.getElementById('companyCityEdit')
const saveEditCompany = document.getElementById('saveEditCompany')
const deleteEditCompany = document.getElementById('deleteEditCompany')

let varSelectCityComp = 0
let varEditCompany = 0

let varCompId = null
let varCompCityId = null

//show companies
companies.addEventListener('click', () => showCompanies())

async function showCompanies() {
    companiesList.innerHTML = ''
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch('http://localhost:3000/companies', options)
    const data = await response.json()
    renderCompanies(data)
}

function renderCompanies(data) {
    companiesList.innerHTML = ''
    data.forEach(async element => {
        const info = {
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
        }
        
        const row = document.createElement('li')
        const company = document.createElement('div')
        const country = document.createElement('div')
        const address = document.createElement('div')
        const telephone = document.createElement('div')
        const actions = document.createElement('div')
        const ellipsis = document.createElement('i')
        const trash = document.createElement('i')
        const pen = document.createElement('i')

        company.innerHTML = `<p>${info.companyName}</p><p class="grey-info">${info.email}</p>`
        country.innerHTML = `<p>${info.countryName}</p><p class="grey-info">${info.regionName}</p>`
        address.innerText = info.address
        telephone.innerText = info.telephone

        row.classList.add('row-companies')
        company.classList = 'u-item col-item'        
        country.classList = 'u-item col-item'     
        address.classList = 'u-item col-item comp-item'     
        telephone.classList = 'u-item col-item comp-item'     
        actions.classList = 'u-item action'
        ellipsis.classList = 'fas fa-ellipsis-h'
        trash.classList = 'fas fa-trash none'
        pen.classList = 'fas fa-pen none'

        actions.appendChild(ellipsis)
        actions.appendChild(trash)
        actions.appendChild(pen)
        companiesList.appendChild(row)
        row.appendChild(company)
        row.appendChild(country)
        row.appendChild(address)
        row.appendChild(telephone)
        row.appendChild(actions)

        row.addEventListener('mouseover', () => hoverRow(ellipsis, trash, pen))
        row.addEventListener('mouseout', () => outRow(ellipsis, trash, pen))

        trash.addEventListener('click', () => modalDeleteCompany(info.companyId))
        pen.addEventListener('click', () => companyEdition(info))
    })
}

//add company
newCompanyBtn.addEventListener('click', () => {
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageNewCompany.classList.remove('none')
    companyCity.style.top = '0px'
})

//close window new company
cancelCompany.addEventListener('click', (event) => closeWindowNewCompany(event))
closeNewComp.addEventListener('click', (event) => closeWindowNewCompany(event))

function closeWindowNewCompany(event) {
    event.preventDefault()
    companyName.value = ''
    companyEmail.value = ''
    compTelephone.value = ''
    compAddress.value = ''
    companySlt.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>'
    msgCompanyName.innerText = 'Este campo es obligatorio'
    
    body.classList.remove('modal')
    companyName.classList.remove('border-wrong')
    msgCompanyName.classList.remove('visible')
    companyEmail.classList.remove('border-wrong')
    msgCompanyEmail.classList.remove('visible')
    compAddress.classList.remove('border-wrong')
    msgCompAddress.classList.remove('visible')
    compTelephone.classList.remove('border-wrong')
    msgCompTelephone.classList.remove('visible')
    companySlt.classList.remove('border-wrong')
    
    darkImageNewCompany.classList.add('none')
    companyList.classList.add('none')
    companyCity.style.top = '0px'

    varCompCityId = null
    varSelectCityComp = 0
}

//save company
saveCompany.addEventListener('click', (event) => addCompany(event))

async function addCompany(event) {
    msgEmail.innerText = 'Error en datos ingresados'
    event.preventDefault()
    const company = {
        company_name: companyName.value,
        email: companyEmail.value,
        address: compAddress.value,
        telephone: compTelephone.value,
        city_id: varCompCityId,
    }
    
    validateCompanyData(company, companyName, msgCompanyName, companyEmail, msgCompanyEmail, compAddress, 
        msgCompAddress, compTelephone, msgCompTelephone, companySlt, companyList)
    const options = {
        method: 'POST',
        body: JSON.stringify(company),
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch('http://localhost:3000/companies', options)
        if(response.status === 409) {
            companyName.classList.add('border-wrong')
            msgCompanyName.classList.add('visible')
            msgCompanyName.innerText = 'La empresa ya existe'
        }
        const data = await response.json()
    } catch(reason) {
        return reason
    }
    closeWindowNewCompany(event)
    showCompanies() 
}

function validateCompanyData(company, compName, msgCom, compEmail, msgEmail, comAddress, msgAddress, 
    compTeleph, msgCompTeleph, compSlt, compList) {
    if(compName.value === '') {
        compName.classList.add('border-wrong')
        msgCom.classList.add('visible')
        compName.addEventListener('keyup', () => {
            if(compName.value !== '') {
                compName.classList.remove('border-wrong')
                msgCom.classList.remove('visible')
            }
        })
    }
    if(compEmail.value === '' || !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value))) {
        compEmail.classList.add('border-wrong')
        msgEmail.classList.add('visible')
        compEmail.addEventListener('keyup', () => {
            if(compEmail.value !== '' && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(compEmail.value))) {
                compEmail.classList.remove('border-wrong')
                msgEmail.classList.remove('visible')
            }
        })
    }
    if(comAddress.value === '') {
        comAddress.classList.add('border-wrong')
        msgAddress.classList.add('visible')
        comAddress.addEventListener('keyup', () => {
            if(comAddress.value !== '') {
                comAddress.classList.remove('border-wrong')
                msgAddress.classList.remove('visible')
            }
        })
    }
    if(compTeleph.value === '') {
        compTeleph.classList.add('border-wrong')
        msgCompTeleph.classList.add('visible')
        compTeleph.addEventListener('keyup', () => {
            if(compTeleph.value !== '') {
                compTeleph.classList.remove('border-wrong')
                msgCompTeleph.classList.remove('visible')
            }
        })
    }
    if(company.city_id === undefined || company.city_id === null) {
        compSlt.classList.add('border-wrong')
        compList.addEventListener('click', () => {
            if(compSlt.innerText !== 'Seleccionar ciudad') {
                compSlt.classList.remove('border-wrong')
            }
        })
    }
}

//select city 
companySlt.addEventListener('click', () => {
    if(varSelectCityComp === 0) {
        getCitiesComp(companyList, companySlt, companyCity)
    } else if(varSelectCityComp === 1) {
        companyList.classList.add('none')
        companyCity.style.top = '0px'
        companyList.innerHTML = ''
        varSelectCityComp = 0
    }
})

async function getCitiesComp(citList, citSelect, compCity) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/cities`, options)
    const data = await response.json()
    renderSelectCitiesComp(data, citList, citSelect, compCity)
}

function renderSelectCitiesComp(data, citList, citSelect, compCity) {
    varSelectCityComp = 1
    citList.innerHTML = ''
    citList.classList.remove('none')

    const hcit = (data.length * 24 + 6) / 2
    compCity.style.top = `${hcit}px`

    data.forEach(element => {
        const info = {
            cityId: element.city_id,
            cityName: element.city_name,
        }
        const cityItem = document.createElement('li')
        cityItem.innerText = info.cityName
        cityItem.classList.add('sug-comp')
        citList.appendChild(cityItem)

        cityItem.addEventListener('click', () => selectCityCompFunction(info, citList, citSelect, compCity))
    })
}

function selectCityCompFunction(info, citList, citSelect, compCity) {
    varSelectCityComp = 0
    citList.classList.add('none')
    compCity.style.top = '0px'
    citList.innerHTML = ''
    citSelect.innerHTML = `${info.cityName}<i class="fas fa-caret-down"></i>`
    varCompCityId = +info.cityId
}

//delete company
function modalDeleteCompany(companyId) {
    varCompId = companyId
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageCompanies.classList.remove('none')
}

cancelDltCompBtn.addEventListener('click', () => {
    cancelDeleteComp()
})

function cancelDeleteComp() {
    if(varEditCompany === 0) {
        body.classList.remove('modal')
        darkImageEditComp.style.visibility = 'hidden'
        darkImageEditComp.classList.add('none')
    } else if(varEditCompany === 1) {
        window.scrollTo(0, 0)
        body.classList.add('modal')
        darkImageEditComp.style.visibility = 'visible'
        darkImageEditComp.classList.remove('none')
    }
    darkImageCompanies.classList.add('none')
}

function cancelComp() {
    body.classList.remove('modal')
    darkImageCompanies.classList.add('none')
    varCompId = null
}

deleteCompBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageCompanies.classList.add('none')
    deleteCompany(varCompId)
})

async function deleteCompany(compId) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    try {
        const response = await fetch(`http://localhost:3000/companies/${compId}`, options)
        const data = await response.json()
        cancelComp()
        showCompanies()
    } catch(reason) {
        return reason
    }
}

//edit company
async function companyEdition(info) {
    varCompCityId = +info.cityId
    varCompId = +info.companyId
    window.scrollTo(0, 0)
    body.classList.add('modal')
    darkImageEditComp.classList.remove('none')
    darkImageEditComp.style.visibility = 'visible'
    companyCityEdit.style.top = '0px'
    
    const options = {                   
        method: 'GET',  
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`
        }
    }
    const response = await fetch(`http://localhost:3000/companies/${varCompId}`, options)
    const data = await response.json()
    loadDataCompany(data)
}

function loadDataCompany(data) {
    companyNameEdit.value = data.company_name
    companyEmailEdit.value = data.email
    compAddressEdit.value = data.address
    compTelephoneEdit.value = data.telephone
    
    if(data.city_name === '') {
        companySltEdit.innerHTML = 'Seleccionar ciudad<i class="fas fa-caret-down"></i>'
    } else {
        companySltEdit.innerHTML = `${data.city_name}<i class="fas fa-caret-down"></i>`
    }
}

//close window edit company
closeEditComp.addEventListener('click', (event) => closeWindowEditCompany(event))

function closeWindowEditCompany(event) {
    event.preventDefault()
    darkImageEditComp.classList.add('none')
    companyListEdit.classList.add('none')
    body.classList.remove('modal')

    companyNameEdit.classList.remove('border-wrong')
    msgCompanyNameEdit.classList.remove('visible')
    companyEmailEdit.classList.remove('border-wrong')
    msgCompanyEmailEdit.classList.remove('visible')
    compAddressEdit.classList.remove('border-wrong')
    msgCompAddressEdit.classList.remove('visible')
    compTelephoneEdit.classList.remove('border-wrong')
    msgCompTelephoneEdit.classList.remove('visible')
    companySltEdit.classList.remove('border-wrong')

    msgCompanyEmailEdit.innerText = 'Error en datos ingresados'

    companyCityEdit.style.top = '0px'
    varSelectCityComp = 0
}

//select city
companySltEdit.addEventListener('click', () => {
    if(varSelectCityComp === 0) {
        companyListEdit.innerHTML = ''
        getCitiesComp(companyListEdit, companySltEdit, companyCityEdit)
    } else if(varSelectCityComp === 1) {
        companyListEdit.classList.add('none')
        companyCityEdit.style.top = '0px'
        companyListEdit.innerHTML = ''
        varSelectCityComp = 0
    }
})

//save edited contact
saveEditCompany.addEventListener('click', (event) => editCompany(event))

async function editCompany(event) {
    event.preventDefault()  
    const modifiedCompany = {
        company_name: companyNameEdit.value,
        email: companyEmailEdit.value,
        address: compAddressEdit.value,
        telephone: compTelephoneEdit.value,
        city_id: varCompCityId,
    }

    validateCompanyData(modifiedCompany, companyNameEdit, msgCompanyNameEdit, companyEmailEdit, msgCompanyEmailEdit, 
        compAddressEdit, msgCompAddressEdit, compTelephoneEdit, msgCompTelephoneEdit, companySltEdit, companyListEdit)
    const options = {                   
        method: 'PUT',  
        body: JSON.stringify(modifiedCompany),
        headers: {
            Authorization: `token ${JSON.parse(sessionStorage.getItem('Token'))}`,
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`http://localhost:3000/companies/${varCompId}`, options)
    if(response.status === 409) {
        companyNameEdit.classList.add('border-wrong')
        msgCompanyNameEdit.classList.add('visible')
        msgCompanyNameEdit.innerText = 'La empresa ya existe'
    }
    const data = await response.json()
    closeWindowEditCompany(event)
    showCompanies() 
}

//delete contact (contact edition)
deleteEditCompany.addEventListener('click', (event) => {
    event.preventDefault()
    darkImageEditComp.style.visibility = 'hidden'
    modalDeleteCompany(varCompId)
})

deleteCompBtn.addEventListener('click', () => {
    body.classList.remove('modal')
    darkImageContacts.classList.add('none')
    darkImageEditCtc.classList.add('none')
    deleteCompany(varCompId)
})