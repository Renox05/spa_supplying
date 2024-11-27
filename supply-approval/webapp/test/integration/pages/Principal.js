sap.ui.define([
	"sap/ui/test/Opa5",
], function (Opa5,) {
	"use strict";
	var sViewName = "Principal";

	Opa5.createPageObjects({
		onTheViewPage: {

			actions: {
			},

			assertions: {

				iShouldSeeThePageView: function () {
					return this.waitFor({
						id: "dynamicPageId",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
						},
						errorMessage: "Did not find the " + sViewName + " view"
					});
				},
				iShouldSeeTheTitle: function () {
					return this.waitFor({
						controlType: "sap.m.Title",
						visible: true,
						success: function () {
							Opa5.assert.ok(true, "Title is visible");
						},
						errorMessage: "Title was not found"
					});
				}
			}
		}
	});

});
