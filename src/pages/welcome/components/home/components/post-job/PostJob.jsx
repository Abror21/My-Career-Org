import React from "react";
import classes from "./PostJob.module.scss";
import sloy1 from "src/assets/images/sloy2.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PostJob() {

	const { t } = useTranslation();

	return (
		<div className={classes.page3}>
			<div className="container">
				<div className={classes.page3__container}>
					<div className={classes.page3__inner}>
						<div className={classes.container__sloy1}>
							<img src={sloy1} alt="Page3 Sloy1" />
						</div>
						<div className={classes.page3__text__btn}>
							<h3 className={classes.title}>{t('searchTalents')}!</h3>
							<p className={classes.subtitle}>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum repudiandae obcaecati natus soluta accusamus autem reprehenderit ad,
							</p>
							<Link to="/auth">
								<button className={classes.post}>{t('postJob')}</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostJob;
