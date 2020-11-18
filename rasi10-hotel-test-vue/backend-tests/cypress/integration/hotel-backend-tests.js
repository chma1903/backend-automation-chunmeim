
import * as clientsHelpers from '../helpers/clientsHelpers'


//ropar metoden ovan och gör en get request mot "Clients"Api

describe('testing auth', function () {
    it('create a new client', function () {
        clientsHelpers.createClientRequst(cy)

    })


    it('get alla kunder requst', function () {
        clientsHelpers.getAllClientsRequst(cy)

    })

    it.only('skapa en kund och ta bort den', function () {
        clientsHelpers.createClientRequstAndDelete(cy)

    })
})

