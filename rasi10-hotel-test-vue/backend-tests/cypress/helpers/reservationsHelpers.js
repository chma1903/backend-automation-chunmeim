const faker = require('faker')

const ENDPOINT_POST_RESERVATION = 'http://localhost:3000/api/reservation/new'
const ENDPOINT_GET_RESERVATIONS = 'http://localhost:3000/api/reservations'
const ENDPOINT_GET_RESERVATION = 'http://localhost:3000/api/reservation/'
const startDate = "2020-08-02"
const endDate = "2020-09-02"
const UppdateStartDate = "2021-01-01"
const UppdateEndDate = "2021-01-31"




function createReservationPayload() {

    const payload = {
        "start": startDate,
        "end": endDate,
    }
    return payload
}


function getRequstAllReservationWithAssertion(cy, end, start) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(end)
        expect(responseAsString).to.have.string(start)

    }))
}

function createReservationRequestAfterGet(cy) {
    cy.authenticateSession().then((response => {
        let reservationPayload = createReservationPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_RESERVATIONS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_RESERVATION,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "start": startDate,
                    "end": endDate,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(reservationPayload.end)

            }))
            getRequstAllReservationWithAssertion(cy, reservationPayload.end, reservationPayload.start)
        }))
    }))
}

function getAllReservationsRequst(cy) {
    cy.authenticateSession().then((response => {
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_RESERVATIONS,
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
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response => {
        let lastId = response.body[response.body.length - 1].id
        cy.request({
            method: "PUT",
            url: ENDPOINT_GET_RESERVATION + lastId,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:
            {
                "end": UppdateEndDate,
                "start": UppdateStartDate,
                "id": lastId
            }
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(UppdateEndDate)

        }))
    }))
}

function deleteRequstAfterGet(cy, lastId) {
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_RESERVATIONS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    }).then((response => {
        lastId = response.body[response.body.length - 1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_RESERVATION + lastId,
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


function createReservationRequstAndDelete(cy) {
    cy.authenticateSession().then((response => {
        let reservationPayload = createReservationPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_RESERVATIONS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_RESERVATION,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "start": startDate,
                    "end": endDate,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(reservationPayload.end)
            }))
            deleteRequstAfterGet(cy)
        }))
    }))
}



function createReservationRequstAndUpdate(cy) {
    cy.authenticateSession().then((response => {
        let reservationPayload = createReservationPayload()
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_RESERVATIONS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            let newId = response.body[response.body.length - 1].id + 1
            cy.request({
                method: "POST",
                url: ENDPOINT_POST_RESERVATION,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: {
                    "start": startDate,
                    "end": endDate,
                    "id": newId
                }
            }).then((response => {
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(reservationPayload.end)
            }))
            uppdateRequstAfterGet(cy)
        }))
    }))
}



module.exports = {
    createReservationRequestAfterGet,
    getAllReservationsRequst,
    createReservationRequstAndUpdate,
    createReservationRequstAndDelete
}