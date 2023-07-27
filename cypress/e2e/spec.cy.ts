import "@4tw/cypress-drag-drop";

const url = "http://localhost:3000/";
const login = "test-user@yandex.ru";
const password = "12435687";

const loginEmailInput = "input[data-test=login-email-input]";
const loginPasswordInput = "input[data-test=login-password-input]";
const burgerConstructor = "div[data-test=burger-constructor]";
const orderNumber = "p[data-test=order-number]";
const modalHeader = "h2[data-test=modal-header]";
const ingredientName = "p[data-test=ingredient-name]";

describe("burger constructor test", () => {
  it("should drag ingredients and create order", () => {
    cy.viewport(1300, 900);
    cy.visit(`${url}login`);

    cy.get(loginEmailInput).type(login);
    cy.get(loginPasswordInput).type(password);
    cy.get("button").contains("Войти").click();

    cy.get("#bun div a").first().drag(burgerConstructor);
    cy.get("#sauce div a").first().drag(burgerConstructor);
    cy.get("#main div a").first().drag(burgerConstructor);

    cy.get("button").contains("Оформить заказ").click();
    cy.get(orderNumber, { timeout: 30000 }).should("be.visible");
  });

  it("should open modal", () => {
    cy.viewport(1300, 900);
    cy.visit(url);

    cy.get("#bun div a").first().click();
    cy.get(modalHeader, { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Детали ингредиента");
    cy.get(ingredientName).should("be.visible");

    cy.get(modalHeader).next().click();
    cy.url().should("eq", url);
  });
});
