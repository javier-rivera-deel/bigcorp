import React, { Component } from "react";
import "./App.css";

import NavigationBar from "./components/NavigationBar"
import InputSettings from "./components/InputSettings"

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

import { GoDiffAdded, GoDiffRemoved } from 'react-icons/go'

import Tree from "react-d3-tree";


const nodeSize = {
	x: 250,
	y: 200
}


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeesList: [],
			treeReady: false,
			dataReady: false,
			data: null,
			dataFetched: false
		};
	}


	componentDidMount() {

		fetch(
			"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api"
		)
			.then(res => res.json())
			.then(employeesList => {


					//

					// GET MANAGER ID'S
					const unorderedTreeIDs = this.getIds(employeesList);

					// REMOVE DUPLICATES MANAGER ID'S AND, SORT THEM AND REVERS
					const uniqueGenerations = unorderedTreeIDs
					.sort((a, b) => b - a)
					.reduce((unique, item) => {
						return unique.includes(item) ? unique : [...unique, item];
					}, [])


					// ARRAY OF UNIQUE DEPARTMENTS IDS
					const departmentIDs = this.getDepartments(employeesList);



					const siblingGroups = [];

				// debugger;
				for(let generation in uniqueGenerations) {
					const siblings = [];
					for(let person in employeesList) {

						if(uniqueGenerations[generation] === employeesList[person].manager) {
							siblings.push( this.setEmployeeObject(employeesList[person]))
						}
					}
					siblingGroups.push(siblings);
				}


				for(let group in siblingGroups) {

					const currentGroup = siblingGroups[group];

					// checks everygroup, another loop will be necesarry
					if(currentGroup.length > 0){

						for (let sibling in currentGroup) {

							// I COULD DO JUST A FOR LOOP
							if(parseInt(group) < siblingGroups.length) {

							const previous = siblingGroups[parseInt(group)+1];

								for(let child in previous) {

									if(currentGroup.length > 0) {

											if(previous[child].attributes.department === currentGroup[sibling].attributes.department) {
												previous[child].children.push(currentGroup[sibling]);
												currentGroup.splice(sibling, 1);
											}
										}
								}
							}
						}
					}
				}
				const parentIndex = siblingGroups.length-1;
				const directChildrenIndex = siblingGroups.length-2;

				const root = siblingGroups[parentIndex];

				root[0].children = siblingGroups[directChildrenIndex]

				siblingGroups.splice(0, siblingGroups.length-1);

				this.setState({ data: root, dataReady: true })

			});

	}


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

	findMiddlePosition = (axis) => {
		if(axis === "x") {
			return window.innerWidth / 3
		} else {
			return window.innerHeight / 2
		}
	}


	render() {
		// const hierarchyTree = [];
		const { data, dataReady } = this.state;

		const svgSquare = {
			"shape": "rect",
			"shapeProps": {
				"stroke": 0,
				"width": 200,
				"height": 100,
				"y": -50,
				"x": -25,
				"fill": "aquamarine",
				strokeWidth: '1px'
			}
		}


		const NavigationBarProps = {
			title: "Chartium - Organizational Chart Viewer"
		}

		return (
			<div className={"App"} id="treeWrapper" style={{ width: "100vw", height: "95vh" }}>

				{/* <NavigationBar {...NavigationBarProps} /> */}
				<InputSettings className="InputSetting"/>
				{dataReady && (
					<Tree
						translate={{ x: this.findMiddlePosition("x") , y: 80  }}
						orientation="vertical"
						// pathFunc="elbow"
						data={data}
						nodeSvgShape={svgSquare}
						nodeSize={nodeSize}
						allowForeignObjects
						nodeLabelComponent={{
							render: <NodeLabel className='myLabelComponentInSvg' />,
							foreignObjectWrapper: {
								y: -50,
								nodeSize: {
									x: 200
								}
							}
						}}
					/>
				)}
			</div>
		);
	}
}

export default App;



class NodeLabel extends React.PureComponent {

  render() {
		const buttonProps = {
			size:"1.5em"
		}
		const {className, nodeData} = this.props;
		console.log(nodeData);
		const card = {
			display: 'flex',
			flexDirection: 'column',
		}

    return (
      <div style={card} className={className}>
        <div className="employee-title">{nodeData.name}</div>
        <div>Department: {nodeData.attributes.department}</div>

				{nodeData._children &&
					<div>

          {nodeData._collapsed ? <GoDiffAdded {...buttonProps} /> : <GoDiffRemoved {...buttonProps} />}
					</div>
        }
      </div>
    )
  }
}
