import { Pages } from "../../types/types";
import { render404PageContent } from "./404";

describe("render404PageContent function", () => {
  it("should render the 404 page content correctly", () => {
    const expectedContent = `
      <div class="error-404-wrapper">
        <div class="error-404-text">Что-то пошло не так! Страница не найдена...</div>
        <div class="error-404">
          <p>4</p>
          <img src="../public/animation/404.gif" alt="404 error">
          <p>4</p>
        </div>
        <a href="${Pages.ROOT}" class="link-from-404">Вернуться на главную страницу ===>>></a>
      </div>
    `;

    const renderedContent = render404PageContent();

    expect(renderedContent).toBe(expectedContent);
  });
});
