import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3),
		display: "flex",
		flexDirection: "column"
	},
	group: {
		margin: theme.spacing(0, 0)
	}
}));

export default function InputSettings() {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		name: "name"
	});

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};
	return (
		<div className="InputSettings">
			<Paper elevation={2} square className={classes.root}>
				<Typography variant="h5" component="h3">
					Organizational Chart Generator
				</Typography>
				<Typography component="p">
					This tool allows to generate an organizational chart.
				</Typography>
				<Typography component="p">
					To generate the complete chart, leave all the following inputs or
					empty, or feel free to play around with them to get a sectional chart.
				</Typography>

				<div className={classes.root}>
					<form className={classes.container} noValidate autoComplete="off">
						<TextField
							disabled
							id="outlined-name"
							label="Manager ID"
							className={classes.textField}
							value={values.name}
							onChange={handleChange("name")}
							margin="normal"
							variant="outlined"
							type="number"
						/>
						<TextField
							disabled
							id="outlined-name"
							label="Employee ID"
							className={classes.textField}
							value={values.name}
							onChange={handleChange("name")}
							margin="normal"
							variant="outlined"
							type="number"
						/>
						<TextField
							disabled
							id="outlined-name"
							label="Offset"
							className={classes.textField}
							value={values.name}
							onChange={handleChange("name")}
							margin="normal"
							variant="outlined"
							type="number"
						/>
					</form>

					<Button
						disabled
						size="large"
						variant="contained"
						color="primary"
						className={classes.button}
					>
						GENERATE CHART
					</Button>
				</div>
			</Paper>
		</div>
	);
}
