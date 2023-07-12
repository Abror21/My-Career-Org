import { useEffect } from "react";
import classes from "./Language.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../styles.scss";
import { languageUpload, languages } from "src/store/extraReducers";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import { toast } from "react-toastify";
import { Lego } from "tabler-icons-react";
import WhiteButton from "src/components/white-button";
import OutlinedButton from "src/components/outlined-button";
import axios from "axios";
import { FREELANCER_LANGUAGE } from "src/api/URLS";
import LanguageWrapper from "./components/LanguageWrapper";


function Language() {
	const dispatch = useDispatch();
	const languageList = useSelector(state => state.resume.languageList);
	const [userLanguages, setUserLanguages] = useState([]);

	useEffect(() => {
		dispatch(languages());
		getLanguageList()
	}, [])

	const getLanguageList = () => {
		axios.get(FREELANCER_LANGUAGE, { headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` } })
			.then(res => setUserLanguages([...res.data.map(lang => {
				return { tempId: lang.id, languageId: lang.languageId, levelId: lang.level }
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

	const removeEmptyLang = (tempId) => {
		setUserLanguages(userLanguages.filter(lang => lang.tempId !== tempId))
	}

	const changeValue = (tempId, id, levelId) => {
		console.log(tempId, id, levelId);
		const idx = userLanguages.findIndex(el => el.tempId === tempId);

		const newElement = { ...userLanguages[idx] };
		if (newElement.languageId && newElement.levelId) {
			if (id) {
				newElement.languageId = id;
			}
			if (levelId || levelId === 0) {
				newElement.levelId = levelId;
			}
			axios.put(
				axios.post(
					`${FREELANCER_LANGUAGE}/${tempId}`,
					{ languageId: newElement.languageId, level: newElement.levelId },
					{ headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` } }
				)
					.then(res => {
						if (res.status === 200) {
							getLanguageList();
						} else {
							toast.error('Something went wrong')
						}
					})
					.catch(err => toast.error(err.message))
			)
		}
		console.log('test ', newElement);
		if (id) {
			newElement.languageId = id;
		}
		if (levelId || levelId === 0) {
			newElement.levelId = levelId;
		}
		// if (newElement.languageId && (newElement.levelId || newElement.levelId == 0)) {
		// 	axios.post(
		// 		FREELANCER_LANGUAGE,
		// 		{ languageId: newElement.languageId, level: newElement.levelId },
		// 		{ headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` } }
		// 	)
		// 		.then(res => {
		// 			if (res.status === 200) {
		// 				getLanguageList();
		// 			} else {
		// 				toast.error('Something went wrong')
		// 			}
		// 		})
		// 		.catch(err => toast.error(err.message))
		// }
		// userLanguages[idx] = newElement;
		// setUserLanguages([...userLanguages]);
		// console.log('test ', newElement);
	}

	const changeLanguage = (e) => {
		changeValue(e.tempId, e.id, null);
	}
	const changeLevel = (e) => {
		changeValue(e.tempId, null, e.levelId);
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
						throw new Error("Field should not be empty")
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
								<LanguageWrapper
									key={lang.tempId}
									languageList={languageList}
									userLanguages={userLanguages}
									lang={lang}
									singleLang={singleLang}
									changeLanguage={changeLanguage}
									changeLevel={changeLevel}
									deleteLanguage={getLanguageList}
									removeEmptyLang={removeEmptyLang}
								/>
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