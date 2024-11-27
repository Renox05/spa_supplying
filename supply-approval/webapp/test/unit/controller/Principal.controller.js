/*global QUnit*/

sap.ui.define([
	"peumadev/supply-approval/controller/Principal.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Principal Controller", {
		beforeEach: function () {
			this.oController = new Controller();
			this.oViewStub = new sap.ui.core.mvc.View();
			sinon.stub(this.oController, "getView").returns(this.oViewStub);
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oViewStub.setModel(this.oModel);
		},
		afterEach: function () {
			this.oController.destroy();
			this.oViewStub.destroy();
		}
	});

	QUnit.test("Test onInit method", function (assert) {
		this.oController.onInit();
		console.log(this.oViewStub.getModel());
		assert.ok(this.oViewStub.getModel(), "Model was set");
	}); 
	QUnit.test("Should return 'Success' when bAvailable is true", function (assert) {
		// Act
		var sResult = this.oController.formatAvailableToObjectState(true);

		// Assert
		assert.strictEqual(sResult, "Success", "The function returned 'Success' for true input");
	});

	QUnit.test("Should return 'Error' when bAvailable is false", function (assert) {
		// Act
		var sResult = this.oController.formatAvailableToObjectState(false);

		// Assert
		assert.strictEqual(sResult, "Error", "The function returned 'Error' for false input");
	});

	QUnit.test("Should return 'sap-icon://accept' when bAvailable is true", function (assert) {
		// Act
		var sResult = this.oController.formatAvailableToIcon(true);
	
		// Assert
		assert.strictEqual(sResult, "sap-icon://accept", "The function returned 'sap-icon://accept' for true input");
	});
	
	QUnit.test("Should return 'sap-icon://decline' when bAvailable is false", function (assert) {
		// Act
		var sResult = this.oController.formatAvailableToIcon(false);
	
		// Assert
		assert.strictEqual(sResult, "sap-icon://decline", "The function returned 'sap-icon://decline' for false input");
	});

	QUnit.module("Principal Controller - handleDetailsPress", {
		beforeEach: function () {
			this.oController = new Controller();
			this.oViewStub = new sap.ui.core.mvc.View();
			sinon.stub(this.oController, "getView").returns(this.oViewStub);
	
			this.oModel = new sap.ui.model.json.JSONModel({
				Product: { ProductId: "12345" }
			});
			this.oViewStub.setModel(this.oModel);
	
			this.oMessageToastSpy = sinon.spy(sap.m.MessageToast, "show");
		},
		afterEach: function () {
			this.oController.destroy();
			this.oViewStub.destroy();
			this.oMessageToastSpy.restore();
		}
	});
	
	QUnit.test("Should display correct message when handleDetailsPress is called", function (assert) {
		// Arrange
		var oEventMock = {
			getSource: function () {
				return {
					getBindingContext: function () {
						return this.oModel.createBindingContext("/Product");
					}.bind(this)
				};
			}.bind(this)
		};
	
		// Act
		this.oController.handleDetailsPress(oEventMock);
	
		// Assert
		assert.ok(this.oMessageToastSpy.calledOnce, "MessageToast.show was called once");
		assert.strictEqual(
			this.oMessageToastSpy.getCall(0).args[0],
			"Details for product with id 12345",
			"Correct message is shown"
		);
	}); 
});
