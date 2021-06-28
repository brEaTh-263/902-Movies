import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MovieItem from "../components/MovieItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavLayer from "../components/NavLayer";
export default function MoviesPage(props) {
	const comingSoon = props.location.state;
	const AllMovies = useSelector((state) => state.Movies);
	const Movies = !comingSoon
		? AllMovies.nowShowingMovies
		: AllMovies.upcomingMovies;
	const Moviehandler = () => {
		return Movies.map((movie) => {
			return <MovieItem key={movie.id} movie={movie} show={false} />;
		});
	};
	return (
		<NavLayer>
			<Container>
				<Header />
				<Background>
					<RedTag>{comingSoon ? "coming soon" : "now playing"}</RedTag>
					<Type>
						<BoldType>{comingSoon ? "Coming" : "Now"}</BoldType>
						{comingSoon ? " Soon" : " Playing"}
					</Type>
				</Background>
				<SubContainer>
					<NowShowingContainer>{Moviehandler()}</NowShowingContainer>
				</SubContainer>
				<Footer />
			</Container>
		</NavLayer>
	);
}

const Container = styled.div`
	background: #000;
	flex: 1;
`;

const SubContainer = styled.div`
	margin-left: 8vw;
	padding-left: 4vw;
	@media (max-width: 720px) {
		margin-left: 0;
	}
`;

const Background = styled.div`
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, #000 100%),
		url("https://ali.sandbox.etdevs.com/divi/wp-content/uploads/sites/2/2019/12/theater-02.jpg");
	background-size: cover;
	background-position: 50%;
	padding: 8rem;
	@media (max-width: 585px) {
		padding: 4rem;
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

const NowShowingContainer = styled.div`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	padding-top: 3rem;
	column-count: 3;
	justify-content: space-evenly;
	width: 100%;
	overflow: hidden;
	@media (max-width: 855px) {
		column-count: 2;
		margin: auto;
		width: 85%;
	}

	@media (max-width: 585px) {
		column-count: 2;
		margin: auto;
		width: 100%;
	}
	@media (max-width: 380px) {
		column-count: 1;
		margin: auto;
		width: 200px;
		align-content: center;
		justify-content: center;
	}
`;
