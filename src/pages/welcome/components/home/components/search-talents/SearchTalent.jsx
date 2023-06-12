import React from "react";
import business2 from "src/assets/images/business_page2.png";
import classes from "./SearchTalent.module.scss";
import searchIcon from "src/assets/images/searchIcon.png";
import { useTranslation } from "react-i18next";

function SearchTalent() {

	const { t } = useTranslation();

	return (
		<div className={classes.page2Box}>
			<div className="container">
				<div className={classes.page2BoxContainer}>
					<div className={classes.page2BoxInner}>
						<div className={classes.busines2Img}>
							<img src={business2} alt="business environment" />
						</div>
						<div className={classes.searchTalants}>
							<h2>{t('searchTalents')}!</h2>
							<p>Ipsum harum assumenda in eum vel eveniet numquam, cumque vero vitae enim cupiditate deserunt eligendi officia modi consectetur.</p>
							<form action="submit">
								<div className={classes.page2Search}>
									<input type="text" placeholder={`${t('jobTitleKeywords')}`} />
									<button type="submit">
										<img src={searchIcon} alt="search Icon" />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchTalent;
