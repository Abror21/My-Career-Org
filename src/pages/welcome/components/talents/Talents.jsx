import React from "react";
import LoginDesc from "./login/LoginDesc";
import classes from "./Talents.module.scss";
import TalentsDesc from "./TalentsDesc";
import Login from "src/pages/sign/login/Login";

function Talents() {
	return (
		<div className={classes.talents}>
			<div className="container">
				<div className={classes.talents__container}>
					<TalentsDesc />
					{/* <LoginDesc /> */}
					<Login style={{ position: 'static' }} />
				</div>
			</div>
		</div>
	);
}

export default Talents;
