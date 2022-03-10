import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import ActorDetails from "../components/ActorDetails";
import Header from "../components/Header";
import NavLayer from "../components/NavLayer";
import imdbApiKey from "../constants/imdbApiKey";
import tmdbApiKey from "../constants/tmdbApiKey";
export default function ActorPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [actor, setActor] = useState(JSON.parse(localStorage.getItem("actor")));
	const { id } = useParams();

	useEffect(() => {
		const getMovieDetails = async () => {
			setIsLoading(true);
			let response = await fetch(
				`https://api.themoviedb.org/3/person/${id}?api_key=${tmdbApiKey.key}&language=en-US`
			);
			const responseJson = await response.json();
			response = await fetch(
				`https://imdb-api.com/en/API/Name/${imdbApiKey.key}/${responseJson.imdb_id}`
			);
			const imdbJson = await response.json();
			const { birthday, biography, place_of_birth, name } = responseJson;
			const { castMovies, awards, knownFor, role, image } = imdbJson;
			setActor({
				birthday,
				biography,
				place_of_birth,
				castMovies,
				awards,
				knownFor,
				role,
				image,
				name,
			});
			await localStorage.setItem("actor", JSON.stringify(actor));
			setIsLoading(false);
		};
		getMovieDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	if (isLoading) {
		return (
			<Container>
				<LinearProgress />
			</Container>
		);
	}
	return (
		<NavLayer>
			<Container>
				<Header />
				<SubContainer>
					<Left>
						<ActorDetails details={actor} />
					</Left>
					<Right>
						<Name>{actor?.name}</Name>
						<ActorCover>
							<section>
								<ActorImage src={actor?.image}>
									{/* <p>{actor?.name}</p> */}
								</ActorImage>
								<NameOverlay>{actor?.name}</NameOverlay>
							</section>
							<div>
								<Title>Role</Title>
								<Text>{actor?.role}</Text>
							</div>
							<div>
								<Title>BirthDate</Title>
								<Text>{actor?.birthday}</Text>
							</div>
							<div>
								<Title>Role</Title>
								<Text>{actor?.role}</Text>
							</div>
						</ActorCover>
					</Right>
				</SubContainer>
			</Container>
		</NavLayer>
	);
}

const Container = styled.div`
	flex: 1;
	width: 100vw;
	background: #000;
	box-sizing: border-box;
	height: 100vh;
	overflow-x: hidden;
	z-index: 1;
`;
const SubContainer = styled.div`
	margin-left: 10vw;
	padding: 30px;
	display: flex;
	@media (max-width: 855px) {
		flex-direction: column-reverse;
	}
	@media (max-width: 720px) {
		margin-left: 0;
	}
`;
const Left = styled.div`
	width: 50vw;
	margin-right: 8vw;
	height: 100vh;
	@media (max-width: 855px) {
		width: 70vw;
		margin: 0;
	}
`;
const Right = styled.div`
	display: flex;
	box-sizing: border-box;
	width: 23vw;
	padding: 0;
	overflow-x: visible;
	position: fixed;
	right: 6vw;
	@media (max-width: 855px) {
		width: 70vw;
		position: relative;
		flex-direction: row;
		right: auto;
		overflow: hidden;
		margin: 0;
	}
`;
const ActorImage = styled.img`
	width: 100%;
	min-height: 40vw;
	object-fit: cover;
	padding: 0;
	margin: 0;
	z-index: 0;
`;
const ActorCover = styled.div`
	width: 20vw;
	padding: 0;
	margin: 0;
	@media (max-width: 855px) {
		width: 40vw;
	}
	@media (max-width: 720px) {
		width: 50vw;
	}
	@media (max-width: 455px) {
		width: 70vw;
	}
	> div {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		@media (max-width: 1080px) {
			flex-direction: column;
			align-items: flex-start;
		}
	}
	> section {
		position: relative;
	}
`;
const Title = styled.p`
	color: #888;
	width: 7vw;
	font-family: sans-serif;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	@media (max-width: 1080px) {
		margin: 0;
		width: 100%;
	}
`;
const Text = styled.p`
	color: #fff;
	font-size: 0.8rem;
	font-family: sans-serif;
	width: 13vw;
	@media (max-width: 1080px) {
		margin-top: 1rem;
		width: 100%;
	}
`;

const Name = styled.h3`
	color: #fff;
	font-family: Anton;
	font-size: 3rem;
	transform: rotate(90deg);
	letter-spacing: 6px;
	transform-origin: top left;
	margin: 0;
	width: 80vh;
	z-index: 10;
	position: absolute;
	@media (max-width: 855px) {
		display: none;
	}
`;

const NameOverlay = styled.h3`
	color: #fff;
	font-family: Anton;
	font-size: 3rem;
	display: none;
	position: absolute;
	@media (max-width: 855px) {
		display: block;
		margin: 0;
		z-index: 10;
		width: 40vw;
		bottom: 0;
	}
	@media (max-width: 720px) {
		width: 50vw;

		font-size: 10vw;
	}
	@media (max-width: 455px) {
		width: 70vw;
		font-size: 15vw;
	}
`;
