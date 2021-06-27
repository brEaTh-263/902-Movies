import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, makeStyles } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
	blueButton: {
		marginTop: 10,
		color: "#fff",
		letterSpacing: 1,
	},
}));
export default function ContactUsPage() {
	const classes = useStyles();
	return (
		<Container>
			<Header />
			<Image />
			<SubContainer>
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
						<WhiteTag>hello@movies.com</WhiteTag>
					</Content>
					<Content />
					<SenderForm>
						<Input type="text" placeholder="Name"></Input>
						<Input type="text" placeholder="Email"></Input>
						<MessageInput type="text" placeholder="Message"></MessageInput>
						<StyledButton
							startIcon={<MailIcon />}
							className={classes.blueButton}
						>
							Submit
						</StyledButton>
					</SenderForm>
				</Form>
			</SubContainer>
		</Container>
	);
}

const Container = styled.div`
	background: #000;
	display: grid;
	grid-template-columns: 30% 70%;
	grid-template-rows: 100vh;
`;

const SubContainer = styled.div`
	display: inline-block;
	margin-left: 10vw;
	padding: 30px;
	@media (max-width: 720px) {
		margin-left: 0;
	}
`;

const Image = styled.div`
	width: 30vw;
	display: inline-block;
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, #000 100%),
		url("https://ali.sandbox.etdevs.com/divi/wp-content/uploads/sites/2/2019/12/theater-02.jpg");
	background-size: cover;
`;

const Input = styled.input`
	background-color: #1a1a1a;
	padding: 1rem;
	font-size: 1rem;
	color: #fff;
	outline: none;
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

const Form = styled.div`
	margin-top: 3rem;
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-columns: 20rem 20rem;
`;

const SenderForm = styled.div`
	grid-column: 1/3;
	display: grid;
	padding: 2rem;
	margin: 2rem 0;
	grid-template-rows: 3rem 8rem 3rem;
	grid-gap: 10px;
	border: 2px #694cc9 solid;
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
	@media (max-width: 720px) {
		font-size: 0.5rem;
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
	@media (max-width: 720px) {
		font-size: 0.5rem;
	}
`;
