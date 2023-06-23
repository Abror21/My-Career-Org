import React, { useEffect } from "react";
import classes from "./Language.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "react-select";
import "../styles.scss";
import cancel from "src/assets/images/Resume/cancel.png";
import { languageUpload, languages } from "src/store/extraReducers";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { addFreelancerLanguages } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";
import { Lego } from "tabler-icons-react";


function Language() {
	const dispatch = useDispatch();
	const languageList = useSelector(state => state.resume.languageList);
	// const [data,setData] = useState({LanguageId: null, lavel:"",})
	// const [userLang, setUserLang] = useState([]);
	const [userLevel, setUserLevel] = useState([]);
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

	const removeLang = id => {
		setUserLanguages(prev => prev.filter(lang => lang.id !== id));
	};

	const prevPage = () => {
		dispatch(
			activeDoteAction([
				{ id: 3, label: "yourself" },
				{ id: 3, type: "About yourself and skills" }
			])
		);
	};

	const changeValue = (id, language, level, langOrLevel, value) => {
		const idx = userLanguages.findIndex(el => el.id === id);
		if (idx === -1) {
			const newLanguage = { id, language, level };
			setUserLanguages(prev => [...prev, newLanguage]);
		} else {
			const currentLang = userLanguages[idx];
			currentLang[langOrLevel] = value;
			userLanguages[idx] = currentLang;
			setUserLanguages([...userLanguages]);
		}
	}

	const changeLanguage = (id, language) => {
		changeValue(id, language, '', 'language', language)
	}

	const changeLevel = (id, level) => {
		changeValue(id, '', level, 'level', level)
	}

	const handleSubmit = event => {
		event.preventDefault();

		if (userLanguages.length < 1) {
			toast.error('Please add at least one language.');
			return
		}
		let error = false;
		const newList = [];
		userLanguages.forEach(lang => {
			if (lang.language && lang.level) {
				newList.push(lang)
			} else {
				toast.error('Field should not be empty.');
				error = true
				return
			}
		});
		if (error) { return }
		if (newList.length > 0) {
			toast.success('Success', { position: toast.POSITION.TOP_LEFT })
			dispatch(addFreelancerLanguages(newList));
			dispatch(
				activeDoteAction([
					{ id: 5, label: "Experience" },
					{ id: 5, type: "workexperience" }
				])
			);
		} else {
			toast.error("Something went wrong.")
		}
	}


	return (
		<div className={classes.languageCard}>
			<h2>Write what languages you speak</h2>
			<p>
				The more languages you know, <br /> the more foreign employers will contact you.
			</p>
			<form className={classes.languageForm} onSubmit={handleSubmit}>
				<label htmlFor="laguages">Language*</label>
				<div className={classes.select_box}>
					{
						userLanguages.map(lang => {
							return (
								<div key={lang.id} id={!singleLang ? "test" : null} className={`${classes.select} ${classes.active}`}>
									<Select
										className="languageSelect"
										options={languageList?.map(el => ({ value: el.id, label: el.name }))}
										placeholder="Language*"
										onChange={e => changeLanguage(lang.id, e.label)}
									/>
									<Select
										className="languageSelect"
										options={level}
										placeholder="Level*"
										onChange={e => changeLevel(lang.id, e.value)}
									/>
									{
										!singleLang && (
											<div className={classes.cancelLang} onClick={() => removeLang(lang.id)}>
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
					style={{ cursor: "pointer" }}
					className={classes.addLanguage}
					onClick={() => setUserLanguages(prev => [...prev, { id: Date.now() }])}>
					+ Add Language
				</div>
				<div className={classes.languageCard_btn}>
					<button className={classes.backButton} type="button" onClick={prevPage}>
						Back
					</button>
					<button type="submit" className={classes.nextButton}>Next</button>
				</div>
			</form >
		</div >
	);
}

export default Language;
