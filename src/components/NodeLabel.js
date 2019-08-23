import React from "react";

import { employeeCard, buttonProps } from "../consts";

import { GoDiffAdded, GoDiffRemoved } from "react-icons/go";

export default class NodeLabel extends React.PureComponent {
	render() {
		const { className, nodeData } = this.props;
		return (
			<div style={employeeCard} className={className}>
				<div className="employee-info">
					<div className="employee-title">{`${nodeData.first} ${nodeData.last}`}</div>
					<div>Department: {nodeData.department}</div>
					<div>
						Office:{" "}
						{nodeData.office
							? nodeData.office
							: "Info not available"}
					</div>
				</div>
				<div className="employee-children-icon">
					{nodeData._children && (
						<div>
							{nodeData._collapsed ? (
								<GoDiffAdded color="#009cfb" {...buttonProps} />
							) : (
								<GoDiffRemoved color="orangered" {...buttonProps} />
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}
