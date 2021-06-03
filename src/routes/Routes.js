import { Switch, Route } from "react-router";
import AuthPage from "../containers/AuthPage";
import HomePage from "../containers/MoviePage";
import InitialPage from "../containers/InitialPage";
import LandingPage from "../containers/LandingPage";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={InitialPage} />
			<Route exact path="/sign-in" component={AuthPage} />
			<Route exact path="/home" component={LandingPage} />
			<Route exact path="/movies/:id" component={HomePage} />
		</Switch>
	);
};

export default Routes;
