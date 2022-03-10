import { Switch, Route } from "react-router";
import MoviePage from "../containers/MoviePage";
import LandingPage from "../containers/LandingPage";
import AboutPage from "../containers/AboutPage";
import ContactUsPage from "../containers/ContactUsPage";
import MoviesPage from "../containers/MoviesPage";
import AuthPage from "../containers/AuthPage";
import ActorPage from "../containers/ActorPage";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/auth" component={AuthPage} />
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/movies" component={MoviesPage} />
			<Route exact path="/movie/:id" component={MoviePage} />
			<Route exact path="/cast/:id" component={ActorPage} />
			<Route exact path="/about-us" component={AboutPage} />
			<Route exact path="/contact-us" component={ContactUsPage} />
		</Switch>
	);
};

export default Routes;
