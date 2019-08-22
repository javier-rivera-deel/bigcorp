import React, { Component } from "react";

import InputSettings from "./InputSettings";
import NodeLabel from "./NodeLabel";
import Tree from "react-d3-tree";

import { nodeSize, treeStyle, foreignObject } from "../consts";
import {
	getIds,
	findMiddlePosition,
	getUniqueGenerations,
	getSiblingGroups,
	createDataTree
} from "../Utils";

import "./App.css";

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
			"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api"
		)
			.then(res => res.json())
			.then(employeesList => {
				// GET MANAGER ID'S
				const unorderedTreeIDs = getIds(employeesList);

				// REMOVE DUPLICATES MANAGER ID'S AND, SORT THEM, REVERSE THEM
				const uniqueGenerations = getUniqueGenerations(unorderedTreeIDs);

				// CREATE GROUPS OF SIBLINGS - SIBLINGS SHARE SAME MANAGER ID
				const siblingGroups = getSiblingGroups(
					employeesList,
					uniqueGenerations
				);

				// CREATE DATA TREE TO FEED THE CHART
				const dataTree = createDataTree(siblingGroups);

				// SET THE STATE :)
				this.setState({ data: dataTree, dataReady: true });
			});
	}

	render() {
		// PULL NECESSARY STATE
		const { data, dataReady } = this.state;

		return (
			<div className={"App"} id="treeWrapper" style={treeStyle}>
				<InputSettings className="InputSetting" />
				<div className="Tree">
					{dataReady && (
						<Tree
							translate={{ x: findMiddlePosition("x"), y: 80 }}
							orientation="vertical"
							pathFunc="straight"
							data={data}
							nodeSize={nodeSize}
							allowForeignObjects
							nodeLabelComponent={{
								render: <NodeLabel className="myLabelComponentInSvg" />,
								foreignObjectWrapper: foreignObject
							}}
						/>
					)}
				</div>
			</div>
		);
	}
}
