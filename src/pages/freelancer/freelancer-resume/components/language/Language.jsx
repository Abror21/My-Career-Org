import { useEffect } from "react";
import classes from "./Language.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../styles.scss";
import { languages } from "src/store/extraReducers";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { toast } from "react-toastify";
import WhiteButton from "src/components/white-button";
import OutlinedButton from "src/components/outlined-button";
import axios from "axios";
import { FREELANCER_LANGUAGE } from "src/services/URLS";
import LanguageWrapper from "./components/LanguageWrapper";
import { API } from "src/services/api";


function Language() {
	const dispatch = useDispatch();
	const languageList = useSelector(state => state.resume.languageList);
	const [userLanguages, setUserLanguages] = useState([]);

	const getLanguageList = () => {
		setUserLanguages([]);
		API.getFreelancerLanguages()
			.then(res => setUserLanguages([...res.data.map(lang => {
				return { id: lang.id, languageId: lang.languageId, levelId: lang.level }
			})]))
	}
	let singleLang = true;
	if (userLanguages.length > 1) {
		singleLang = false;
	}

	const prevPage = () => {
		dispatch(
			activeDoteAction([
				{ id: 3, label: "yourself" },
				{ id: 3, type: "About yourself and skills" }
			])
		);
	};

	const removeEmptyLang = (index) => {
		userLanguages.splice(index, 1)
		setUserLanguages([...userLanguages])
	}
	const changeValue = (index, id, levelId) => {
		const item = { ...userLanguages[index] };
		if (item.id || item.id == 0) {
			if (id || id == 0) {
				item.languageId = id;
			}
			if (levelId || levelId == 0) {
				item.levelId = levelId;
			}
			axios.put(
				`${FREELANCER_LANGUAGE}/${item.id}`,
				{ languageId: item.languageId, level: item.levelId },
				{ headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` } }
			)
				.then(res => {
					if (res.status === 200) {
						getLanguageList();
					} else {
						toast.error('Something went wrong');
					}
				})
				.catch(err => {
					getLanguageList();
					toast.error(err.message)
				})
		} else {
			if (id || id == 0) {
				item.languageId = id;
				userLanguages[index] = item;
				setUserLanguages([...userLanguages]);
			}
			if (levelId || levelId == 0) {
				item.levelId = levelId
				userLanguages[index] = item;
				setUserLanguages([...userLanguages]);
			}
			if ((item.languageId || item.item.languageId == 0) && (item.levelId || item.levelId == 0)) {
				API.postFreelancerLanguages({ languageId: item.languageId, level: item.levelId })
					.then(res => {
						if (res.status === 200) {
							getLanguageList();
						} else {
							toast.error('Something went wrong')
						}
					})
					.catch(err => {
						toast.error(err.message)
						getLanguageList();
					})
			}
		}
	}
	const changeLanguage = (e, index) => {
		changeValue(index, e.id, null);
	}
	const changeLevel = (e, index) => {
		changeValue(index, null, e.levelId);
	}

	const handleSubmit = event => {
		event.preventDefault();
		if (userLanguages.length < 1) {
			toast.error('Please add at least one language.');
			return;
		} else {
			try {
				userLanguages.forEach(lang => {
					if (!(lang.languageId && (lang.levelId || lang.levelId === 0))) {
						throw new Error("Field should not be empty");
					}
				});
				toast.success('Successful step', { position: toast.POSITION.TOP_LEFT });
				dispatch(
					activeDoteAction([
						{ id: 5, label: "Experience" },
						{ id: 5, type: "workexperience" }
					])
				);
			} catch (err) {
				toast.error(err.message);
			}
		}
	}

	useEffect(() => {
		dispatch(languages());
		getLanguageList()
	}, [])

	return (
		<div className={classes.languageCard}>
			<h2 className={classes.language__title}>Write what languages you speak</h2>
			<p>
				The more languages you know, <br /> the more foreign employers will contact you.
			</p>
			<form className={classes.languageForm} onSubmit={handleSubmit}>
				<p className={classes.languageForm__label}>Language*</p>
				<div className={classes.select_box}>
					{
						userLanguages.map((lang, index) => {
							return (
								<LanguageWrapper
									key={lang.id}
									index={index}
									languageList={languageList}
									userLanguages={userLanguages}
									lang={lang}
									singleLang={singleLang}
									changeLanguage={changeLanguage}
									changeLevel={changeLevel}
									getLanguageList={getLanguageList}
									removeEmptyLang={removeEmptyLang}
								/>
							)
						})
					}
				</div>

				<div
					className={classes.addLanguage}
					onClick={() => setUserLanguages(prev => [...prev, {}])}>
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