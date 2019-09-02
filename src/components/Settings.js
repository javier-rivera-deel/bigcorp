import React, { useState, useContext } from "react";

// material UI
import ChartSettings from "./setting-panels/ChartSettings";
import ManagerSettings from "./setting-panels/ManagerSettings";
import EmployeeSettings from "./setting-panels/EmployeeSettings";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// custom styles
import "./styles/App.css";

// contexts
import { AppContext } from "../contexts/AppProvider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		width: "500px",
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
		textAlign: "center",
		padding: "30px"
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
		textAlign: "center"
	},
	motion: {
		marginLeft: "5px",
		animation: "rotation 2s infinite linear"
	},
	error: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: "#ff0000c9",
		color: "white",
		zIndex: 2,
		borderRadius: "4px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		textAlign: "center"
	},
	noMatch: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: "#333333e0",
		color: "white",
		zIndex: 2,
		borderRadius: "4px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		textAlign: "center"
	}
}));

export default function Settings() {
	const classes = useStyles();
	const [visible, setVisible] = useState(true);
	const [errorVisible, setErrorVisible] = useState(true);
	const [noMatchVisible, setnoMatchVisible] = useState(true);

	const { state, setState } = useContext(AppContext);

	const handleClick = () => {
		setVisible(false);
	};
	const handleErrorClick = () => {
		setState({ error: false });
		setErrorVisible(true);
	};
	const handleNoMatchClick = () => {
		setState({ noMatch: false });
		setnoMatchVisible(true);
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
						size="large"
					>
						Start
					</Button>
				</div>
			</Fade>
			{state.error && (
				<Fade in={errorVisible}>
					<div className={classes.error}>
						<Typography variant="h5">Error</Typography>
						<Typography variant="subtitle1" gutterBottom>
							The data couldn't be retrieved.
						</Typography>
						<Button
							color="inherit"
							variant="outlined"
							className={classes.button}
							onClick={handleErrorClick}
						>
							Close
						</Button>
					</div>
				</Fade>
			)}
			{state.noMatch && (
				<Fade in={noMatchVisible}>
					<div className={classes.noMatch}>
						<Typography variant="h5">No results</Typography>
						<Typography variant="subtitle1" gutterBottom>
							There are no matches in our records.
						</Typography>
						<Button
							color="inherit"
							variant="outlined"
							className={classes.button}
							onClick={handleNoMatchClick}
						>
							Close
						</Button>
					</div>
				</Fade>
			)}
			<div>
				<ChartSettings />
				<ManagerSettings />
				<EmployeeSettings />
			</div>
		</div>
	);
}
