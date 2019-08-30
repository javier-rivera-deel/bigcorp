import React, { useContext, useState } from "react";
import { PanelContext } from "../../contexts/SettingsProvider";
import { AppContext } from "../../contexts/AppProvider";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

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
		width: 200
	},
	button: {
		margin: theme.spacing(1),
		display: "block"
	},
	input: {
		display: "none"
	}
}));

export default function ChartSettings() {
	const classes = useStyles();
	// const [expanded, updatePanelState] = useContext(PanelContext);
	const { state, setState } = useContext(AppContext);
	const [values, setValues] = useState({
		limit: state.limit,
		offset: state.offset
	});

	const handleChange = panel => (event, expanded) => {
		debugger;
		setState(expanded ? panel : false);
	};

	const handleValueChange = name => event => {
		const value = event.target.value.replace(/^0+/, "");
		const newvalue = Math.abs(value);
		setValues({ ...values, [name]: newvalue });
	};

	const handleClick = () => {
		const { limit, offset } = values;
		setState({ limit, offset, fullSearch: true });
	};

	return (
		<ExpansionPanel
			expanded={state.expanded === "panel1"}
			onChange={handleChange("panel1")}
		>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
			>
				<Typography className={classes.heading}>
					Organizational Chart
				</Typography>
				<Typography className={classes.secondaryHeading}>
					Generate the full tree, or a subset
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<form className={classes.container} autoComplete="off">
					<TextField
						type="number"
						id="standard-name"
						label="Limit of employees"
						className={classes.textField}
						value={parseInt(values.limit)}
						onChange={handleValueChange("limit")}
						margin="normal"
					/>
					<TextField
						type="number"
						id="standard-name"
						label="Set an Offset"
						className={classes.textField}
						value={parseInt(values.offset)}
						onChange={handleValueChange("offset")}
						margin="normal"
					/>
					<Button
						color="primary"
						variant="contained"
						className={classes.button}
						onClick={handleClick}
					>
						Generate Chart
					</Button>
				</form>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}
