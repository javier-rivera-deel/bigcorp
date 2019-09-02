import React, { useState } from "react";

export const AppContext = React.createContext({});

export default function AppProvider({ children }) {
	const [state, setState] = useState({
		gofetch: false,
		limit: 5,
		offset: 0,
		managerId: 0,
		employeeId: 1,
		searching: false,
		error: false,
		data: [],
		url: "",
		fetchFailed: false,
		searchType: "",
		dataReady: false,
		shouldFetch: true,
		errorMessage: "",
		noMatch: false
	});

	return (
		<AppContext.Provider value={{ state, setState }}>
			{children}
		</AppContext.Provider>
	);
}
