import { renderAboutUsContent } from "./about";

describe("renderAboutUsContent function", () => {
  it("should render About Us page content correctly", () => {
    const expectedContent = `
      <div class="about-us-page">
          This is the About Us page!
      </div>
    `;

    const renderedContent = renderAboutUsContent();

    expect(renderedContent).toBe(expectedContent);
  });
});
