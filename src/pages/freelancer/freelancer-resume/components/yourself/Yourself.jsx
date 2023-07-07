
import "./Yourself.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles.scss";
import { MultiSelect } from "@mantine/core";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import OutlinedButton from "src/components/outlined-button";
import { addAboutFreelancer } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";
import SelectInput from "src/components/select-input";
import { useInput } from "src/hooks";
import Textarea from "src/components/Textarea";
import WhiteButton from "src/components/white-button";
import Input from "src/components/Input";
import { FREELANCER_SKILL, FREELANCER_SKILLS } from "src/api/URLS";
import axios from "axios";


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
	} = useInput(value => value.trim().length > 0);
	const {
		inputChange: birthDateInputChange,
		inputBlur: birthDateInputBlur,
		inputTouch: birthDateInputTouch,
		value: birthDate,
		inputIsValid: birthDateIsValid,
		inputIsError: birthDateIsError,
	} = useInput(value => value.trim().length > 0);
	const {
		inputChange: descriptionInputChange,
		value: description,
	} = useInput();

	useEffect(() => {
		if (fPosition && fPosition.trim().length > 0) {
			setPositionDefaultValue({ value: fPosition, label: fPosition })
			positionInputChange(fPosition)
		}
		birthDateInputChange(fBirthDate);

		fetch(FREELANCER_SKILLS)
			.then(res => res.json())
			.then(data => setSkills(data))
		descriptionInputChange(fDescription)
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

	const Xobbys = hobbiesList.map(item => ({
		value: item.content,
		label: item.content
	}))
	// const options = skillsData.map(item => ({
	// 	value: item.content,
	// 	label: item.content
	// }));

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
		positionInputChange(e.label)
		setPositionDefaultValue({ value: e.label, label: e.label })
	}

	useEffect(() => {
		fetch(FREELANCER_SKILL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('user-token')}`
			},
		})
			.then(res => res.json())
			.then(data => setFreelancerSkills(data.map(skill => {
				return { id: skill.id, value: skill.skill.content, label: skill.skill.content }
			})))
			.catch(error => alert(error.message))
	}, []);

	const handleSkillsChange = skill => {
		if (skill.length < 1) {
			setSkillsIsError(true);
		} else {
			setSkillsIsError(false);
		}

		setFreelancerSkills(skill);
		if (skill.length > freelancerSkills.length) {
			fetch(FREELANCER_SKILL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem('user-token')}`
				},
				body: JSON.stringify({ skillId: skill[skill.length - 1].id }),
			})
				.then(res => {
					if (!res.ok) {
						throw new Error('Something wetn wrong')
					}
					return res.json();
				})
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
					fetch(`${FREELANCER_SKILL}/${freelancerSkills[i].id}`, {
						method: 'DELETE',
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem('user-token')}`
						}
					})
				}
			}
		}
	}


	const handleHobbiesChange = (hobby) => {
		setHobbies(hobby)
		// fetch(FREELANCER_SKILL, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({ otherSkills: hobby }),
		// })
		// 	.then(res => {
		// 		console.log(res);
		// 		return res.json();
		// 	})
		// 	.then(data => console.log(data))
		// 	.catch(error => alert(error))
	}
	const handleSubmit = e => {
		e.preventDefault();

		positionInputTouch();
		birthDateInputTouch();
		setSkillsIsError(false);
		setHobbiesIsError(false);

		if (freelancerSkills.length < 1) {
			setSkillsIsError(true);
		}
		if (!hobbies.length) {
			setHobbiesIsError(true);
		}
		if (positionIsValid && birthDateIsValid && birthDate && freelancerSkills.length && hobbies.length) {
			const about = { position, birthDate, description }
			toast.success('Success', { position: toast.POSITION.TOP_LEFT })
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
						selectChange={handleSkillsChange}
						selectIsError={skillsIsError}
						isMulti={true}
						selectBlur={skillsBlur}
					/>
					<br />
					<label
						className="yourselfCard_label"
						style={{ color: (hobbiesIsError && !hobbies.length) ? 'red' : '' }}
					>Hobbies*</label>
					<MultiSelect
						className={`yourself_select ${(hobbiesIsError && !hobbies.length) ? 'error' : ''}`}
						required
						data={Xobbys}
						placeholder="Select hobbie or create a new"
						nothingFound="Nothing found"
						searchable
						creatable
						getCreateLabel={query => `+ Create ${query}`}
						onCreate={query => {
							const item = { value: query, label: query.toLowerCase() };
							return item;
						}}
						onChange={handleHobbiesChange}
						onBlur={hobbiesBlur}
					/>
					<Textarea
						placeholder="Describe yourself to buyers"
						value={description}
						inputChange={descriptionInputChange}
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
