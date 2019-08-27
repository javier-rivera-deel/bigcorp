import React, { useState, useContext } from "react";
import ChartSettings from "./setting-panels/ChartSettings";
import ManagerSettings from "./setting-panels/ManagerSettings";
import EmployeeSettings from "./setting-panels/EmployeeSettings";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Fade from '@material-ui/core/Fade';
import "./styles/App.css"
import { AppContext } from "../contexts/AppProvider";


import { makeStyles } from "@material-ui/core/styles";
import { whileStatement } from "@babel/types";

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
	},
	searching: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: "rgba(92, 241, 196, 0.83)",
		color: "black",
		zIndex: 2,
		borderRadius: "4px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	motion: {
		marginLeft: "5px",
		animation: "rotation 2s infinite linear",
	},

}));

export default function Settings() {
	const classes = useStyles();
	const [visible, setVisible] = useState(true);

	const handleClick = () => {
		setVisible(false);
	};

	return (
		<div className={classes.root}>
			<Fade in={visible}>
				<div className={classes.modal}>
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
			</Fade>
			<div>
				<ChartSettings />
				<ManagerSettings />
				<EmployeeSettings />
			</div>
		</div>
	);
}
