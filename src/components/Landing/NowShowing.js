import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MovieItem from "../MovieItem";

export default function NowShowing() {
	const { inView, ref } = useInView();
	const controls = useAnimation();
	const movies = useSelector((state) => state.Movies);
	const { nowShowingMovies } = movies;
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

	const GetNowShowingHandler = () => {
		return nowShowingMovies.map((movie) => {
			return <MovieItem key={movie.id} movie={movie} />;
		});
	};
	useEffect(() => {
		if (inView) {
			controls.start("visible");
		} else {
			controls.start("hidden");
		}
	}, [controls, inView]);

	return (
		<motion.div>
			<RedTag>Featured</RedTag>
			<Type>
				<BoldType>Now</BoldType> Showing
			</Type>
			<NowShowingContainer
				initial="hidden"
				ref={ref}
				animate={controls}
				variants={variants}
			>
				{GetNowShowingHandler()}
			</NowShowingContainer>
		</motion.div>
	);
}

const NowShowingContainer = styled(motion.div)`
	flex-direction: row;
	align-items: center;
	padding: 1rem;
	padding-top: 3rem;
	padding-left: 3rem;
	height: 35rem;
	white-space: nowrap;
	width: 95%;
	overflow-x: scroll;
	overflow-y: visible;
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
const RedTag = styled.p`
	font-weight: bolder;
	color: red;
	text-transform: uppercase;
	padding: 10px 0;
	letter-spacing: 3px;
	margin: 0;
	@media (max-width: 720px) {
		font-size: 0.5rem;
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
