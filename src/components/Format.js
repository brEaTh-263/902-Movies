import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MenuItem, Menu, ListItemText, ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	menuItem: {
		background: "rgba(70, 68, 68, 0.8)",
		width: "15rem",
		"&.MuiListItem-button:hover": {
			backgroundColor: "rgba(70, 68, 68, 0.6)",
		},
	},
}));

export default function Format({ setSelectedIndex, selectedIndex, options }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<ListItem
				style={{
					margin: "0.5rem 1.5rem",
					border: "0.6px rgba(256,256,256,0.6) solid",
					borderRadius: "3px",
					width: "15rem",
				}}
				button
				onClick={handleClickListItem}
			>
				<ListItemText
					style={{ color: "#fff" }}
					primary={options[selectedIndex]}
				/>
				<ExpandMoreIcon style={{ color: "#fff" }} />
			</ListItem>

			<Menu
				MenuListProps={{ style: { padding: 0 } }}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options.map((option, index) => (
					<MenuItem
						key={option}
						className={classes.menuItem}
						selected={index === selectedIndex}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
