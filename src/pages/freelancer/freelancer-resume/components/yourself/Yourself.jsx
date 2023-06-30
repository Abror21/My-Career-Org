
// import downIcon from "src/assets/images/Resume/down.png";
import "./Yourself.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../styles.scss";
import { MultiSelect } from "@mantine/core";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { yourSelfStep } from 'src/store/frilanserCardSlice/frilanserCardSlice'
import { languages, getPositionsSkillsWithId, hobbies } from "src/store/extraReducers";
import { useEffect } from "react";
import { getHobbies, getSkills } from "src/store/frilanserCardSlice/frilanserCardSlice";
import OutlinedButton from "src/components/outlined-button";
import { addAboutFreelancer } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";
import SelectInput from "src/components/select-input";
import { useInput } from "src/hooks";
import Textarea from "src/components/Textarea";
import WhiteButton from "src/components/white-button";

function Yourself() {
	const dispatch = useDispatch();

	const [birthDate, setBirthDate] = useState('');
	const [skills, setSkills] = useState([]);
	const [hobbies, setHobbies] = useState([]);
	const [birthDateIsError, setBirthDateIsError] = useState(false);
	const [skillsIsError, setSkillsIsError] = useState(false);
	const [hobbiesIsError, setHobbiesIsError] = useState(false);

	const { positionGetLoading, positionList, hobbiesList, loading, skillsData, HobbysGetLoading } = useSelector(state => state.resume);


	const {
		inputChange: positionInputChange,
		inputBlur: positionInputBlur,
		inputTouch: positionInputTouch,
		value: position,
		inputIsValid: positionIsValid,
		inputIsError: positionIsError,
	} = useInput(value => value.trim().length > 0);
	const {
		inputChange: descriptionInputChange,
		value: description,
	} = useInput();

	if (positionGetLoading && loading) {
		return <b>Loading...</b>;
	}

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
	const options = skillsData.map(item => ({
		value: item.content,
		label: item.content
	}));

	const handleSubmit = e => {
		e.preventDefault();

		positionInputTouch();
		setBirthDateIsError(false);
		setSkillsIsError(false);
		setHobbiesIsError(false);
		if (!birthDate) {
			setBirthDateIsError(true);
		}
		if (!skills.length) {
			setSkillsIsError(true)
		}
		if (!hobbies.length) {
			setHobbiesIsError(true)
		}
		// if (positionIsValid && birthDate && skills.length && hobbies.length) {
		// const about = { position, birthDate, skills, hobbies, description }

		// toast.success('Success', { position: toast.POSITION.TOP_LEFT })
		// dispatch(addAboutFreelancer(about))
		dispatch(activeDoteAction([
			{ id: 4, label: "Language" },
			{ id: 4, type: "lenguage" }
		]))
		// }
	}

	return (
		<div className="yourselfCard">
			<h2 className="yourselfCard_title">Write little about yourself</h2>
			<form method="post" className="yourselfCard_form" onSubmit={handleSubmit}>
				<div className="yourselfCard_form_wrapper">
					<div className="yourselfCard_form_wrapper_top">
						<label
							className="yourselfCard_label"
							style={{ color: (positionIsError && !position) ? 'red' : '' }}
						>Select your Position*</label>
						<SelectInput
							value={position}
							placeholder="Position*"
							options={positionList.map(el => ({ id: el.id, label: el.name }))}
							selectIsError={positionIsError}
							selectChange={e => positionInputChange(e.label)}
							selectBlur={positionInputBlur}
						/>
					</div>
					<div className="yourselfCard_form_wrapper_bottom">
						<label
							className="yourselfCard_label"
							style={{ color: (birthDateIsError && !birthDate) ? 'red' : '' }}
						>Date of birth*</label>
						<input
							className={`${(birthDateIsError && !birthDate) ? 'error' : ''}`}
							type="date"
							placeholder="DD/MM/YYYY"
							data-date-format="YYYY:MMMM:DD "
							onChange={e => setBirthDate(e.target.value.split("-").join(":"))}
						/>
					</div>
				</div>
				<div>
					<label
						className="yourselfCard_label"
						style={{ color: (skillsIsError && !skills.length) ? 'red' : '' }}
					>Write down your skills*</label>
					<MultiSelect
						className={`${(skillsIsError && !skills.length) ? 'error' : ''}`}
						data={options}
						placeholder="Select skill or create a new"
						onChange={skill => setSkills(skill)}
						searchable
						creatable
						getCreateLabel={query => `+ Create ${query}`}
						onCreate={query => {
							const item = { value: query, label: query };
							return item;
						}}
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
						onChange={hobby => setHobbies(hobby)}
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
						onChange={prevPage}
					/>
					<OutlinedButton type="submit" title="Next" />
				</div>
			</form>
		</div>
	);
}

export default Yourself;
