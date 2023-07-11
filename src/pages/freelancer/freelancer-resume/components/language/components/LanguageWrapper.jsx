import { useEffect, useState } from 'react';
import SelectInput from 'src/components/select-input';
import classes from './LanguageWrapper.module.css';
import cancel from "src/assets/images/Resume/cancel.png";
import axios from 'axios';
import { FREELANCER_LANGUAGE } from 'src/api/URLS';
import { toast } from 'react-toastify';

let levelList = [
    { levelId: 0, value: "A1 - Beginner", label: "A1 - Beginner" },
    { levelId: 1, value: "A2 - Elementary", label: "A2 - Elementary" },
    { levelId: 2, value: "B1 - Intermediate", label: "B1 - Intermediate" },
    { levelId: 3, value: "B2 - Upper-Intermediate", label: "B2 - Upper-Intermediate" }
];

const LanguageWrapper = ({ languageList, userLanguages, lang, singleLang, changeLanguage, changeLevel, deleteLanguage, removeEmptyLang }) => {
    const [defaultLanguage, setDefaultLanguage] = useState(null);
    const [defaultLevel, setDefaultLevel] = useState(null);

    useEffect(() => {
        if (languageList.length > 0 && lang.languageId) {
            setDefaultLanguage({ tempId: lang.tempId, value: languageList[lang.languageId - 1].name, label: languageList[lang.languageId - 1].name });
            setDefaultLevel({ levelId: lang.levelId, value: levelList[lang.levelId].value, label: levelList[lang.levelId].value });
        }
    }, [])

    const removeLang = tempId => {
        if (lang.languageId) {
            axios.delete(`${FREELANCER_LANGUAGE}/${tempId}`)
                .then(res => {
                    if (res.status === 200) {
                        deleteLanguage();
                    }
                })
        } else {
            removeEmptyLang(tempId)
        }
    };

    const handleChangeLang = (e) => {
        const checkLang = userLanguages.some(el => el.languageId === e.id);
        if (checkLang) {
            toast.warning('This language already exists')
            return;
        }
        setDefaultLanguage({ value: e.value, label: e.value })
        changeLanguage(e);
    }
    const handleChangeLevel = (e) => {
        setDefaultLevel({ value: e.value, label: e.value })
        changeLevel(e)
    }
    return (
        <div id={!singleLang ? "" : null} className={`${classes.select}`}>
            <SelectInput
                placeholder="Language*"
                options={languageList?.map(el => ({ tempId: lang.tempId, id: el.id, value: el.name, label: el.name }))}
                value={defaultLanguage}
                defaultValue={defaultLanguage}
                selectChange={handleChangeLang}
            />
            <SelectInput
                placeholder="Level*"
                options={levelList.map(level => ({ tempId: lang.tempId, levelId: level.levelId, value: level.value, label: level.value }))}
                value={defaultLevel}
                defaultValue={defaultLevel}
                selectChange={handleChangeLevel}
            />
            {
                !singleLang && (
                    <div className={classes.cancelLang} onClick={e => removeLang(lang.tempId)}>
                        <img src={cancel} alt="cancel" />
                    </div>
                )
            }
        </div>
    )
}

export default LanguageWrapper