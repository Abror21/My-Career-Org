import { useEffect, useState } from "react";
import "../photo/Photo.scss";
import { useDispatch, useSelector } from "react-redux";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { COUNTRIES_LIST } from "src/api/URLS";
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
	const [countryDefaultValue, setCountryDefaultValue] = useState(null);
	const [regionDefaultValue, setRegionDefaultValue] = useState(null);

	const dispatch = useDispatch();
	const { name: fName, country: fCountry, region: fRegion, street: fStreet } = useSelector(state => state.freelancerResume);

	useEffect(() => {
		fetch(COUNTRIES_LIST)
			.then(res => res.json())
			.then(data => setCountriesList(data))
	}, [])
	useEffect(() => {
		if (countryId) {
			fetch(`${COUNTRIES_LIST}/${countryId}`)
				.then(res => res.json())
				.then(data => setRegionsList(data.regions))
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
		inputReset: countryInputReset,
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

	useEffect(() => {
		if (fCountry && fCountry.trim().length > 0) {
			setCountryDefaultValue({ value: fCountry, label: fCountry })
			countryInputChange(fCountry)
		}
		if (fRegion && fRegion.trim().length > 0) {
			setRegionDefaultValue({ value: fRegion, label: fRegion })
			regionInputChange(fRegion)
		}
		streetInputChange(fStreet)
	}, [])

	const handleSubmit = e => {
		e.preventDefault();
		countryInputTouch();
		regionInputTouch();
		if (countryIsValid && regionIsValid) {
			const freelancerAddress = { country, region, street };
			toast.success('Success', { position: toast.POSITION.TOP_LEFT })
			dispatch(addFreelancerAddress(freelancerAddress))
			dispatch(activeDoteAction([
				{ id: 3, label: "About yourself and skills" },
				{ id: 3, type: "yourself" }
			]));
		}
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
		setCountryId(e.value[0]);
		setCountryDefaultValue({ value: e.label, label: e.label })
		setRegionDefaultValue(null);
	}
	const regionHandleChange = (e) => {
		regionInputChange(e.label);
		setRegionDefaultValue({ value: e.label, label: e.label })
	}
	return (
		<div className="countryCard">
			<div className="country">
				<form className="country__form" onSubmit={handleSubmit}>
					<h2 className="country__title">Welcome {fName}</h2>
					<p className="country__text">
						Complete your profile to join our global community of freelancers and start selling your services to our growing network of businesses.
					</p>
					<div className="country__content">
						<h5 className="country__subtitle">Living address</h5>
						<div className="country__wrapper">
							<div className="country__info">
								<SelectInput
									placeholder={`Country*`}
									options={options}
									value={countryDefaultValue}
									defaultValue={countryDefaultValue}
									selectIsError={countryIsError}
									errorMessage="Field should not be empty"
									selectChange={countryHandleChange}
									selectBlur={countryInputBlur}
								/>
							</div>
							<div className="country__info">
								<SelectInput
									placeholder="Region*"
									options={optionsRegion}
									value={regionDefaultValue}
									defaultValue={regionDefaultValue}
									selectIsError={regionIsError}
									errorMessage="Field should not be empty"
									selectChange={regionHandleChange}
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