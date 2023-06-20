import { useEffect, useState, useRef } from "react";
import "../photo/Photo.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { secondStep } from "src/store/frilanserCardSlice/frilanserCardSlice";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { countryUpload, hobbies, positions, getFreelancer, getCountryList, getRegionsList } from "src/store/extraReducers";

function Country() {
	const dispatch = useDispatch();
	const street = useRef("");
	const name = useSelector(state => state.freelancerResume.name);

	const [userChoice, setUserChoice] = useState([0]);
	const [userChoice2, setUserChoice2] = useState(0);
	const countryList = useSelector(state => state.resume.countryList);

	useEffect(() => {
		dispatch(getCountryList())
	}, [])

	const regionsList = useSelector(state => state.resume.regionsList);
	let options = [];

	let optionsRegion = [];
	for (let i = 0; i < countryList?.length; i++) {
		options.push({ value: [countryList[i].id, countryList.indexOf(countryList[i])], label: countryList[i].name });
	}
	for (let i = 0; i < regionsList.length; i++) {
		optionsRegion.push({ value: [regionsList[i].id, regionsList.indexOf(regionsList[i])], label: regionsList[i].name });
	}
	const [data, setData] = useState({
		countryId: 1,
		country: 2,
		street: ""
	})

	const handleSubmit = event => {
		dispatch(secondStep(data));
		dispatch(
			activeDoteAction([
				{ id: 3, label: "About yourself and skills" },
				{ id: 3, type: "yourself" }
			])
		);
		event.preventDefault();
	};
	const removePage = event => {
		event.preventDefault();
		dispatch(
			activeDoteAction([
				{ id: 1, label: "Personal information" },
				{ id: 1, type: "photo" }
			])
		);
	};

	return (
		<div className="countryCard">
			<div className="country">
				<form className="country__form" onSubmit={handleSubmit}>
					<h2 className="country__title">Welcome {name}</h2>
					<p className="country__text">
						Complete your profile to join our global community of freelancers and start selling your services to our growing network of businesses.
					</p>
					<div className="country__content">
						<h5 className="country__subtitle">Living address</h5>
						<div className="country__wrapper">
							<div className="country__info">
								<Select classNamePrefix="mySelect" options={options} placeholder="Country*" onChange={choice => setUserChoice(choice.value)} />
							</div>
							<div className="country__info">
								<Select
									classNamePrefix="mySelect"
									options={optionsRegion}
									placeholder="Region*"
									onChange={choice => setUserChoice2(choice.value)}
								/>
							</div>
						</div>
						<input onChange={e => setData(e.target.value)} className="country__inputStreet" type="text" placeholder="Street, apartment" />
					</div>
					<div className="country__button">
						<button className="country__back" type="button" onClick={removePage}>
							Back
						</button>
						<button className="country__next" type="submit">
							Next
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Country
