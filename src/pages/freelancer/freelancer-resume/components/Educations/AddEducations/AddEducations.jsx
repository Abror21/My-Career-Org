import { useEffect } from "react";
import "./style.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "src/components/Input";
import { useInput } from "src/hooks";
import OutlinedButton from "src/components/outlined-button";
import WhiteButton from "src/components/white-button";
import SelectInput from "src/components/select-input";
// import { addFreelancerEducation } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";
import { FREELANCER_EDUCATION } from "src/services/URLS";
import axios from "axios";

function AddEducations({ data, removeModal, typeOptions, option, getEducationList }) {
	// const dispatch = useDispatch();
	const [currentlyWorking, setCurrentlyWorking] = useState(data?.dateTo === null ? true : false);
	const [defaultDegree, setDefaultDegree] = useState(null);
	const [defaultType, setDefaultType] = useState(null);

	const {
		inputChange: nameInputChange,
		inputBlur: nameInputBlur,
		inputTouch: nameInputTouch,
		value: name,
		inputIsValid: nameIsValid,
		inputIsError: nameIsError,
	} = useInput(value => value?.trim().length > 0);
	const {
		inputChange: locationInputChange,
		inputBlur: locationInputBlur,
		inputTouch: locationInputTouch,
		value: location,
		inputIsValid: locationIsValid,
		inputIsError: locationIsError,
	} = useInput(value => value?.trim().length > 0);
	const {
		inputChange: degreeInputChange,
		inputBlur: degreeInputBlur,
		inputTouch: degreeInputTouch,
		value: degree,
		inputIsValid: degreeIsValid,
		inputIsError: degreeIsError,
	} = useInput(value => value >= 0);
	const {
		inputChange: typeInputChange,
		inputBlur: typeInputBlur,
		inputTouch: typeInputTouch,
		value: typeOfStudy,
		inputIsValid: typeIsValid,
		inputIsError: typeIsError,
	} = useInput(value => value.trim().length > 0);
	const {
		inputChange: dateFromInputChange,
		inputBlur: dateFromInputBlur,
		inputTouch: dateFromInputTouch,
		value: dateFrom,
		inputIsValid: dateFromIsValid,
		inputIsError: dateFromIsError
	} = useInput(value => value?.trim().length > 9);
	const {
		inputChange: dateToInputChange,
		inputBlur: dateToInputBlur,
		inputTouch: dateToInputTouch,
		value: dateToValue,
		inputIsValid: dateToIsValid,
		inputIsError: dateToIsError
	} = useInput(value => value?.trim().length > 9);

	useEffect(() => {
		if (data) {
			nameInputChange(data.name);
			degreeInputChange(option[data.degree].id);
			setDefaultDegree({ value: option[data.degree].value, label: option[data.degree].value });
			typeInputChange(typeOptions[data.typeOfStudy].value);
			setDefaultType({ value: typeOptions[data.typeOfStudy].value, label: typeOptions[data.typeOfStudy].value });
			locationInputChange(data.location);
			dateFromInputChange(data.dateFrom.substring(0, 10));
			dateToInputChange(data.dateTo.substring(0, 10));
		}
	}, [])

	const handleDegreeChange = e => {
		degreeInputChange(e.id);
		setDefaultDegree({ value: option[e.id].value, label: option[e.id].value })
	}
	const handleTypeChange = e => {
		typeInputChange(e.value);
		setDefaultType({ value: typeOptions[e.id - 1].value, label: typeOptions[e.id - 1].value })
	}

	const handleSubmit = e => {
		e.preventDefault();

		nameInputTouch();
		degreeInputTouch();
		typeInputTouch();
		locationInputTouch();
		dateFromInputTouch();
		dateToInputTouch();

		const checkWorking = currentlyWorking || dateToIsValid;
		if (nameIsValid && degreeIsValid && typeIsValid && locationIsValid && dateFromIsValid && checkWorking) {
			let dateTo = currentlyWorking ? null : new Date(dateToValue).toISOString();
			const education = {
				name,
				degree,
				typeOfStudy,
				location,
				dateFrom: new Date(dateFrom).toISOString(),
				dateTo
			}
			if (data) {
				axios.put(
					`${FREELANCER_EDUCATION}/${data.id}`,
					education,
					{ headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` } },
				)
					.then(res => {
						if (res.status === 200) {
							getEducationList();
							removeModal(false);
						}
					})
					.catch(err => toast.error(err.message));
			} else {
				axios.post(
					FREELANCER_EDUCATION,
					education,
					{ headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` } },
				)
					.then(res => {
						if (res.status === 200) {
							getEducationList();
							removeModal(false);
						}
					})
					.catch(err => toast.error(err.message))
			}
		}
	};

	return (
		<div className="addEducations">
			<div className="addEducations__inner">
				<h2 className="addEducations__title">Add Education History</h2>

				<form onSubmit={handleSubmit} className="addEducations__form">
					<Input
						type="text"
						placeholder="School name"
						inputIsError={nameIsError}
						value={name}
						inputChange={nameInputChange}
						inputBlur={nameInputBlur}
						errorMessage="Please enter school name"
						autoComplete='off'
					/>
					<SelectInput
						placeholder="Select degree"
						options={option}
						value={defaultDegree}
						defaultValue={defaultDegree}
						selectIsError={degreeIsError}
						errorMessage="Please select degree"
						selectChange={handleDegreeChange}
						selectBlur={degreeInputBlur}
					/>
					<SelectInput
						placeholder="Type of study"
						options={typeOptions}
						value={defaultType}
						defaultValue={defaultType}
						selectIsError={typeIsError}
						errorMessage="Please select type"
						selectChange={handleTypeChange}
						selectBlur={typeInputBlur}
					/>
					<Input
						type="text"
						placeholder="Location of school"
						inputIsError={locationIsError}
						value={location}
						inputChange={locationInputChange}
						inputBlur={locationInputBlur}
						errorMessage="Please enter location"
						autoComplete="off"
					/>

					<div className="addEducations__wrapper">
						<Input
							type="date"
							label="Date from"
							inputIsError={dateFromIsError}
							value={dateFrom}
							inputChange={dateFromInputChange}
							inputBlur={dateFromInputBlur}
						/>
						<Input
							type="date"
							label="To"
							inputIsError={currentlyWorking ? '' : dateToIsError}
							value={dateToValue}
							disabled={currentlyWorking}
							inputChange={dateToInputChange}
							inputBlur={dateToInputBlur}
						/>
					</div>

					<div className="addEducations__checkboxWrapper">
						<div className="addEducations__checkbox">
							<input
								className="addEducations__inputCheckbox"
								type="checkbox"
								id="checkbox"
								checked={currentlyWorking}
								onChange={() => setCurrentlyWorking(prev => !prev)}
							/>
							<label className="addEducations__labelCheckbox" htmlFor="checkbox">
								I currently attend here
							</label>
						</div>

						<div className="addEducations__button">
							<WhiteButton
								type="button"
								title="Cancel"
								onClick={() => removeModal(false)}
							/>
							<OutlinedButton
								type="submit"
								title="Save"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddEducations;
