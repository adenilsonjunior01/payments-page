import { STRINGS, CY_SELECTORS } from 'src/app/@shared/enums';
/// <reference types="cypress" />

describe('Fluxo novo pagamento - Teste Técnico da PicPay (estudo)', () => {
  beforeEach(() => {
    cy.authenticationInApplication();
  });

  it('Deve clicar em Adicionar Pagamento e verificar se o Modal foi aberto.', () => {
    cy.openDialogNewPayment();
    cy.get('#pr_id_1-label').should('have.text', STRINGS.TITLE_ADD_PAYMENTS);
    cy.get('body').should('have.class', 'p-overflow-hidden');
  });

  it('Deve preencher os campos do formulário e verificar se o formulário é válido.', () => {
    cy.openDialogNewPayment();
    cy.fillInputsForm();
    cy.get(`#${CY_SELECTORS.SELECTOR_INPUT_FORM_DATA}`).type('01/01/2022');
    cy.get(`#${CY_SELECTORS.SELECTOR_BTN_SAVE}`).should('not.be.disabled');
  });

  it('Deve invalidar formulário e não permitir envio dos dados.', () => {
    cy.openDialogNewPayment();
    cy.fillInputsForm();
    cy.get(`#${CY_SELECTORS.SELECTOR_INPUT_FORM_DATA}`).type('aaaaaaaa');
    cy.get(`#${CY_SELECTORS.SELECTOR_BTN_SAVE} > button` ).should('be.disabled');
    cy.get(`form`).should('have.class', 'ng-invalid');
  });

  it('Deve abrir o modal e fecha-lo corretamente', () => {
    cy.openDialogNewPayment();
    cy.get('.p-dialog-header-icons > .p-ripple').click();
    cy.get('body').should('not.have.class', 'p-overflow-hidden');
  });
});
