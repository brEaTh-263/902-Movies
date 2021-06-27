import React, { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { useHistory } from "react-router";

export default function ComingSoon() {
	const { inView, ref } = useInView();
	const movies = useSelector((state) => state.Movies);
	const { upcomingMovies } = movies;
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
	return (
		<ComingSoonContainer
			initial="hidden"
			ref={ref}
			animate={controls}
			variants={variants}
		>
			<BigPoster
				src={`https://image.tmdb.org/t/p/original${upcomingMovies[0]?.poster_path}`}
			/>
			<DetailsContainer>
				<RedTag>Coming Soon</RedTag>
				<BigName>{upcomingMovies[0]?.title}</BigName>
				<BigText>{upcomingMovies[0]?.overview}</BigText>
				<TrailerButton startIcon={<PlayCircleFilledIcon />} variant="contained">
					Watch Trailer
				</TrailerButton>
				<ComingSoonButton
					variant="outlined"
					onClick={() => history.push("/movies", { comingSoon: true })}
				>
					View All Coming Soon
				</ComingSoonButton>
			</DetailsContainer>
		</ComingSoonContainer>
	);
}

const ComingSoonContainer = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	@media (max-width: 480px) {
		flex-direction: column;
	}
`;

const BigPoster = styled.img`
	width: 30%;
	height: 40%;
	margin: 0 10%;
	border-radius: 0.2rem;
	@media (max-width: 720px) {
		width: 40%;
		height: 50%;
	}
	@media (max-width: 480px) {
		width: 60%;
		height: 80%;
		margin-bottom: 10px;
	}
	@media (max-width: 380px) {
		width: 80%;
	}
`;

const BigName = styled.p`
	color: #fff;
	letter-spacing: 2px;
	margin: 5px 0;
	font-size: 4rem;
	font-weight: lighter;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 855px) {
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
	@media (max-width: 855px) {
		font-size: 0.9rem;
	}
	@media (max-width: 720px) {
		font-size: 0.5rem;
	}
`;

const DetailsContainer = styled.div`
	max-width: 22rem;
	display: flex;
	flex-direction: column;
`;

const TrailerButton = styled(Button)`
	margin-top: 10px;
	color: #fff;
	background: red;
	letter-spacing: 3px;
	width: 60%;
	@media (max-width: 1080px) {
		padding: 0.5rem 1rem;
		letter-spacing: 2px;
	}
	@media (max-width: 855px) {
		padding: 0.2rem 0.7rem;
		letter-spacing: 0;
		font-size: 0.7rem !important;
		width: 50%;
	}
	@media (max-width: 720px) {
		padding: 0.1rem 0.4rem;
		font-size: 0.6rem !important;
		width: 60%;
	}
	@media (max-width: 480px) {
		padding: 0.2rem 0.7rem;
		letter-spacing: 0;
		font-size: 0.7rem !important;
		width: 50%;
	}
	@media (max-width: 380px) {
		width: 60%;
	}
`;

const ComingSoonButton = styled(Button)`
	margin-top: 10px;
	color: #fff;
	border-color: #702123;
	letter-spacing: 1px;
	font-weight: 500;
	width: 80%;
	padding: 0.8rem 1.8rem;
	@media (max-width: 1080px) {
		padding: 0.5rem 1rem;
	}
	@media (max-width: 855px) {
		padding: 0.2rem 0.7rem;
		letter-spacing: 0;
		font-size: 0.8rem !important;
		width: 60%;
	}
	@media (max-width: 720px) {
		padding: 0.1rem 0.4rem;
		font-size: 0.7rem !important;
		width: 80%;
	}
	@media (max-width: 480px) {
		padding: 0.2rem 0.7rem;
		letter-spacing: 0;
		font-size: 0.8rem !important;
		width: 60%;
	}
	@media (max-width: 380px) {
		width: 80%;
	}
`;

const BigText = styled.p`
	font-weight: lighter;
	font-size: 0.9rem;
	letter-spacing: 2px;
	line-height: 20px;
	color: #fff;
	margin: 5px 0;
	@media (max-width: 1080px) {
		font-size: 0.8rem;
		letter-spacing: 1px;
	}
	@media (max-width: 855px) {
		font-size: 0.7rem;
		letter-spacing: 0;
	}
`;
