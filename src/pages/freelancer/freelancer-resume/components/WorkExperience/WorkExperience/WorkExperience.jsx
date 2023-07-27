import { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { ReactComponent as Trash } from "src/assets/icons/trash.svg";
import { ReactComponent as Edit } from "src/assets/icons/edit.svg";
import MyWork from "../MyWork/MyWork";
// import { removeFreelancerExperience } from "src/store/freelancer-resume/freelancerResume";
import WhiteButton from "src/components/white-button";
import OutlinedButton from "src/components/outlined-button";
import { toast } from "react-toastify";
import { API } from "src/services/api";

function WorkExperience() {
	const [isModalActive, setModalActive] = useState(false);
	const [dataToEdit, setDataToEdit] = useState(null);
	const [experienceList, setExperienceList] = useState([]);

	useEffect(() => {
		getExperienceList();
	}, [])

	const getExperienceList = () => {
		API.getFreelancerExperiences()
			.then(res => {
				if (res.status === 200) {
					setExperienceList(res.data)
				}
			})
	}

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

	const handleDelete = (id) => {
		API.deleteFreelancerExperience(id)
			.then(() => getExperienceList())
			.catch(err => toast.error(err.message))
	}
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(activeDoteAction([{ id: 6, label: "Educations" }, { id: 6, type: "education" }]));
		if (experienceList.length > 0) {
			toast.success('Successful step', { position: toast.POSITION.TOP_LEFT });
		}
	};

	if (loading) {
		return <b>Loading...</b>;
	}
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
								experienceList?.map(el => {
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
												onClick={() => handleDelete(el.id)}
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
							<WhiteButton type="button" title="Back" onClick={changePage} />
							<OutlinedButton type="button" title="Next" onClick={handleSubmit} />
						</div>
					</div>
				</div>
			</div>
			{isModalActive && <MyWork removeModal={setModalActive} data={dataToEdit} getExperienceList={getExperienceList} />}
		</>
	);
}

export default WorkExperience;
