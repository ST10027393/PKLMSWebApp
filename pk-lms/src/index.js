"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/lms';
mongoose_1.default.connect(mongoUri)
    .then(function () { return console.log('MongoDB connected'); })
    .catch(function (err) { return console.error(err); });
app.get('/', function (req, res) {
    res.send('Hello, Learner Management System!');
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
