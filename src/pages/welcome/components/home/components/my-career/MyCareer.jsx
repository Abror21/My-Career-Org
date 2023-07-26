import React, { useEffect } from "react";
import classes from "./MyCareer.module.scss";
import career from "src/assets/images/career.png";
import searchIcon from "src/assets/images/searchIcon.png";
import googlePlay from "src/assets/images/googlePlay.png";
import apple from "src/assets/images/apple.png";
import { JOBS } from "src/services/URLS";
// import { useTranslation } from "react-i18next";

function MyCareer() {
	// const { t } = useTranslation();

	return (
		<div className={classes.careerBox}>
			<div className="container">
				<div className={classes.careerBox__wrapper}>
					<div className={classes.career}>
						<img src={career} alt="My career" />
						<div className={classes.power}>Powerful platform for your career</div>
					</div>
					<form action="submit">
						<p>Find your dream jobs in our powerful career company.</p>
						<div className={classes.myCareerSearch}>
							<input type="text" placeholder="Ish nomi, kalit so'zlar..." />
							<button type="submit">
								<img src={searchIcon} alt="search Icon" />
							</button>
						</div>
					</form>
					<div className={classes.marketBox}>
						<h3>Mobil ilovani yuklab oling</h3>
						<div className={classes.marketBox_Wrapper}>
							<div className={classes.eachBox}>
								<img src={googlePlay} alt="google play icon" />
								<div>
									<p>доступно в</p>
									<h2>GooglePlay</h2>
								</div>
							</div>
							<div className={classes.eachBox}>
								<img className={classes.apple} src={apple} alt="apple market icon" />
								<div>
									<p>загрузите в</p>
									<h2>AppStore</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyCareer;
