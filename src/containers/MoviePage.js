import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router-dom";
import tmdbApiKey from "../constants/tmdbApiKey";
import { motion, useAnimation } from "framer-motion";
import LinearProgress from "@material-ui/core/LinearProgress";
import MovieDetails from "../components/MovieDetails";
import BookSeatsPage from "./BookSeatsPage";
import { useHistory } from "react-router";
import ShowTrailer from "../components/ShowTrailer";
export default function HomePage(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [trailer, setTrailer] = useState("");
	const { id } = useParams();
	const [isBookingSeats, setIsBookingSeats] = useState(false);
	const headerControls = useAnimation();
	const movieControls = useAnimation();
	const history = useHistory();
	const movieDetailsControls = useAnimation();

	useEffect(() => {
		const getMovieDetails = async () => {
			setIsLoading(true);
			let response = await fetch(
				`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey.key}&language=en-US`
			);

			const responseJson = await response.json();
			response = await fetch(
				`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${tmdbApiKey.key}&language=en-US`
			);
			const castJson = await response.json();
			const { cast, crew } = castJson;
			response = await fetch(
				`https://api.themoviedb.org/3/movie/${id}/images?api_key=${tmdbApiKey.key}`
			);
			const imagesJson = await response.json();
			const { backdrops } = imagesJson;
			setMovie({ ...responseJson, cast, crew, backdrops });
			setIsLoading(false);
		};
		getMovieDetails();
	}, [id]);

	const getVideo = async () => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${tmdbApiKey.key}&language=en-US`
		);
		const responseJson = await response.json();
		setTrailer(responseJson.results[0].key);
	};

	useEffect(() => {
		if (isBookingSeats) {
			movieControls.start({
				opacity: 0,
				transition: {
					duration: 0.5,
					ease: "easeIn",
				},
			});
			movieDetailsControls.start({
				opacity: 0,
				transition: {
					duration: 0.5,
					ease: "easeIn",
				},
			});
			headerControls.start({
				opacity: 0,
				transition: {
					duration: 0.5,
					ease: "easeIn",
				},
			});
		} else {
			movieDetailsControls.start({
				opacity: 1,
				transition: {
					duration: 1,
					ease: "easeIn",
				},
			});
			movieControls.start({
				opacity: 1,
				transition: {
					duration: 1,
					ease: "easeIn",
				},
			});
			headerControls.start({
				opacity: 1,
				transition: {
					duration: 1,
					ease: "easeIn",
				},
			});
		}
	}, [isBookingSeats, movieControls, movieDetailsControls, headerControls]);

	const [movie, setMovie] = useState(null);

	if (isLoading) {
		return (
			<Container>
				<LinearProgress />
			</Container>
		);
	}

	if (trailer.length > 0) {
		return <ShowTrailer trailer={trailer} />;
	}

	return (
		<Container
			style={{
				position: isBookingSeats ? "fixed" : "initial",
				backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrops[0].file_path})`,
			}}
		>
			<motion.div style={{ opacity: 1 }} animate={headerControls}>
				<Header />
			</motion.div>

			{isBookingSeats && (
				<BookSeatsPage setIsBookingSeats={setIsBookingSeats} />
			)}
			{!isBookingSeats && (
				<>
					<MovieContainer animate={movieControls}>
						<StyledIconButton onClick={() => history.goBack()}>
							<ArrowBackIcon style={{ color: "#fff", fontSize: 20 }} />
						</StyledIconButton>
						<EmptySpace />
						<SubTitle>{movie?.tagline}</SubTitle>
						<Title>{movie?.title}</Title>
						<StyledButton
							onClick={() => {
								setIsBookingSeats(true);
							}}
							style={{ display: !isBookingSeats ? "inline-block" : "none" }}
							variant="outlined"
						>
							GET TICKETS
						</StyledButton>
						<TrailerButton onClick={() => getVideo()}>
							<ThirdLayer>
								<SecondLayer>
									<PlayArrowIcon style={{ color: "#fff", fontSize: 35 }} />
								</SecondLayer>
							</ThirdLayer>
						</TrailerButton>
					</MovieContainer>

					<MovieDetailsContainer animate={movieDetailsControls}>
						<MovieDetails movie={movie} />
					</MovieDetailsContainer>
				</>
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-size: cover;
	background-position: center;
	filter: grayscale(30%);
	overflow-y: scroll;
	overflow-x: hidden;
	z-index: 1;
`;
const MovieDetailsContainer = styled(motion.div)`
	opacity: 1;
	position: absolute;
	height: 100%;
	width: 19vw;
	box-sizing: border-box;
	display: inline-block;
	z-index: 2;
	@media (max-width: 585px) {
		display: block;
	}
`;

const MovieContainer = styled(motion.div)`
	margin-left: 8vw;
	padding-left: 4vw;
	border-left: 1px rgba(256, 256, 256, 0.1) solid;
	border-right: 1px rgba(256, 256, 256, 0.1) solid;
	height: 100%;
	display: inline-block;
	width: 72vw;
	box-sizing: border-box;
	position: relative;
	@media (max-width: 855px) {
		width: 67vw;
	}
	@media (max-width: 720px) {
		margin-left: 0;
		width: 70vw;
	}
	@media (max-width: 585px) {
		width: 100vw;
		padding-left: 3rem;
	}
`;

const EmptySpace = styled.div`
	height: 35vh;
`;

const SubTitle = styled.p`
	font-size: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	color: #fff;
	margin: 0;
	@media (max-width: 855px) {
		font-size: 0.8rem;
	}
`;

const Title = styled.p`
	font-size: 4rem;
	text-transform: uppercase;
	letter-spacing: 10px;
	color: #fff;
	margin: 0;
	z-index: -1;
	@media (max-width: 855px) {
		font-size: 3rem;
	}
`;

const StyledIconButton = styled(IconButton)`
	position: absolute;
	left: 1rem;
	top: 1rem;
	display: none;
	@media (max-width: 720px) {
		display: inline-block;
	}
`;

const StyledButton = styled(Button)`
	margin-top: 10px;
	padding: 10px 35px;
	color: #fff;
	border-color: #fff;
	letter-spacing: 3;
	@media (max-width: 855px) {
		padding: 8px 30px;
	}
`;

const ThirdLayer = styled.div`
	height: 160px;
	width: 160px;
	background: rgba(256, 256, 256, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	&:hover {
		cursor: pointer;
	}
	@media (max-width: 585px) {
		height: 130px;
		width: 130px;
	}
`;

const SecondLayer = styled.div`
	height: 100px;
	width: 100px;
	background: rgba(256, 256, 256, 0.07);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	@media (max-width: 585px) {
		height: 70px;
		width: 70px;
	}
`;

const TrailerButton = styled.div`
	position: absolute;
	left: 45%;
	top: 35%;
	height: 220px;
	width: 220px;
	background: rgba(256, 256, 256, 0.05);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	z-index: 100;
	@media (max-width: 585px) {
		top: 40%;
		left: 40%;
		height: 150px;
		width: 150px;
	}
`;
