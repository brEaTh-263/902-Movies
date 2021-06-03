import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/logo.png";
import { Button, TextField, Divider, IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CloseIcon from "@material-ui/icons/Close";
import { fbProvider, firebase, provider } from "../firebase/firebase";
import * as authActions from "../store/action/Auth";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles((theme) => ({
	textfield: {
		"& .MuiInputBase-input": {
			height: "2rem",
		},
	},
}));
export default function AuthPage(props) {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const [emailVerified, setEmailVerified] = useState(false);
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [sendVerificationEmail, setSendVerificationEmail] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		const tryingToSignIn = async () => {
			if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
				var email = window.localStorage.getItem("emailForSignIn");
				if (!email) {
					email = window.prompt("Please provide your email for confirmation");
				}

				try {
					setIsLoading(true);
					await firebase
						.auth()
						.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
					const result = await firebase
						.auth()
						.signInWithEmailLink(email, window.location.href);

					setIsLoading(false);
					window.localStorage.removeItem("emailForSignIn");
					if (result.additionalUserInfo.isNewUser) {
						setEmailVerified(true);
					} else {
						await dispatch(authActions.signIn());
						props.history.push("home");
					}

					// console.log(result);
				} catch (error) {
					setIsLoading(false);
					console.log(error);
					alert("Something went wrong");
				}
			}
		};
		tryingToSignIn();
	}, [dispatch, props.history]);
	const signInWithGoogle = async () => {
		try {
			await firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
			setIsLoading(true);
			const result = await firebase.auth().signInWithPopup(provider);
			console.log(result.user);
			await dispatch(authActions.signIn());
			setIsLoading(false);
			props.history.push("/home");
		} catch (error) {
			setIsLoading(false);
			alert(error.message);
		}
	};

	const signInWithFacebook = async () => {
		try {
			await firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
			setIsLoading(true);
			const result = await firebase.auth().signInWithPopup(fbProvider);
			console.log(result.user);
			await dispatch(authActions.signIn());
			setIsLoading(false);
			props.history.push("/home");
		} catch (error) {
			setIsLoading(false);
			alert(error.message);
		}
	};

	const signInWithEmail = async () => {
		if (!username) {
			alert("Kindly enter a username");
			return;
		}
		console.log(username);
		setIsLoading(true);
		dispatch(authActions.signInWithEmail(username));
		setIsLoading(false);
		props.history.push("home");
	};

	const signIn = async () => {
		const actionCodeSettings = {
			url: "http://localhost:3000/sign-in",
			handleCodeInApp: true,
		};
		try {
			setIsLoading(true);
			await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
			window.localStorage.setItem("emailForSignIn", email);
			setIsLoading(false);
			setSendVerificationEmail(true);
		} catch (error) {
			alert(error.message);
			setIsLoading(false);
			console.log(error);
		}
	};

	return (
		<Container
			animate={{ y: 0 }}
			initial={{ y: 1000 }}
			transition={{ duration: 1, ease: "easeIn" }}
		>
			<LogoContainer>
				<Logo src={logo} />
			</LogoContainer>
			<SubContainer>
				<Image>
					<Tagline>
						It's movie<RedTag> time</RedTag>
					</Tagline>
				</Image>
				{isLoading && (
					<AuthContainer>
						<CircularProgress />
					</AuthContainer>
				)}
				{emailVerified && !isLoading && (
					<AuthContainer>
						<Title style={{ fontWeight: "normal" }}>Email Verified!</Title>
						<Icon
							alt="verified email pic"
							style={{ width: "7rem", height: "7rem" }}
							src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iNDMyLjMzNCIgeDI9IjE5OC4zMzQiIHkxPSI1MDIuNjQ1IiB5Mj0iMTkyLjY0NiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDJkZWZmIiBzdG9wLW9wYWNpdHk9IjAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiN2M1ZmYiLz48L2xpbmVhckdyYWRpZW50PjxnPjxwYXRoIGQ9Im01MDEuODczIDE1My41ODNjLTIyLjM1Ny01Ni44ODgtOTEuMjI2LTkxLjAwMy0xNDkuNTU2LTY4LjQyNy02Ni41ODIgMjUuNzctNDQuNTA2IDEzMS42NzMtMTA0Ljk4MyAxNTMuMDg4LTMyLjY2OSAxMS41NjgtODAuOTYyLTMxLjY0NC0xMTMuOTY5LTM4LjI3MS02MC44MjEtMTIuMjEtMTE1Ljg4MSAzMC43MDUtMTI5LjQzOSA5MC4xMzQtMTMuODMyIDYwLjYzIDguMzUzIDE0MS42MSA3NC45NjcgMTU4LjA2NiA3OS4zNSAxOS42MDIgMTIwLjY4My01MS43MjkgMTg3LjI0OS03Mi4yMTEgNjguMzEtMjEuMDE5IDE0NC4yNjMgMjguNjIyIDIwMC44MTQtMzEuNzc2IDQxLjc4LTQ0LjYyIDU3LjA1NS0xMzQuMjcxIDM0LjkxNy0xOTAuNjAzeiIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz48Zz48cGF0aCBkPSJtNDc2Ljg0NyAxNzguNTkzYzAtMzkuNDk3LTMyLjAxOS03MS41MTctNzEuNTE3LTcxLjUxNy0zMC42IDAtNTYuNjk5IDE5LjIyNS02Ni45MSA0Ni4yNWgtMjU4LjYwOGMtMTEuMDQ2IDAtMjAgOC45NTQtMjAgMjB2MjIxLjQxYzAgMTEuMDQ2IDguOTU0IDIwIDIwIDIwaDM1Mi4zNzVjMTEuMDQ2IDAgMjAtOC45NTQgMjAtMjB2LTE2Mi4xNGMxNS4wOTktMTMuMTEzIDI0LjY2LTMyLjQzNSAyNC42Ni01NC4wMDN6IiBmaWxsPSIjMjYyNmJjIiBvcGFjaXR5PSIuMSIvPjxnPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Im00MzIuMTg3IDM4OS43MzZoLTM1Mi4zNzVjLTExLjA0NiAwLTIwLTguOTU0LTIwLTIwdi0yMjEuNDFjMC0xMS4wNDYgOC45NTQtMjAgMjAtMjBoMzUyLjM3NWMxMS4wNDYgMCAyMCA4Ljk1NCAyMCAyMHYyMjEuNDFjMCAxMS4wNDYtOC45NTQgMjAtMjAgMjB6Ii8+PHBhdGggZD0ibTI2Mi4wOTIgMjIzLjcxMSAxOTAuMDk2IDE0Ni4wMjVjMCAxMS4wNDYtOC45NTQgMjAtMjAgMjBoLTM1Mi4zNzZjLTExLjA0NiAwLTIwLTguOTU0LTIwLTIwbDE5MC4wOTYtMTQ2LjAyNWMzLjU5My0yLjc2IDguNTkxLTIuNzYgMTIuMTg0IDB6Ii8+PHBhdGggZD0ibTI0OS45MDggMjk0LjM1Mi0xOTAuMDk2LTE0Ni4wMjZjMC0xMS4wNDYgOC45NTQtMjAgMjAtMjBoMzUyLjM3NWMxMS4wNDYgMCAyMCA4Ljk1NCAyMCAyMGwtMTkwLjA5NSAxNDYuMDI2Yy0zLjU5MyAyLjc1OS04LjU5MSAyLjc1OS0xMi4xODQgMHoiLz48L2c+PGc+PHBhdGggZD0ibTM3MC45NDcgMzYzLjEyNWgtMzIuMTM0Yy0yLjc2MiAwLTUtMi4yMzgtNS01di0yMi4xNTRjMC0yLjc2MSAyLjIzOC01IDUtNWgzMi4xMzRjMi43NjIgMCA1IDIuMjM5IDUgNXYyMi4xNTRjMCAyLjc2Mi0yLjIzOCA1LTUgNXoiIGZpbGw9IiM2NTgzZmUiLz48Zz48Zz48Zz48cGF0aCBkPSJtMzExLjg3MSAzNDIuNzQzaC0yNy44MzNjLTIuNzYyIDAtNS0yLjIzOS01LTVzMi4yMzgtNSA1LTVoMjcuODMzYzIuNzYyIDAgNSAyLjIzOSA1IDVzLTIuMjM4IDUtNSA1eiIgZmlsbD0iIzI2MjZiYyIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTMxMS44NzEgMzYzLjEyNWgtOTcuODMzYy0yLjc2MiAwLTUtMi4yMzktNS01czIuMjM4LTUgNS01aDk3LjgzM2MyLjc2MiAwIDUgMi4yMzkgNSA1IDAgMi43NjItMi4yMzggNS01IDV6IiBmaWxsPSIjMjYyNmJjIi8+PC9nPjwvZz48L2c+PC9nPjxnPjxlbGxpcHNlIGN4PSI0MDUuMzMiIGN5PSIxNTMuNTkzIiBmaWxsPSIjNjU4M2ZlIiByeD0iNzEuNTE3IiByeT0iNzEuNTE3IiB0cmFuc2Zvcm09Im1hdHJpeCguMTYgLS45ODcgLjk4NyAuMTYgMTg4Ljc5MyA1MjkuMDg3KSIvPjxwYXRoIGQ9Im00MDUuMzMgMjMwLjExYzQyLjE5MSAwIDc2LjUxNy0zNC4zMjUgNzYuNTE3LTc2LjUxN3MtMzQuMzI1LTc2LjUxNy03Ni41MTctNzYuNTE3LTc2LjUxNyAzNC4zMjUtNzYuNTE3IDc2LjUxN2MwIDI0LjU0NCAxMS42MjkgNDYuNDEgMjkuNjUzIDYwLjQyMWwtOTkuNDIgNzYuMzcyYy0xLjc5MSAxLjM3OC00LjI5NyAxLjM3OS02LjA5MiAwbC0xODcuOTYyLTE0NC4zODZjMS4xMjEtNy4xNyA3LjM0MS0xMi42NzQgMTQuODItMTIuNjc0aDIyOS4zNjZjMi43NjIgMCA1LTIuMjM5IDUtNXMtMi4yMzgtNS01LTVoLTIyOS4zNjZjLTEzLjc4NSAwLTI1IDExLjIxNS0yNSAyNXYyMjEuNDFjMCAxMy43ODUgMTEuMjE1IDI1IDI1IDI1aDM1Mi4zNzVjMTMuNzg1IDAgMjUtMTEuMjE1IDI1LTI1di0xMzIuMTRjMC0yLjc2MS0yLjIzOC01LTUtNXMtNSAyLjIzOS01IDV2MTIxLjk5NGwtMTMwLjkwNy0xMDAuNTU5IDUwLjk0LTM5LjEzYzExLjIzIDYuNDggMjQuMjM5IDEwLjIwOSAzOC4xMSAxMC4yMDl6bS0yMDkuNjEgMjguOTIxLTEzMC45MDggMTAwLjU1OXYtMjAxLjExOHptMjUxLjI3IDExMy4wMThjLTEuMTE4IDcuMTc0LTcuMzIgMTIuNjg3LTE0LjgwMyAxMi42ODdoLTM1Mi4zNzVjLTcuNDgzIDAtMTMuNjg1LTUuNTEzLTE0LjgwMy0xMi42ODdsMTM4LjkxOS0xMDYuNzEzIDQyLjkzNCAzMi45OGMyLjY5IDIuMDY2IDUuOTE0IDMuMSA5LjEzOCAzLjFzNi40NDctMS4wMzMgOS4xMzgtMy4xbDQyLjkzNC0zMi45ODF6bS0xMDguMTc3LTIxOC40NTZjMC0zNi42NzcgMjkuODM5LTY2LjUxNyA2Ni41MTctNjYuNTE3czY2LjUxNyAyOS44MzkgNjYuNTE3IDY2LjUxN2MwIDM2LjY3Ny0yOS44MzkgNjYuNTE3LTY2LjUxNyA2Ni41MTdzLTY2LjUxNy0yOS44NC02Ni41MTctNjYuNTE3eiIgZmlsbD0iIzI2MjZiYyIvPjwvZz48cGF0aCBkPSJtMzc0LjExNCAxMjkuMjA0IDEwLjIwNiAyNC4zODktMTAuMjA2IDI0LjM4OWMtMS43MzMgNC4xNDIgMi40NDggOC4yOTIgNi41NzcgNi41MjhsNjEuNjE5LTI2LjMxOWM0LjA0OC0xLjcyOSA0LjA0OC03LjQ2NyAwLTkuMTk2bC02MS42MTktMjYuMzE5Yy00LjEyOS0xLjc2NC04LjMxIDIuMzg2LTYuNTc3IDYuNTI4eiIgZmlsbD0iI2ZmZiIvPjwvZz48ZyBmaWxsPSIjNjU4M2ZlIj48cGF0aCBkPSJtMzMwLjgyOCA4MS42NzFjLTMuNzE0IDAtNy40MjctMS40MTMtMTAuMjUzLTQuMjQtNS42NTQtNS42NTQtNS42NTQtMTQuODUzIDAtMjAuNTA2IDUuNjUxLTUuNjUyIDE0Ljg1Mi01LjY1NCAyMC41MDUgMCA1LjY1NCA1LjY1NCA1LjY1NCAxNC44NTMgMCAyMC41MDYtMi44MjYgMi44MjctNi41MzkgNC4yNC0xMC4yNTIgNC4yNHptMC0xOC45OTFjLTEuMTUyIDAtMi4zMDUuNDM4LTMuMTgzIDEuMzE2LTEuNzU0IDEuNzU0LTEuNzU0IDQuNjA5IDAgNi4zNjQgMS43NTYgMS43NTQgNC42MDggMS43NTUgNi4zNjQgMCAxLjc1NC0xLjc1NCAxLjc1NC00LjYwOSAwLTYuMzY0LS44NzctLjg3Ny0yLjAzLTEuMzE2LTMuMTgxLTEuMzE2eiIvPjxwYXRoIGQ9Im0yMTguNTM4IDQ1OS4zMTVjLTMuNzEzIDAtNy40MjctMS40MTQtMTAuMjUzLTQuMjQtNS42NTQtNS42NTQtNS42NTQtMTQuODUzIDAtMjAuNTA2IDUuNjUyLTUuNjUzIDE0Ljg1NC01LjY1MyAyMC41MDYgMCA1LjY1NCA1LjY1NCA1LjY1NCAxNC44NTMgMCAyMC41MDYtMi44MjYgMi44MjctNi41NCA0LjI0LTEwLjI1MyA0LjI0em0wLTE4Ljk5MWMtMS4xNTIgMC0yLjMwNS40MzgtMy4xODMgMS4zMTYtMS43NTQgMS43NTQtMS43NTQgNC42MDkgMCA2LjM2NCAxLjc1NiAxLjc1NSA0LjYwOSAxLjc1NSA2LjM2NSAwIDEuNzU0LTEuNzU0IDEuNzU0LTQuNjA5IDAtNi4zNjQtLjg3Ny0uODc3LTIuMDMtMS4zMTYtMy4xODItMS4zMTZ6Ii8+PHBhdGggZD0ibTI5NC43OCA5NC41NDdjLTEuMjc5IDAtMi41Ni0uNDg4LTMuNTM1LTEuNDY0bC01Ljk2NS01Ljk2NC01Ljk2NSA1Ljk2NGMtMS45NTEgMS45NTItNS4xMTkgMS45NTItNy4wNyAwLTEuOTUzLTEuOTUzLTEuOTUzLTUuMTE5IDAtNy4wNzFsOS41LTkuNWMxLjk1MS0xLjk1MiA1LjExOS0xLjk1MiA3LjA3IDBsOS41IDkuNWMxLjk1MyAxLjk1MyAxLjk1MyA1LjExOSAwIDcuMDcxLS45NzUuOTc1LTIuMjU1IDEuNDY0LTMuNTM1IDEuNDY0eiIvPjxwYXRoIGQ9Im00MzkuNzQ2IDQ0MC4zMjJjLTEuMjc5IDAtMi41Ni0uNDg4LTMuNTM1LTEuNDY0bC01Ljk2NS01Ljk2NC01Ljk2NSA1Ljk2NGMtMS45NTEgMS45NTItNS4xMTkgMS45NTItNy4wNyAwLTEuOTUzLTEuOTUzLTEuOTUzLTUuMTE5IDAtNy4wNzFsOS41LTkuNWMxLjk1MS0xLjk1MiA1LjExOS0xLjk1MiA3LjA3IDBsOS41IDkuNWMxLjk1MyAxLjk1MyAxLjk1MyA1LjExOSAwIDcuMDcxLS45NzUuOTc1LTIuMjU2IDEuNDY0LTMuNTM1IDEuNDY0eiIvPjxwYXRoIGQ9Im0xNzguODg0IDQ0NS4wNzJjLTEuMjc5IDAtMi41Ni0uNDg4LTMuNTM1LTEuNDY0bC01Ljk2NS01Ljk2NC01Ljk2NSA1Ljk2NGMtMS45NTEgMS45NTItNS4xMTkgMS45NTItNy4wNyAwLTEuOTUzLTEuOTUzLTEuOTUzLTUuMTE5IDAtNy4wNzFsOS41LTkuNWMxLjk1MS0xLjk1MiA1LjExOS0xLjk1MiA3LjA3IDBsOS41IDkuNWMxLjk1MyAxLjk1MyAxLjk1MyA1LjExOSAwIDcuMDcxLS45NzYuOTc1LTIuMjU2IDEuNDY0LTMuNTM1IDEuNDY0eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="
						/>
						<Text
							style={{
								fontWeight: "400",
								textAlign: "left",
								width: "90%",
								marginTop: "5rem",
							}}
						>
							What should we call you?
						</Text>
						<StyledTextField
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							className={classes.textfield}
							style={{ padding: "10px" }}
							placeholder="Username"
							type="text"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircleIcon
											style={{
												color: "#bdbdbd",
												fontSize: 25,
												fontWeight: "bolder",
											}}
										/>
									</InputAdornment>
								),
							}}
						/>
						<StyledButton
							// variant=""
							onClick={() => {
								signInWithEmail();
							}}
						>
							Continue
						</StyledButton>
					</AuthContainer>
				)}
				{sendVerificationEmail && !isLoading && (
					<AuthContainer>
						<Icon
							alt="email icon"
							style={{ width: "7rem", height: "7rem" }}
							src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAyMSA1MTIuMDIxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDIxIDUxMi4wMjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM2NEI1RjY7IiBkPSJNMzM4LjIxNCwzNDQuNTU2bC02NC02NC4xMDdjLTQuMTYtNC4xNzEtMTAuOTE0LTQuMTc5LTE1LjA4NS0wLjAxOQ0KCWMtMi4wMDYsMi4wMDEtMy4xMzMsNC43MTctMy4xMzQsNy41NXYxNDkuNDRjMC4wMDMsNC41ODksMi45NDIsOC42NjIsNy4yOTYsMTAuMTEyYzEuMDg2LDAuMzY3LDIuMjI0LDAuNTU1LDMuMzcxLDAuNTU1DQoJYzMuMzU3LDAsNi41MTktMS41ODEsOC41MzMtNC4yNjdsNjQtODUuMzMzQzM0Mi4zNzYsMzU0LjI0NCwzNDEuOTU4LDM0OC4zMSwzMzguMjE0LDM0NC41NTZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMTk3NkQyOyIgZD0iTTI5MS4zNjYsMzIwLjY0MWwtNjQtMjEuMzMzYy01LjU4Ny0xLjg2OC0xMS42MzEsMS4xNDctMTMuNDk5LDYuNzM0DQoJYy0wLjczMiwyLjE5LTAuNzM0LDQuNTU4LTAuMDA1LDYuNzQ5bDQyLjY2NywxMjhjMS40NTMsNC4zNjIsNS41MzYsNy4zMDIsMTAuMTMzLDcuMjk2aDAuNjYxYzQuODE5LTAuMyw4LjgzNi0zLjgsOS43OTItOC41MzMNCglsMjEuMzMzLTEwNi42NjdDMjk5LjUyMywzMjcuNjAxLDI5Ni40ODMsMzIyLjM0NSwyOTEuMzY2LDMyMC42NDF6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjE5NkYzOyIgZD0iTTUwNy40MywyMy40NDZjLTMuMzk5LTIuMzc3LTcuODY3LTIuNTY4LTExLjQ1Ni0wLjQ5MUw5MC42NDEsMjU3LjYyMg0KCWMtNS4wOTYsMi45NTUtNi44MzIsOS40ODItMy44NzcsMTQuNTc4YzEuMzA2LDIuMjUzLDMuMzkxLDMuOTUsNS44NjEsNC43NzFsMTkxLjU3Myw2My44NzJsMTQ4LjkwNyw2My44MjkNCgljNS40MTcsMi4zMTYsMTEuNjg1LTAuMTk3LDE0LjAwMS01LjYxNGMwLjMyMS0wLjc1MiwwLjU1NS0xLjUzOCwwLjY5Ny0yLjM0M2w2NC0zNjIuNjY3DQoJQzUxMi41MzEsMjkuOTY1LDUxMC44MjUsMjUuODI5LDUwNy40MywyMy40NDZ6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMTk3NkQyOyIgZD0iTTUxMC4wMTEsMzguMzhjMy40NDEtNC43ODEsMi4zNTUtMTEuNDQ3LTIuNDI2LTE0Ljg4OWMtNC4yNTktMy4wNjUtMTAuMTE1LTIuNTc4LTEzLjgwOCwxLjE1DQoJCUwyMTUuNjExLDMxOC4wMTdsODAuMjc3LDI3LjczM0w1MTAuMDExLDM4LjM4eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMxOTc2RDI7IiBkPSJNMjYuMDY1LDQyMC4yNDZjLTIuNjc5LDAuMDAzLTUuMjYtMS4wMDMtNy4yMzItMi44MTZjLTUuMzE5LTQuODkyLTEwLjU1My05LjkyLTE1LjcwMS0xNS4wODMNCgkJYy00LjE3MS00LjE2NS00LjE3Ni0xMC45MjItMC4wMTEtMTUuMDkzYzQuMTY1LTQuMTcxLDEwLjkyMi00LjE3NiwxNS4wOTMtMC4wMTFjNC45NDksNC45NDksOS45ODQsOS43OTIsMTUuMDgzLDE0LjQ4NQ0KCQljNC4zMzYsMy45ODgsNC42MTgsMTAuNzM2LDAuNjMsMTUuMDcyQzMxLjkwNCw0MTguOTk5LDI5LjA1Miw0MjAuMjQ5LDI2LjA2NSw0MjAuMjQ2eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMxOTc2RDI7IiBkPSJNMTcxLjM4Nyw0OTAuNTRjLTEwLjI3OC0wLjAzMy0yMC41MjctMS4wOTgtMzAuNTkyLTMuMTc5Yy01LjgxNC0wLjk1LTkuNzU3LTYuNDM0LTguODA2LTEyLjI0OA0KCQljMC45NS01LjgxNCw2LjQzNC05Ljc1NywxMi4yNDgtOC44MDZjMC4yNzcsMC4wNDUsMC41NTMsMC4xMDIsMC44MjUsMC4xNjljOC42ODMsMS43OTIsMTcuNTI0LDIuNzA3LDI2LjM4OSwyLjczMWgwLjA2NGg0LjgNCgkJYzUuNTU5LTAuNTMxLDEwLjQ5NywzLjU0NSwxMS4wMjgsOS4xMDRjMC4wMzcsMC4zODUsMC4wNTEsMC43NzEsMC4wNDQsMS4xNTdjMC4yMTYsNS44ODQtNC4zNzcsMTAuODMxLTEwLjI2MSwxMS4wNTFoLTUuNTY4DQoJCUwxNzEuMzg3LDQ5MC41NHogTTk0Ljk1LDQ3MC4xMjRjLTEuNzA4LDAtMy4zOS0wLjQwOS00LjkwNy0xLjE5NWMtMTAuNDg2LTUuNDg3LTIwLjYxMS0xMS42MzYtMzAuMzE1LTE4LjQxMQ0KCQljLTQuNzI3LTMuNTE1LTUuNzA5LTEwLjE5Ny0yLjE5NC0xNC45MjVjMy4zNTUtNC41MTEsOS42MzQtNS42NDQsMTQuMzU0LTIuNTljOC45MzcsNi4yODYsMTguMjcyLDExLjk4NywyNy45NDcsMTcuMDY3DQoJCWM1LjIzMSwyLjcwOSw3LjI3Niw5LjE0Niw0LjU2NywxNC4zNzdjLTEuODMzLDMuNTQtNS40ODcsNS43NjItOS40NzQsNS43NjJMOTQuOTUsNDcwLjEyNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMTk3NkQyOyIgZD0iTTIyNi4yMzUsNDc5LjEwNWMtNS44OTEsMC4wNDgtMTAuNzA1LTQuNjg4LTEwLjc1My0xMC41NzljLTAuMDM1LTQuMzA3LDIuNTI0LTguMjEzLDYuNDg3LTkuOTAxDQoJCWM2LjE0MS0yLjYyNywxMi4xMDUtNS42NDgsMTcuODU2LTkuMDQ1YzUuMTQ2LTIuODY3LDExLjY0Mi0xLjAxOSwxNC41MDksNC4xMjdjMi43NjcsNC45NjcsMS4xNTIsMTEuMjMxLTMuNjcyLDE0LjI0MQ0KCQljLTYuNTQyLDMuODY3LTEzLjMyNSw3LjMwOS0yMC4zMDksMTAuMzA0QzIyOS4wNSw0NzguODA2LDIyNy42NTEsNDc5LjA5NywyMjYuMjM1LDQ3OS4xMDV6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
						/>
						<Text style={{ fontWeight: "300" }}>
							An email has been sent to {email} with a link to verify your
							account.If you don't receive an email within few minutes, please
							check spam folder or try again!{" "}
						</Text>
						<StyledButton
							onClick={() => {
								signIn();
							}}
						>
							Resend email
						</StyledButton>
						<Text style={{ fontWeight: "300" }}>
							Changed your mind? You can always{" "}
							<span
								style={{ color: "#7e2223" }}
								onClick={() => {
									setSendVerificationEmail(false);
								}}
							>
								{" "}
								go back!{" "}
							</span>
						</Text>
					</AuthContainer>
				)}
				{!sendVerificationEmail && !emailVerified && !isLoading && (
					<AuthContainer>
						<Title>Access your account</Title>

						<StyledTextField
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className={classes.textfield}
							placeholder="Email"
							type="email"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<MailOutlineIcon
											style={{
												color: "#bdbdbd",
												fontSize: 25,
												fontWeight: "bolder",
											}}
										/>
									</InputAdornment>
								),
							}}
						/>
						<StyledButton
							onClick={() => {
								signIn();
							}}
						>
							Sign In
						</StyledButton>

						<Divider variant="fullWidth" style={{ width: "70%" }} />
						<Text
							style={{
								margin: 0,
								transform: "translateY(-0.6rem)",
								zIndex: 1,
								fontWeight: "300",
								backgroundColor: "#fff",
								width: "50px",
								textAlign: "center",
							}}
						>
							OR
						</Text>
						<Text style={{ color: "#7e2223" }}>Sign in with</Text>
						<OAuthContainer>
							<IconButton onClick={() => signInWithFacebook()}>
								<Icon
									alt="facebook-icon"
									src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDExMi4xOTYgMTEyLjE5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTEyLjE5NiAxMTIuMTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiMzQjU5OTg7IiBjeD0iNTYuMDk4IiBjeT0iNTYuMDk4IiByPSI1Ni4wOTgiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTcwLjIwMSw1OC4yOTRoLTEwLjAxdjM2LjY3Mkg0NS4wMjVWNTguMjk0aC03LjIxM1Y0NS40MDZoNy4yMTN2LTguMzQNCgkJYzAtNS45NjQsMi44MzMtMTUuMzAzLDE1LjMwMS0xNS4zMDNMNzEuNTYsMjEuODF2MTIuNTFoLTguMTUxYy0xLjMzNywwLTMuMjE3LDAuNjY4LTMuMjE3LDMuNTEzdjcuNTg1aDExLjMzNEw3MC4yMDEsNTguMjk0eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
								/>
							</IconButton>
							<IconButton onClick={() => signInWithGoogle()}>
								<Icon
									alt="google icon"
									src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQkJCMDA7IiBkPSJNMTEzLjQ3LDMwOS40MDhMOTUuNjQ4LDM3NS45NGwtNjUuMTM5LDEuMzc4QzExLjA0MiwzNDEuMjExLDAsMjk5LjksMCwyNTYNCgljMC00Mi40NTEsMTAuMzI0LTgyLjQ4MywyOC42MjQtMTE3LjczMmgwLjAxNGw1Ny45OTIsMTAuNjMybDI1LjQwNCw1Ny42NDRjLTUuMzE3LDE1LjUwMS04LjIxNSwzMi4xNDEtOC4yMTUsNDkuNDU2DQoJQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNTE4RUY4OyIgZD0iTTUwNy41MjcsMjA4LjE3NkM1MTAuNDY3LDIyMy42NjIsNTEyLDIzOS42NTUsNTEyLDI1NmMwLDE4LjMyOC0xLjkyNywzNi4yMDYtNS41OTgsNTMuNDUxDQoJYy0xMi40NjIsNTguNjgzLTQ1LjAyNSwxMDkuOTI1LTkwLjEzNCwxNDYuMTg3bC0wLjAxNC0wLjAxNGwtNzMuMDQ0LTMuNzI3bC0xMC4zMzgtNjQuNTM1DQoJYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjhCNDQ2OyIgZD0iTTQxNi4yNTMsNDU1LjYyNGwwLjAxNCwwLjAxNEMzNzIuMzk2LDQ5MC45MDEsMzE2LjY2Niw1MTIsMjU2LDUxMg0KCWMtOTcuNDkxLDAtMTgyLjI1Mi01NC40OTEtMjI1LjQ5MS0xMzQuNjgxbDgyLjk2MS02Ny45MWMyMS42MTksNTcuNjk4LDc3LjI3OCw5OC43NzEsMTQyLjUzLDk4Ljc3MQ0KCWMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGMTQzMzY7IiBkPSJNNDE5LjQwNCw1OC45MzZsLTgyLjkzMyw2Ny44OTZjLTIzLjMzNS0xNC41ODYtNTAuOTE5LTIzLjAxMi04MC40NzEtMjMuMDEyDQoJYy02Ni43MjksMC0xMjMuNDI5LDQyLjk1Ny0xNDMuOTY1LDEwMi43MjRsLTgzLjM5Ny02OC4yNzZoLTAuMDE0QzcxLjIzLDU2LjEyMywxNTcuMDYsMCwyNTYsMA0KCUMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
								/>
							</IconButton>
						</OAuthContainer>
					</AuthContainer>
				)}
			</SubContainer>
			<IconButton
				onClick={() => {
					if (emailVerified) {
						alert("Kindly provide a username");
						return;
					}
					props.history.push("/home");
				}}
				style={{ display: "inline", position: "absolute", right: 0, top: 0 }}
			>
				<CloseIcon style={{ color: "#fff", fontSize: 30 }} />
			</IconButton>
		</Container>
	);
}

const Container = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	background: rgba(70, 68, 68, 1);
	position: fixed;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const LogoContainer = styled.div`
	display: inline;
	left: 0;
	top: 0;
	position: absolute;
`;

const Logo = styled.img`
	width: 90px;
	height: 80px;
`;

const SubContainer = styled.div`
	width: 80vw;
	height: 80vh;
	background: #fff;
	margin: auto;
	border-radius: 0.7rem;
	overflow: hidden;
	display: flex;
	flex-direction: row;
`;
const OAuthContainer = styled.div`
	display: flex;
`;

const Text = styled.p`
	width: 70%;
	font-weight: bolder;

	color: #000;
	text-align: left;
	font-size: 1.1rem;
	text-align: center;
`;

const Image = styled.div`
	background: url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80")
		center;
	width: 60%;

	height: 100%;
`;

const Tagline = styled.p`
	color: #fff;
	margin: 0 auto;
	width: 50%;
	padding-top: 25%;
	font-size: 3rem;
	font-weight: bolder;
`;

const RedTag = styled.span`
	color: #7e2223;
	font-size: 3rem;
	font-weight: bolder;
	font-style: italic;
`;

const AuthContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 40%;
	justify-content: center;
	padding: 8rem 2rem;
	box-sizing: border-box;
`;

const Title = styled.h1``;

const Icon = styled.img`
	width: 30px;
	margin-right: 10px;
`;

const StyledButton = styled(Button)`
	background-color: #7e2223;
	color: #fff;
	/* width: "30%"; */
	margin: 40px auto;
`;

const StyledTextField = styled(TextField)`
	width: 90%;
	padding: 20px;
	color: #fefefe;
	height: 2rem;
`;
