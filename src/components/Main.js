import React from "react";
import Settings from "./Settings";
import Chart from "./Chart";
import "./styles/Main.css";

import AppProvider from "../contexts/AppProvider";
import SettingsProvider from "../contexts/SettingsProvider";

export default function Main() {
	return (
		<div className="main-view">
			<AppProvider>
				<SettingsProvider>
					<Settings />
					<Chart />
				</SettingsProvider>
			</AppProvider>
		</div>
	);
}
