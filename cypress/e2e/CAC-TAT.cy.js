describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html') // beforeEach é como se antes de cada teste rodar, ele tem que rodar essa função para acessar a aplicação, ou seja antes de cada teste
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') //valida o título
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'teste, teste, teste, teste,teste, teste, teste, teste, teste, teste, teste, teste'

    cy.get('#firstName').type('Bruna')
    cy.get('#lastName').type('Abreu')
    cy.get('#email').type('brunasantosdeabreu@outlook.com')
    cy.get('#open-text-area').type(longText, {delay: 0}) // exercício extra 1 
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
  // exercício extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , function() {
    cy.get('#firstName').type('Bruna')
    cy.get('#lastName').type('Abreu')
    cy.get('#email').type('brunasantosdeabreu@outlook,com')
    cy.get('#open-text-area').type('teste e-mail inválido') 
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  // exercício extra 3 Visto que o campo de telefone só aceita números, crie um teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio.
  it('campo telefone continua vazio quando preenchido com valor não numérico' , function() {

    cy.get('#phone')
      .type('abcdefg')
      .should('have.value', '') 
  })
  //exercicio 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Bruna')
    cy.get('#lastName').type('Abreu')
    cy.get('#email').type('brunasantosdeabreu@outlook.com')
    cy.get('#phone-checkbox').click() //clicar no checkbox do telefone que é obrigatório
    cy.get('#open-text-area').type('teste e-mail inválido') 
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible') // mas ele irá dar erro pq o checkbox do telefone foi marcado mas o telefone não foi digitado
  })
  // exercicio 5 Limpa um campo, para posterior digitação, por exemplo.
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Bruna')
      .should('have.value', 'Bruna')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Abreu')
      .should('have.value', 'Abreu')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('brunasantosdeabreu@outlook.com')
      .should('have.value', 'brunasantosdeabreu@outlook.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })
  //exercicio 6 não preencher campos obrigatórios e enviar mensagem de erro na tela
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() {
    cy.get('button[type="submit"]').click() //como não preencheu nenhum campo e enviou no botão submit, ele estoura o erro em tela
    
    cy.get('.error').should('be.visible')
  })
  //exercício 7 Comandos customizados 
  it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit() // chama o comando criado no arquivo commands e este comando foi importado no arquivo e2e.js

      cy.get('.success').should('be.visible')
  })
  //exercício 8 cy.contains utiliza o seletor css e o seu texto contido nele quando o seu texto é único
  it('cy.contains', function(){
      cy.get('#firstName').type('Bruna')
      cy.get('#lastName').type('Abreu')
      cy.get('#email').type('brunasantosdeabreu@outlook.com')
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click() //seletor css e depois é um argumento do tipo texto que é contido no elemento
  
      cy.get('.success').should('be.visible')
    })
//Exercício - sessão 4 do curso, select (pode ser por texto, valor ou índice) texto
    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
        .select('Blog') //seleciona a opção do tipo texto
        .should('have.value', 'blog') // verifica se a opção seleciona é a esperada, validando o valor e não o texto na verificação
    })

// Exercício extra 1 valor
  it('seleciona um produto (Mentoria) por seu valor', function() {
    cy.get('#product')
      .select('mentoria') //seleciona a opção do tipo valor
      .should('have.value', 'mentoria') // verifica se a opção seleciona é a esperada, validando o valor e não o texto na verificação
})
//Exercício extra 2 índice
    it('sleciona um produto (Blog) por seu índice', function() {
      cy.get('#product')
        .select(1) //seleciona a opção do tipo índice, só conta a partir do 1
        .should('have.value', 'blog') // verifica se a opção seleciona é a esperada, validando o índice na verificação
    })
//Aula 04 - Marcando inputs do tipo radio
// Exercício marcar radio button do tipo de atendimento feedback
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]') // marcando o botão pelo seu seletor css (propriedades)
        .check() // marca o botão radio
        .should('have.value', 'feedback') // verifica se o valor esperado foi marcado
    })
// Exercício extra 1 marcar cada tipo de atendimento
    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]') // selecionando todos os tipos do botão radio (3)
        .should('have.length', 3) // definindo a qtd de opções que o botão possui
        .each(function($radio) { // pra cada radio ele verifica se foi selecionado
          cy.wrap($radio).check() // wrap empacota o elemento pra verificar cada um
          cy.wrap($radio).should('be.checked')
        })
    })
// Marcando e desmarcando inputs do tipo checkbox - Exercício
    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check() // marca ambos os checkboxes (2)
        .should('be.checked') // valida que ambos estão marcados
        .last() // pega o último checkbox
        .uncheck() // desmarca o último checkbox
        .should('not.be.checked') // valida que o último foi desmarcado
    })
// Exercíco extra 1
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Abreu')
        cy.get('#email').type('brunasantosdeabreu@outlook.com')
        cy.get('#phone-checkbox').check() //marca o checkbox do telefone
        cy.get('#open-text-area').type('teste marcar checkbox') 
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible') // mas ele irá dar erro pq o checkbox do telefone foi marcado mas o telefone não foi digitado
      })
// Fazendo upload de arquivos com Cypress
// Exercício 
      it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
        cy.get('input[type="file"]')
          .should('not.have.value') // verifica que não tem nada selecionado
          .selectFile('./cypress/fixtures/example.json') // passa o caminho do arquivo e faz o upload do arquivo
          .should(function($input) { // verifica que o arquivo foi selecionado com uma função callback
            expect($input[0].files[0].name).to.equal('example.json') //após a seleção do arquivo, é persistido no objeto de files do input
          }) 
      })
// Exercício extra 1 - Simulando arquivo drag and drop
      it('Seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('#file-upload')
        cy.get('input[type="file"]')
          .should('not.have.value') // verifica que não tem nada selecionado
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'}) // passa o caminho do arquivo, a action é um objeto e passa um argumento drag-drop pra simular que o arquivo foi arrastado
          .should(function($input) { // verifica que o arquivo foi selecionado com uma função callback
            expect($input[0].files[0].name).to.equal('example.json') //após a seleção do arquivo, é persistido no objeto de files do input
          }) 
      })
  // Exercício extra 2 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile') //pega a fixture example, o 'as' dá o nome para a fixture de sampleFile
    cy.get('input[type="file"]')
      .selectFile('@sampleFile') //passa o nome da fixture com o @ na frente
      .should(function($input) { // verifica que o arquivo foi selecionado com uma função callback
        expect($input[0].files[0].name).to.equal('example.json') //após a seleção do arquivo, é persistido no objeto de files do input
      }) 
    })
  //Exercício - links (Alternativa 1)
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank') //link da política de privacidade da aplicação com a âncora 'a',sem precisar clicar ele verifica que a nova aba será aberta
    })
  //Exercício 1 extra - links (Alternativa 2)
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target') //removendo o target com a funcionalidade invoke 
    .click() // então clicando no link para abrir na mesma página que o cypress está rodando
    
    cy.contains('Talking About Testing').should('be.visible') //verifica que na página aberta há esse texto
  })
  // Exercício extra 2 - Desafio > feito no arquivo privacy.spec.js





})