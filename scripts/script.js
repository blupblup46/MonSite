var _a;
var activePage = document.getElementsByTagName("main")[0].getAttribute("activePage");
var details = document.querySelectorAll("details");
var burgerMenuButton = document.querySelector("body>div");
var nav = document.querySelector("body>nav");
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;
var CssClasses;
(function (CssClasses) {
    CssClasses["underlined"] = "underlined";
    CssClasses["isDisplayed"] = "isDisplayed";
    CssClasses["hidden"] = "hidden";
    CssClasses["visible"] = "visible";
})(CssClasses || (CssClasses = {}));
navHidder();
(_a = document.getElementById(activePage)) === null || _a === void 0 ? void 0 : _a.classList.add(CssClasses.underlined);
details.forEach(function (d) { return d.addEventListener("toggle", onDetailsOpen); });
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
window.addEventListener('resize', navHidder);
function navHidder() {
    if (viewportHeight < 600 || viewportWidth < 1000) {
        nav.classList.remove(CssClasses.visible);
        nav.classList.add(CssClasses.hidden);
    }
    else {
        nav.classList.add(CssClasses.visible);
        nav.classList.remove(CssClasses.hidden);
    }
}
