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
import Seats from "../assets/seats.png";
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
	const movies = useSelector((state) => state.Movies);
	const { nowShowingMovies } = movies;

	useEffect(() => {
		const getMovieDetails = async () => {
			setIsLoading(true);
			await dispatch(movieActions.getUpcoming());
			await dispatch(movieActions.getNowShowing());
			setIsLoading(false);
		};
		getMovieDetails();
	}, [dispatch]);

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
						props.history.push(`/movies/${q.id}`);
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
					<BackgroundPic></BackgroundPic>
					<FooterContainer>
						<RedTag
							style={{
								margin: "2rem",
								width: "14rem",
							}}
						>
							Experience Movies like no other
						</RedTag>

						<Column>
							<GreyTag>Movies</GreyTag>
							<Text style={{ fontWeight: "normal" }}>
								{nowShowingMovies[0]?.title}
							</Text>
							<Text style={{ fontWeight: "normal" }}>
								{nowShowingMovies[1]?.title}
							</Text>
							<Text style={{ fontWeight: "normal" }}>
								{nowShowingMovies[2]?.title}
							</Text>
							<Text style={{ fontWeight: "normal" }}>
								{nowShowingMovies[3]?.title}
							</Text>
							<Text style={{ fontWeight: "normal" }}>
								{nowShowingMovies[4]?.title}
							</Text>
						</Column>
						<Column>
							<GreyTag>Info</GreyTag>
							<Text style={{ fontWeight: "normal" }}>
								chhapariakeshav@gmail.com
							</Text>
							<Text style={{ fontWeight: "normal" }}>(+91)9794499644</Text>
						</Column>
					</FooterContainer>
				</SubContainer>
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

const FooterContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
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

const Column = styled.div`
	z-index: 2;
	margin: 2rem;
	@media (max-width: 585px) {
		margin: 2rem 1rem;
	}
	@media (max-width: 480px) {
		margin: 2rem 0.7rem;
		display: none;
	}
`;

const EmptySpace = styled.div`
	height: 10rem;
`;

const Text = styled.p`
	color: #fff;
	margin: 5px 0;
	font-size: 0.8rem;
	font-weight: lighter;
	word-wrap: break-word;
	width: 100%;
	@media (max-width: 585px) {
		font-size: 0.6rem;
	}
`;

const BackgroundPic = styled.div`
	background-image: linear-gradient(
			to bottom,
			#000,
			rgba(256, 256, 256, 0),
			#000
		),
		url(${Seats});
	width: 100%;
	position: absolute;
	height: 50vh;
	background-size: cover;
	background-blend-mode: hard-light;
	filter: opacity(25%);
	background-position: bottom;
	transform: translateX(-14vw);
	z-index: 1;
	bottom: 0;
	@media (max-width: 720px) {
		transform: none;
		left: 0;
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

const GreyTag = styled(RedTag)`
	color: #6f6d6c;
	font-size: 0.8rem;
	@media (max-width: 585px) {
		font-size: 0.6rem;
	}
`;
