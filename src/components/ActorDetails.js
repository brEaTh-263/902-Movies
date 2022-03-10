import React from "react";
import styled from "styled-components";

export default function ActorDetails({ details }) {
	const getMovies = () => {
		return details.knownFor.map((m) => {
			// eslint-disable-next-line jsx-a11y/anchor-is-valid
			return <a href="#">{m.fullTitle}</a>;
		});
	};
	return (
		<Container>
			<Title>Place of birth</Title>
			<Text>{details.place_of_birth}</Text>
			<Title>Awards</Title>
			<Text>{details.awards}</Text>
			<Title>Biography</Title>
			<Text>{details.biography}</Text>
			<Title>Known for</Title>
			{getMovies()}
		</Container>
	);
}

const Container = styled.div`
	> a {
		color: #fff;
		margin-right: 4px;
	}
	padding-bottom: 15vh;
`;
const Title = styled.p`
	color: #888;
	font-size: 1.5rem;
	font-family: sans-serif;
	padding-bottom: 1rem;
	border-bottom: 1px #888 solid;
	@media (max-width: 855px) {
		font-size: 1.1rem;
	}
`;

const Text = styled.p`
	color: #f2f2f2;
	font-size: 1rem;
	font-family: sans-serif;
	letter-spacing: 1px;
	@media (max-width: 1080px) {
		font-size: 0.9rem;
	}
	@media (max-width: 855px) {
		font-size: 0.8rem;
	}
`;
