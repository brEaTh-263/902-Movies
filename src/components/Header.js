import React from "react";
import styled from "styled-components";
import MovieIcon from "@material-ui/icons/Movie";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/action/Auth";
export default function Header() {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.Auth.isAuth);
	return (
		<Container>
			<LogoContainer>
				<NavLink to="/">
					<Logo>M</Logo>
				</NavLink>
			</LogoContainer>
			<NavBarContainer>
				{isAuth && (
					<Tooltip title="Log out">
						<NavLink onClick={() => dispatch(authActions.signOut())}>
							<MeetingRoomIcon style={{ fontSize: 30 }} />
						</NavLink>
					</Tooltip>
				)}
				<Tooltip title="Movies">
					<NavLink to="/movies">
						<MovieIcon style={{ fontSize: 30 }} />{" "}
					</NavLink>
				</Tooltip>
				<Tooltip title="Contact">
					<NavLink to="/contact-us">
						<ContactSupportIcon style={{ fontSize: 30 }} />{" "}
					</NavLink>
				</Tooltip>
				<Tooltip title="About Us">
					<NavLink to="/about-us">
						<InfoIcon style={{ fontSize: 30 }} />
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
	z-index: 1000;
	flex-direction: column;
	align-content: center;

	@media (max-width: 720px) {
		display: none;
	}
`;

const LogoContainer = styled.div`
	display: inline;
`;

const Logo = styled.span`
	font-size: 60px;
	color: #fff;
	font-family: "Viaoda Libre";
`;

const NavBarContainer = styled.div`
	position: absolute;
	bottom: 0;
	display: flex;
	width: 50px;
	justify-self: center;
	flex-direction: column;
`;
const NavLink = styled(Link)`
	outline: none;
	text-decoration: none;
	color: #fff;
	padding: 15px 20px;
	opacity: 0.7;

	&:hover {
		opacity: 1;
	}
`;
