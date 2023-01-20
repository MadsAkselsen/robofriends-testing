import * as actions from "./actions";
import * as types from "./constants";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import nock from "nock";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

export const mockStore = configureMockStore([thunkMiddleware]);
//creating a mock instance from the MockAdapter of axios
// const mock = new MockAdapter(axios);
// const store = mockStore({});

describe("actions", () => {
	it("should create an action to search", () => {
		const text = "Finish docs";
		const expectedAction = {
			type: types.CHANGE_SEARCHFIELD,
			payload: text,
		};
		expect(actions.setSearchField(text)).toEqual(expectedAction);
	});
});

describe("Fetch robots action PENDING", () => {
	it("should creat a Pending action on request Robots", () => {
		const store = mockStore();
		store.dispatch(actions.requestRobots());
		const action = store.getActions();
		expect(action[0]).toEqual({ type: "REQUEST_ROBOTS_PENDING" });
	});
});

describe("Fetch robots action SUCCESS", () => {
	it("should create a Success action on successfully requesting robots", async () => {
		// const scope = nock("https://jsonplaceholder.typicode.com")
		// 	.persist()
		// 	.defaultReplyHeaders({
		// 		"access-control-allow-origin": "*",
		// 		"access-control-allow-credentials": "true",
		// 	})

		// 	.get("/users")
		// 	.reply(200, "ok");
		const store = mockStore();

		const mockReply = JSON.stringify([
			{ item: "item1" },
			{ item: "item2" },
		]);

		// const mockReply = [{ item: "item1" }, { item: "item2" }];

		mock.onGet("https://jsonplaceholder.typicode.com/users").reply(
			200,
			mockReply
		);

		await store.dispatch(actions.requestRobots()).then(() => {
			let expectedActions = [
				{ type: "REQUEST_ROBOTS_PENDING" },
				{
					type: "REQUEST_ROBOTS_SUCCESS",
					payload: [{ item: "item1" }, { item: "item2" }],
				},
			];

			const storeActions = store.getActions();
			console.log("storeActions", storeActions[1]);
			expect(storeActions).toEqual(expectedActions);
		});

		// console.log(scope.activeMocks());

		// store.dispatch(actions.requestRobots()).then(() => {
		// 	console.log("test");
		// 	const action = store.getActions();
		// 	console.log("=====", action);
		// });

		// const dispatch = jest.fn();
		// await actions.requestRobots()(dispatch);
		// await store.dispatch(actions.requestRobots());
		// await new Promise((resolve) => setTimeout(resolve));
		const action = store.getActions();
		// expect(action[1].type).toEqual("REQUEST_ROBOTS_SUCCESS");
		console.log("=====", action);
	});
});
