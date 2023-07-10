import { useEffect } from "react";
import classes from "./Language.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../styles.scss";
import cancel from "src/assets/images/Resume/cancel.png";
import { languageUpload, languages } from "src/store/extraReducers";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
// import { addFreelancerLanguages } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";
import { Lego } from "tabler-icons-react";
import SelectInput from "src/components/select-input";
import WhiteButton from "src/components/white-button";
import OutlinedButton from "src/components/outlined-button";
import axios from "axios";
import { FREELANCER_LANGUAGE } from "src/api/URLS";


function Language() {
	const dispatch = useDispatch();
	const languageList = useSelector(state => state.resume.languageList);
	const [userLanguages, setUserLanguages] = useState([]);

	let level = [
		{ value: "A1 - Beginner", label: "A1 - Beginner" },
		{ value: "A2 - Elementary", label: "A2 - Elementary" },
		{ value: "B1 - Intermediate", label: "B1 - Intermediate" },
		{ value: "B2 - Upper-Intermediate", label: "B2 - Upper-Intermediate" }
	];

	useEffect(() => {
		dispatch(languages())
	}, [])

	let singleLang = true;
	if (userLanguages.length > 1) {
		singleLang = false;
	}

	const removeLang = tempId => {
		setUserLanguages(prev => prev.filter(lang => lang.tempId !== tempId));
	};

	const prevPage = () => {
		dispatch(
			activeDoteAction([
				{ id: 3, label: "yourself" },
				{ id: 3, type: "About yourself and skills" }
			])
		);
	};

	const changeValue = (tempId, id, level) => {
		const idx = userLanguages.findIndex(el => el.tempId === tempId);
		if (id) {
			userLanguages[idx] = { ...userLanguages[idx], languageId: id };
		}
		if (level) {
			userLanguages[idx] = { ...userLanguages[idx], level };
		}
		const element = userLanguages[idx];
		if (element.languageId && element.level) {
			fetch(FREELANCER_LANGUAGE, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage['user-token']}`
				}
			})
				.then(res => console.log(res))
				.catch(err => alert(err.message))
			// axios.post(FREELANCER_LANGUAGE,
			// 	{ languageId: element.languageId, level: element.level },
			// 	{ headers: { Authorization: `Bearer ${localStorage['user-token']}` } }
			// )
			// 	.then(res => console.log(res))
			// 	.catch(err => console.log('axios ', err.message))
		}
		setUserLanguages([...userLanguages]);
	}

	const changeLanguage = (tempId, id) => {
		changeValue(tempId, id, null)
	}

	const changeLevel = (tempId, level) => {
		changeValue(tempId, null, level)
	}

	const handleSubmit = event => {
		event.preventDefault();
		if (userLanguages.length < 1) {
			toast.error('Please add at least one language.');
			return;
		}
		const newList = [];
		try {
			userLanguages.forEach(lang => {
				if (lang.languageId && lang.level) {
					newList.push(lang);
				} else {
					throw new Error("Field should not be empty")
				}
			});
		} catch (err) {
			toast.error(err.message);
			return;
		}
		if (newList.length > 0) {
			toast.success('Success', { position: toast.POSITION.TOP_LEFT });
			// dispatch(addFreelancerLanguages(newList));
			dispatch(
				activeDoteAction([
					{ id: 5, label: "Experience" },
					{ id: 5, type: "workexperience" }
				])
			);
		} else {
			toast.error("Something went wrong.");
		}
	}

	return (
		<div className={classes.languageCard}>
			<h2>Write what languages you speak</h2>
			<p>
				The more languages you know, <br /> the more foreign employers will contact you.
			</p>
			<form className={classes.languageForm} onSubmit={handleSubmit}>
				<p className={classes.languageForm__label}>Language*</p>
				<div className={classes.select_box}>
					{
						userLanguages.map(lang => {
							return (
								<div key={lang.tempId} id={!singleLang ? "test" : null} className={`${classes.select} ${classes.active}`}>
									<SelectInput
										placeholder="Language*"
										options={languageList?.map(el => ({ id: el.id, value: el.name, label: el.name }))}
										value={true}
										selectChange={e => changeLanguage(lang.tempId, e.id)}
									/>
									<SelectInput
										placeholder="Level*"
										options={level}
										value={true}
										selectChange={e => changeLevel(lang.tempId, e.label)}
									/>

									{
										!singleLang && (
											<div className={classes.cancelLang} onClick={() => removeLang(lang.tempId)}>
												<img src={cancel} alt="cancel" />
											</div>
										)
									}
								</div>
							)
						})
					}
				</div>

				<div
					className={classes.addLanguage}
					onClick={() => setUserLanguages(prev => [...prev, { tempId: Date.now() }])}>
					+ Add Language
				</div>
				<div className={classes.languageCard_btn}>
					<WhiteButton type="button" title="Back" onClick={prevPage} />
					<OutlinedButton type="submit" title="Next" />
				</div>
			</form>
		</div >
	);
}

export default Language;