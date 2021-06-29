import React, { useEffect } from "react";
import styled from "styled-components";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function Story() {
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
		<StoryContainer
			initial="hidden"
			ref={ref}
			animate={controls}
			variants={variants}
		>
			<RedTag>Our Story</RedTag>
			<StoryText>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem
				accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
				illo inventore veritatis et quasi architecto beatae vitae dicta sunt
				explicabo.
			</StoryText>
			<StoryText>
				Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
				fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
				sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
				sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
				tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
			</StoryText>
			<StoryText>
				Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
				suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
				autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
				nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
				voluptas nulla pariatur?
			</StoryText>
		</StoryContainer>
	);
}

const StoryContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 6rem;
	margin-bottom: 6rem;
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

const StoryText = styled(Text)`
	width: 50vw;
	text-align: center;
	font-size: 1rem;
	line-height: 25px;
	@media (max-width: 855px) {
		width: 70vw;
		font-size: 0.8rem;
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
