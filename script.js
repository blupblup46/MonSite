var _a;
var activePage = document.getElementsByTagName("main")[0].getAttribute("activePage");
var details = document.querySelectorAll("details");
var CssClasses;
(function (CssClasses) {
    CssClasses["underlined"] = "underlined";
})(CssClasses || (CssClasses = {}));
(_a = document.getElementById(activePage)) === null || _a === void 0 ? void 0 : _a.classList.add(CssClasses.underlined);
details.forEach(function (d) { return d.addEventListener("toggle", onDetailsOpen); });
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
