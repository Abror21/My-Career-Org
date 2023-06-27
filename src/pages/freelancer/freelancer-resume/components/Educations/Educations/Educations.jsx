import React from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { educationDelete } from "src/store/extraReducers";
import { useState } from "react";
import { ReactComponent as Trash } from "src/assets/icons/trash.svg";
import { ReactComponent as Edit } from "src/assets/icons/edit.svg";
import AddEducations from "../AddEducations/AddEducations";
import OutlinedButton from "src/components/outlined-button";
import WhiteButton from "src/components/white-button";
import { removeFreelancerEducation } from "src/store/freelancer-resume/freelancerResume";

function Educations() {
	const [showModal, setShowModal] = useState(false);
	const [dataToEdit, setDataToEdit] = useState(null);
	const dispatch = useDispatch();
	const { loading } = useSelector(state => state.resume);
	const freelancerEducations = useSelector(state => state.freelancerResume.freelancerEducation);

	const handleEditEducation = el => {
		setDataToEdit(el)
		setShowModal(true);
	};
	const handleAddEducation = () => {
		setDataToEdit(null)
		setShowModal(true)
	}
	const changePage = e => {
		e.preventDefault();
		dispatch(activeDoteAction([{ id: 5, label: "Experience" }, { id: 5, type: "workexperience" }]));
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(activeDoteAction([{ id: 7, label: "Contacts" }, { id: 7, type: "media" }]));
	};

	if (loading) {
		return <b>Loading...</b>;
	}

	const TypeOptions = [{ value: "online", label: "online", id: 1 }, { value: "offline", label: "offline", id: 2 }];
	const option = [
		{ value: "Primary", label: "Primary", id: 1 },
		{ value: "Lower", label: "Lower", id: 2 },
		{ value: "Upper", label: "Upper", id: 3 },
		{ value: "Bachelor", label: "Bachelor", id: 4 },
		{ value: "Master", label: "Master", id: 5 },
		{ value: "Dortorate", label: "Dortorate", id: 6 },
	];

	function updateToTypeOption(type) {
		if (type === 1) {
			return "online";
		} else if (type === 2) {
			return "offline";
		}
	}

	return (
		<>
			<div className="educations">
				<div className="educations__inner">
					<form onSubmit={handleSubmit}>
						<h2 className="educations__title">Educations</h2>
						<p className="educations__text">
							<span className="educations__textSpan">Freelancers who add their experience are twice as likely to win work.</span>
							<span className="educations__textSpan">But if you're just starting out, you can still create a greatprofile.</span>
							<span className="educations__textSpan">Just head on to the next page.</span>
						</p>
						<div className="educations__box">
							{
								freelancerEducations.map(el => (
									<div className="educations__content" key={el.id}>
										<div className="educations__texts">
											<span className="educations__subtitle">{el.name}</span>
											<div className="educations__study">
												<span className="educations__telecommunication">{el.degree}</span>
											</div>
										</div>

										<div className="educations__icons">
											<span
												className="experience__icon--create"
												onClick={() => handleEditEducation(el)}
											>
												<Edit
													name="create-outline"
													className="experience__box__hovering"
												/>
											</span>
											<span
												className="experience__icon--delete"
												onClick={() => dispatch(removeFreelancerEducation(el.id))}
											>
												<Trash
													name="trash-outline"
													className="experience__box__hoveringT"
												/>
											</span>
										</div>
									</div>
								))
							}
						</div>

						<div className="educations__wrapper">
							<button
								type="button"
								className="educations__buttonAdd"
								onClick={handleAddEducation}
							>
								+ Add new
							</button>
						</div>

						<div className="educations__button">
							<WhiteButton type="button" title="Back" onChange={changePage} />
							<OutlinedButton type="submit" title="Next" />
						</div>
					</form>
				</div>
			</div>
			{
				showModal && (
					<AddEducations
						typeOptions={TypeOptions}
						option={option}
						removeModal={setShowModal}
						data={dataToEdit}
					/>
				)
			}
		</>
	);
}

export default Educations;
