import React, { useEffect, useState } from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	makeStyles,
	useMediaQuery,
} from "@material-ui/core";
import { withRouter } from "react-router";
import PhoneIcon from "@material-ui/icons/Phone";
import MovieIcon from "@material-ui/icons/Movie";
import { useHistory } from "react-router";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles({
	root: {
		width: "100%",
		position: "fixed",
		bottom: 0,
		zIndex: 200,
		backgroundColor: "#000",
	},
	tab: {
		"&.MuiBottomNavigationAction-root": {
			color: "#fff",
		},
		"&.MuiBottomNavigationAction-root.Mui-selected": {
			color: "#3f51b5",
		},
	},
});

function NavLayer(props) {
	const classes = useStyles();
	const history = useHistory();
	const [navs] = useState(["/", "/movies", "/contact-us", "/about-us"]);
	const [value, setValue] = React.useState("/");
	const handleChange = (event, newValue) => {
		history.push(navs[newValue]);
	};
	const matches = useMediaQuery("(max-width:720px)");

	useEffect(() => {
		const { pathname } = props.location;
		const value = navs.indexOf(pathname);
		if (value > -1) {
			setValue(value);
		}
	}, [props.location, navs]);

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
						label="Home"
						value={0}
						className={classes.tab}
						icon={<HomeIcon />}
					/>
					<BottomNavigationAction
						label="Movies"
						value={1}
						className={classes.tab}
						icon={<MovieIcon />}
					/>
					<BottomNavigationAction
						label="Contact Us"
						value={2}
						className={classes.tab}
						icon={<PhoneIcon />}
					/>
					<BottomNavigationAction
						label="About"
						value={3}
						className={classes.tab}
						icon={<InfoIcon />}
					/>
				</BottomNavigation>
			)}
		</>
	);
}

export default withRouter(NavLayer);
