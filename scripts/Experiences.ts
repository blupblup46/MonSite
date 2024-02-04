import { appendChildren, changeImage, createElement, createImgAsButton } from "./DOM.js";
import { Viewer, type Experience } from "./utils.js";




export class ExperiencesLoader {
    main: HTMLElement;

    private experiencesHTML: Array<HTMLElement>;
    private indexToShow: number = -1;

    constructor() {
        this.main = document.querySelector("main") as HTMLElement;
        this.experiencesHTML = new Array();
        this.build();
    }

    show(viewer: Viewer){
        this.indexToShow += viewer;

        if (this.indexToShow  < 0) {
            this.indexToShow  = this.experiencesHTML.length - 1
        } else if (this.indexToShow  > this.experiencesHTML.length - 1) {
            this.indexToShow  = 0;
        }

        this.main.innerHTML = "";

        appendChildren(
            this.main,
            [
                createImgAsButton(() => this.show(Viewer.previous),  { class: "image-button previousButton"}),
                this.experiencesHTML[this.indexToShow],
                createImgAsButton(() => this.show(Viewer.next),  { class: "image-button"}),

            ]
        )

    }

    build() {
        this.load().then(experiences => {
            let mappedExperiences = new Map(Object.entries(experiences));
            mappedExperiences.forEach((experience: Experience, topic: string) => {
                const details = this.buildDetails(experience);
                const learned = this.buildLearned(experience);

                this.experiencesHTML.push(
                    appendChildren(
                        createElement("article", null, {class:"experience-container"}),
                        [
                            createElement("h1", topic),
                            createElement("h3", experience.period),
                            appendChildren(
                                createElement("section"),
                                [
                                    details,
                                    learned
                                ]
                            )
                        ]
                    )
                )
                console.log(this.experiencesHTML)
            })
        })
        .then(() => this.show(Viewer.next))
    }

    private buildDetails(experience: Experience) {

        let details = appendChildren(
            createElement("div", null, { class: "details" }),
            [
                appendChildren(
                    createElement("div"),
                    [
                        createElement("h3", "Lieu"),
                        createElement("p", experience.company)
                    ]
                ),
                appendChildren(
                    createElement("div"),
                    [
                        createElement("h3", "Contexte"),
                        createElement("p", experience.context)
                    ]
                )
            ]
        )

        return appendChildren(
            createElement("section", null, { class: "description" }),
            [
                details,
                createElement("p", experience.details)
            ]
        )

    }

    private buildLearned(experience: Experience) {
        let learned : HTMLElement[]= []; 
        learned.push(createElement("h3", "Acquis"));

        Object.values(experience.learned).forEach((elementLearned) => {
            learned.push(
                appendChildren(
                    createElement("div"),
                    [
                        createElement("h3", elementLearned.element),
                        createElement("p", elementLearned.comment)
                    ]
                )
            )
        });

        return appendChildren(
            createElement("section", null, {class: "learned"}),
            learned
        )
    }

    async load(): Promise<Map<string, Experience[]>> {
        return fetch("/ressources/experiences.json")
            .then(response => response.json());
    }
}