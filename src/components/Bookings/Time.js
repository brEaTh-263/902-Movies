import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Format from "../Format";
export default function Time({ selectedTime, setSelectedTime }) {
	const items = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 100, velocity: -100 },
			},
		},
		closed: {
			y: 50,
			opacity: 0,
			transition: {
				y: { stiffness: 100 },
			},
		},
	};
	return (
		<SubContainer variants={items} initial="closed" animate="open">
			<Title
				style={{
					marginBottom: "10px",
					padding: "0.5rem 1.5rem",
					display: "block",
				}}
			>
				Time
			</Title>
			<Format
				selectedIndex={selectedTime}
				setSelectedIndex={setSelectedTime}
				options={timeOptions}
			/>
		</SubContainer>
	);
}

const Title = styled.p`
	color: #fff;
	font-size: 1rem;
	text-transform: uppercase;

	margin: 0;
	margin-bottom: 10px;
	padding: 0.5rem 1.5rem;
	display: block;
`;

const SubContainer = styled(motion.div)`
	padding: 3rem 5rem;
	display: inline-block;
	@media (max-width: 720px) {
		padding: 2rem;
	}
`;

const timeOptions = ["11:00", "14:00", "19:30", "21:00"];
