import classes from "./SelectResume.module.scss";
import resume1 from "src/assets/images/Resume/resume-img1.png";
import resume2 from "src/assets/images/Resume/resume-img2.png";
import resume3 from "src/assets/images/Resume/resume-img3.png";
import resume4 from "src/assets/images/Resume/resume-img4.png";
import resume5 from "src/assets/images/Resume/resume1.png";
import resume6 from "src/assets/images/Resume/resume-img5.png";
import arrowleft from "src/assets/images/arrow-left.svg";
import arrowright from "src/assets/images/arrow-right.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Freelancerpost, resumeSelect } from "src/store/extraReducers";
import { useNavigate } from "react-router-dom";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import WhiteButton from "src/components/white-button";
import OutlinedButton from "src/components/outlined-button";

function SelectResume() {
	const [activeDot, setActiveDot] = useState(1);
	const [translate, setTranslate] = useState(0);
	const [resumeId, setResumeId] = useState(1);
	const len = useSelector(state => state.language.language);

	const freelancer = useSelector(state => state.frilancerCards.freelancer);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const resume = [
		{ id: 1, img: resume1 },
		{ id: 2, img: resume2 },
		{ id: 3, img: resume3 },
		{ id: 4, img: resume4 },
		{ id: 5, img: resume5 },
		{ id: 6, img: resume6 }
	];

	const handleNextClick = () => {
		if (activeDot < resume.length) {
			setActiveDot(prev => prev + 1);
			setTranslate(-activeDot * 330);
		}
	};

	const handlePrevClick = () => {
		if (activeDot > 1) {
			setActiveDot(prev => prev - 1);
			setTranslate(prev => prev * 1 + 330);
		}
	};

	const handleDotClick = num => {
		setActiveDot(num);
		setResumeId(num);
		if (num === 1) {
			setTranslate(0);
		} else if (num > 1) {
			if (translate < 0) {
				setTranslate(prev => -((num - 1) * 330));
			} else {
				setTranslate(prev => -(prev + (num - 1) * 330));
			}
		}
	};

	const handleSubmit = (e) => {
		// e.preventDefault()

		// const formdata = new FormData();
		// console.log(freelancer);
		// for (const key in freelancer) {
		// 	if (typeof freelancer[key] === "object" && freelancer[key] !== null) {
		// 		// console.log(freelancer[key]);
		// 		for (const nestedKey in freelancer[key]) {
		// 			formdata.append(`${key}.${nestedKey}`, freelancer[key][nestedKey]);
		// 		}
		// 	} else {
		// 		formdata.append(key, freelancer[key]);
		// 		// console.log(freelancer[key]);
		// 	}
		// }
		// console.log(formdata);
		// dispatch(Freelancerpost(formdata));
		// navigate(`/${len}/welcome/create-profile/${resumeId}`);
		// const data = new FormData();
		// data.append("resume", resumeId);
		// dispatch(resumeSelect(data));
	};

	const prevPage = () => {
		dispatch(
			activeDoteAction([
				{ id: 7, label: "Contacts" },
				{ id: 7, type: "media" }
			])
		);
	};

	return (
		<div className={classes.selectResume}>
			<h2 className={classes.select_title}>Select your resume design</h2>
			<p className={classes.select_desc}>Your resume is ready! You need to choose one of this templates and all your info will be filled in it already.</p>
			<div className={classes.eachResume} style={{ transform: `translateX(${translate}px)` }}>
				{
					resume.map((eachResume, i) => (
						<div
							key={eachResume.id}
							className={`${classes.slide} ${activeDot === i + 1 ? classes.slide__active : ""}`}
							onClick={() => handleDotClick(eachResume.id)}>
							<img className={classes.slide_img} src={eachResume.img} alt="Resume images" />
						</div>
					))
				}
			</div>
			<div className={classes.resume__footer}>
				<div className={classes.pagination__box}>
					<button className={classes.pagination__arrow} onClick={handlePrevClick}>
						<img src={arrowleft} alt="" />
					</button>

					<ul className={classes.pagination_dots}>
						{
							resume.map((el, i) => (
								<li
									className={`${classes.pagination_dot} ${activeDot === i + 1 ? classes.active : null}`}
									key={i + 1}
									onClick={() => handleDotClick(i + 1)}></li>
							))
						}
					</ul>

					<button className={classes.pagination__arrow} onClick={handleNextClick}>
						<img src={arrowright} alt="" />
					</button>
				</div>

				<div className={classes.socialForm}>
					<WhiteButton type="button" title="Back" onClick={prevPage} />
					<OutlinedButton type="button" title="Next" onClick={handleSubmit} />
				</div>
			</div>
		</div>
	);
}

export default SelectResume;
