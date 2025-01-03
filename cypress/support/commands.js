 Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
        cy.get('#firstName').type("Brendo");
        cy.get('#lastName').type("Oliveira");
        cy.get('#email').type("brendojnio@gmail.com");
        cy.get('#open-text-area').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra nulla. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Ut pharetra augue nec augue. Nam elit magna, hendrerit sit amet, tincidunt ac, viverra sed, nulla. Donec porta diam eu massa. Quisque diam lorem, interdum vitae, dapibus ac, scelerisque vitae, pede. Donec eget tellus non erat lacinia fermentum. Donec in velit vel ipsum auctor pulvinar. Proin ullamcorper urna et felis.", { delay: 0 });
        cy.contains('button', "Enviar").click();
    })

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithArgs', input => {
        cy.get('#firstName').type(input.name);
        cy.get('#lastName').type(input.lastName);
        cy.get('#email').type(input.email);
        cy.get('#open-text-area').type(input.text, { delay: 0 });

        cy.contains('button', "Enviar").click();
})