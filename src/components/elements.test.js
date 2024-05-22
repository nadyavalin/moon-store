import { createSvgElement } from "./elements";

describe("createSvgElement function", () => {
  it("should create an SVG element with the provided SVG string and optional class name", () => {
    const svgString = '<rect width="100" height="100" fill="blue" />';
    const className = "custom-svg-class";
    const svgElement = createSvgElement(svgString, className);
    expect(svgElement.tagName).toBe("svg");
    expect(svgElement.innerHTML).toBe(svgString);
    expect(svgElement.classList.contains(className)).toBe(true);
  });

  it("should create an SVG element without class name if not provided", () => {
    const svgString = '<circle cx="50" cy="50" r="40" fill="green" />';
    const svgElement = createSvgElement(svgString);

    expect(svgElement.tagName).toBe("svg");
    expect(svgElement.innerHTML).toBe(svgString);
    expect(svgElement.classList.length).toBe(0);
  });
});
