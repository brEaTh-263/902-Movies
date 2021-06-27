import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, makeStyles } from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import tmdbApiKey from "../constants/tmdbApiKey";
const useStyles = makeStyles((theme) => ({
	button: {
		marginTop: 10,
		color: "#fff",
		borderColor: "#702123",
		letterSpacing: 1,
		fontWeight: "500",
	},
	watchButton: {
		backgroundColor: "red",
		marginTop: 10,
		color: "#fff",
		letterSpacing: 3,
	},
	blueButton: {
		backgroundColor: "#6D43FE",
		marginTop: 10,
		color: "#fff",
		letterSpacing: 1,
	},
}));
export default function MovieItem({ movie, show }) {
	const classes = useStyles();
	const releaseDate = moment(movie.release_date).format("LL");
	const [showTrailer, setShowTrailer] = useState(false);
	const [trailer, setTrailer] = useState("");
	const history = useHistory();

	useEffect(() => {
		const getVideo = async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${tmdbApiKey.key}&language=en-US`
			);
			const responseJson = await response.json();
			setTrailer(responseJson.results[0].key);
		};
		if (showTrailer) getVideo();
	}, [movie.id, showTrailer]);

	return (
		<MoviesContainer
			whileHover={{ scale: show ? 1.2 : 1 }}
			onHoverStart={() => setShowTrailer(true)}
			onHoverEnd={() => {
				setShowTrailer(false);
				setTrailer("");
			}}
		>
			{show && showTrailer && (
				<Video
					title="Trailer"
					allowFullScreen={true}
					src={`https://www.youtube.com/embed/${trailer}?rel=0&controls=0&showinfo=0&autoplay=1&loop=1&modestbranding=1&playlist=${trailer}&iv_load_policy=1&enablejsapi=1`}
					frameBorder="0"
				></Video>
			)}

			{(!showTrailer || !show) && (
				<Poster
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
				></Poster>
			)}

			<Name>{movie.title}</Name>
			<Text>Imdb Rating {movie.vote_average}</Text>
			<Text>Released {releaseDate}</Text>
			<Button
				className={classes.button}
				variant="outlined"
				onClick={() => {
					history.push(`/movies/${movie.id}`);
				}}
			>
				View
			</Button>
		</MoviesContainer>
	);
}

const MoviesContainer = styled(motion.div)`
	width: 260px;
	overflow: visible;
	height: 400px;
	margin: 20px 45px 80px 0px;
	display: inline-block;
	background: #000;
	@media (max-width: 1080px) {
		width: 230px;
		height: 350px;
	}
	@media (max-width: 480px) {
		width: 180px;
		height: 300px;
	}
`;
const Poster = styled.img`
	width: 250px;
	height: 350px;
	border-radius: 0.2rem;
	@media (max-width: 1080px) {
		width: 220px;
		height: 300px;
	}
	@media (max-width: 480px) {
		width: 170px;
		height: 250px;
	}
`;
const Name = styled.p`
	font-weight: bold;
	color: #fff;
	font-size: 1.3rem;
	letter-spacing: 2px;
	margin: 5px 0;
	width: 260px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	@media (max-width: 480px) {
		letter-spacing: 1px;
		width: 160px;
		font-size: 1rem;
		font-weight: 700;
	}
`;
const Text = styled.p`
	color: #fff;
	margin: 5px 0;
	font-size: 0.8rem;
	font-weight: lighter;
	@media (max-width: 480px) {
		font-size: 0.7rem;
	}
`;

const Video = styled.iframe`
	width: 250px;
	height: 350px;
	@media (max-width: 1080px) {
		width: 220px;
		height: 300px;
	}
	@media (max-width: 480px) {
		width: 170px;
		height: 250px;
	}
`;

MovieItem.defaultProps = {
	show: true,
};
