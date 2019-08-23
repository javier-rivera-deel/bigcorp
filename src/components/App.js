import React, { Component } from "react";

import InputSettings from "./InputSettings";
import NodeLabel from "./NodeLabel";
import Tree from "react-d3-tree";

import { nodeSize, treeStyle, foreignObject, tree } from "../consts";
import {
	findMiddlePosition,
	createDataTree
} from "../Utils";

import "./App.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeesList: tree,
			dataReady: false,
			data: null
		};
	}

	componentDidMount() {
		fetch(
			"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api"
		)
			.then(res => res.json())
			.then(employeesLists => {

				const dataTree = createDataTree(this.state.employeesList);

				// // SET THE STATE :)
				this.setState({ data: dataTree, dataReady: true });
			});
	}

	render() {
		// PULL NECESSARY STATE
		const { data, dataReady } = this.state;
		// console.log(data);

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
