const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_NEW_CLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const fakeName = faker.name.firstName()
const fakeEmail = faker.internet.email()
const fakePhone = faker.phone.phoneNumber()
const uppdatePhone = faker.phone.phoneNumber()
const uppdateName = faker.name.firstName()
const uppdeteEmail = faker.internet.email()



function createRandomClientPayload() {

    const payload = {
        "name": fakeName,
        "email": fakeEmail,
        "telephone": fakePhone
    }
    return payload
}



//get request to fetch all clients
function getRequstAllClientsWithAssertion(cy, name, email, telephone) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)
    }))
}

function getAllClientsRequst(cy) {
    cy.authenticateSession().then((response => {
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
        }))
    }))
}

function uppdateRequstAfterGet(cy) {
    let fakeClientPayload = createRandomClientPayload()
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        let lastId = response.body[response.body.length - 1].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_CLIENT + lastId,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                "name": uppdateName,
                "email": uppdeteEmail,
                "telephone": uppdatePhone,
                "id": lastId
            }
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(uppdateName)

        }))
    }))
}


function deleteRequestAfterGet(cy) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        let lastId = response.body[response.body.length - 1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_CLIENT + lastId,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            const responseAsString = JSON.stringify(response.body)
            expect(responseAsString).to.have.string('true')

        }))

    }))
}

function createClientRequstAfterGet(cy) {
    cy.authenticateSession().then((response => {
        let fakeClientPayload = createRandomClientPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_NEW_CLIENT,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "name": fakeName,
                    "email": fakeEmail,
                    "telephone": fakePhone,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(fakeClientPayload.name)

            }))
            getRequstAllClientsWithAssertion(cy, fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
        }))
    }))
}



function createClientRequstAndDelete(cy) {
    cy.authenticateSession().then((response => {
        let fakeClientPayload = createRandomClientPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_NEW_CLIENT,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "name": fakeName,
                    "email": fakeEmail,
                    "telephone": fakePhone,
                    "id": newId
                }
            }).then((response => {

            }))
            //delete
            deleteRequestAfterGet(cy)
        }))
    }))
}

function createClientRequstAndUpdate(cy) {
    cy.authenticateSession().then((response => {
        let fakeClientPayload = createRandomClientPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_NEW_CLIENT,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "name": fakeName,
                    "email": fakeEmail,
                    "telephone": fakePhone,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(fakeClientPayload.name)
            }))
            uppdateRequstAfterGet(cy)
        }))
    }))
}



module.exports = {
    createClientRequstAfterGet,
    getRequstAllClientsWithAssertion,
    getAllClientsRequst,
    createClientRequstAndDelete,
    createClientRequstAndUpdate

}