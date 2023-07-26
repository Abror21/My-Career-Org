
import "./Yourself.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles.scss";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import OutlinedButton from "src/components/outlined-button";
import { addAboutFreelancer } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";
import SelectInput from "src/components/select-input";
import { useInput } from "src/hooks";
import Textarea from "src/components/Textarea";
import WhiteButton from "src/components/white-button";
import Input from "src/components/Input";
import { FREELANCER_HOBBY, FREELANCER_SKILL, FREELANCER_SKILLS } from "src/services/URLS";
import CreatableInput from "src/components/select-input/CreatableInput";
import { API } from "src/services/api";


function Yourself() {
	const dispatch = useDispatch();
	const [skills, setSkills] = useState([]);
	const [freelancerSkills, setFreelancerSkills] = useState("");
	const [hobbies, setHobbies] = useState([]);
	const [skillsIsError, setSkillsIsError] = useState(false);
	const [hobbiesIsError, setHobbiesIsError] = useState(false);
	const [positionDefaultValue, setPositionDefaultValue] = useState(null);

	const { positionGetLoading, positionList, hobbiesList, loading, skillsData, HobbysGetLoading } = useSelector(state => state.resume);
	const { position: fPosition, birthDate: fBirthDate, description: fDescription } = useSelector(state => state.freelancerResume);
	const {
		inputChange: positionInputChange,
		inputBlur: positionInputBlur,
		inputTouch: positionInputTouch,
		value: position,
		inputIsValid: positionIsValid,
		inputIsError: positionIsError,
	} = useInput(value => value?.trim().length > 0);
	const {
		inputChange: birthDateInputChange,
		inputBlur: birthDateInputBlur,
		inputTouch: birthDateInputTouch,
		value: birthDate,
		inputIsValid: birthDateIsValid,
		inputIsError: birthDateIsError,
	} = useInput(value => value?.trim().length > 0);
	const {
		inputChange: descriptionInputChange,
		inputBlur: descriptionInputBlur,
		inputTouch: descriptionInputTouch,
		value: description,
		inputIsValid: descriptionIsValid,
		inputIsError: descriptionIsError,
	} = useInput(value => value?.trim().length > 0);

	useEffect(() => {
		if (fPosition && fPosition?.trim().length > 0) {
			setPositionDefaultValue({ value: fPosition, label: fPosition })
			positionInputChange(fPosition)
		}
		birthDateInputChange(fBirthDate?.replaceAll(':', '-'));

		API.getSkillsList().then(res => setSkills(res.data))
		API.getFreelancerSkills()
			.then(res => {
				setFreelancerSkills(res.data.map(skill => {
					return { id: skill.id, value: skill.skill.content, label: skill.skill.content }
				}))
			})
			.catch(err => console.log(err.message))
		API.getFreelancerHobbies()
			.then(res => {
				setHobbies(res.data.map(el => ({ id: el.id, value: el.hobby.content, label: el.hobby.content })))
			})
			.catch(err => console.log(err.message))
		descriptionInputChange(fDescription);
	}, [])

	const prevPage = event => {
		event.preventDefault();
		dispatch(
			activeDoteAction([
				{ id: 2, label: "Address" },
				{ id: 2, type: "country" }
			])
		);
	};

	const skillsBlur = () => {
		if (freelancerSkills.length < 1) {
			setSkillsIsError(true)
		}
	}
	const hobbiesBlur = () => {
		if (hobbies.length < 1) {
			setHobbiesIsError(true)
		}
	}

	const positionHandleChange = (e) => {
		positionInputChange(e.label.replace(" ", ""))
		setPositionDefaultValue({ value: e.label, label: e.label })
	}

	const handleSkillsChange = skill => {
		if (skill.length < 1) {
			setSkillsIsError(true);
		} else {
			setSkillsIsError(false);
		}
		if (skill.length > freelancerSkills.length) {
			API.postFreelancerSkills({ skillId: skill[skill.length - 1].id })
				.then(res => setFreelancerSkills([...freelancerSkills, { id: res.data.id, value: skill[skill.length - 1].value, label: skill[skill.length - 1].label }]))
				.catch(error => toast.error(error.message))

		} else {
			for (let i = 0; i < freelancerSkills.length; i++) {
				let test = false;
				for (let j = 0; j < skill.length; j++) {
					if (freelancerSkills[i].id === skill[j].id) {
						test = true;
						break;
					}
				}
				if (!test) {
					API.deleteFreelancerSkill(freelancerSkills[i].id)
						.then(res => {
							if (res.status === 200) {
								setFreelancerSkills(skill);
							}
						})
						.catch(err => toast.error(err.message))
				}
			}
		}
	}
	const handleHobbiesChange = hobby => {
		if (hobby.length < 1) {
			setHobbiesIsError(true);
		} else {
			setHobbiesIsError(false);
		}

		if (hobby.length > hobbies.length) {
			API.postFreelancerHobbie({ otherHobby: hobby[hobby.length - 1].value })
				.then(res => {
					setHobbies([...hobbies, { id: res.data.id, value: res.data.hobby.content, label: res.data.hobby.content }])
				})
				.catch(error => toast.error(error.message))
		} else {
			for (let i = 0; i < hobbies.length; i++) {
				let test = false;
				for (let j = 0; j < hobby.length; j++) {
					if (hobbies[i].id === hobby[j].id) {
						test = true;
						break;
					}
				}
				if (!test) {
					API.deleteFreelancerHobbie(hobbies[i].id)
						.then(res => {
							if (res.status === 200) {
								setHobbies(hobby)
							}
						})
						.catch(err => toast.error(err.message))
				}
			}
		}
	}

	const handleSubmit = e => {
		e.preventDefault();

		positionInputTouch();
		birthDateInputTouch();
		descriptionInputTouch();
		setSkillsIsError(false);
		setHobbiesIsError(false);

		if (freelancerSkills.length < 1) {
			setSkillsIsError(true);
		}
		if (!hobbies.length) {
			setHobbiesIsError(true);
		}
		if (positionIsValid && birthDateIsValid && birthDate && freelancerSkills.length && hobbies.length && descriptionIsValid) {
			const about = { position, birthDate: birthDate.replaceAll('-', ':'), description }
			toast.success('Successful step', { position: toast.POSITION.TOP_LEFT })
			dispatch(addAboutFreelancer(about))
			dispatch(activeDoteAction([
				{ id: 4, label: "Language" },
				{ id: 4, type: "lenguage" }
			]))
		}
	}
	if (positionGetLoading && loading) {
		return <b>Loading...</b>;
	}
	return (
		<div div className="yourselfCard" >
			<h2 className="yourselfCard_title">Write a little about yourself</h2>
			<form method="post" className="yourselfCard_form" onSubmit={handleSubmit}>
				<div className="yourselfCard_form_wrapper">
					<div className="yourselfCard_form_wrapper_top">
						<label
							className="yourselfCard_label"
							style={{ color: (positionIsError && !position) ? 'red' : '' }}
						>Select your Position*</label>
						<SelectInput
							value={positionDefaultValue}
							defaultValue={positionDefaultValue}
							placeholder="Position*"
							options={positionList.map(el => ({ id: el.id, label: el.name }))}
							selectIsError={positionIsError}
							selectChange={positionHandleChange}
							selectBlur={positionInputBlur}
						/>
					</div>
					<div className="yourselfCard_form_wrapper_bottom">
						<Input
							type="date"
							label="Date of birth*"
							placeholder="DD/MM/YYYY"
							inputIsError={birthDateIsError}
							value={birthDate}
							inputChange={birthDateInputChange}
							inputBlur={birthDateInputBlur}
						/>
					</div>
				</div>
				<div>
					<label
						className="yourselfCard_label"
						style={{ color: skillsIsError ? 'red' : '' }}
					>
						Write down your skills*
					</label>
					<SelectInput
						placeholder={`Select skill*`}
						options={skills.map(el => ({ id: el.id, value: el.content, label: el.content }))}
						value={freelancerSkills}
						defaultValue={freelancerSkills}
						selectChange={handleSkillsChange}
						selectIsError={skillsIsError}
						isMulti={true}
						selectBlur={skillsBlur}
					/>
					<br />
					<label
						className="yourselfCard_label"
						style={{ color: hobbiesIsError ? 'red' : '' }}
					>Hobbies*</label>
					<CreatableInput
						value={hobbies}
						selectIsError={hobbiesIsError}
						onChange={handleHobbiesChange}
						onBlur={hobbiesBlur}
						defaultValue={hobbies}
					/>
					<br />
					<Textarea
						placeholder="Describe yourself"
						value={description}
						inputChange={descriptionInputChange}
						inputBlur={descriptionInputBlur}
						inputIsError={descriptionIsError}
						errorMessage="Field should not be empty"

					/>
				</div>
				<div className="yourselfCard_btn">
					<WhiteButton
						type="button"
						title="Back"
						onClick={prevPage}
					/>
					<OutlinedButton type="submit" title="Next" />
				</div>
			</form>
		</div >
	);
}

export default Yourself;
