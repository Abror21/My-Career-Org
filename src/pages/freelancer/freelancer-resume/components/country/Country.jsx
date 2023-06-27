import { useEffect, useState, useRef } from "react";
import "../photo/Photo.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { secondStep } from "src/store/frilanserCardSlice/frilanserCardSlice";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { countryUpload, hobbies, positions, getFreelancer, getCountryList, getRegionsList } from "src/store/extraReducers";
import { COUNTRIES_LIST, REGIONS_LIST } from "src/api/URLS";
import { addFreelancerAddress } from "src/store/freelancer-resume/freelancerResume";
import './Country.css';
import { toast } from "react-toastify";

function Country() {
	const [countriesList, setCountriesList] = useState([]);
	const [regionsList, setRegionsList] = useState([]);
	const [countryId, setCountryId] = useState(null);
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');
	const [street, setStreet] = useState('');
	const [countryIsError, setCountryIsError] = useState(false);
	const [regionIsError, setRegionIsError] = useState(false);

	const dispatch = useDispatch();
	const name = useSelector(state => state.freelancerResume.name);

	useEffect(() => {
		fetch(COUNTRIES_LIST)
			.then(res => res.json())
			.then(data => setCountriesList(data))
	}, [])
	useEffect(() => {
		if (countryId) {
			fetch(`${REGIONS_LIST}?countryId=${countryId}`)
				.then(res => res.json())
				.then(data => setRegionsList(data))
		}
	}, [countryId])


	let options = [];

	let optionsRegion = [];
	for (let i = 0; i < countriesList?.length; i++) {
		options.push({ value: [countriesList[i].id, countriesList.indexOf(countriesList[i])], label: countriesList[i].name });
	}
	for (let i = 0; i < regionsList?.length; i++) {
		optionsRegion.push({ value: [regionsList[i].id, regionsList.indexOf(regionsList[i])], label: regionsList[i].name });
	}

	const handleSubmit = e => {
		e.preventDefault();
		// setCountryIsError(false);
		// setRegionIsError(false);
		// if (!country) {
		// 	setCountryIsError(true);
		// }
		// if (!region) {
		// 	setRegionIsError(true);
		// }
		// if (country && region) {
		// 	const freelancerAddress = {
		// 		country,
		// 		region,
		// 		street
		// 	}
		// 	toast.success('Success', { position: toast.POSITION.TOP_LEFT })
		// 	dispatch(addFreelancerAddress(freelancerAddress))
		dispatch(activeDoteAction([
			{ id: 3, label: "About yourself and skills" },
			{ id: 3, type: "yourself" }
		]));
		// }
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

	const countryHandleChange = (e) => {
		setCountryId(e.value[0])
		setCountry(e.label);
	}
	const regionHandleChange = (e) => {
		setRegion(e.label);
	}

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
								<Select
									className={`${(countryIsError && !country) ? 'error' : ''}`}
									classNamePrefix=""
									options={options}
									placeholder="Country*"
									onChange={countryHandleChange}
								/>
							</div>
							<div className="country__info">
								<Select
									className={`${(regionIsError && !region) ? 'error' : ''}`}
									options={optionsRegion}
									placeholder="Region*"
									onChange={regionHandleChange}
								/>
							</div>
						</div>
						<input onChange={e => setStreet(e.target.value)} className="country__inputStreet" type="text" placeholder="Street, apartment" />
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
