var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var activePage = document.getElementsByTagName("main")[0].getAttribute("activePage");
var projectsNav = document.querySelector("body nav + nav");
var burgerMenuButton = document.querySelector("body>div");
var navs = document.querySelectorAll("nav");
var main = document.querySelector("main");
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;
var projectList = new Map();
var imageIndexToDisplay = 0;
var CssClasses;
(function (CssClasses) {
    CssClasses["underlined"] = "underlined";
    CssClasses["isDisplayed"] = "isDisplayed";
    CssClasses["hidden"] = "hidden";
    CssClasses["visible"] = "visible";
})(CssClasses || (CssClasses = {}));
var ImageViewer;
(function (ImageViewer) {
    ImageViewer[ImageViewer["previous"] = -1] = "previous";
    ImageViewer[ImageViewer["next"] = 1] = "next";
})(ImageViewer || (ImageViewer = {}));
init();
switch (activePage) {
    case "Projects":
        buildProjects();
}
function hideNavs() {
    if (viewportHeight < 600 || viewportWidth < 1000)
        navs.forEach(function (nav) {
            nav.classList.add(CssClasses.hidden);
            nav.classList.remove(CssClasses.visible);
        });
}
function displayNavs() {
    if (viewportHeight < 600 || viewportWidth < 1000)
        navs.forEach(function (nav) {
            nav.classList.remove(CssClasses.hidden);
            nav.classList.add(CssClasses.visible);
        });
}
function onDetailsOpen() {
    var _this = this;
    if (this.open) {
        document.querySelectorAll("details").forEach(function (d) {
            if (_this != d) {
                d.open = false;
            }
        });
    }
}
;
function onResizeNavHidder() {
    if (viewportHeight < 600 || viewportWidth < 1000) {
        navs.forEach(function (nav) {
            nav.classList.remove(CssClasses.visible);
            nav.classList.add(CssClasses.hidden);
        });
    }
    else {
        navs.forEach(function (nav) {
            nav.classList.remove(CssClasses.visible);
            nav.classList.remove(CssClasses.hidden);
        });
    }
}
function init() {
    var _a;
    (_a = document.getElementById(activePage)) === null || _a === void 0 ? void 0 : _a.classList.add(CssClasses.underlined);
    window.addEventListener('resize', onResizeNavHidder);
    onResizeNavHidder();
    burgerMenuButton === null || burgerMenuButton === void 0 ? void 0 : burgerMenuButton.addEventListener("click", function () {
        if (navs[0].classList.contains(CssClasses.hidden)) {
            displayNavs();
        }
        else {
            hideNavs();
        }
    });
}
function buildProjects() {
    loadProjects()
        .then(function (projects) {
        Object.keys(projects).forEach(function (context) {
            var projectsMap = new Map();
            projects[context].forEach(function (p) {
                projectsMap.set(p.title, p);
            });
            projectList.set(context, projectsMap);
        });
    })
        .then(function () { return buildProjectNav(); });
}
function buildProjectNav() {
    projectList.forEach(function (projects, context) {
        var details = document.createElement("details");
        details.addEventListener("toggle", onDetailsOpen);
        var summary = document.createElement("summary");
        var ul = document.createElement("ul");
        summary.innerHTML = context;
        details.appendChild(summary);
        projects.forEach(function (project) {
            var li = document.createElement("li");
            li.innerHTML = project.title;
            li.addEventListener("click", buildProjectHTML);
            li.addEventListener("click", hideNavs);
            ul.appendChild(li);
        });
        details.appendChild(ul);
        projectsNav.appendChild(details);
    });
    buildProjectHTML(null, projectList.values().next().value.values().next().value);
    document.querySelectorAll("details")[0].open = true;
    document.querySelectorAll("summary")[0].classList.add(CssClasses.underlined);
    document.querySelectorAll("details li")[0].classList.add(CssClasses.underlined);
}
function buildProjectHTML(event, project) {
    if (project === void 0) { project = null; }
    imageIndexToDisplay = 0;
    main.innerHTML = "";
    var clickedProject = projectList.values().next().value.values().next().value;
    if (event != null) {
        document.querySelectorAll("details li").forEach(function (s) { return s.removeAttribute("class"); });
        event.target.classList.add(CssClasses.underlined);
        document.querySelectorAll("summary").forEach(function (s) { return s.removeAttribute("class"); });
        event.target.parentNode.previousElementSibling.classList.add(CssClasses.underlined);
        var projectClickContext = event.target.parentNode.previousElementSibling.innerText;
        var projects = projectList.get(projectClickContext);
        if (projects != undefined) {
            var project_1 = projects.get(event.target.innerText);
            if (project_1 != undefined) {
                clickedProject = project_1;
            }
            else {
                throw new Error('No project given');
            }
        }
    }
    else {
        if (project != null) {
            clickedProject = project;
        }
        else {
            throw new Error('No project given');
        }
    }
    var projectSection = createElement("section");
    appendChildren(projectSection, [
        createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.context),
        createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.details),
        appendChildren(createElement("div"), [
            createElement("h3", "Outils"),
            createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.tools)
        ]),
        appendChildren(createElement("div"), [
            createElement("h3", "Acquis"),
            createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.learned)
        ]),
    ]);
    var image = clickedProject.images[imageIndexToDisplay];
    var figureSelectorContainer = createElement("div", null, { "class": "figures-container" });
    appendChildren(figureSelectorContainer, [createImgAsButton(function (e) { return changeImage(e, ImageViewer.previous, clickedProject.images); }, { "class": "image-button" }),
        appendChildren(createElement("figure"), [createElement("img", null, { src: image.src, alt: image.alt, title: image.title })]),
        createImgAsButton(function (e) { return changeImage(e, ImageViewer.next, clickedProject.images); }, { "class": "image-button previousButton" })
    ]);
    appendChildren(main, [
        createElement("h2", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.title),
        appendChildren(createElement("div", null, { "class": "project-container" }), [
            projectSection,
            figureSelectorContainer
        ])
    ]);
}
function changeImage(e, view, images) {
    var _a;
    imageIndexToDisplay += view;
    if (imageIndexToDisplay < 0) {
        imageIndexToDisplay = images.length - 1;
    }
    else if (imageIndexToDisplay > images.length - 1) {
        imageIndexToDisplay = 0;
    }
    var figure = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector("figure");
    var img = figure.querySelector("img");
    figure.removeChild(img);
    img.src = images[imageIndexToDisplay].src;
    img.alt = images[imageIndexToDisplay].alt;
    img.title = images[imageIndexToDisplay].title;
    figure.appendChild(img);
}
function loadProjects() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch("/scripts/project.json")
                    .then(function (response) { return response.json(); })];
        });
    });
}
function createElement(elementTag, innerHTML, attributes) {
    if (innerHTML === void 0) { innerHTML = null; }
    if (attributes === void 0) { attributes = null; }
    var element = document.createElement(elementTag);
    if (innerHTML != null) {
        element.innerHTML = innerHTML;
    }
    if (attributes != null) {
        Object.keys(attributes).forEach(function (key) {
            element.setAttribute(key, attributes[key]);
        });
    }
    return element;
}
function appendChildren(element, children) {
    children.forEach(function (child) {
        element.appendChild(child);
    });
    return element;
}
function createImgAsButton(callBack, attributes, src) {
    if (attributes === void 0) { attributes = null; }
    if (src === void 0) { src = "/images/chevron.png"; }
    var button = createElement("img", null, { src: src });
    if (attributes != null) {
        Object.keys(attributes).forEach(function (key) {
            button.setAttribute(key, attributes[key]);
        });
    }
    button.onclick = callBack;
    return button;
}
