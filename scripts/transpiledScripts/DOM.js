let imageIndexToDisplay = 0;
export function createElement(elementTag, innerHTML = null, attributes = null) {
    let element = document.createElement(elementTag);
    if (innerHTML != null) {
        element.innerHTML = innerHTML;
    }
    if (attributes != null) {
        Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
        });
    }
    return element;
}
export function appendChildren(element, children) {
    children.forEach(child => {
        element.appendChild(child);
    });
    return element;
}
export function createImgAsButton(callBack, attributes = null, src = "/images/chevron.png") {
    let button = createElement("img", null, { src });
    if (attributes != null) {
        Object.keys(attributes).forEach((key) => {
            button.setAttribute(key, attributes[key]);
        });
    }
    button.onclick = callBack;
    return button;
}
export function changeImage(e, view, images) {
    var _a;
    imageIndexToDisplay += view;
    if (images != undefined) {
        if (imageIndexToDisplay < 0 && images) {
            imageIndexToDisplay = images.length - 1;
        }
        else if (imageIndexToDisplay > images.length - 1) {
            imageIndexToDisplay = 0;
        }
        let figure = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector("figure");
        let img = figure.querySelector("img");
        figure.removeChild(img);
        img.src = images[imageIndexToDisplay].src;
        img.alt = images[imageIndexToDisplay].alt;
        img.title = images[imageIndexToDisplay].title;
        figure.appendChild(img);
    }
}
