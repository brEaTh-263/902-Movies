import { NOW_SHOWING, UPCOMING } from "../action/Movies";

const initialState = {
	nowShowingMovies: [],
	upcomingMovies: [],
};

export default function MoviesReducer(state = initialState, action) {
	switch (action.type) {
		case NOW_SHOWING: {
			return {
				...state,
				nowShowingMovies: action.payload,
			};
		}
		case UPCOMING: {
			return {
				...state,
				upcomingMovies: action.payload,
			};
		}
		default: {
			return initialState;
		}
	}
}
