/// <reference types="cypress" />

import { CY_SELECTORS, STRINGS } from 'src/app/@shared/enums';
import { environment } from 'src/environments/environment';

describe('Fluxo de Pesquisa e Paginação - Teste Técnico da PicPay (estudo)', () => {
  beforeEach(() => {
    cy.authenticationInApplication();
  });

  it('Deve verificar se o título da página está correto.', () => {
    cy.get(`#${CY_SELECTORS.SELECTOR_TITLE_MY_PAYMENTS}`).should('have.text', ` ${STRINGS.TITLE_MY_PAYMENTS} `);
  });

  it('Deve verificar se retornou resultado na busca.', () => {
    cy.requestPayments(1, 10).then(($response) => {
      expect($response.status).to.eq(200);
      expect($response.body).to.length(10);
      expect($response.allRequestResponses[0]['Request URL']).to.eq(`${environment.API_URL}/tasks?_page=1&_limit=10`);
    });
  });

  it('Deve preencher o input de "Pesquisa por usuário" e submeter a busca', () => {
    cy.fillInputSearch();

    cy.get(`#${CY_SELECTORS.SELECTOR_TABLE_PAYMENTS} table > tbody`)
      .find('tr')
      .should(($element) => {
        const child = $element[0].childNodes[1];
        expect(child).to.contain('Pennie Dumphries');
      });
  });

  it('Deve realizar paginação para próxima página e retornar para anterior', () => {
    cy.clock();
    cy.requestPayments(1, 10).then((response) => {
      if (response.body.length >= 10) {
        cy.get('.p-paginator-next').click();
        cy.get('.p-paginator-pages > :nth-child(1)').should('not.have.class', '.p-highlight');
        cy.get('.p-highlight').contains('2');
      }
    });
    cy.tick(500);
    cy.get('.p-paginator-prev').click();
    cy.get('.p-highlight').contains('1');
  });

  it('Deve alterar no dropdown a quantidade de items a ser retornados da API', () => {
    cy.get('.p-paginator-rpp-options').click();
    cy.get('[ng-reflect-label="20"] > .p-ripple > .ng-star-inserted').click();

    cy.get('#pr_id_4_label').should('have.text', '20');
  });

  it('Deve clicar no botão de Editar Pagamento e verificar se o modal foi aberto corretamente.', () => {
    cy.get(`#${CY_SELECTORS.SELECT_BTN_EDIT_PAYMENT}`).click();
    cy.get('#pr_id_1-label').should('have.text', STRINGS.TITLE_UPDATE_PAYMENTS);
  });

  it('Deve alterar username do primeiro registro da Listagem de Pagamentos', () => {
    cy.requestPayments(1, 10).then((response) => {
      if (response.body.length >= 10) {
        cy.get(`#${CY_SELECTORS.SELECT_BTN_EDIT_PAYMENT}`).click();
        cy.get(`#${CY_SELECTORS.SELECTOR_INPUT_FORM_NAME}`).clear();
        cy.get(`#${CY_SELECTORS.SELECTOR_INPUT_FORM_NAME}`).type('Cy-test{enter}');
      }
    });
  });

  it('Deve apagar um campo obrigatório e validar envio do formulário', () => {
    cy.requestPayments(1, 10).then((response) => {
      if (response.body.length >= 10) {
        cy.get(`#${CY_SELECTORS.SELECT_BTN_EDIT_PAYMENT}`).click();
        cy.get(`#${CY_SELECTORS.SELECTOR_INPUT_FORM_NAME}`).clear();
        cy.get(`#${CY_SELECTORS.SELECTOR_BTN_SAVE} > button`).should('be.disabled');
        cy.get(`form`).should('have.class', 'ng-invalid');
      }
    });
  });

  it('Deve fechar o modal corretamente', () => {
    cy.requestPayments(1, 10).then(({ body }) => {
      if (body.length >= 10) {
        cy.get(`#${CY_SELECTORS.SELECT_BTN_EDIT_PAYMENT}`).click();
        cy.get('.p-dialog-header-close-icon').should('be.visible').click();
      }
    });
  });

  it('Deve clicar em remover item e verificar se o dialog abriu corretamente', () => {
    cy.requestPayments(1, 10).then(({ body }) => {
      if (body.length >= 10) {
        cy.get(`#${CY_SELECTORS.SELECT_BTN_DELETE_PAYMENT}`).click();
        cy.get(`#pr_id_2-label`).should('have.text', `${STRINGS.TITLE_REMOVE_PAYMENT}`);
      }
    });
  });

  it('Deve remove o primeiro pagamento da Lista de Pagamentos', () => {
    cy.requestPayments(1, 10).then(({ body }) => {
      if (body.length >= 10) {
        cy.get(`#${CY_SELECTORS.SELECT_BTN_DELETE_PAYMENT}`).click();
        cy.get(`#${CY_SELECTORS.SELECTOR_BTN_DIALOG_CONFIRM}`).click();
      }
    });
  });
});
