import tmdbApiKey from "../../constants/tmdbApiKey";
export const NOW_SHOWING = "NOW_SHOWING";
export const UPCOMING = "UPCOMING";

export const getNowShowing = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey.key}&language=en-US&page=1`
			);
			const responseJson = await response.json();
			console.log(responseJson);
			dispatch({ type: NOW_SHOWING, payload: responseJson.results });
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
};

export const getUpcoming = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey.key}&language=en-US&page=1`
			);
			const responseJson = await response.json();
			console.log(responseJson);
			dispatch({ type: UPCOMING, payload: responseJson.results });
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
};
