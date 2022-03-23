import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, makeStyles } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import NavLayer from "../components/NavLayer";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useDispatch } from "react-redux";
import * as authActions from "../store/action/Auth";
const useStyles = makeStyles((theme) => ({
	blueButton: {
		marginTop: 10,
		color: "#fff",
		letterSpacing: 1,
	},
}));
export default function ContactUsPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState("");
	const classes = useStyles();
	const dispatch = useDispatch();
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

	const submitHandler = async () => {
		try {
			if (!name) return alert("Name is required");
			if (!email) return alert("Email is required");
			var emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (!email.match(emailExp)) return alert("Invalid Email");
			if (!message) return alert("Message is required");
			setIsLoading(true);
			await dispatch(authActions.submitFeedback({ name, email, message }));
			setIsLoading(false);
			setName("");
			setEmail("");
			setMessage("");
			alert("Feedback submitted successfully");
		} catch (error) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		} else {
			controls.start("hidden");
		}
	}, [controls, inView]);

	return (
		<NavLayer>
			<Container>
				<Header />
				<Image />
				<SubContainer
					initial="hidden"
					ref={ref}
					animate={controls}
					variants={variants}
				>
					<RedTag>Contact Us</RedTag>
					<Type>
						Contact <BoldType>Us</BoldType>
					</Type>
					<Form>
						<Content>
							<BlueTag>Phone</BlueTag>
							<WhiteTag>(+91) 9794499644</WhiteTag>
						</Content>
						<Content>
							<BlueTag>Address</BlueTag>
							<WhiteTag>5678 Extra Rd. #123 San Francisco, CA 96120.</WhiteTag>
						</Content>
						<Content>
							<BlueTag>Email</BlueTag>
							<WhiteTag>movies@gmail.com</WhiteTag>
						</Content>
						<Content />
						<SenderForm>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
								placeholder="Name"
							></Input>
							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="text"
								placeholder="Email"
							></Input>
							<MessageInput
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								type="text"
								placeholder="Message"
							></MessageInput>
							<StyledButton
								disabled={isLoading}
								startIcon={<MailIcon />}
								className={classes.blueButton}
								onClick={submitHandler}
							>
								{isLoading ? "Loading..." : "Submit"}
							</StyledButton>
						</SenderForm>
					</Form>
				</SubContainer>
			</Container>
		</NavLayer>
	);
}

const Container = styled.div`
	background: #000;
	overflow: scroll;
	display: grid;
	grid-template-columns: 30% 70%;
	grid-template-rows: 100vh;
	@media (max-width: 855px) {
		grid-template-columns: 100%;
		justify-content: center;
		align-content: center;
	}
	@media (max-width: 480px) {
		grid-template-rows: 100%;
	}
`;

const SubContainer = styled(motion.div)`
	margin-left: 10vw;
	padding: 30px;
	@media (max-width: 855px) {
		margin-left: 16vw;
	}
	@media (max-width: 720px) {
		margin-left: 0;
	}
	@media (max-width: 380px) {
		padding-bottom: 5rem;
	}
`;

const Image = styled.div`
	width: 30vw;
	display: inline-block;
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, #000 100%),
		url("https://ali.sandbox.etdevs.com/divi/wp-content/uploads/sites/2/2019/12/theater-02.jpg");
	background-size: cover;
	@media (max-width: 855px) {
		display: none;
	}
`;

const Input = styled.input`
	background-color: #1a1a1a;
	padding: 1rem;
	font-size: 1rem;
	color: #fff;
	outline: none;
	border: none;
	@media (max-width: 720px) {
		display: block;
		margin: 1rem 0;
		width: 90%;
	}
`;

const MessageInput = styled.textarea`
	grid-column: 1/3;
	background-color: #1a1a1a;
	padding: 1rem;
	font-size: 1rem;
	border: none;
	outline: none;
	resize: none;
	color: #fff;
	@media (max-width: 720px) {
		display: block;
		margin: 1rem 0;
		width: 90%;
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

const StyledButton = styled(Button)`
	grid-column: 2;
	width: 50%;
	transform: translateX(100%);
	background-color: rgb(109, 67, 254);
	&:hover {
		background-color: rgba(109, 67, 254, 0.6);
	}
	@media (max-width: 1080px) {
		width: 60%;
		transform: translateX(60%);
	}
	@media (max-width: 720px) {
		width: 30%;
		transform: none;
	}
	@media (max-width: 480px) {
		width: 40%;
	}
	@media (max-width: 380px) {
		font-size: 0.6rem !important;
		width: 50%;
	}
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
`;

const Form = styled.div`
	margin-top: 3rem;
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-columns: 40% 40%;
	@media (max-width: 720px) {
		display: block;
	}
`;

const SenderForm = styled.div`
	grid-column: 1/3;
	display: grid;
	padding: 2rem;
	margin: 2rem 0;
	grid-template-columns: 48% 48%;
	grid-template-rows: 3rem 8rem 3rem;
	grid-gap: 10px;
	border: 2px #694cc9 solid;
	@media (max-width: 720px) {
		display: block;
	}
`;

const Content = styled.div``;

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
`;

const WhiteTag = styled(BlueTag)`
	color: #fff;
	text-transform: none;
	@media (max-width: 1080px) {
		font-size: 0.8rem;
	}
	@media (max-width: 855px) {
		font-size: 0.7rem;
	}
`;
