import React from "react";
import styled from "styled-components";

export default function AboutPage(props) {
	return (
		<Container>
			<Background>
				<RedTag>now playing</RedTag>
				<Type>
					<BoldType>Now</BoldType> Playing
				</Type>
			</Background>
		</Container>
	);
}

const Container = styled.div`
	flex: 1;
	width: 100vw;
	background: #000;
	height: 100%;
`;

const Background = styled.div`
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, #000 100%),
		url("https://ali.sandbox.etdevs.com/divi/wp-content/uploads/sites/2/2019/09/movie-02.jpg");
	background-size: cover;
	background-position: 50%;
	padding: 8rem;
`;

const RedTag = styled.p`
	font-weight: bolder;
	color: red;
	text-transform: uppercase;
	padding: 10px 0;
	letter-spacing: 3px;
	margin: 0;
`;

const Type = styled.h1`
	color: #fff;
	letter-spacing: 3px;
	font-size: 6rem;
	font-weight: lighter;
	display: inline-block;
	margin: 0;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 720px) {
		font-size: 2rem;
	}
`;

const BoldType = styled.span`
	font-weight: bold;
	color: #fff;
	letter-spacing: 3px;
	font-size: 6rem;
	display: inline-block;
	margin: 0;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 720px) {
		font-size: 2rem;
	}
`;
