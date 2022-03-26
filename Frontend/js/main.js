sessionStorage.clear()

let varSect = 'log'

const submit = document.getElementById('submit')
const username = document.getElementById('username')
const password = document.getElementById('password')
const login = document.getElementById('login')
const usersSection = document.getElementById('usersSection')
const contacts = document.getElementById('contacts')
const companies = document.getElementById('companies')
const users = document.getElementById('users')
const locations = document.getElementById('location')
const locationSection = document.getElementById('locationSection')
const companiesSection = document.getElementById('companiesSection')
const contactsSection = document.getElementById('contactsSection')
const usersLink = document.getElementById('usersLink')

submit.addEventListener('click', (event) => {
    event.preventDefault()
    loginFunction()
})

async function loginFunction() {
    const user = {
        username: username.value,
        password: password.value,
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch('http://localhost:3000/users/login', options)
    if (response.status === 400) {
        
        const titleLoginForm = document.getElementById('titleLoginForm')
        
        titleLoginForm.classList.add('title-login-error')
        box.classList.add('box-error')
        username.classList.add('field-error')
        password.classList.add('field-error')
        titleLoginForm.innerText = 'Usuario o Pass Incorrecto'
    }
    else {
        const data = await response.json()
        
        if (response.status === 200) {
            saveToken(data)
            login.classList.add('none')
            varSect = 'noLog'
    
            contactsSection.classList.remove('none')
            getContacts()
            contacts.classList.add('bold')
        }
    
        if(data.perf === 'Admin') {
            usersLink.classList.remove('none')
        } else {
            usersLink.classList.add('none')
        }
    }
}

function saveToken(data) {
    sessionStorage.setItem('Token', JSON.stringify(data.token))
}

contacts.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.add('bold')
        companies.classList.remove('bold')
        users.classList.remove('bold')
        locations.classList.remove('bold')

        contactsSection.classList.remove('none')
        companiesSection.classList.add('none')
        usersSection.classList.add('none')
        locationSection.classList.add('none')

        searchInput.value = ''
    }
})

companies.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.remove('bold')
        companies.classList.add('bold')
        users.classList.remove('bold')
        locations.classList.remove('bold')

        contactsSection.classList.add('none')
        companiesSection.classList.remove('none')
        usersSection.classList.add('none')
        locationSection.classList.add('none')
    }
})

users.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.remove('bold')
        companies.classList.remove('bold')
        users.classList.add('bold')
        locations.classList.remove('bold')

        contactsSection.classList.add('none')
        companiesSection.classList.add('none')
        usersSection.classList.remove('none')
        locationSection.classList.add('none')

        getUsers()
    }
})

locations.addEventListener('click', () => {
    if(varSect !== 'log') {
        contacts.classList.remove('bold')
        companies.classList.remove('bold')
        users.classList.remove('bold')
        locations.classList.add('bold')
    
        contactsSection.classList.add('none')
        companiesSection.classList.add('none')
        usersSection.classList.add('none')
        locationSection.classList.remove('none')

        getLocations()
    }
})