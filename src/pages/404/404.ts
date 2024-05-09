export function render404PageContent() {
  const animation404 = "../public/animation/404.gif";
  return `
  <div class="error-404-wrapper">
    <div class="error-404-text">Что-то пошло не так! Страница не найдена...</div>
    <div class="error-404">
      <p>4</p>
      <img src=${animation404} alt="404 error">
      <p>4</p>
    </div>
    <a href="#main">Вернуться на главную страницу ===>>></a>
  </div>`;
}

export default render404PageContent;
