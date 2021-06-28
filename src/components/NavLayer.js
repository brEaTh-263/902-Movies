import React from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	makeStyles,
	useMediaQuery,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import MovieIcon from "@material-ui/icons/Movie";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { useHistory } from "react-router";

const useStyles = makeStyles({
	root: {
		width: "100%",
		position: "fixed",
		bottom: 0,
		zIndex: 200,
		backgroundColor: "#000",
	},
	tab: {
		"&.MuiBottomNavigationAction-root.Mui-selected": {
			color: "#3f51b5;",
		},
		"&.MuiBottomNavigationAction-root": {
			color: "#fff",
		},
	},
});

export default function NavLayer(props) {
	const classes = useStyles();
	const history = useHistory();
	const [value, setValue] = React.useState("recents");
	const handleChange = (event, newValue) => {
		setValue(newValue);
		history.push(newValue);
	};
	const matches = useMediaQuery("(max-width:720px)");

	return (
		<>
			{props.children}
			{matches && (
				<BottomNavigation
					value={value}
					onChange={handleChange}
					className={classes.root}
					showLabels
				>
					<BottomNavigationAction
						label="Movies"
						value="recents"
						className={classes.tab}
						icon={<MovieIcon />}
					/>
					<BottomNavigationAction
						label="Contact Us"
						value="contact-us"
						className={classes.tab}
						icon={<ContactSupportIcon />}
					/>
					<BottomNavigationAction
						label="About"
						value="about-us"
						className={classes.tab}
						icon={<PersonIcon />}
					/>
				</BottomNavigation>
			)}
		</>
	);
}
