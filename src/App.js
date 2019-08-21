import React, { Component } from "react";
import "./App.css";

import Tree from "react-d3-tree";

const myTreeData = [
	{
		name: "Taylor Swift",
		attributes: {
			keyA: "CEO",
			keyB: "office 1",
			keyC: "extra field"
		},
		children: [
			{
				name: "Lady Gaga",
				attributes: {
					keyA: "Secretary",
					keyB: "office 2"
				},
				children: [
					{
						name: "Xtina",
						attributes: {
							keyA: "val A",
							keyB: "val B",
							keyC: "val C"
						}
					},
					{
						name: "Britney"
					},
					{
						name: "Britney"
					}
				]
			},
			{
				name: "Adele"
			}
		]
	}
];

class App extends Component {
	state = {
		unorderedTree: [],
		hierarchyTree: [],
		treeReady: false
	};

	componentDidMount() {
		fetch(
			"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api"
		)
			.then(res => res.json())
			.then(unorderedTree => {
				this.setState({ unorderedTree });
			});
		console.log("component did mount :");
	}

	// [2,9,16]

	getIds = tree => {
		return tree.map(person => person.manager);
	};

	getDepartments = tree => {
		// i might do just one function along with IDS
		return tree.map(person => person.department);
	};

	setEmployeeObject = employee => {
		return {
			name: employee.first + " " + employee.last,
			attributes: {
				department: employee.department,
				office: employee.office
			},
			children: []
		};
	};

	render() {
		const hierarchyTree = [];
		const { unorderedTree, treeReady } = this.state;
		// ARRAY OF JUST MANAGER ID'S
		const unorderedTreeIDs = this.getIds(unorderedTree);

		// ARRAY OF DEPARTMENTS
		const departmentIDs = this.getDepartments(unorderedTree);

		// 1 SET PARENT, LOWEST MANAGER ID
		// 2 SET NEXT GENERATION = FOLLOWING LOWEST MANAGER ID, GROUP OF SAME MANAGER ID
		// 3 APPEND CHILDREN TO PARENT
		// 4 SET NEXT GENERATION,
		// 5 APPEND CHILDREN TO PARENT (SAME DEPARTMENT ID)

		// 1 SET PARENT, MATCH FIRST SORTED ID IN ARRAY OF UNSORTED WORKERS

		// name: "Taylor Swift",
		// attributes: {
		// 	keyA: "CEO",
		// 	keyB: "office 1",
		//   keyC: "extra field"

		console.log("this.state.hierarchyTree :", this.state.hierarchyTree);
		// console.log("hierarchyTree :", hierarchyTree);
		// console.log("myTreeData :", myTreeData);

		// GET THE FETCHED DATA

		// ARRAY OF SORTED MANAGER IDS, LOW TO HIGH

		// ARRAY OF UNIQUE GENERATIONS
		const uniqueGenerations = unorderedTreeIDs
			.sort((a, b) => a - b)
			.reduce((unique, item) => {
				return unique.includes(item) ? unique : [...unique, item];
			}, []);
		// [2,9,16]

		for (let generation in uniqueGenerations) {
			// STARTING WITH THE FIRST GENERATION
			for (let employee in unorderedTree) {
				debugger;
				if (unorderedTree[employee].manager === uniqueGenerations[generation]) {
					const eemployee = this.setEmployeeObject(unorderedTree[employee]);
					hierarchyTree.push(eemployee);
				}
			}
		}

		// GET THE PARENT
		// const lowestId = uniqueGenerations[0];

		// // ASIGN IT
		// for (let person in unorderedTree) {
		// 	// matches first id
		// 	if (unorderedTree[person].manager === lowestId) {
		// 		const employee = {
		// 			name: unorderedTree[person].first + " " + unorderedTree[person].last,
		// 			attributes: {
		// 				department: unorderedTree[person].department,
		// 				office: unorderedTree[person].office
		// 			}
		// 		};
		// 		// SETS PARENT
		// 		hierarchyTree.push(employee);
		// 	}
		// }

		console.log("hierarchyTree :", hierarchyTree);
		// if (hierarchyTree.length > 0) {
		// 	this.setState({ treeReady: true, hierarchyTree });
		// }
		console.log("render :");

		return (
			<div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
				{treeReady && (
					<Tree
						translate={{ x: 750, y: 350 }}
						orientation="vertical"
						pathFunc="elbow"
						data={myTreeData}
					/>
				)}
			</div>
		);
	}
}

export default App;
