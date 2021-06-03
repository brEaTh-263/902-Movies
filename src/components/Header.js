import React from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import MovieIcon from "@material-ui/icons/Movie";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

export default function Header() {
	return (
		<Container>
			<LogoContainer>
				<Logo src={logo} />
			</LogoContainer>
			<NavBarContainer>
				<Tooltip title="Movies">
					<NavLink to="/">
						<MovieIcon style={{ fontSize: 30 }} />{" "}
					</NavLink>
				</Tooltip>
				<Tooltip title="Help & Support">
					<NavLink to="/">
						<ContactSupportIcon style={{ fontSize: 30 }} />{" "}
					</NavLink>
				</Tooltip>
				<Tooltip title="Profile">
					<NavLink to="/">
						<PersonIcon style={{ fontSize: 30 }} />
					</NavLink>
				</Tooltip>
			</NavBarContainer>
		</Container>
	);
}

const Container = styled.div`
	position: fixed;

	padding: 20px;
	display: flex;
	height: 100%;
	box-sizing: border-box;
	width: 10vw;
	flex-direction: column;
	align-content: center;

	@media (max-width: 720px) {
		display: none;
	}
`;

const LogoContainer = styled.div`
	display: inline;
	margin-bottom: 60vh;
`;

const Logo = styled.img`
	width: 90px;
	height: 80px;
`;

const NavBarContainer = styled.div`
	display: flex;
	width: 50px;
	justify-self: center;
	flex-direction: column;
`;
const NavLink = styled(Link)`
	outline: none;
	color: #fff;
	padding: 15px 20px;
	opacity: 0.7;

	&:hover {
		opacity: 1;
	}
`;
