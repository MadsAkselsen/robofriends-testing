import axios from "axios";

export const apiCall = (link) =>
	axios.get(link).then((response) => {
		console.log("resp", response.data);
		// return response.json();
		return response.data;
	});
