import React, { useEffect, useCallback } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as authActions from "../store/action/Auth";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { firebase } from "../firebase/firebase";

export default function InitialPage(props) {
	const dispatch = useDispatch();
	const checkAutoLogIn = useCallback(async () => {
		firebase.auth().onAuthStateChanged(async (user) => {
			console.log(user);
			if (user) {
				await dispatch(authActions.signIn());
			}
			props.history.push("home");
		});
	}, [props.history, dispatch]);

	useEffect(() => {
		checkAutoLogIn();
	}, [checkAutoLogIn]);

	return (
		<Container>
			<CircularProgress />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;
