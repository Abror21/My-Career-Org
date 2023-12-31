import React, { useEffect } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { useState } from "react";
import { ReactComponent as Trash } from "src/assets/icons/trash.svg";
import { ReactComponent as Edit } from "src/assets/icons/edit.svg";
import AddEducations from "../AddEducations/AddEducations";
import OutlinedButton from "src/components/outlined-button";
import WhiteButton from "src/components/white-button";
import { toast } from "react-toastify";
import { API } from "src/services/api";

function Educations() {
	const [showModal, setShowModal] = useState(false);
	const [dataToEdit, setDataToEdit] = useState(null);
	const [educations, setEducations] = useState([]);

	const dispatch = useDispatch();
	const { loading } = useSelector(state => state.resume);

	useEffect(() => {
		getEducationList();
	}, [])

	const getEducationList = () => {
		API.getFreelancerEducations()
			.then(res => {
				if (res.status === 200) {
					setEducations(res.data);
				}
			})
			.catch(err => toast.error(err.message))
	}

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

	const handleDelete = (id) => {
		API.deleteFreelancerEducation(id)
			.then(res => {
				if (res.status === 200) {
					getEducationList();
				}
			})
			.catch(err => toast.error(err.message))
	}

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(activeDoteAction([{ id: 7, label: "Contacts" }, { id: 7, type: "media" }]));
	};

	if (loading) {
		return <b>Loading...</b>;
	}

	const typeOptions = [{ value: "online", label: "online", id: 1 }, { value: "offline", label: "offline", id: 2 }];
	const option = [
		{ value: "Primary", label: "Primary", id: 0 },
		{ value: "Lower", label: "Lower", id: 1 },
		{ value: "Upper", label: "Upper", id: 2 },
		{ value: "Bachelor", label: "Bachelor", id: 3 },
		{ value: "Master", label: "Master", id: 4 },
		{ value: "Doctorate", label: "Doctorate", id: 5 },
	];

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
								educations.map(el => (
									<div className="educations__content" key={el.id}>
										<div className="educations__texts">
											<span className="educations__subtitle">{el.name}</span>
											<div className="educations__study">
												<span className="educations__telecommunication">{option[el.degree].value}</span>
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
												onClick={() => handleDelete(el.id)}
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
							<WhiteButton type="button" title="Back" onClick={changePage} />
							<OutlinedButton type="submit" title="Next" />
						</div>
					</form>
				</div>
			</div>
			{
				showModal && <AddEducations
					typeOptions={typeOptions}
					option={option}
					removeModal={setShowModal}
					data={dataToEdit}
					getEducationList={getEducationList}
				/>
			}
		</>
	);
}

export default Educations;
