describe('Who is that pokemon flux', () => {
  beforeEach(() => {
    cy.fixture('buildResponse').then((buildResponseMock) => {
      cy.intercept('http://localhost:3333/api/build', buildResponseMock).as(
        'build'
      );
    });

    cy.fixture('actionCorrectAnswerResponse').then(
      (actionCorrectAnswerMock) => {
        cy.intercept(
          'http://localhost:3333/api/action',
          actionCorrectAnswerMock
        ).as('action');
      }
    );

    cy.visit('/who-is-that-pokemon');
  });

  it('should display title', () => {
    cy.contains('Who is that Pokémon?');
  });

  it('should display the options', () => {
    cy.fixture('buildResponse').then((buildResponseMock) => {
      cy.wait('@build')
        .its('response.body.pokemonOptions')
        .should('deep.equal', buildResponseMock.pokemonOptions);

      buildResponseMock.pokemonOptions.map((option, index) =>
        cy.get(`[data-cy=option-${index}]`).contains(option)
      );
    });
  });

  it('should choose correct answer', () => {
    cy.get('[data-cy=score').contains(0);

    cy.get('[data-cy=option-2]')
      .click()
      .wait('@action')
      .then((rqx) => {
        cy.wrap(rqx.request.body).should('deep.equal', {
          type: 'CHECK_ANSWER',
          payload: {
            correctAnswer: 'pikachu',
            currentPoints: 0,
            selectedAnswer: 'pikachu',
          },
        });

        cy.wrap(rqx.response.body).should('deep.equal', {
          correctAnswer: 'pikachu',
          gameOver: false,
          isAnswerCorrect: true,
          score: 1,
        });
      });

    cy.get('[data-cy=score').contains(1);
  });
});
