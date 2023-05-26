async function loadTemplate(path) {
    const html = await fetch(path);
    const template = await html.text();
    return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

export async function loadHeaderFooter() {
    const path = "/partials/"
    let element = document.querySelector("header");
    let templateStr = await loadTemplate(`${path}header.html`);
    renderWithTemplate(templateStr, element)
    element = document.querySelector("footer");
    templateStr = await loadTemplate(`${path}footer.html`);
    renderWithTemplate(templateStr, element)
}