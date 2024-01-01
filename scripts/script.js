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
var details = document.querySelectorAll("details");
var projectsNav = document.querySelector("nav:nth-child(2)");
var burgerMenuButton = document.querySelector("body>div");
var nav = document.querySelector("body>nav");
var main = document.querySelector("main");
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;
var projectList = new Map();
var CssClasses;
(function (CssClasses) {
    CssClasses["underlined"] = "underlined";
    CssClasses["isDisplayed"] = "isDisplayed";
    CssClasses["hidden"] = "hidden";
    CssClasses["visible"] = "visible";
})(CssClasses || (CssClasses = {}));
init();
switch (activePage) {
    case "Projects":
        buildProjects();
}
function onDetailsOpen() {
    var _this = this;
    if (this.open) {
        details.forEach(function (d) {
            if (_this != d) {
                d.open = false;
            }
        });
    }
}
;
function navHidder() {
    if (viewportHeight < 600 || viewportWidth < 1000) {
        nav.classList.remove(CssClasses.visible);
        nav.classList.add(CssClasses.hidden);
    }
    else {
        nav.classList.remove(CssClasses.visible);
        nav.classList.remove(CssClasses.hidden);
    }
}
function init() {
    var _a;
    (_a = document.getElementById(activePage)) === null || _a === void 0 ? void 0 : _a.classList.add(CssClasses.underlined);
    window.addEventListener('resize', navHidder);
    navHidder();
    burgerMenuButton === null || burgerMenuButton === void 0 ? void 0 : burgerMenuButton.addEventListener("click", function () {
        console.log("click");
        if (nav.classList.contains(CssClasses.hidden)) {
            nav.classList.remove(CssClasses.hidden);
            nav.classList.add(CssClasses.visible);
        }
        else {
            nav.classList.remove(CssClasses.visible);
            nav.classList.add(CssClasses.hidden);
        }
    });
}
function buildProjects() {
    details.forEach(function (d) { return d.addEventListener("toggle", onDetailsOpen); });
    loadProjects()
        .then(function (projects) {
        Object.keys(projects).forEach(function (context) {
            var projectsMap = new Map();
            projects[context].forEach(function (p) {
                console.log(p);
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
        var summary = document.createElement("summary");
        var ul = document.createElement("ul");
        summary.innerText = context;
        details.appendChild(summary);
        projects.forEach(function (project) {
            var li = document.createElement("li");
            li.innerText = project.title;
            li.addEventListener("click", buildProject);
            ul.appendChild(li);
        });
        details.appendChild(ul);
        projectsNav.appendChild(details);
    });
}
function buildProject(event) {
    var _a;
    var projectClickContext = event.target.parentNode.previousElementSibling.innerText;
    var project = (_a = projectList.get(projectClickContext)) === null || _a === void 0 ? void 0 : _a.get(event.target.innerText);
}
function loadProjects() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch("/scripts/project.json")
                    .then(function (response) { return response.json(); })];
        });
    });
}
