import React, { useState } from "react";

export const AppContext = React.createContext({});

export default function AppProvider({ children }) {
	const [state, setState] = useState({
		gofetch: false,
		limit: 5,
		offset: 0,
		managerId: 0,
		employeeId: 1,
		fullSearch: false,
		managerSearch: false,
		employeeSearch: false,
		searching: false,
		error: false,
		data: [],
		url: "",
		searchType: "",
		dataReady: false
	});

	// const setUrl = (searchConfig) => {
	// 	let baseUrl = new URL(
	// 		"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api"
	// 	);
	// 	if (searchConfig.type === "managerSearch") {
	// 		const url = `${baseUrl}?manager=${managerId}`;
	// 	} else if (searchConfig.type === "employeeSearch") {
	// 		const url = `${baseUrl}?id=${employeeId}`;
	// 	} else if (searchConfig.type === "fullSearch") {
	// 		const { limit, offset } = searchConfig
	// 		Object.keys(params).forEach(key =>
	// 			baseUrl.searchParams.append(key, params[key])
	// 		);
	// 	}
	// }

	return (
		<AppContext.Provider value={{ state, setState }}>
			{children}
		</AppContext.Provider>
	);
}
