import type { Viewer, Image } from './utils.js';

let imageIndexToDisplay: number = 0;

export function createElement(elementTag: string, innerHTML: string | null = null, attributes: Record<string, string> | null = null): HTMLElement {


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

export function appendChildren(element: HTMLElement, children: HTMLElement[]): HTMLElement {


    children.forEach(child => {
        element.appendChild(child);
    })
    return element;
}


export function createImgAsButton(callBack: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, attributes: Record<string, string> | null = null, src: string = "/images/chevron.png") {


    let button = createElement("img", null, { src })

    if (attributes != null) {
        Object.keys(attributes).forEach((key) => {
            button.setAttribute(key, attributes[key]);
        });
    }

    button.onclick = callBack;

    return button;
}


export function changeImage(e: MouseEvent, view: Viewer, images: Image[] | null | undefined) {

    imageIndexToDisplay += view;

    if (images != undefined) {
        if (imageIndexToDisplay < 0 && images) {
            imageIndexToDisplay = images.length - 1
        } else if (imageIndexToDisplay > images.length - 1) {
            imageIndexToDisplay = 0;
        }

        let figure = (e.target as HTMLElement).parentElement?.querySelector("figure") as HTMLElement;

        let img = figure.querySelector("img") as HTMLImageElement;

        figure.removeChild(img);

        img.src = images[imageIndexToDisplay].src;
        img.alt = images[imageIndexToDisplay].alt;
        img.title = images[imageIndexToDisplay].title;

        figure.appendChild(img);
    }
}
