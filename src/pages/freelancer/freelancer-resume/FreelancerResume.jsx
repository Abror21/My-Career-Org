import classes from "./FreelancerResume.module.scss";
import back from "src/assets/images/Resume/back.png";
import CareerSlider from "./components/CareerSlider/CareerSlider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cards, dot } from "./information";
// import { removeToken } from "store/loginSlice/LoginSlice";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import Round from "src/components/Round/Round";
import { useNavigate } from "react-router-dom";

function FreelancerResume() {
	const navigate = useNavigate();
	const { activeCard } = useSelector(state => state.resumeControle);
	const { activeDote } = useSelector(state => state.resumeControle);

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(
			activeDoteAction([
				{ id: 1, label: "Personal information" },
				{ id: 1, label: "photo" }
			])
		);
		// dispatch(removeToken())
		// localStorage.clear()
	}

	return (
		<>
			<div className="container">
				<div className={classes.allBackground_inner}>
					<div className={classes.backSign}>
						<button onClick={() => navigate(-1)} className={classes.backSign_btn}>
							<img className={classes.backImg} src={back} alt="back sign" /> Back
						</button>
					</div>

					<div className={classes.cards}>
						{
							cards.map(el => (
								<div
									className={`${classes.card_box} ${el.type === activeCard.type ? classes.active : ""}`}
									key={el.id}
									style={{ top: el.id < activeCard.id ? "-200%" : el.id === activeCard.id ? "12%" : "200%" }}>
									{el.label}
								</div>
							))
						}
					</div>

					<div className={classes.career}>
						<CareerSlider dot={dot} activeDote={activeDote} classNameLine="mycareer__line" />
					</div>
					<Round />
				</div>
			</div>
		</>
	);
}

export default FreelancerResume;
