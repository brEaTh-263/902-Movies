import React, { useEffect } from "react";
import styled from "styled-components";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function Reasons() {
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
		<WhyChooseUsContainer
			initial="hidden"
			ref={ref}
			animate={controls}
			variants={variants}
		>
			<RedTag>Happy viewers</RedTag>
			<Type>
				Why <BoldType> Choose us</BoldType>
			</Type>

			<ReasonsContainer>
				<ReasonItem style={{ borderColor: "#1a1a1a" }}>
					<Image src="https://www.elegantthemes.com/layouts/wp-content/uploads/2018/07/quote-light.png"></Image>
					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</ReasonItem>
				<ReasonItem style={{ borderColor: "#694cc9" }}>
					<Image src="https://www.elegantthemes.com/layouts/wp-content/uploads/2018/07/quote-light.png"></Image>

					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</ReasonItem>
				<ReasonItem style={{ borderColor: "#4c090f" }}>
					<Image src="https://www.elegantthemes.com/layouts/wp-content/uploads/2018/07/quote-light.png"></Image>

					<Text style={{ fontWeight: "normal" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor.
					</Text>
				</ReasonItem>
			</ReasonsContainer>
		</WhyChooseUsContainer>
	);
}

const RedTag = styled.p`
	font-weight: bolder;
	color: red;
	text-transform: uppercase;
	padding: 10px 0;
	letter-spacing: 3px;
	margin: 0;
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

const WhyChooseUsContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ReasonsContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 4rem;
	@media (max-width: 855px) {
		display: block;
	}
`;

const Image = styled.img`
	align-self: flex-start;
	width: 40px;
	height: 40px;
`;

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

const ReasonItem = styled.div`
	border: 3px white solid;
	margin: 1rem;
	padding: 6rem 2rem;
	padding-bottom: 3rem;
	width: 20%;
	@media (max-width: 855px) {
		padding: 3rem 2rem;
		width: 70%;
	}
	@media (max-width: 585px) {
		padding: 2rem;
		margin: 1rem 0.5rem;
	}
`;
