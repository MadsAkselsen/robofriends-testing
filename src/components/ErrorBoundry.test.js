import React from "react";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import MainPage from "./MainPage";
import ErrorBoundary from "./ErrorBoundry";

let wrapper;

beforeEach(() => {
	const mockProps = {};
	wrapper = shallow(<ErrorBoundary {...mockProps} />);
});

describe("When no JS errors are caught in a child component", () => {
	let ErrorBoundaryComponent;

	beforeAll(() => {
		ErrorBoundaryComponent = shallow(
			<ErrorBoundary>
				<h2 className="child-without-error">wassup</h2>
			</ErrorBoundary>
		);
	});

	it("should render the child component", () => {
		expect(
			ErrorBoundaryComponent.find(".child-without-error").exists()
		).toBeTruthy();
	});
});

describe("When a JS error is caught in a child component", () => {
	let ErrorBoundaryComponent;

	beforeAll(() => {
		// jest.spyOn(global.console, "log");
		ErrorBoundaryComponent = shallow(
			<ErrorBoundary>
				<div className="child-with-error">wassup</div>
			</ErrorBoundary>
		);
		ErrorBoundaryComponent.instance().componentDidCatch(
			"oh nooos an error"
		);
		ErrorBoundaryComponent.update();
	});

	// it("should log an error to console", () => {
	// 	expect(global.console.log).toHaveBeenCalledWith("oh nooos an error");
	// });

	it("should update the state to indicate an error", () => {
		expect(ErrorBoundaryComponent.instance().state.hasError).toBeTruthy();
	});

	it("should not render the child component", () => {
		expect(
			ErrorBoundaryComponent.find(".child-with-error").exists()
		).toBeFalsy();
	});
});
