import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
export default function CastItem({ cast }) {
	const history = useHistory();
	return (
		<CastContainer onClick={() => history.push(`/cast/${cast.id}`)}>
			<CastImage
				src={
					cast.profile_path
						? `https://image.tmdb.org/t/p/original${cast.profile_path}`
						: "https://image.freepik.com/free-vector/handsome-guy-stylish-suit_250538-391.jpg"
				}
				onError={() => {}}
			></CastImage>

			<CastName>{cast.name}</CastName>
		</CastContainer>
	);
}

const CastContainer = styled.div`
	margin: 10px 10px 5px 0;
	width: 10rem;
	height: 24vh;
	box-sizing: border-box;
	&:hover {
		cursor: pointer;
	}
	@media (max-width: 855px) {
		width: 9rem;
		height: 22vh;
	}
`;

const CastImage = styled.img`
	width: 8rem;
	height: 22vh;
	object-fit: cover;
	border-radius: 1rem;
	@media (max-width: 855px) {
		height: 20vh;
	}
`;

const CastName = styled.p`
	color: #fff;
	font-size: 0.9rem;
	font-family: sans-serif;
	font-weight: 500;
	margin: 5px 0;
	text-align: center;
`;
