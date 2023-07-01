import { useEffect, useState } from "react";
import "../photo/Photo.scss";
import { useDispatch, useSelector } from "react-redux";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { COUNTRIES_LIST, REGIONS_LIST } from "src/api/URLS";
import { addFreelancerAddress } from "src/store/freelancer-resume/freelancerResume";
import './Country.css';
import { toast } from "react-toastify";
import SelectInput from "src/components/select-input";
import { useInput } from "src/hooks";
import Input from "src/components/Input";
import WhiteButton from "src/components/white-button";
import OutlinedButton from "src/components/outlined-button";

function Country() {
	const [countriesList, setCountriesList] = useState([]);
	const [regionsList, setRegionsList] = useState([]);
	const [countryId, setCountryId] = useState(null);
	const dispatch = useDispatch();
	const freelancerName = useSelector(state => state.freelancerResume.name);

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
		regionInputReset()
	}, [countryId]);


	let options = [];

	let optionsRegion = [];
	for (let i = 0; i < countriesList?.length; i++) {
		options.push({ value: [countriesList[i].id, countriesList.indexOf(countriesList[i])], label: countriesList[i].name });
	}
	for (let i = 0; i < regionsList?.length; i++) {
		optionsRegion.push({ value: [regionsList[i].id, regionsList.indexOf(regionsList[i])], label: regionsList[i].name });
	}

	const {
		inputChange: countryInputChange,
		inputBlur: countryInputBlur,
		inputTouch: countryInputTouch,
		value: country,
		inputIsValid: countryIsValid,
		inputIsError: countryIsError,
	} = useInput(value => value.trim().length > 0);
	const {
		inputChange: regionInputChange,
		inputBlur: regionInputBlur,
		inputTouch: regionInputTouch,
		inputReset: regionInputReset,
		value: region,
		inputIsValid: regionIsValid,
		inputIsError: regionIsError,
	} = useInput(value => value.trim().length > 0);
	const {
		inputChange: streetInputChange,
		value: street,
	} = useInput();

	const handleSubmit = e => {
		e.preventDefault();
		countryInputTouch();
		regionInputTouch();
		// if (countryIsValid && regionIsValid) {
		// 	const freelancerAddress = { country, region, street };
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
		countryInputChange(e.label);
		setCountryId(e.value[0])
	}

	return (
		<div className="countryCard">
			<div className="country">
				<form className="country__form" onSubmit={handleSubmit}>
					<h2 className="country__title">Welcome {freelancerName}</h2>
					<p className="country__text">
						Complete your profile to join our global community of freelancers and start selling your services to our growing network of businesses.
					</p>
					<div className="country__content">
						<h5 className="country__subtitle">Living address</h5>
						<div className="country__wrapper">
							<div className="country__info">
								<SelectInput
									placeholder="Country*"
									options={options}
									value={country}
									selectIsError={countryIsError}
									errorMessage="Field should not be empty"
									selectChange={countryHandleChange}
									selectBlur={countryInputBlur}
								/>
							</div>
							<div className="country__info">
								<SelectInput
									value={region}
									placeholder="Region*"
									options={optionsRegion}
									selectIsError={regionIsError}
									errorMessage="Field should not be empty"
									selectChange={e => regionInputChange(e.label)}
									selectBlur={regionInputBlur}
								/>
							</div>
						</div>
						<Input
							type="text"
							placeholder="Street, apartment"
							value={street}
							inputChange={streetInputChange}
						/>
					</div>
					<div className="country__button">
						<WhiteButton
							type="button"
							title="Back"
							onClick={removePage}
						/>
						<OutlinedButton
							type="submit"
							title="Next"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Country