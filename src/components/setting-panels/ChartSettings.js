import React, { useContext, useState, useEffect } from "react";
import { PanelContext } from "../../contexts/SettingsProvider";
import { AppContext } from "../../contexts/AppProvider";
// import { baseUrl } from "../../Utils";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { isEqual } from "lodash";

const baseUrl = new URL(
	"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api"
);

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
		overflow: "visible"
	},
	button: {
		margin: theme.spacing(1),
		display: "block",
		backgroundColor: "#022be8",
		color: "white"
	},
	input: {
		display: "none"
	}
}));

export default function ChartSettings() {
	const classes = useStyles();
	const [expanded, updatePanelState] = useContext(PanelContext);
	const { state, setState } = useContext(AppContext);
	const [values, setValues] = useState({
		limit: state.limit,
		offset: state.offset
	});
	const [previousValues, setPreviousValues] = useState({
		limit: null,
		offset: null
	});
	const [disabled, setDisabled] = useState(false);
	const [buttonTitle, setButtonTitle] = useState("Generate Chart");

	const handleChange = panel => (event, expanded) => {
		updatePanelState(expanded ? panel : false);
	};

	const handleValueChange = name => event => {
		const value = event.target.value.replace(/^0+/, "");
		const newvalue = Math.abs(value);
		setValues({ ...values, [name]: newvalue });
	};

	// effect to avoid re submitting request if values are the same
	useEffect(() => {
		if (!isEqual(values, previousValues)) {
			setDisabled(false);
			setButtonTitle("Generate Chart");
		} else {
			setDisabled(true);
			setButtonTitle("See the results >>");
		}
	}, [values, previousValues]);

	useEffect(() => {
		if (expanded !== "panel1") {
			setDisabled(false);
			setPreviousValues({ limit: null, offset: null });
			setButtonTitle("Generate Chart");
		}
	}, [expanded]);

	const handleClick = () => {
		setDisabled(true);
		const { limit, offset } = values;
		setPreviousValues({ limit, offset });

		const params = Object.assign({ limit, offset });
		Object.keys(params).forEach(key =>
			baseUrl.searchParams.append(key, params[key])
		);
		setState({ url: baseUrl, goFetch: true });
	};

	return (
		<ExpansionPanel
			expanded={expanded === "panel1"}
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
						variant="outlined"
					/>
					<TextField
						type="number"
						id="standard-name"
						label="Set an Offset"
						className={classes.textField}
						value={parseInt(values.offset)}
						onChange={handleValueChange("offset")}
						margin="normal"
						variant="outlined"
					/>
					<Button
						variant="contained"
						className={classes.button}
						onClick={handleClick}
						disabled={disabled}
					>
						{buttonTitle}
					</Button>
				</form>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}
