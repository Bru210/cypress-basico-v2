   //como adiciona um novo comando no cypress, nomeia o comando, insere a função de callback e coloca teste
   Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Bruna')
    cy.get('#lastName').type('Abreu')
    cy.get('#email').type('brunasantosdeabreu@outlook.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click() //também insere o elemento aqui no comando customizado
    })
