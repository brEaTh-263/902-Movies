import { Switch, Route } from "react-router";
import MoviePage from "../containers/MoviePage";
import LandingPage from "../containers/LandingPage";
import AboutPage from "../containers/AboutPage";
import ContactUsPage from "../containers/ContactUsPage";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/movies/:id" component={MoviePage} />
			<Route exact path="/about-us" component={AboutPage} />
			<Route exact path="/contact-us" component={ContactUsPage} />
		</Switch>
	);
};

export default Routes;
