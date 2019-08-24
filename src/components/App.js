import React, { Component } from "react";

import InputSettings from "./InputSettings";
import NodeLabel from "./NodeLabel";
import Tree from "react-d3-tree";

import { nodeSize, treeStyle, foreignObject, tree, readyTree } from "../consts";
import {
	findMiddlePosition,
	createDataTree
} from "../Utils";

import "./App.css";
const OrgChart = require("@latticehr/react-org-chart");

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeesList: [],
			dataReady: false,
			data: null
		};
	}

	componentDidMount() {
		fetch(
			"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api?limit=20"
		)
			.then(res => res.json())
			.then(employeesList => {

				// debugger;
				const dataTree = createDataTree(employeesList);
				// debugger;
				const rootObj = dataTree[0];

				// // SET THE STATE :)
				this.setState({ data: rootObj, dataReady: true });
			});
	}

	render() {
		// PULL NECESSARY STATE
		const { data, dataReady } = this.state;
		// console.log(data);
		// debugger;

		return (
			<div>
				{dataReady &&
					<OrgChart
						borderColor="lightgray"
						reportsColor="black"
						titleColor="gray"
						className="orgchart"
						tree={data}/>
				}
			</div>
		);
	}}
