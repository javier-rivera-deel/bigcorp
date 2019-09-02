import React, { useContext, useState, useEffect } from "react";
import { PanelContext } from "../../contexts/SettingsProvider";
import { AppContext } from "../../contexts/AppProvider";
import "../styles/App.css";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ColorPicker from "material-ui-color-picker";

import { isEqual } from "lodash";

const useStyles = makeStyles(theme => ({
	root: {
		width: "30%",
		position: "absolute"
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
		display: "block",
		overflow: "visible"
	},
	container: {
		display: "block"
	},
	button: {
		margin: theme.spacing(1),
		backgroundColor: "#f1ad36",
		color: "white"
	},
	input: {
		display: "none"
	}
}));

export default function AdditionalSettings() {
	const classes = useStyles();
	const [expanded, updatePanelState] = useContext(PanelContext);
	const { state, setState } = useContext(AppContext);
	const { borderColor, titleColor, reportsColor } = state;

	const [disabled, setDisabled] = useState(false);
	const [buttonTitle] = useState("Find Manager");

	const handleChange = panel => (event, expanded) => {
		updatePanelState(expanded ? panel : false);
	};

	const handleValueChange = name => event => {};

	const handleClick = e => {};

	useEffect(() => {
		if (expanded !== "panel4") {
			setDisabled(false);
		}
	}, [expanded]);

	const handleColorChange = color => {
		setState({ ...state, borderColor: color });
	};

	return (
		<ExpansionPanel
			expanded={expanded === "panel4"}
			onChange={handleChange("panel4")}
		>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel4bh-content"
				id="panel4bh-header"
			>
				<ExpandMoreIcon />
				<Typography className={classes.heading}>Additional Settings</Typography>
				<Typography className={classes.secondaryHeading}>
					Customize the chart
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<form className={classes.container} noValidate autoComplete="off">
					<ColorPicker
						label="Border color"
						name="color"
						value={borderColor}
						onChange={color => handleColorChange(color)}
					/>
				</form>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}
