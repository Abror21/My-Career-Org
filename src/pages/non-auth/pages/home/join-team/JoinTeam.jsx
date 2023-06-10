import React from "react";
import business4 from "../../../../../assets/images/page4.png";
import classes from "./JoinTeam.module.scss";
import telegram from "../../../../../assets/icons/icon1.png";
import facebook from "../../../../../assets/icons/icon2.png";
import instagram from "../../../../../assets/icons/icon3.png";

function JoinTeam() {
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
							<h2>THOUSANDS!!!</h2>
							<p>
								Thousands of <strong>workers</strong> and <strong>employers</strong> <br /> are already waiting for you!.
							</p>
							<button type="submit">Join our team right now</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JoinTeam;
