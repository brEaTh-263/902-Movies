import React from "react";
import { motion } from "framer-motion";
import DateItem from "../DateItem";
import styled from "styled-components";

export default function Date() {
	const items = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 50, velocity: -100 },
			},
		},
		closed: {
			y: 80,
			opacity: 0,
			transition: {
				delay: 0.5,
				y: { stiffness: 50 },
			},
		},
	};
	return (
		<SubContainer variants={items} initial="closed" animate="open">
			<Title>Date</Title>
			<Dates>
				<DateItem days={-1} />
				<DateItem days={0} />
				<DateItem days={1} />
				<DateItem days={2} />
				<DateItem days={3} />
			</Dates>
		</SubContainer>
	);
}

const SubContainer = styled(motion.div)`
	padding: 3rem 5rem;
	display: block;

	@media (max-width: 720px) {
		padding: 2rem;
		width: 80vw;
	}
	@media (max-width: 580px) {
		padding: 1rem;
		width: 80vw;
	}
`;

const Title = styled.p`
	color: #fff;
	font-size: 1rem;
	text-transform: uppercase;
	margin: 0;
	/* display: block; */
`;

const Dates = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;
