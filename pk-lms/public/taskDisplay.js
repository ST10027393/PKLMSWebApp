"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', function () { return __awaiter(void 0, void 0, void 0, function () {
    var taskTableBody, response, tasks, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskTableBody = document.querySelector('#taskTable tbody');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch('/task-list')];
            case 2:
                response = _a.sent();
                if (!response.ok)
                    throw new Error('Network response was not ok');
                return [4 /*yield*/, response.json()];
            case 3:
                tasks = _a.sent();
                tasks.forEach(function (task) {
                    var row = document.createElement('tr');
                    // Create and append table cells
                    var titleCell = document.createElement('td');
                    titleCell.textContent = task.title;
                    row.appendChild(titleCell);
                    var descriptionCell = document.createElement('td');
                    descriptionCell.textContent = task.description;
                    row.appendChild(descriptionCell);
                    var staffIdCell = document.createElement('td');
                    staffIdCell.textContent = task.staffId.toString();
                    row.appendChild(staffIdCell);
                    var dueDateCell = document.createElement('td');
                    dueDateCell.textContent = task.dueDate.toString();
                    row.appendChild(dueDateCell);
                    // Append the row to the table body
                    taskTableBody.appendChild(row);
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error('Failed to fetch task data:', err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Add the CSV export functionality
(_a = document.getElementById('exportTableToExcel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var table = document.getElementById('taskTable');
    if (table) {
        var rows = table.querySelectorAll('tr');
        var csvContent_1 = '';
        rows.forEach(function (row) {
            var cells = row.querySelectorAll('th, td');
            var rowData = Array.from(cells).map(function (cell) { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.replace(/,/g, '')) || ''; }).join(',');
            csvContent_1 += rowData + '\n';
        });
        var blob = new Blob([csvContent_1], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'tasks.csv');
        a.click();
        window.URL.revokeObjectURL(url);
    }
});
