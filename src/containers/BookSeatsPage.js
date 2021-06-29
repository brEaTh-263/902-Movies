import React, { useState, useRef } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton, Button, useMediaQuery } from "@material-ui/core";
import TheatreScreen from "../components/TheatreScreen";
import Seats from "../components/Seats";
import { motion, useCycle, useAnimation } from "framer-motion";
import Time from "../components/Bookings/Time";
import Format from "../components/Bookings/Format";
import Date from "../components/Bookings/Date";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import moment from "moment";
export default function BookSeatsPage({ setIsBookingSeats }) {
	const [selectedFormat, setSelectedFormat] = useState(1);
	const [selectedTime, setSelectedTime] = useState(0);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const threshold = useMediaQuery("(max-width:855px)");
	const matches720 = useMediaQuery("(max-width:720px)");
	const matches585 = useMediaQuery("(max-width:585px)");
	const matches480 = useMediaQuery("(max-width:480px)");
	const matches380 = useMediaQuery("(max-width:380px)");
	const [isOpen, toggleOpen] = useCycle(true, false);

	const [showSeats, setShowSeats] = useState(false);
	const constraintsRef = useRef(null);
	const checkoutControls = useAnimation();
	const checkOutLineControls = useAnimation();
	let date = new Date();
	date = moment(date).toDate().getDate();

	let left = -150;
	if (matches720) {
		left = -250;
	}
	if (matches585) {
		left = -380;
	}
	if (matches480) {
		left = -480;
	}
	if (matches380) {
		left = -580;
	}
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
				damping: 100,
			},
		},
	};

	return (
		<Container
			animate={isOpen ? "open" : "closed"}
			variants={background}
			transition={{ duration: 1, ease: "easeIn" }}
		>
			<IconButton
				style={{ display: "block", margin: "1rem 0 0 1rem", zIndex: 200 }}
				onClick={() => {
					if (showSeats) {
						setShowSeats(false);
						return;
					}
					toggleOpen();
					setTimeout(() => {
						setIsBookingSeats(false);
					}, [1000]);
				}}
			>
				<ArrowBackIcon style={{ color: "#fff", fontSize: 40 }} />
			</IconButton>
			{!showSeats && (
				<>
					{" "}
					<SelectionRow>
						<Time
							setSelectedTime={setSelectedTime}
							selectedTime={selectedTime}
						/>
						<Format
							setSelectedFormat={setSelectedFormat}
							selectedFormat={selectedFormat}
						/>
					</SelectionRow>
					<SelectionRow>
						<Date />
					</SelectionRow>
				</>
			)}
			{(!threshold || showSeats) && (
				<SeatsColumn
					ref={constraintsRef}
					variants={items}
					initial="closed"
					animate="open"
					drag={threshold}
					dragElastic={0.9}
					dragConstraints={{ top: -150, left: left, right: 0, bottom: 0 }}
					// dragConstraints={constraintsRef}
				>
					<TheatreScreen />
					<Seats
						setSelectedSeats={setSelectedSeats}
						selectedSeats={selectedSeats}
					/>
				</SeatsColumn>
			)}
			{threshold && !showSeats && (
				<Row style={{ justifyContent: "flex-end" }}>
					<IconButton
						style={{ color: "#fff" }}
						onClick={() => setShowSeats(true)}
					>
						<EventSeatIcon
							style={{ fontSize: 30, color: "#fff", paddingRight: 10 }}
						/>
						➤
					</IconButton>
				</Row>
			)}
			{selectedSeats.length !== 0 && (
				<PopUp>
					<Row
						style={{ padding: "1rem 0.8rem", justifyContent: "space-around" }}
					>
						<Row>
							<Column style={{ margin: "0 15px" }}>
								<PopUpTitles style={{ display: "inline-block" }}>
									Date
								</PopUpTitles>
								<BigPopUpTitles>{date.toString()}</BigPopUpTitles>
							</Column>
							<Column style={{ margin: "0 15px" }}>
								<PopUpTitles style={{ display: "inline-block" }}>
									Time
								</PopUpTitles>
								<BigPopUpTitles>{timeOptions[selectedTime]}</BigPopUpTitles>
							</Column>
							<Column style={{ margin: "0 15px" }}>
								<PopUpTitles style={{ display: "inline-block" }}>
									Your Seats
								</PopUpTitles>
								<BigPopUpTitles>{selectedSeats.join(", ")}</BigPopUpTitles>
							</Column>
						</Row>
						<StyledButton
							variant="contained"
							onClick={async () => {
								await checkoutControls.start({
									top: 0,
									display: "block",
									transition: {
										duration: 0.5,
									},
								});
								await checkOutLineControls.start({
									height: "30vh",
									transform: "translateY(-30vh)",
									transition: {
										duration: 0.5,
									},
								});
								await checkOutLineControls.start({
									height: "0vh",
									transition: {
										duration: 0.5,
									},
								});

								setIsBookingSeats(false);
							}}
						>
							Checkout({selectedSeats.length * 120})
						</StyledButton>
					</Row>
				</PopUp>
			)}
			<Container
				animate={checkoutControls}
				style={{
					height: "100vh",
				}}
				initial={{
					position: "fixed",
					top: "100vh",
					background: "#7c7878",
					display: "none",
				}}
			>
				<motion.div
					inital={{ height: "0vh" }}
					animate={checkOutLineControls}
					style={{
						position: "absolute",
						top: "59vh",
						left: "49.5vw",
						width: "0.1vw",
						backgroundColor: "#fff",
					}}
				></motion.div>
			</Container>
		</Container>
	);
}

const PopUp = styled.div`
	background: #7c7878;
	height: 100px;
	width: 100vw;
	position: fixed;
	bottom: 0;
	@media (max-width: 855px) {
		height: 80px;
	}
	@media (max-width: 480px) {
		height: 60px;
	}
`;

const Container = styled(motion.div)`
	background: rgba(70, 68, 68, 0.8);
	/* padding: 2vw; */
	position: fixed;
	overflow: scroll;
	border-left: 1px rgba(256, 256, 256, 0.1) solid;
	border-right: 1px rgba(256, 256, 256, 0.1) solid;
	height: 100vh;
	width: 100%;
	overflow-x: hidden;
	z-index: 100;
	box-sizing: border-box;
	@media (max-width: 855px) {
		overflow-y: scroll;
	}
`;

const StyledButton = styled(Button)`
	margin-left: 4rem;
	@media (max-width: 480px) {
		margin-left: 0.2rem;
		font-size: 0.7rem;
		padding: 5px 10px;
	}
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;
const SelectionRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	@media (max-width: 720px) {
		flex-direction: column;
		align-items: center;
	}
`;

const SeatsColumn = styled(motion.div)`
	display: flex;
	flex-direction: column;
	@media (max-width: 855px) {
		width: 900px;
		height: 900px;
	}
`;
const Column = styled(motion.div)`
	display: flex;
	flex-direction: column;
`;

const PopUpTitles = styled.p`
	color: #fff;
	font-size: 1rem;
	text-transform: uppercase;
	display: inline-block;
	margin: 0;

	@media (max-width: 855px) {
		font-size: 0.6rem;
	}
	@media (max-width: 480px) {
		font-size: 0.5rem;
	}
	@media (max-width: 480px) {
		font-size: 0.4rem;
	}
`;

const BigPopUpTitles = styled(PopUpTitles)`
	font-weight: bolder;
	font-size: 2rem;
	@media (max-width: 855px) {
		font-size: 1.4rem;
	}
	@media (max-width: 480px) {
		font-size: 1rem;
	}
`;

const timeOptions = ["11:00", "14:00", "19:30", "21:00"];
