
export enum CssClasses {
    underlined = "underlined",
    isDisplayed = "isDisplayed",
    hidden = "hidden",
    visible = "visible",
}

export enum Viewer {
    previous = -1,
    next = +1
}

export interface Project {
    readonly title: string;
    readonly context: string;
    readonly details: string;
    readonly tools: string;
    readonly learned: string;
    readonly images: Image[]
}

export interface Image {
    readonly src: string;
    readonly alt: string;
    readonly title: string;
}

export interface Experience{
    readonly topic: string;
    readonly period:string;
    readonly company:string;
    readonly context: string;
    readonly details: string;
    readonly learned: Learned[];
}


export interface Learned{
    readonly element: string;
    readonly comment: string;
}