import React, { useState } from "react";

export const PanelContext = React.createContext();

export default function SettingsProvider(props) {
	const expanded = useState(false);
	return (
		<PanelContext.Provider value={expanded}>
			{props.children}
		</PanelContext.Provider>
	);
}
