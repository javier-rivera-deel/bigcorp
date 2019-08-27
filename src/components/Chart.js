import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppProvider";
import { createDataTree } from "../Utils";

import "./styles/App.css";
const OrgChart = require("@latticehr/react-org-chart");

export default function Chart() {
	const { state, setState } = useContext(AppContext);
	const {
		limit,
		offset,
		managerId,
		employeeId,
		managerSearch,
		employeeSearch,
		fullSearch
	} = state;

	const [dataReady, setDataReady] = useState(false);
	const [data, setData] = useState(null);

	async function fetchData(url) {
		const res = await fetch(url);
		res.json().then(employeeList => {
			const dataTree = createDataTree(employeeList)[0];
			setData(dataTree);
			setDataReady(true);
		});
	}
	useEffect(() => {
		var baseUrl = new URL(
			"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api"
		);
		if (managerSearch) {
			const url = `${baseUrl}?manager=${managerId}`;
			fetchData(url);
			setState({ managerSearch: false });
		} else if (employeeSearch) {
			const url = `${baseUrl}?id=${employeeId}`;
			fetchData(url);
			setState({ employeeSearch: false });
		} else if (fullSearch) {
			const params = { limit, offset };
			Object.keys(params).forEach(key =>
				baseUrl.searchParams.append(key, params[key])
			);
			fetchData(baseUrl);
			setState({ fullSearch: false });
		}
		setDataReady(false);
	}, [
		employeeId,
		managerId,
		offset,
		limit,
		fullSearch,
		managerSearch,
		employeeSearch,
		setState
	]);
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
