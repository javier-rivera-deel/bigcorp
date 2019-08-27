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
		error: false
	});

	return (
		<AppContext.Provider value={{ state, setState }}>
			{children}
		</AppContext.Provider>
	);
}
