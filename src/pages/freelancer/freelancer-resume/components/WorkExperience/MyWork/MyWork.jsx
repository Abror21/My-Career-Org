import React, { useState, useEffect } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import Input from "src/components/Input";
import { useInput } from "src/hooks";
import Textarea from "src/components/Textarea";
import OutlinedButton from "src/components/outlined-button";
import { addFreelancerExperience } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";


function MyWork({ removeModal, data }) {

    const dispatch = useDispatch();

    const [currentlyWorking, setCurrentlyWorking] = useState(data?.dateTo === null ? true : false);

    const changePage = () => {
        removeModal(false);
    };

    const {
        inputChange: nameInputChange,
        inputBlur: nameInputBlur,
        inputTouch: nameInputTouch,
        value: companyName,
        inputIsValid: nameIsValid,
        inputIsError: nameIsError
    } = useInput(value => value?.trim().length > 0);
    const {
        inputChange: jobInputChange,
        inputBlur: jobInputBlur,
        inputTouch: jobInputTouch,
        value: jobName,
        inputIsValid: jobIsValid,
        inputIsError: jobIsError
    } = useInput(value => value?.trim().length > 0);
    const {
        inputChange: dateFromInputChange,
        inputBlur: dateFromInputBlur,
        inputTouch: dateFromInputTouch,
        value: dateFromValue,
        inputIsValid: dateFromIsValid,
        inputIsError: dateFromIsError
    } = useInput(value => value?.trim().length > 9);
    const {
        inputChange: dateToInputChange,
        inputBlur: dateToInputBlur,
        inputTouch: dateToInputTouch,
        value: dateToValue,
        inputIsValid: dateToIsValid,
        inputIsError: dateToIsError
    } = useInput(value => value?.trim().length > 9);
    const {
        inputChange: textareaInputChange,
        inputBlur: textareaInputBlur,
        inputTouch: textareaInputTouch,
        value: textareaValue,
        inputIsValid: textareaIsValid,
        inputIsError: textareaIsError
    } = useInput(value => value?.trim().length > 10);

    useEffect(() => {
        if (data) {
            nameInputChange(data.companyName);
            jobInputChange(data.jobName);
            dateFromInputChange(data.dateFrom)
            dateToInputChange(data.dateTo)
            textareaInputChange(data.description)
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        nameInputTouch();
        jobInputTouch();
        dateFromInputTouch();
        dateToInputTouch();
        textareaInputTouch();

        const checkWorking = currentlyWorking || dateToIsValid;

        if (nameIsValid && jobIsValid && dateFromIsValid && checkWorking && textareaIsValid) {
            let isStillWorking = currentlyWorking ? null : dateToValue;
            const experience = {
                id: data ? data.id : Date.now(),
                companyName,
                jobName,
                dateFrom: dateFromValue,
                dateTo: isStillWorking,
                description: textareaValue
            }
            dispatch(addFreelancerExperience(experience));
            removeModal(false);
            toast.success('Successful step', { position: toast.POSITION.TOP_LEFT })
        }
    }
    return (
        <div className="mywork">
            <div className="mywork__inner">
                <form className="mywork__form" onSubmit={handleSubmit}>
                    <h2 className="mywork__text">Work experience</h2>
                    <Input
                        type="text"
                        placeholder="Company name"
                        inputIsError={nameIsError}
                        value={companyName}
                        inputChange={nameInputChange}
                        inputBlur={nameInputBlur}
                        errorMessage="Please enter company name"
                    />
                    <Input
                        type="text"
                        placeholder="Job"
                        inputIsError={jobIsError}
                        value={jobName}
                        inputChange={jobInputChange}
                        inputBlur={jobInputBlur}
                        errorMessage="Please enter job name"
                    />
                    <div className="mywork__checkbox">
                        <input
                            className="mywork__inputCheckbox"
                            type="checkbox"
                            id="checkbox"
                            checked={currentlyWorking}
                            onChange={() => setCurrentlyWorking(prev => !prev)}
                        />
                        <label className="mywork__labelCheckbox" htmlFor="checkbox">
                            I am currently working in this role
                        </label>
                    </div>
                    <div className="mywork__wrapper">
                        <Input
                            type="date"
                            label="Date from"
                            inputIsError={dateFromIsError}
                            value={dateFromValue}
                            inputChange={dateFromInputChange}
                            inputBlur={dateFromInputBlur}
                        />
                        <Input
                            type="date"
                            label="To"
                            inputIsError={currentlyWorking ? '' : dateToIsError}
                            value={dateToValue}
                            disabled={currentlyWorking}
                            inputChange={dateToInputChange}
                            inputBlur={dateToInputBlur}
                        />
                    </div>
                    <Textarea
                        placeholder="Description"
                        inputIsError={textareaIsError}
                        value={textareaValue}
                        inputChange={textareaInputChange}
                        inputBlur={textareaInputBlur}
                        errorMessage="Please describe yourself."
                    />
                    <div className="mywork__button">
                        <button type="button" className="mywork__back" onClick={changePage}>Cancel</button>
                        <OutlinedButton type="submit" title="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MyWork;
