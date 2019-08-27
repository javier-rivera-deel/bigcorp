import React, { useState } from "react";
import ChartSettings from "./setting-panels/ChartSettings";
import ManagerSettings from "./setting-panels/ManagerSettings";
import EmployeeSettings from "./setting-panels/EmployeeSettings";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		width: "600px",
		position: "absolute",
		boxShadow: "-1px 2px 5px 0px rgba(0, 0, 0, 0.3)"
	},
	modal: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: "#307cff",
		color: "white",
		zIndex: 2,
		borderRadius: "4px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		textAlign: "center"
	},
	closeIcon: {
		position: "relative",
		bottom: "-19px",
		right: "-162px"
	},
	hidden: {
		display: "none"
	}
}));

export default function Settings() {
	const classes = useStyles();
	const [visible, setVisible] = useState(true);

	const handleClick = () => {
		setVisible(false);
	};

	return (
		<div className={classes.root}>
			<div className={visible ? classes.modal : classes.hidden}>
				<Typography variant="h5">Organizational Chart Generator</Typography>
				<Typography variant="subtitle1" gutterBottom>
					This tool allows you to generate an organizational chart based on a
					list of employees.
				</Typography>
				<Button
					color="inherit"
					variant="outlined"
					className={classes.button}
					onClick={handleClick}
				>
					Start
				</Button>
			</div>
			<div>
				<ChartSettings />
				<ManagerSettings />
				<EmployeeSettings />
			</div>
		</div>
	);
}
