
import billsHelpers from '../helpers/billsHelpers'
import * as clientsHelpers from '../helpers/clientsHelpers'
import reservationsHelpers from '../helpers/reservationsHelpers'


//ropar metoden ovan och gör en get request mot "Clients"Api

describe('testing auth', function () {
    
    it('create a new client', function () {
        clientsHelpers.createClientRequstAfterGet(cy)

    })

    it('get alla kunder requst', function () {
        clientsHelpers.getAllClientsRequst(cy)

    })
    
    it('skapa en kund och ta bort den', function () {
        clientsHelpers.createClientRequstAndDelete(cy)

    })
    it('skapa en kund och ta uppdatera den', function () {
        clientsHelpers.createClientRequstAndUpdate(cy)

    })
   
    it('get alla bills requst', function () {
        billsHelpers.getAllBillsRequst(cy)

    })

    it('skapa en faktura och tar bort den', function () {
        billsHelpers.createBillRequstAndDelete(cy)

    })
    it('skapa en faktura och uppdatera den', function () {
        billsHelpers.createBillRequstAndUpdate(cy)

    })
    it('skapa en ny faktura', function () {
        billsHelpers.createBillRequstAfterGet(cy)

    })
    
    it('skapa en reservation och tar bort den', function () {
        reservationsHelpers.createReservationRequstAndDelete(cy)

    })

    it('skapa en reservation och uppdatera den', function () {
        reservationsHelpers.createReservationRequstAndUpdate(cy)

    })
    
    it('skapa en ny reservation', function () {
        reservationsHelpers.createReservationRequestAfterGet(cy)

    })
   
    
  
   

})