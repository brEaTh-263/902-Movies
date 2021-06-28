import React from "react";
import { useSelector } from "react-redux";
import Seats from "../assets/seats.png";
import styled from "styled-components";

export default function Footer() {
	const movies = useSelector((state) => state.Movies);
	const { nowShowingMovies } = movies;
	return (
		<Container>
			<BackgroundPic></BackgroundPic>
			<FooterContainer>
				<RedTag
					style={{
						margin: "2rem",
						width: "14rem",
					}}
				>
					Experience Movies like no other
				</RedTag>

				<Column>
					<GreyTag>Movies</GreyTag>
					<Text style={{ fontWeight: "normal" }}>
						{nowShowingMovies[0]?.title}
					</Text>
					<Text style={{ fontWeight: "normal" }}>
						{nowShowingMovies[1]?.title}
					</Text>
					<Text style={{ fontWeight: "normal" }}>
						{nowShowingMovies[2]?.title}
					</Text>
					<Text style={{ fontWeight: "normal" }}>
						{nowShowingMovies[3]?.title}
					</Text>
					<Text style={{ fontWeight: "normal" }}>
						{nowShowingMovies[4]?.title}
					</Text>
				</Column>
				<Column>
					<GreyTag>Info</GreyTag>
					<Text style={{ fontWeight: "normal" }}>
						chhapariakeshav@gmail.com
					</Text>
					<Text style={{ fontWeight: "normal" }}>(+91)9794499644</Text>
				</Column>
			</FooterContainer>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	width: 100%;
	margin-top: 20vh;
	padding-bottom: 5vh;
`;

const FooterContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	z-index: 1000;
`;

const Column = styled.div`
	z-index: 2;
	margin: 2rem;
	@media (max-width: 585px) {
		margin: 2rem 1rem;
	}
	@media (max-width: 480px) {
		margin: 2rem 0.7rem;
		display: none;
	}
`;

const BackgroundPic = styled.div`
	background-image: linear-gradient(
			to bottom,
			#000,
			rgba(256, 256, 256, 0),
			#000
		),
		url(${Seats});
	width: 100vw;
	position: absolute;
	height: 40vh;
	background-size: cover;
	background-blend-mode: hard-light;
	filter: opacity(25%);
	background-position: bottom;
	/* transform: translateX(-14vw); */
	z-index: 100;
	bottom: 0;
	@media (max-width: 720px) {
		transform: none;
		left: 0;
	}
`;

const Text = styled.p`
	color: #fff;
	margin: 5px 0;
	font-size: 0.8rem;
	font-weight: lighter;
	word-wrap: break-word;
	width: 100%;
	@media (max-width: 585px) {
		font-size: 0.6rem;
	}
`;

const RedTag = styled.p`
	font-weight: bolder;
	color: red;
	text-transform: uppercase;
	padding: 10px 0;
	letter-spacing: 3px;
	margin: 0;
`;

const GreyTag = styled(RedTag)`
	color: #6f6d6c;
	font-size: 0.8rem;
	@media (max-width: 585px) {
		font-size: 0.6rem;
	}
`;
