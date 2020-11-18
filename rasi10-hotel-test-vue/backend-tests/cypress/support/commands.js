// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


// metod till inloggning med instans variabler och request mot inloggning api


const LOGIN_URL = 'http://localhost:3000/api/login'


    Cypress.Commands.add('authenticateSession',() => {
        // instans variabler till inloggningsuppgifter
        const userCredentials = {
            "username":"tester01",
            "password":"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }
        // requst mot api
        cy.request({
            method:"POST",
            url:LOGIN_URL,
            headers:{
                'Content-Type': 'application/json'
            },
            // typ inloggningsuppgifter i body
            body:JSON.stringify(userCredentials)
            //Kontrollera status kod. 
        }).then((response =>{
            expect(response.status).to.eq(200)
            //Spara stoken
            Cypress.env({loginToken:response.body})
        }))
    })

