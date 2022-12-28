/// <reference types="cypress" />

import { CY_SELECTORS } from "src/app/@shared/enums";
import { environment } from "src/environments/environment";

describe('Implementando Cypress - Teste Técnico da PicPay (estudo)', () => {
  beforeEach(() => {
    cy.visit(`${ environment.LOCAL_URL }/login`);
  });

  it('Verifica titulo da pagina', () => {
    cy.get('[data-cy="title-login"]')
      .should('have.class', 'font-semibold')
      .and('have.class', 'm-0');
  });

  it('Preenche campo de e-mail e invalida o botão de Login', () => {
    cy.get(`#${ CY_SELECTORS.SELECTOR_EMAIL }`)
      .type('usuario@gmail.com');

    cy.get(`button`)
      .should('be.disabled');
  });

  it('Preenche campo de senha e invalida o botão de Login', () => {
    cy.get(`#${ CY_SELECTORS.SELECTOR_PASSWORD }`)
      .type('usuario');

    cy.get(`button`)
      .should('be.disabled');
  });

  it('Preenche campo de e-mail e senha e realiza o login', () => {
   cy.fillInputsEmailAndPassword();
    cy.get(`button`).should(($btn) => {
      expect(String($btn[0].disabled)).to.equal('false');
    });

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/account`
    }).then(($response) => {
      expect($response.status).to.eq(200);
      expect($response.body).to.have.length(1);
    });

    cy.contains(`button`, `Entrar`).click();
  });

});
