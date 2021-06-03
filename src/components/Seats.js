import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Seats({ selectedSeats, setSelectedSeats }) {
	const getSeats = (id) => {
		let num = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
		];

		return num.map((num) => {
			let find = selectedSeats.findIndex((seat) => {
				return seat === id + num;
			});
			return (
				<Seat
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.8 }}
					onClick={() => {
						if (find === -1) setSelectedSeats([...selectedSeats, id + num]);
						else {
							let newArray = selectedSeats.filter((s) => s !== id + num);
							setSelectedSeats(newArray);
						}
					}}
					key={id + num}
				>
					{find === -1 ? (
						<BookSeatSvg viewBox="0 0 24 24">
							<path
								fill="rgba(256,256,256,0.2)"
								style={{ border: "none" }}
								stroke="rgba(256,256,256,0.2)"
								d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
							/>
						</BookSeatSvg>
					) : (
						<BookSeatSvg viewBox="0 0 24 24">
							<path
								fill="rgba(256,256,256,0.8)"
								stroke="rgba(256,256,256,0.8)"
								d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
							/>
						</BookSeatSvg>
					)}
				</Seat>
			);
		});
	};

	return (
		<Container>
			<Row>
				<Text>A</Text>
				{getSeats("A")}
				<Text>A</Text>
			</Row>
			<Row>
				<Text>B</Text>
				{getSeats("B")}
				<Text>B</Text>
			</Row>
			<Row>
				<Text>C</Text>
				{getSeats("C")}
				<Text>C</Text>
			</Row>
			<Row>
				<Text>D</Text>
				{getSeats("D")}
				<Text>D</Text>
			</Row>
			<Row>
				<Text>E</Text>
				{getSeats("E")}
				<Text>E</Text>
			</Row>
			<Row>
				<Text>F</Text>
				{getSeats("F")}
				<Text>F</Text>
			</Row>
			<Row>
				<Text>G</Text>
				{getSeats("G")}
				<Text>G</Text>
			</Row>
			<Row>
				<Text>H</Text>
				{getSeats("H")}
				<Text>H</Text>
			</Row>
			<Row>
				<Text>I</Text>
				{getSeats("I")}
				<Text>I</Text>
			</Row>
			<Row>
				<Text>J</Text>
				{getSeats("J")}
				<Text>J</Text>
			</Row>
			<Row
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					margin: "20px 0",
				}}
			>
				<DesignationContainer>
					<svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
						<path
							fill="rgba(256,256,256,0.2)"
							style={{ border: "none" }}
							stroke="rgba(256,256,256,0.2)"
							d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
						/>
					</svg>
					<Text>Available</Text>
				</DesignationContainer>
				<DesignationContainer>
					<svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
						<path
							fill="rgba(256,256,256,0.1)"
							style={{ border: "none" }}
							stroke="rgba(256,256,256,0.1)"
							d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
						/>
					</svg>
					<Text>Taken</Text>
				</DesignationContainer>
				<DesignationContainer>
					<svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
						<path
							fill="rgba(256,256,256,0.8)"
							style={{ border: "none" }}
							stroke="rgba(256,256,256,0.8)"
							d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
						/>
					</svg>
					<Text>Your Seats</Text>
				</DesignationContainer>
				<Text style={{ fontSize: 25, color: "rgba(256,256,256,0.2)" }}>|</Text>
				<DesignationContainer>
					<svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
						<path
							fill="rgba(256,256,256,0.2)"
							style={{ border: "none" }}
							stroke="rgba(256,256,256,0.2)"
							d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
						/>
					</svg>
					<Text>Rs. 120</Text>
				</DesignationContainer>
			</Row>
		</Container>
	);
}

const Seat = styled(motion.div)`
	display: inline-block;
	margin: 0;
	padding: 3px;
	@media (max-width: 1080px) {
		padding: 2px;
	}
	@media (max-width: 480px) {
		padding: 1px;
	}
`;

const Container = styled.div`
	margin: 5rem auto 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* transform: translateY(10rem); */
	/* @media (max-width: 855px) {
		width: 900px;
	} */
`;

const BookSeatSvg = styled.svg`
	width: 40px;
	height: 40px;
	@media (max-width: 1080px) {
		width: 35px;
		height: 35px;
	}
	@media (max-width: 480px) {
		width: 30px;
		height: 30px;
	}
`;

const DesignationContainer = styled.div`
	margin: 0 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 20px 0;
`;

const Row = styled.div`
	display: block;
`;

const Text = styled.p`
	color: #fff;
	display: inline-block;
	margin: 0 20px;
	@media (max-width: 1080px) {
		margin: 0 10px;
	}
`;
