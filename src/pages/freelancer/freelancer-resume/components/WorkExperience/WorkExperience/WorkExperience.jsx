import { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { ReactComponent as Trash } from "src/assets/icons/trash.svg";
import { ReactComponent as Edit } from "src/assets/icons/edit.svg";
import MyWork from "../MyWork/MyWork";
import { removeFreelancerExperience } from "src/store/freelancer-resume/freelancerResume";

function WorkExperience() {
	const [isModalActive, setModalActive] = useState(false);
	const [dataToEdit, setDataToEdit] = useState(null);
	const experienceList = useSelector(state => state.freelancerResume.freelancerExperience);

	const { userID, experiencePostIsSuccess, loading } = useSelector(state => state.resume);
	const dispatch = useDispatch();
	const id = useParams();

	const handleEditExperience = el => {
		setDataToEdit(el)
		setModalActive(true);
	};
	const handleAddExperience = () => {
		setDataToEdit(null)
		setModalActive(true)
	}

	const changePage = e => {
		e.preventDefault();
		dispatch(activeDoteAction([{ id: 4, label: "Language" }, { id: 4, type: "lenguage" }]));
	};

	if (loading) {
		return <b>Loading...</b>;
	}

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(activeDoteAction([{ id: 6, label: "Educations" }, { id: 6, type: "education" }]));
	};

	return (
		<>
			<div className="experience">
				<div className="experience__inner">
					<div>
						<h2 className="experience__title">Work Experience</h2>
						<p className="experience__text">
							<span className="experience__textSpan">Freelancers who add their experience are twice as likely to win work.</span>
							<span className="experience__textSpan">But if you're just starting out, you can still create a great profile.</span>
							<span className="experience__textSpan">Just head on to the next page.</span>
						</p>

						<div className="experience__box">
							{
								experienceList.map(el => {
									return <div className="experience__content" key={el.id}>
										<div className="experience__texts">
											<span className="experience__subtitle">{el.companyName}</span>
											<span className="experience__span">{el.job}</span>
										</div>
										<div className="experience__icons">
											<span
												className="experience__icon--create"
												onClick={() => handleEditExperience(el)}
											>
												<Edit
													name="create-outline"
													className={`${"experience__box__hovering"}`}
												/>
											</span>
											<span
												className="experience__icon--delete"
												onClick={() => dispatch(removeFreelancerExperience(el.id))}
											>
												<Trash
													name="trash-outline"
													className={`${"experience__box__hoveringT"}`}
												/>
											</span>
										</div>
									</div>
								})
							}
						</div>

						<div className="experience__wrapper">
							<button
								style={{ cursor: "pointer" }}
								className="experience__buttonAdd"
								onClick={handleAddExperience}>
								+ Add new
							</button>
						</div>

						<div className="experience__button">
							<button className="experience__back" type="button" onClick={changePage}>
								Back
							</button>
							<button className="experience__next" type="submit" onClick={handleSubmit}>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
			{isModalActive && <MyWork removeModal={setModalActive} data={dataToEdit} />}
		</>
	);
}

export default WorkExperience;
