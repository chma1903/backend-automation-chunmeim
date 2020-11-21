const faker = require('faker')

const ENDPOINT_POST_BILL = 'http://localhost:3000/api/bill/new'
const ENDPOINT_GET_Bills = 'http://localhost:3000/api/bills'
const ENDPOINT_GET_BILL = 'http://localhost:3000/api/bill/'
const fakeNummer = faker.random.number({ min: 1000, max: 10000 })
const uppdateBill = faker.random.number({ min: 1000, max: 10000 })

function createRandomBillPayload() {

    const payload = {
        "value": fakeNummer
    }
    return payload
}


function getRequstAllBillsWithAssertion(cy, value) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_Bills,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(value)
    }))
}


function getAllBillsRequst(cy) {
    cy.authenticateSession().then((response => {
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_Bills,
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
    let fakeBillPayload = createRandomBillPayload()
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_Bills,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        let lastId = response.body[response.body.length - 1].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_BILL + lastId,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: {
                "value": uppdateBill,
                "id": lastId
            }
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(uppdateBill)
        }))
    }))
}


function deleteBillRequstAfterGet(cy) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_Bills,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        let lastId = response.body[response.body.length - 1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_BILL + lastId,
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


function createBillRequstAfterGet(cy) {
    cy.authenticateSession().then((response => {
        let fakeBillPayload = createRandomBillPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_Bills,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_BILL,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "value": fakeNummer,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(fakeBillPayload.value)
            }))
            getRequstAllBillsWithAssertion(cy, fakeBillPayload.value)
        }))
    }))
}

function createBillRequstAndDelete(cy) {
    cy.authenticateSession().then((response => {
        let fakeBillPayload = createRandomBillPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_Bills,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_BILL,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "value": fakeNummer,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(fakeBillPayload.value)
            }))
            deleteBillRequstAfterGet(cy)
        }))
    }))
}


function createBillRequstAndUpdate(cy) {
    cy.authenticateSession().then((response => {
        let fakeBillPayload = createRandomBillPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_Bills,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_BILL,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "value": fakeNummer,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(fakeBillPayload.value)
            }))
            uppdateRequstAfterGet(cy)
        }))
    }))
}

module.exports = {
    createBillRequstAfterGet,
    getAllBillsRequst,
    createBillRequstAndDelete,
    createBillRequstAndUpdate
}