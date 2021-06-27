import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MovieIcon from "@material-ui/icons/Movie";
import { Button, makeStyles } from "@material-ui/core";
import genres from "../../genres";
import { useHistory } from "react-router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles((theme) => ({
	blueButton: {
		backgroundColor: "#6D43FE",
		marginTop: 10,
		color: "#fff",
		letterSpacing: 1,
	},
}));

export default function AllShowTimes() {
	const movies = useSelector((state) => state.Movies);
	const { nowShowingMovies } = movies;
	const classes = useStyles();
	const { inView, ref } = useInView();
	const controls = useAnimation();
	const history = useHistory();
	const variants = {
		hidden: {
			opacity: 0,
			y: 30,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
			},
		},
	};
	useEffect(() => {
		if (inView) {
			controls.start("visible");
		} else {
			controls.start("hidden");
		}
	}, [controls, inView]);

	const findGenres = (genre_ids) => {
		let formattedGenres = [];
		if (!genre_ids) return;
		genres?.map((genre) => {
			genre_ids.map((g) => {
				if (g === genre.id) {
					formattedGenres.push(genre.name);
				}
				return g;
			});
			return genre;
		});
		formattedGenres = formattedGenres.join(",");
		return <BlueTag>{formattedGenres}</BlueTag>;
	};
	return (
		<AllShowtimesContainer
			initial="hidden"
			ref={ref}
			animate={controls}
			variants={variants}
		>
			<DetailsContainer>
				<BlueTag>All Showtimes </BlueTag>
				<Type>
					<BoldType>See</BoldType> a Movie
				</Type>
				<BigText>
					A crew of underwater researchers must scramble to safety after an
					earthquake devastates their subterranean laboratory.
				</BigText>
			</DetailsContainer>
			<ExtraSpacingContainer>
				<ShowsContainer>
					<Name>{nowShowingMovies[0]?.title}</Name>
					{findGenres(nowShowingMovies[0]?.genre_ids)}
					<Name>{nowShowingMovies[1]?.title}</Name>
					{findGenres(nowShowingMovies[1]?.genre_ids)}
					<Name>{nowShowingMovies[2]?.title}</Name>
					{findGenres(nowShowingMovies[2]?.genre_ids)}
					<Name>{nowShowingMovies[3]?.title}</Name>
					{findGenres(nowShowingMovies[3]?.genre_ids)}
					<Name>{nowShowingMovies[4]?.title}</Name>
					{findGenres(nowShowingMovies[4]?.genre_ids)}
					<StyledButton
						variant="contained"
						onClick={() => history.push("/movies")}
						className={classes.blueButton}
						startIcon={<MovieIcon />}
					>
						Buy Tickets
					</StyledButton>
				</ShowsContainer>
			</ExtraSpacingContainer>
			<Image />
		</AllShowtimesContainer>
	);
}
const AllShowtimesContainer = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	@media (max-width: 480px) {
		flex-direction: column;
	}
`;
const BoldType = styled.span`
	font-weight: bold;
	color: #fff;
	letter-spacing: 3px;
	font-size: 4rem;
	display: inline-block;
	margin: 0;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 720px) {
		font-size: 2rem;
	}
`;
const Type = styled.h1`
	color: #fff;
	letter-spacing: 3px;
	font-size: 4rem;
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
const RedTag = styled.p`
	font-weight: bolder;
	color: red;
	text-transform: uppercase;
	padding: 10px 0;
	letter-spacing: 3px;
	margin: 0;
`;

const BlueTag = styled(RedTag)`
	color: #694cc9;
	width: 100%;
	word-wrap: break-word;
	@media (max-width: 1080px) {
		font-size: 0.8rem;
	}
	@media (max-width: 855px) {
		font-size: 0.7rem;
	}
	@media (max-width: 720px) {
		font-size: 0.5rem;
	}
`;

const DetailsContainer = styled.div`
	width: 30%;
	@media (max-width: 480px) {
		width: 80%;
		margin-bottom: 6rem;
	}
`;
const ShowsContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	border: 0.3rem solid #1e114a;
	padding: 2rem 4rem 2rem 2rem;
	background: #000;
	z-index: 1;
	box-sizing: border-box;
	position: relative;
	@media (max-width: 1080px) {
		padding: 1.5rem 3.5rem 1.5rem 1.5rem;
	}
	@media (max-width: 855px) {
		padding: 1.5rem 3rem 1.5rem 1rem;
	}
`;

const ExtraSpacingContainer = styled.div`
	border: 10px black solid;
	z-index: 1;
	width: 40%;
	@media (max-width: 480px) {
		width: 80%;
	}
`;

const StyledButton = styled(Button)`
	position: absolute;
	bottom: -20px;
	right: 20px;
	@media (max-width: 720px) {
		font-size: 0.6rem !important;
	}
`;

const Name = styled.p`
	font-weight: bold;
	color: #fff;
	font-size: 1.3rem;
	letter-spacing: 2px;
	margin: 5px 0;
	@media (max-width: 1080px) {
		font-size: 1rem;
	}
	@media (max-width: 855px) {
		font-size: 0.9rem;
	}
	@media (max-width: 720px) {
		font-size: 0.7rem;
	}
`;

const Image = styled.div`
	width: 35%;
	height: 15%;
	object-fit: cover;
	filter: opacity(45%);
	transform: translateY(-2rem);
	background: linear-gradient(to bottom, rgba(256, 256, 256, 0), #000),
		url("https://image.freepik.com/free-vector/elegant-blurry-red-bokeh-lights-background_1017-25385.jpg");
	position: absolute;
	right: 0;
	@media (max-width: 480px) {
		width: 75%;
		height: 15%;
		transform: translateY(5rem);
	}
`;

const BigText = styled.p`
	font-weight: lighter;
	font-size: 0.9rem;
	letter-spacing: 2px;
	line-height: 20px;
	color: #fff;
	margin: 5px 0;
	@media (max-width: 720px) {
		font-size: 0.7rem;
	}
`;
