import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MovieItem from "../components/MovieItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
				<Footer />
			</SubContainer>
		</Container>
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
	padding: 1rem;
	flex-direction: row;
	flex-wrap: wrap;
	padding-top: 3rem;
	padding-left: 1rem;
	width: 97%;
	overflow: hidden;
	@media (max-width: 1080px) {
		height: 32rem;
	}
	@media (max-width: 720px) {
		padding-left: 1rem;
	}
	@media (max-width: 480px) {
		height: 32rem;
	}
`;
