import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import {
	makeStyles,
	IconButton,
	InputBase,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	List,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import * as movieActions from "../store/action/Movies";
import SearchIcon from "@material-ui/icons/Search";
import LinearProgress from "@material-ui/core/LinearProgress";
import tmdbApiKey from "../constants/tmdbApiKey";
import NowShowing from "../components/Landing/NowShowing";
import ComingSoon from "../components/Landing/ComingSoon";
import AllShowTimes from "../components/Landing/AllShowTimes";
import Promotions from "../components/Landing/Promotions";
import NavLayer from "../components/NavLayer";
import Footer from "../components/Footer";
const useStyles = makeStyles((theme) => ({
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: 15,
	},
	iconButton: {
		padding: 10,
	},
	root: {
		marginTop: 40,
		height: 200,
		zIndex: 100,
		overflow: "scroll",
		backgroundColor: "rgba(256, 256, 256, 1)",
		borderRadius: "1rem",
	},
}));
export default function LandingPage(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [queryResults, setQueryResults] = useState([]);
	const [searchMovie, setSearchMovie] = useState("");
	const [showQuery, setShowQuery] = useState(false);
	const movies = useSelector((state) => state.Movies.upcomingMovies);

	useEffect(() => {
		const getMovieDetails = async () => {
			try {
				setIsLoading(true);
				await dispatch(movieActions.getUpcoming());
				await dispatch(movieActions.getNowShowing());
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
				alert("Something went wrong,please try again!");
			}
		};
		if (movies.length === 0) {
			getMovieDetails();
		}
	}, [dispatch, movies]);

	useEffect(() => {
		const findMovieOnWeb = async () => {
			if (searchMovie.length > 0) {
				const response = await fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey.key}&query=${searchMovie}`
				);
				const responseJson = await response.json();

				setQueryResults(responseJson.results);
			}
		};
		if (searchMovie.length > 0) {
			findMovieOnWeb();
		}
	}, [searchMovie, setQueryResults]);

	const getList = () => {
		return queryResults.map((q) => {
			return (
				<ListItem
					key={q.id}
					button
					onClick={() => {
						props.history.push(`movie/${q.id}`);
					}}
				>
					<ListItemAvatar>
						<Avatar
							alt="movie pic"
							src={`https://image.tmdb.org/t/p/original${q.poster_path}`}
						/>
					</ListItemAvatar>
					<ListItemText primary={q.title} />
				</ListItem>
			);
		});
	};

	if (isLoading) {
		return (
			<Container>
				<LinearProgress />
			</Container>
		);
	}

	return (
		<NavLayer>
			<Container>
				<Header />
				<SubContainer>
					<SearchBarContainer>
						<SearchBarInputContainer>
							<IconButton
								type="submit"
								className={classes.iconButton}
								aria-label="search"
							>
								<SearchIcon style={{ fontSize: 15, color: "#fff" }} />
							</IconButton>
							<InputBase
								onBlur={() =>
									setTimeout(() => {
										setShowQuery(false);
									}, [1000])
								}
								value={searchMovie}
								onFocus={() => setShowQuery(true)}
								onChange={(event) => {
									setSearchMovie(event.target.value);
								}}
								className={classes.input}
								style={{ color: "#fff", width: "90%" }}
								placeholder="Search"
							/>
						</SearchBarInputContainer>
						{queryResults.length > 0 && showQuery && (
							<StyledList dense className={classes.root}>
								{getList()}
							</StyledList>
						)}
					</SearchBarContainer>

					<NowShowing />
					<EmptySpace />
					<ComingSoon />
					<EmptySpace />
					<AllShowTimes />
					<EmptySpace />
					<Promotions />
				</SubContainer>
				<Footer />
			</Container>
		</NavLayer>
	);
}

const Container = styled.div`
	flex: 1;
	width: 100vw;
	background: #000;
	height: 100%;
	position: relative;
	overflow-x: hidden;
	z-index: 1;
`;

const SubContainer = styled.div`
	margin-left: 10vw;
	padding: 30px;
	@media (max-width: 720px) {
		margin-left: 0;
	}
`;

const SearchBarContainer = styled.div`
	position: absolute;
	right: 7rem;
	overflow: hidden;
	padding: initial 5px;
	display: flex;
	flex-direction: column;
	height: 40vh;
	@media (max-width: 855px) {
		right: 2rem;
	}
	@media (max-width: 585px) {
		width: 90vw;
		position: static;
		height: 5vh;
	}
`;

const SearchBarInputContainer = styled.div`
	background-color: rgba(256, 256, 256, 0.3);
	border-radius: 1rem;
	width: 18rem;
	display: flex;
	align-items: center;
	@media (max-width: 585px) {
		width: 90vw;
	}
	@media (max-width: 480px) {
		width: 80vw;
	}
`;

const StyledList = styled(List)`
	position: absolute;
	width: 18rem;
	@media (max-width: 585px) {
		width: 90vw !important;
	}
	@media (max-width: 480px) {
		width: 80vw !important;
	}
`;

const EmptySpace = styled.div`
	height: 10rem;
`;
