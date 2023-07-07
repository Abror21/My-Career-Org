import React, { useState } from "react";
import downIcon from "src/assets/images/Resume/down.png";
import classes from "./SocialMedia.module.scss";
import telgramIcon from "src/assets/images/Resume/telegramIcon.png";
import whatsUppIcon from "src/assets/images/Resume/whatsUppIcon.png";
import twitterIcon from "src/assets/images/Resume/twitterIcon.png";
import facebookIcon from "src/assets/images/Resume/faceBookIcon.png";
import instagramIcon from "src/assets/images/Resume/instagramIcon.png";
import githubIcon from "src/assets/images/Resume/githubIcon.png";
import cancel from "src/assets/images/Resume/cancel.png";
import { useDispatch } from "react-redux";
import { activeDoteAction } from "src/store/resumeControlsSlice/resumeControls";
import OutlinedButton from "src/components/outlined-button";
import WhiteButton from "src/components/white-button";
import { addContact } from "src/store/freelancer-resume/freelancerResume";
import { toast } from "react-toastify";

function SocialMedia() {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		website: "",
		WatsApp: "",
		Facebook: "",
		Instagram: "",
		Telegram: "",
		GitHub: "",
		Twitter: ""
	});

	const [icons, setIcons] = useState([]);
	const [socials, setSocials] = useState([
		{ icon: whatsUppIcon, name: "WatsApp" },
		{ icon: facebookIcon, name: "Facebook" },
		{ icon: instagramIcon, name: "Instagram" },
		{ icon: telgramIcon, name: "Telegram" },
		{ icon: githubIcon, name: "GitHub" },
		{ icon: twitterIcon, name: "Twitter" }
	]);

	const addInputContact = (i, n) => {
		setIcons([...icons, { icon: i, name: n }]);
		let filteredSocial = [];
		for (let i = 0; i < socials.length; i++) {
			if (socials[i].name !== n) {
				filteredSocial.push(socials[i]);
			}
		}
		setSocials(filteredSocial);
	};

	const removeIput = (name, icon) => {
		let filteredIcons = [];
		const newData = { ...data };
		newData[name] = '';
		setData({ ...newData });
		for (let i = 0; i < icons.length; i++) {
			if (icons[i].name !== name) {
				filteredIcons.push(icons[i]);
			}
		}
		setIcons(filteredIcons);
		setSocials([...socials, { icon: icon, name: name }]);
	};
	const handleChangeInput = ({ value, label }) => {
		setData(prev => ({ ...prev, [label]: value }));
	};
	const handleSubmit = event => {
		event.preventDefault();
		dispatch(addContact(data));
		dispatch(activeDoteAction([{ id: 8, label: "Resume" }, { id: 8, type: "resume" }]));
		for (const key in data) {
			if (data[key].trim().length > 0) {
				toast.success('Success', { position: toast.POSITION.TOP_LEFT });
				break;
			}
		}
	};

	const prevPgae = event => {
		event.preventDefault();
		dispatch(activeDoteAction([{ id: 6, label: "Educations" }, { id: 6, type: "education" }]));
	};

	return (
		<div className={classes.socialMedia}>
			<h2>Contacts</h2>
			<form action="submit" className={classes.socialForm} onSubmit={handleSubmit}>
				<div className={classes.forim_content}>
					<input
						className={classes.website_input}
						type="text"
						placeholder="Provide a link to your website"
						value={data.website}
						onChange={e => setData(prev => ({ ...prev, website: e.target.value }))}
					/>
					{
						icons &&
						icons.map(item => (
							<div key={item.name} className={classes.socialInput}>
								<div className={classes.socialInputIn}>
									<input
										type="url"
										placeholder={`Provide a link to your ${item.name} account`}
										value={data[item.name]}
										onChange={e => handleChangeInput({ value: e.target.value, label: item.name })}
										required
									/>
									<img className={classes.insideIconImage} src={item.icon} alt="Whats app icon" />
								</div>
								<button
									type="button"
									className={classes.cancelButton}
									onClick={event => removeIput(item.name, item.icon)}
								>
									<img className={classes.cancelButton_img} src={cancel} alt="cancel icon" />
								</button>
							</div>
						))
					}
					<p>Choose in which of these social networks you have an account</p>
					<div className={classes.socialContainers}>
						{
							socials.map(item => {
								return <div key={item.name} style={{ cursor: "pointer" }} className={classes.socialCard} onClick={() => addInputContact(item.icon, item.name)}>
									<img style={{ width: "40px" }} src={item.icon} alt={item.name} />
									<h4 className={classes.cart_text}>{item.name}</h4>
								</div>
							})
						}
					</div>
				</div>
				<div className={classes.button_group}>
					<WhiteButton type="button" title="Back" onClick={prevPgae} />
					<OutlinedButton type="submit" title="Next" />
				</div>
			</form>
		</div>
	);
}

export default SocialMedia;
