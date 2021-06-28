import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function AboutPage(props) {
	return (
		<Container>
			<Header />
			<Background>
				<RedTag>our theatre</RedTag>
				<Type style={{ textTransform: "uppercase" }}>
					<BoldType>about</BoldType>us
				</Type>
			</Background>
			<SubContainer>
				<PerksContainer>
					<Column>
						<BlueTag>About Us</BlueTag>
						<Type>
							All the
							<BoldType>Perks</BoldType>
						</Type>
						<Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam
						</Text>
					</Column>
					<PerksColumn>
						<Content>
							<BigText>Amazing Theatres</BigText>
							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Content>
						<Content>
							<BigText>Comfort Amenities</BigText>
							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Content>
						<Content>
							<BigText>Pre Order Food</BigText>
							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Content>
						<Content>
							<BigText>
								<BigText>Artisan Snacks</BigText>
							</BigText>
							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Content>
						<Content>
							<BigText>Movie Go’er Rewards</BigText>
							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Content>
					</PerksColumn>
				</PerksContainer>
				<StoryContainer>
					<RedTag>Our Story</RedTag>
					<StoryText>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem
						accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
						quae ab illo inventore veritatis et quasi architecto beatae vitae
						dicta sunt explicabo.
					</StoryText>
					<StoryText>
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
						fugit, sed quia consequuntur magni dolores eos qui ratione
						voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
						ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
						numquam eius modi tempora incidunt ut labore et dolore magnam
						aliquam quaerat voluptatem.
					</StoryText>
					<StoryText>
						Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
						suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
						autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
						nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
						voluptas nulla pariatur?
					</StoryText>
				</StoryContainer>
				<WhyChooseUsContainer>
					<RedTag>Happy viewers</RedTag>
					<Type>
						Why <BoldType> Choose us</BoldType>
					</Type>
					<ReasonsContainer>
						<Reasons style={{ borderColor: "#1a1a1a" }}>
							<Image src="https://www.elegantthemes.com/layouts/wp-content/uploads/2018/07/quote-light.png"></Image>
							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Reasons>
						<Reasons style={{ borderColor: "#694cc9" }}>
							<Image src="https://www.elegantthemes.com/layouts/wp-content/uploads/2018/07/quote-light.png"></Image>

							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Reasons>
						<Reasons style={{ borderColor: "#4c090f" }}>
							<Image src="https://www.elegantthemes.com/layouts/wp-content/uploads/2018/07/quote-light.png"></Image>

							<Text style={{ fontWeight: "normal" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor.
							</Text>
						</Reasons>
					</ReasonsContainer>
				</WhyChooseUsContainer>
			</SubContainer>
			<Footer />
		</Container>
	);
}

const Container = styled.div`
	flex: 1;
	width: 100vw;
	background: #000;
	height: 100%;
`;

const Text = styled.p`
	color: #fff;
	margin: 5px 0;
	font-size: 0.8rem;
	font-weight: lighter;
	line-height: 20px;
	letter-spacing: 1px;
	@media (max-width: 480px) {
		font-size: 0.7rem;
	}
`;

const StoryContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 6rem;
	margin-bottom: 6rem;
`;

const StoryText = styled(Text)`
	width: 50vw;
	text-align: center;
	font-size: 1rem;
	line-height: 25px;
	@media (max-width: 855px) {
		width: 70vw;
		font-size: 0.8rem;
	}
`;

const WhyChooseUsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ReasonsContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 4rem;
	@media (max-width: 855px) {
		display: block;
	}
`;

const Image = styled.img`
	align-self: flex-start;
	width: 40px;
	height: 40px;
`;

const Reasons = styled.div`
	border: 3px white solid;
	margin: 1rem;
	padding: 6rem 2rem;
	padding-bottom: 3rem;
	width: 20%;
	@media (max-width: 855px) {
		padding: 3rem 2rem;
		width: 70%;
	}
	@media (max-width: 585px) {
		padding: 2rem;
		margin: 1rem 0.5rem;
	}
`;

const Background = styled.div`
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, #000 100%),
		url("https://ali.sandbox.etdevs.com/divi/wp-content/uploads/sites/2/2019/09/movie-02.jpg");
	background-size: cover;
	background-position: 50%;
	padding: 8rem;
	@media (max-width: 585px) {
		padding: 4rem;
	}
`;

const PerksContainer = styled.div`
	display: grid;
	justify-content: space-evenly;
	grid-template-rows: 100%;
	grid-template-columns: 30% 50%;
	margin: 2rem;
	@media (max-width: 855px) {
		display: block;
	}
`;

const Column = styled.div`
	width: 25vw;
	@media (max-width: 855px) {
		width: 45vw;
	}
	@media (max-width: 585px) {
		width: 60vw;
	}
`;
const PerksColumn = styled(Column)`
	grid-column: 2;
	border: 0.3rem solid #1e114a;
	display: grid;
	grid-template-rows: 33% 33% 34%;
	grid-template-columns: 50% 50%;
	grid-gap: 2%;
	padding: 5%;
	@media (max-width: 855px) {
		display: block;
		margin-top: 5%;
	}
`;

const Content = styled.div`
	margin: 2%;
	@media (max-width: 855px) {
		margin-top: 6%;
	}
	@media (max-width: 380px) {
		margin-top: 10%;
	}
`;

const SubContainer = styled.div`
	margin-left: 8vw;
	padding-left: 4vw;
	@media (max-width: 720px) {
		margin-left: 0;
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

const Type = styled.h1`
	color: #fff;
	letter-spacing: 3px;
	font-size: 6rem;
	font-weight: lighter;
	display: inline-block;

	margin: 0;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 720px) {
		font-size: 2rem;
	}
`;

const BoldType = styled.span`
	font-weight: bold;
	color: #fff;
	letter-spacing: 3px;
	font-size: 6rem;
	display: inline-block;
	margin: 0;
	@media (max-width: 1080px) {
		font-size: 3rem;
	}
	@media (max-width: 720px) {
		font-size: 2rem;
	}
`;

const BlueTag = styled(RedTag)`
	color: #694cc9;
	width: 100%;
	word-wrap: break-word;
	text-transform: uppercase;
	@media (max-width: 1080px) {
		font-size: 0.8rem;
	}
	@media (max-width: 855px) {
		font-size: 0.7rem;
	}
	@media (max-width: 720px) {
		font-size: 0.5rem;
	}
`;

const BigText = styled(Text)`
	font-size: 1.4rem;
	font-weight: bold;
`;
