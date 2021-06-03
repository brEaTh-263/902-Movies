import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useMediaQuery } from "@material-ui/core";

export default function TheatreScreen() {
	const matches1080 = useMediaQuery(`(max-width:1080px)`);
	const matches855 = useMediaQuery(`(max-width:855px)`);

	if (matches855) {
		return (
			<Container>
				<Line style={{}}>
					<Svg>
						<motion.path
							style={{ strokeWidth: "10px" }}
							animate={{
								stroke: ["#4e4e4e", "#fff"],
								strokeOpacity: 0.7,
							}}
							transition={{
								duration: 0.5,
								repeat: Infinity,
								repeatType: "reverse",
								ease: "easeIn",
							}}
							d="M150,200
                        Q500,50 850,200"
							fill="none"
						/>
					</Svg>
				</Line>
			</Container>
		);
	}

	if (matches1080) {
		return (
			<Container>
				<Line style={{}}>
					<Svg>
						<motion.path
							style={{ strokeWidth: "10px" }}
							animate={{
								stroke: ["#4e4e4e", "#fff"],
								strokeOpacity: 0.7,
							}}
							transition={{
								duration: 0.5,
								repeat: Infinity,
								repeatType: "reverse",
								ease: "easeIn",
							}}
							d="M100,200
                        Q500,50 900,200"
							fill="none"
						/>
					</Svg>
				</Line>
			</Container>
		);
	}

	return (
		<Container>
			{/* <Line>
				<Title style={{ transform: "translateY(7rem)" }}>Places</Title>
				<svg
					width="1000"
					height="200"
					style={{ display: "block", width: "100%" }}
				>
					<path
						d="M0,200
                        Q500,50 1000,200"
						fill="none"
						stroke="#fff"
						stroke-width="4px"
					/>
				</svg>
			</Line> */}
			<Line style={{}}>
				<Svg>
					<motion.path
						style={{ strokeWidth: "10px" }}
						animate={{
							stroke: ["#4e4e4e", "#fff"],
							strokeOpacity: 0.7,
						}}
						transition={{
							duration: 0.5,
							repeat: Infinity,
							repeatType: "reverse",
							ease: "easeIn",
						}}
						d="M0,200
                        Q500,50 1000,200"
						fill="none"
					/>
				</Svg>
			</Line>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Svg = styled.svg`
	width: 1000px;
	height: 200px;
	/* @media (max-width: 1080px) {
		width: 800px;
	} */
`;

const Line = styled.div`
	/* position: absolute; */
	/* left: 15%; */
	display: block;
`;
