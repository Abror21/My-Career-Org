import { useEffect, useState } from "react";
import "../photo/Photo.scss";
import { useDispatch, useSelector } from "react-redux";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { addFreelancerAddress } from "src/store/freelancer-resume/freelancerResume";
import './Country.css';
import { toast } from "react-toastify";
import SelectInput from "src/components/select-input";
import { useInput } from "src/hooks";
import Input from "src/components/Input";
import WhiteButton from "src/components/white-button";
import OutlinedButton from "src/components/outlined-button";
import { API } from "src/services/api";
import { getCountiesList } from "src/store/freelancer-back-data/freelancerBackData";

const findRegion = (arr, id) => {
	return arr.find(el => el.id === id).name;
}

function Country() {
	const [regionsList, setRegionsList] = useState([]);
	const [countryId, setCountryId] = useState(null);
	const [countryDefaultValue, setCountryDefaultValue] = useState(null);
	const [regionDefaultValue, setRegionDefaultValue] = useState(null);
	const [regionValueIsAvailable, setRegionValueIsAvailable] = useState(false);
	const dispatch = useDispatch();
	const { name: fName, country: fCountry, region: fRegion, street: fStreet } = useSelector(state => state.freelancerResume);
	const { countriesList } = useSelector(state => state.freelancerBackData);

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
	} = useInput(value => (value > 0 || value === 0));
	const {
		inputChange: regionInputChange,
		inputBlur: regionInputBlur,
		inputTouch: regionInputTouch,
		inputReset: regionInputReset,
		value: region,
		inputIsValid: regionIsValid,
		inputIsError: regionIsError,
	} = useInput(value => (value > 0 || value === 0));
	const {
		inputChange: streetInputChange,
		inputBlur: streetInputBlur,
		inputTouch: streetInputTouch,
		value: street,
		inputIsValid: streetIsValid,
		inputIsError: streetIsError
	} = useInput(value => value?.trim().length > 0);

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
		countryInputChange(e.value[0]);
		setCountryId(e.value[0]);
		setCountryDefaultValue({ value: e.label, label: e.label })
		setRegionDefaultValue(null);
	}
	const regionHandleChange = (e) => {
		regionInputChange(e.value[0]);
		setRegionDefaultValue({ value: e.label, label: e.label })
	}

	const handleSubmit = e => {
		e.preventDefault();
		countryInputTouch();
		regionInputTouch();
		streetInputTouch();
		if (countryIsValid && regionIsValid && streetIsValid) {
			const freelancerAddress = { country, region, street };
			toast.success('Successful step', { position: toast.POSITION.TOP_LEFT })
			dispatch(addFreelancerAddress(freelancerAddress))
			dispatch(activeDoteAction([
				{ id: 3, label: "About yourself and skills" },
				{ id: 3, type: "yourself" }
			]));
		}
	};

	useEffect(() => {
		dispatch(getCountiesList())
	}, [])
	useEffect(() => {
		if (countryId) {
			API.getRegonsList(countryId)
				.then(res => {
					setRegionsList(res.data.regions)
					if (regionDefaultValue === null && fRegion && regionValueIsAvailable) {
						setRegionDefaultValue({ value: findRegion(res.data.regions, fRegion), label: findRegion(res.data.regions, fRegion) })
						setRegionValueIsAvailable(false)
					}
				})
		}
		regionInputReset();
	}, [countryId, countriesList]);
	useEffect(() => {
		if (countriesList.length > 0 && fCountry) {
			setCountryDefaultValue({ value: countriesList[fCountry - 1]?.name, label: countriesList[fCountry - 1]?.name })
			setRegionValueIsAvailable(true);
			setCountryId(countriesList[fCountry - 1]?.id);
			countryInputChange(fCountry);
		}
		streetInputChange(fStreet);
	}, [countriesList]);

	useEffect(() => {
		if (regionsList.length > 0) {
			regionInputChange(fRegion);
		}
	}, [regionsList])

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
							inputBlur={streetInputBlur}
							inputIsError={streetIsError}
							errorMessage="Field should not be empty"
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