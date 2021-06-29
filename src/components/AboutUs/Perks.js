import React, { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
export default function Perks() {
	const { inView, ref } = useInView();
	const controls = useAnimation();
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

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		} else {
			controls.start("hidden");
		}
	}, [controls, inView]);
	return (
		<PerksContainer
			initial="hidden"
			ref={ref}
			animate={controls}
			variants={variants}
		>
			<Column>
				<BlueTag>About Us</BlueTag>
				<Type>
					All the
					<BoldType>Perks</BoldType>
				</Type>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam
				</Text>
			</Column>
			<PerksColumn>
				<Content>
					<BigText>Amazing Theatres</BigText>
					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</Content>
				<Content>
					<BigText>Comfort Amenities</BigText>
					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</Content>
				<Content>
					<BigText>Pre Order Food</BigText>
					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</Content>
				<Content>
					<BigText>
						<BigText>Artisan Snacks</BigText>
					</BigText>
					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</Content>
				<Content>
					<BigText>Movie Go’er Rewards</BigText>
					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</Content>
			</PerksColumn>
		</PerksContainer>
	);
}

const Text = styled.p`
	color: #fff;
	margin: 5px 0;
	font-size: 0.8rem;
	font-weight: lighter;
	line-height: 20px;
	letter-spacing: 1px;
	@media (max-width: 480px) {
		font-size: 0.7rem;
	}
`;
const BigText = styled(Text)`
	font-size: 1.4rem;
	font-weight: bold;
`;

const Type = styled.h1`
	color: #fff;
	letter-spacing: 3px;
	font-size: 6rem;
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
	font-size: 6rem;
	display: inline-block;
	margin: 0;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 720px) {
		font-size: 2rem;
	}
`;
const RedTag = styled.p`
	font-weight: bolder;
	color: red;
	text-transform: uppercase;
	padding: 10px 0;
	letter-spacing: 3px;
	margin: 0;
`;
const BlueTag = styled(RedTag)`
	color: #694cc9;
	width: 100%;
	word-wrap: break-word;
	text-transform: uppercase;
	@media (max-width: 1080px) {
		font-size: 0.8rem;
	}
	@media (max-width: 855px) {
		font-size: 0.7rem;
	}
	@media (max-width: 720px) {
		font-size: 0.5rem;
	}
`;

const Column = styled.div`
	width: 25vw;
	@media (max-width: 855px) {
		width: 45vw;
	}
	@media (max-width: 585px) {
		width: 60vw;
	}
`;

const PerksColumn = styled(Column)`
	grid-column: 2;
	border: 0.3rem solid #1e114a;
	display: grid;
	grid-template-rows: 33% 33% 34%;
	grid-template-columns: 50% 50%;
	grid-gap: 2%;
	padding: 5%;
	@media (max-width: 855px) {
		display: block;
		margin-top: 5%;
	}
`;

const Content = styled.div`
	margin: 2%;
	@media (max-width: 855px) {
		margin-top: 6%;
	}
	@media (max-width: 380px) {
		margin-top: 10%;
	}
`;

const PerksContainer = styled(motion.div)`
	display: grid;
	justify-content: space-evenly;
	grid-template-rows: 100%;
	grid-template-columns: 30% 50%;
	margin: 2rem;
	@media (max-width: 855px) {
		display: block;
	}
`;
