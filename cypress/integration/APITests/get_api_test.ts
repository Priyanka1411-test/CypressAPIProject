import { TestData } from './testData'
describe('api_test', () => {

    var baseUrl: string;
    let testDataRef = new TestData()
    beforeEach(function () {
        cy.fixture('config.json').then(data => {
            baseUrl = data.url;

        })

    })
    it('valid-get request', () => {
        cy.request('GET', baseUrl + '/posts/1').then(response => {
            expect(response).to.have.property('status', testDataRef.statusCodeOnPass);

            cy.log('response.JSON:', {
                message: 'Request received',
                data: JSON.stringify(response.body)

            })

        })

    })


    it('invalid-get request', () => {

        cy.request({
            method: 'GET',
            url: baseUrl + '/postss/1',
            failOnStatusCode: false
        }).then(response => {
            expect(response).to.have.property('status', testDataRef.statusCodeOnFail)
            cy.log('response.JSON:', {
                message: 'Request received',
                data: JSON.stringify(response.body)

            })


        })


    })


})



