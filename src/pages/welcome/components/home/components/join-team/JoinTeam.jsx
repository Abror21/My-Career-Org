import React from "react";
import business4 from "src/assets/images/page4.png";
import classes from "./JoinTeam.module.scss";
import telegram from "src/assets/icons/icon1.png";
import facebook from "src/assets/icons/icon2.png";
import instagram from "src/assets/icons/icon3.png";
import { useTranslation } from "react-i18next";

function JoinTeam() {

	const { t } = useTranslation();

	return (
		<div className={classes.page4Box}>
			<div className="container">
				<div className={classes.page4Box__container}>
					<div className={classes.page4Box__inner}>
						<div className={classes.businessIcons}>
							<div className={classes.page4BoxBigImg}>
								<img src={business4} alt="business environment" />
							</div>
							<div className={classes.icons}>
								<img src={telegram} alt="telegram icon" />
								<img src={facebook} alt="facebook icon" />
								<img src={instagram} alt="instagram icon" />
							</div>
						</div>
						<div className={classes.thousandWorkers}>
							<h2>{t('thousands')}!!!</h2>
							<p>{t('thousandsOfWorkersAndEmployersAAWFY')}</p>
							<button type="submit">Join our team right now</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JoinTeam;
