import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

export default function Promotions() {
	const controls = useAnimation();
	const { inView, ref } = useInView();

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
		<>
			<PromotionsContainer
				initial="hidden"
				ref={ref}
				animate={controls}
				variants={variants}
			>
				<Column style={{ width: "30%" }}>
					<DetailsContainer>
						<RedTag>Raise your awareness</RedTag>
						<Type>
							Get <BoldType>All</BoldType> Season <BoldType>Pass</BoldType>
						</Type>
						<StyledButton variant="contained" startIcon={<LocalOfferIcon />}>
							Learn More
						</StyledButton>
					</DetailsContainer>
					<SkyscraperImage whileHover={{ scale: 1.2 }}>
						<SkyscraperText>Skyscrapers</SkyscraperText>
					</SkyscraperImage>
				</Column>
				<Column style={{ width: "23%" }}>
					<LakeImage whileHover={{ scale: 1.2 }}>
						<LakeText>The Lake</LakeText>
					</LakeImage>

					<DowntownImage whileHover={{ scale: 1.2 }}>
						<DowntownText>Downtown</DowntownText>
					</DowntownImage>
				</Column>
				<Column style={{ width: "25%" }}>
					<FallImage whileHover={{ scale: 1.2 }}>
						<FallText>Fall</FallText>
					</FallImage>
				</Column>
			</PromotionsContainer>
			{/* <Button variant="contained" style={{}} className={classes.blueButton}>
				See all offers and promotions
			</Button> */}
		</>
	);
}

const PromotionsContainer = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	@media (max-width: 480px) {
		display: none;
	}
`;

const LakeImage = styled(motion.div)`
	background: url("https://images.unsplash.com/photo-1575806643255-54c5a050dce6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80");
	width: 100%;
	height: 26rem;
	background-size: cover;
	margin-bottom: 4rem;
	@media (max-width: 1080px) {
		height: 22rem;
	}
	@media (max-width: 855px) {
		height: 18rem;
	}
	@media (max-width: 585px) {
		height: 14rem;
	}
`;

const FallImage = styled(motion.div)`
	background: url("https://images.unsplash.com/photo-1582481295639-77320de5bbc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2592&q=80");
	width: 100%;
	height: 30rem;
	background-size: cover;
	@media (max-width: 1080px) {
		height: 26rem;
	}
	@media (max-width: 855px) {
		height: 22rem;
	}
	@media (max-width: 585px) {
		height: 18rem;
	}
`;

const DowntownImage = styled(motion.div)`
	background: url("https://images.unsplash.com/photo-1580950803921-df35980bc63e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80");
	width: 100%;
	height: 26rem;
	background-size: cover;
	@media (max-width: 1080px) {
		height: 22rem;
	}
	@media (max-width: 855px) {
		height: 18rem;
	}
	@media (max-width: 585px) {
		height: 14rem;
	}
`;
const SkyscraperImage = styled(motion.div)`
	background: url("https://images.unsplash.com/photo-1525896390944-ebdd59eac0cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80");
	width: 100%;
	height: 32rem;
	margin-top: 4rem;
	background-size: cover;
	z-index: 500;
	@media (max-width: 1080px) {
		height: 26rem;
	}
	@media (max-width: 855px) {
		height: 22rem;
	}
	@media (max-width: 585px) {
		height: 18rem;
	}
`;

const DetailsContainer = styled.div``;

const StyledButton = styled(Button)`
	margin: 3rem auto;
	/* display: block; */
	background: red;
	margin-top: 10px;
	color: #fff;
	letter-spacing: 3px;
	z-index: 4;
	@media (max-width: 720px) {
		padding: 5px;
		font-size: 0.7rem !important;
		letter-spacing: 1px !important;
	}
`;

const Type = styled.h1`
	color: #fff;
	letter-spacing: 3px;
	font-size: 4rem;
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
const RedTag = styled.p`
	font-weight: bolder;
	color: red;
	text-transform: uppercase;
	padding: 10px 0;
	letter-spacing: 3px;
	margin: 0;
	@media (max-width: 720px) {
		font-size: 0.5rem;
	}
`;

const BoldType = styled.span`
	font-weight: bold;
	color: #fff;
	letter-spacing: 3px;
	font-size: 4rem;
	display: inline-block;
	margin: 0;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 720px) {
		font-size: 2rem;
	}
`;
const LakeText = styled(BoldType)`
	color: #000;
	font-size: 3rem;
	transform: translateY(6rem);
	text-align: center;
	width: 100%;
	font-family: Anton;
	@media (max-width: 1080px) {
		font-size: 2rem;
	}
`;

const DowntownText = styled(BoldType)`
	color: #fff;
	font-size: 3rem;
	letter-spacing: 1px;
	transform: translateY(18rem);
	text-align: center;
	width: 100%;
	font-family: Anton;
	@media (max-width: 1080px) {
		font-size: 2rem;
	}
	@media (max-width: 855px) {
		transform: translateY(15rem);
	}
	@media (max-width: 720px) {
		font-size: 1rem;
	}
`;

const FallText = styled(BoldType)`
	color: #fff;
	font-size: 10rem;
	letter-spacing: -6px;
	transform: translateY(1rem);
	text-align: center;
	width: 100%;
	font-weight: bolder;
	@media (max-width: 1080px) {
		font-size: 7rem;
	}
	@media (max-width: 855px) {
		font-size: 5rem;
	}
	@media (max-width: 585px) {
		font-size: 3rem;
		letter-spacing: 0;
	}
`;

const SkyscraperText = styled(BoldType)`
	color: #000;
	font-size: 5rem;
	letter-spacing: -3px;
	transform: translateY(10rem) translateX(5rem) rotate(83deg);
	text-align: center;
	width: 100%;
	font-weight: bolder;
	@media (max-width: 1080px) {
		transform: translateY(10rem) translateX(3.5rem) rotate(83deg);
		font-size: 4rem;
	}
	@media (max-width: 855px) {
		font-size: 3rem;
		transform: translateY(10rem) translateX(4rem) rotate(83deg);
	}
	@media (max-width: 585px) {
		font-size: 2rem;
		transform: translateY(5rem) translateX(3rem) rotate(83deg);
	}
`;

const Column = styled.div`
	z-index: 2;
`;
