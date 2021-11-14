"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
var createCourse = function (req, res) {
    CreateCourseService_1.default.execute({
        name: 'NodeJS',
        duration: 10,
        educator: 'Douglas "Amarelo" Lopes',
    });
    CreateCourseService_1.default.execute({
        name: 'NodeJS 2',
        educator: 'Douglas "Amarelo" Lopes 2',
    });
};
exports.createCourse = createCourse;
