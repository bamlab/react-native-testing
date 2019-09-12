"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
//@ts-ignore
const react_native_toaster_1 = __importDefault(require("react-native-toaster"));
const react_redux_1 = require("react-redux");
const selectors_1 = require("../modules/toaster/selectors");
exports.Toaster = () => {
    const toasterMessage = react_redux_1.useSelector(selectors_1.toasterMessageSelector);
    return react_1.default.createElement(react_native_toaster_1.default, { message: toasterMessage });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL21hdHRoaWV1L3Byb2plY3RzL1Rlc3RFeGFtcGxlcy9zcmMvY29tcG9uZW50cy9Ub2FzdGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUFpRDtBQUNqRCxZQUFZO0FBQ1osZ0ZBQWtEO0FBQ2xELDZDQUEwQztBQUUxQyw0REFBc0U7QUFFekQsUUFBQSxPQUFPLEdBQTBCLEdBQUcsRUFBRTtJQUNqRCxNQUFNLGNBQWMsR0FBRyx5QkFBVyxDQUFDLGtDQUFzQixDQUFDLENBQUM7SUFFM0QsT0FBTyw4QkFBQyw4QkFBYyxJQUFDLE9BQU8sRUFBRSxjQUFjLEdBQUksQ0FBQztBQUNyRCxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL21hdHRoaWV1L3Byb2plY3RzL1Rlc3RFeGFtcGxlcy9zcmMvY29tcG9uZW50cy9Ub2FzdGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG4vL0B0cy1pZ25vcmVcbmltcG9ydCBUb2FzdGVyTWVzc2FnZSBmcm9tICdyZWFjdC1uYXRpdmUtdG9hc3Rlcic7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgdG9hc3Rlck1lc3NhZ2VTZWxlY3RvciB9IGZyb20gJy4uL21vZHVsZXMvdG9hc3Rlci9zZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3QgVG9hc3RlcjogRnVuY3Rpb25Db21wb25lbnQ8e30+ID0gKCkgPT4ge1xuICBjb25zdCB0b2FzdGVyTWVzc2FnZSA9IHVzZVNlbGVjdG9yKHRvYXN0ZXJNZXNzYWdlU2VsZWN0b3IpO1xuXG4gIHJldHVybiA8VG9hc3Rlck1lc3NhZ2UgbWVzc2FnZT17dG9hc3Rlck1lc3NhZ2V9IC8+O1xufTtcbiJdLCJ2ZXJzaW9uIjozfQ==