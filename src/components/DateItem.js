import React from "react";
import styled from "styled-components";

export default function DateItem(props) {
	const getDate = () => {
		let date = new Date();
		date.setDate(date.getDate() + props.days);
		let opac = props.days === 0 ? 1 : 0.5;
		return (
			<>
				<Title style={{ opacity: opac }}>{monthNames[date.getMonth()]}</Title>
				<StyledTitle style={{ opacity: opac }}>{date.getDate()}</StyledTitle>
				<Title style={{ opacity: opac }}>{dayNames[date.getDay()]}</Title>
			</>
		);
	};
	return (
		<DateContainer
			style={{
				backgroundColor: props.days === 0 ? "rgba(256,256,256,0.2)" : null,
			}}
		>
			{getDate()}
		</DateContainer>
	);
}

const DateContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 7rem;
	padding: 1rem;
	margin: 1rem;
	box-sizing: border-box;
	@media (max-width: 585px) {
		max-width: 4rem;
		padding: 0.8rem;
		margin: 0.8rem;
	}
	@media (max-width: 480px) {
		max-width: 3rem;
		margin: 0.8rem;
	}
	@media (max-width: 380px) {
		max-width: 3rem;
		margin: 0.4rem;
	}
`;
const Title = styled.p`
	color: #fff;
	font-size: 1rem;
	text-transform: uppercase;
	font-weight: bolder;
	display: inline-block;
	margin: 0;
	@media (max-width: 585px) {
		font-size: 0.8rem;
	}
`;

const StyledTitle = styled(Title)`
	font-weight: bolder;
	font-size: 2rem;
	@media (max-width: 585px) {
		font-size: 1.5rem;
	}
`;

const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
