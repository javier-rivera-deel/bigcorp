import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppProvider";
import { createDataTree } from "../Utils";
import "./styles/App.css";

const OrgChart = require("@latticehr/react-org-chart");

export default function Chart() {
	const { state, setState } = useContext(AppContext);
	const { data, url, dataReady, goFetch } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				response.json().then(employeeList => {
					if (employeeList.length > 0) {
						const data = createDataTree(employeeList)[0];
						setState({ data, dataReady: true });
					} else {
						setState({ noMatch: true });
					}
				});
			} catch (err) {
				setState({ error: true, errorMessage: err });
			}
		};
		if (goFetch) {
			fetchData();
		}
	}, [goFetch, setState, url]);

	return (
		<div>
			{dataReady && (
				<OrgChart
					borderColor="black"
					reportsColor="black"
					titleColor="gray"
					className="orgchart"
					tree={data}
					shouldResize={false}
				/>
			)}
		</div>
	);
}
