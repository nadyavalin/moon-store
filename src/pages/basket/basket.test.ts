import renderBasketContent from "./basket";

describe("renderBasketContent function", () => {
  it("should return the correct HTML content for the Basket page", () => {
    const expectedHTML = `
      <div class="basket-page">
          This is the Basket page!
      </div>
  `;

    const actualHTML = renderBasketContent();

    expect(actualHTML).toEqual(expectedHTML);
  });
});
