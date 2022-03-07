import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => {

    /*     before(function() {
            cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
        })
    
        beforeEach(function() {
            cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
        })
    
        after(function() {
            cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
        })
    
        afterEach(function() {
            cy.log('Tudo aqui é executado uma única vez DEPOIS de CADA os casos de testes')
        }) */

    it('User should be deliver', () => {

        var deliver = signupFactory.deliver()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', () => {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141aa'

        const alertMessageShouldBe = 'Oops! CPF inválido'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe(alertMessageShouldBe)
    })


    it('Incorrect email', () => {

        var deliver = signupFactory.deliver()

        deliver.email = 'rony.sena.gmail.com'

        const expectedMessage = 'Oops! Email com formato inválido.'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe(expectedMessage)
    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            signup.go()
            signup.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is require`, function () {
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})