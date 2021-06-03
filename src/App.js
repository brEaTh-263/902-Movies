import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import MoviesReducer from "./store/reducer/Movies";
import AuthReducer from "./store/reducer/Auth";
import CircularProgress from "@material-ui/core/CircularProgress";

const App = () => {
	const persistConfig = {
		key: "root",
		storage: storage,
	};

	const rootReducer = combineReducers({
		Movies: MoviesReducer,
		Auth: AuthReducer,
	});

	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
	const persistedStore = persistStore(store);
	return (
		<Provider store={store}>
			<PersistGate loading={<CircularProgress />} persistor={persistedStore}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
};

export default App;
