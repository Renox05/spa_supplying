/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"peumadev/supply-requests/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});