import React from "react";
import styled from "styled-components";
import CastItem from "./CastItem";
import { motion, useAnimation } from "framer-motion";
export default function MovieDetails({ movie }) {
	const controls = useAnimation();

	const getCast = () => {
		if (!movie) return;
		return movie.cast.map((c) => {
			return <CastItem key={c.id} cast={c} />;
		});
	};

	const findDirectors = () => {
		let director = [];
		movie?.crew.map((c) => {
			if (c.job === "Director") {
				director.push(c.name);
			}
			return c;
		});
		director = director.join(",");
		return <Text>{director}</Text>;
	};
	const findProducers = () => {
		let producer = [];
		movie?.crew.map((c) => {
			if (c.job === "Producer") {
				producer.push(c.name);
			}
			return c;
		});
		producer = producer.join(",");
		return <Text>{producer}</Text>;
	};

	const findWriter = () => {
		let writer = [];
		movie?.crew.map((c) => {
			if (c.job === "Novel") {
				writer.push(c.name);
			}
			return c;
		});
		writer = writer.join(",");
		return <Text>{writer}</Text>;
	};
	return (
		<div>
			<MovieDetailsContainer animate={controls}>
				<Column>
					<EmptySpace
						style={{
							height:
								movie?.overview.length > 300
									? "5vh"
									: movie?.overview.length > 200
									? "15vh"
									: "18vh",
						}}
					/>

					<Text>{movie?.overview}</Text>
					<Designation>Directed by</Designation>
					{findDirectors()}
					<Designation>Written By</Designation>
					{findWriter()}
					<Designation>Produced By</Designation>
					{findProducers()}
					<Designation>Cast</Designation>
					<CastList>{getCast()}</CastList>
					<Designation>Gallery</Designation>
					<Images>
						<Image
							src={`https://image.tmdb.org/t/p/original${movie?.backdrops[2].file_path}`}
						/>
						<Image
							src={`https://image.tmdb.org/t/p/original${movie?.backdrops[2].file_path}`}
						/>
						<Image
							src={`https://image.tmdb.org/t/p/original${movie?.backdrops[4].file_path}`}
						/>
						<Image
							src={`https://image.tmdb.org/t/p/original${movie?.backdrops[5].file_path}`}
						/>
						<Image
							src={`https://image.tmdb.org/t/p/original${movie?.backdrops[6].file_path}`}
						/>
					</Images>
				</Column>
			</MovieDetailsContainer>
		</div>
	);
}
const MovieDetailsContainer = styled(motion.div)`
	position: absolute;
	height: 100%;
	width: 20vw;
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	overflow-x: hidden;
	z-index: 100;
	background-color: rgba(256, 256, 256, 0.05);
	@media (max-width: 855px) {
		width: 30vw;
	}
	@media (max-width: 585px) {
		width: 100vw;
		background-color: rgba(256, 256, 256, 0.2);
		position: static;
	}
`;

const Images = styled.div`
	display: grid;
	grid-template-columns: 200px 200px 200px 200px 200px;
	grid-template-rows: 150px;
	grid-gap: 10px;
	width: vw;
	overflow-x: scroll;
	@media (max-width: 855px) {
		width: 30vw;
		height: 24vh;
	}
	@media (max-width: 585px) {
		width: 100vw;
		height: 24vh;
	}
`;

const Image = styled(motion.img)`
	padding: 10px 0;
	background-size: contain;
	width: 100%;
	height: 100%;
`;

const Column = styled.div``;

const EmptySpace = styled.div`
	height: 35vh;
	@media (max-width: 855px) {
		height: 7vh !important;
	}
`;

const Text = styled.p`
	color: #fff;
	font-size: 0.9rem;
	font-family: sans-serif;
	margin: 0 0 25px 0;
	width: 100%;
	@media (max-width: 855px) {
		width: 25vw;
	}
	@media (max-width: 720px) {
		font-size: 0.8rem;
	}
	@media (max-width: 585px) {
		font-size: 1rem;
		width: 90vw;
	}
`;

const Designation = styled.p`
	font-size: 1.2rem;
	margin: 5px 0;
	text-transform: uppercase;
	font-weight: bold;
	color: #fff;
	letter-spacing: 2px;
	@media (max-width: 720px) {
		font-size: 1rem;
	}
	@media (max-width: 585px) {
		font-size: 1.3rem;
		width: 90vw;
	}
`;

const CastList = styled.div`
	display: flex;
	flex-direction: row;
	height: 29vh;
	z-index: 1000;
	overflow-x: scroll;
	overflow-y: hidden;
	@media (max-width: 855px) {
		width: 30vw;
		height: 25vh;
	}
	@media (max-width: 585px) {
		width: 100vw;
		height: 25vh;
	}
`;
