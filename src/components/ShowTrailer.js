import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
export default function ShowTrailer({ trailer }) {
	const [isOpen] = useCycle(true);
	const background = {
		open: (height = 1000) => ({
			clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
			transition: {
				type: "spring",
				stiffness: 100,
				restDelta: 2,
			},
		}),
		closed: {
			clipPath: "circle(30px at 40px 40px)",
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		},
	};
	return (
		<Video
			animate={isOpen ? "open" : "closed"}
			variants={background}
			transition={{ duration: 1, ease: "easeIn" }}
			title="Trailer"
			style={{ width: "100vw", height: "100vh" }}
			allowFullScreen={true}
			src={`https://www.youtube.com/embed/${trailer}?rel=0&controls=0&showinfo=0&autoplay=1&loop=1&modestbranding=1&playlist=${trailer}&iv_load_policy=1&enablejsapi=1`}
			frameBorder="0"
		></Video>
	);
}

const Video = styled(motion.iframe)`
	height: 100vh;
	width: 100vw;
	background: rgba(70, 68, 68, 0.8);
`;
