"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateCourseService = /** @class */ (function () {
    function CreateCourseService() {
    }
    CreateCourseService.prototype.execute = function (_a) {
        var name = _a.name, duration = _a.duration, educator = _a.educator;
        console.log("Creating course " + name + (duration ? " with duration of " + duration : '') + ", by " + educator);
    };
    return CreateCourseService;
}());
exports.default = new CreateCourseService();
