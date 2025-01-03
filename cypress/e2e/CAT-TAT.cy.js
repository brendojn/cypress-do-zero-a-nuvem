import '../support/commands';

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type("Brendo");
    cy.get('#lastName').type("Oliveira");
    cy.get('#email').type("brendojnio@gmail.com");
    cy.get('#open-text-area').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra nulla. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Ut pharetra augue nec augue. Nam elit magna, hendrerit sit amet, tincidunt ac, viverra sed, nulla. Donec porta diam eu massa. Quisque diam lorem, interdum vitae, dapibus ac, scelerisque vitae, pede. Donec eget tellus non erat lacinia fermentum. Donec in velit vel ipsum auctor pulvinar. Proin ullamcorper urna et felis.", { delay: 0 });

    cy.contains('button', "Enviar").click();

    cy.get('.success').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type("Brendo");
    cy.get('#lastName').type("Oliveira");
    cy.get('#email').type("brendojniogmail.com");
    cy.get('#open-text-area').type("Hey jude.", { delay: 0 });

    cy.contains('button', "Enviar").click();

    cy.get('.error').should('be.visible');
  })

  it('verifica se campo de telefone continua vazio após tentar digitar valores não numéricos', () => {
    cy.get('#phone')
        .type("adasdadadrgwfswf")
        .should('have.value', '');
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type("Brendo");
    cy.get('#lastName').type("Oliveira");
    cy.get('#email').type("brendojnio@gmail.com");
    cy.get('#open-text-area').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra nulla. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Ut pharetra augue nec augue. Nam elit magna, hendrerit sit amet, tincidunt ac, viverra sed, nulla. Donec porta diam eu massa. Quisque diam lorem, interdum vitae, dapibus ac, scelerisque vitae, pede. Donec eget tellus non erat lacinia fermentum. Donec in velit vel ipsum auctor pulvinar. Proin ullamcorper urna et felis.", { delay: 0 });
    cy.get('#phone-checkbox').check();
    cy.contains('button', "Enviar").click();

    cy.get('.error').should('be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
        .type("Brendo")
        .should('have.value', 'Brendo')
        .clear()
        .should('have.value', '');
    cy.get('#lastName')
        .type("Oliveira")
        .should('have.value', 'Oliveira')
        .clear()
        .should('have.value', '');
    cy.get('#email')
        .type("brendojnio@gmail.com")
        .should('have.value', 'brendojnio@gmail.com')
        .clear()
        .should('have.value', '');
    cy.get('#phone')
        .type("31999189156")
        .should('have.value', '31999189156')
        .clear()
        .should('have.value', '');
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', "Enviar").click();
    cy.get('.error').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const input = {
      name: "Brendo",
      lastName: "Oliveira",
      email: "brendojnio@gmail.com",
      phone: "31999189156",
      text: "Shulambs, Hello World. Deus é tudo na minha vida."
    }

    cy.fillMandatoryFieldsAndSubmitWithArgs(input);
    cy.get('.success').should('be.visible');
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
        .select('YouTube') // Texto visível no HTML
        .should('have.value', 'youtube');
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
        .select('mentoria') // Texto visível no HTML
        .should('have.value', 'mentoria');
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
        .select(1) // Texto visível no HTML
        .should('have.value', 'blog');
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('label:nth-child(4) input[type="radio"]')
        .check() // Texto visível no HTML
        .should('be.checked');
  })

  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]')
        .each((typeOfService) => {
          cy.wrap(typeOfService)
              .check()
              .should('be.checked');
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked');
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type=file]')
        .selectFile('cypress/fixtures/example.json')
        .should( input => {
          expect(input[0].files[0].name).to.eql('example.json')
        })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type=file]')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should( input => {
          expect(input[0].files[0].name).to.eql('example.json')
        })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('myFixture')
    cy.get('input[type=file]')
        .selectFile('@myFixture')
        .should( input => {
          expect(input[0].files[0].name).to.eql('example.json');
        })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'target', '_blank');
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click();

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
  })

  it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html');

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
    cy.contains('p', 'Talking About Testing').should('be.visible');
  })

})