import { Link, Outlet, NavLink } from 'react-router-dom';
import classes from "./WelcomeBackground.module.scss";
import logo from "src/assets/images/text.png";
import { useSelector } from "react-redux";
import backgroundImg from "src/assets/images/home-header-bg.png";
import { useTranslation } from 'react-i18next';
import Round from 'src/components/Round/Round';

function WelcomeBackground() {
	const lang = useSelector(state => state.language.language);
	const { t } = useTranslation();

	return (
		<div className={classes.background}>
			<div className={classes.background__container}>
				<div className={classes.menu}>
					<div className={classes.menu__container}>
						<img className={classes.backgroundImg} src={backgroundImg} alt="blue circle" />
						<div className={classes.menu__inner}>
							<img className={classes.automative} src={logo} alt="Automative logo" />
							<ul className={classes.menu__links}>
								<li>
									<NavLink to="home" className={({ isActive }) => isActive ? classes.active : ''}>{t('home')}</NavLink>
								</li>
								<li>
									<NavLink to="talents" className={({ isActive }) => isActive ? classes.active : ''}>{t('talents')}</NavLink>
								</li>
								<li>
									<NavLink to="jobs" className={({ isActive }) => isActive ? classes.active : ''}>{t('jobs')}</NavLink>
								</li>
								<li>
									<NavLink to="about-us" className={({ isActive }) => isActive ? classes.active : ''}>{t('aboutUs')}</NavLink>
								</li>
								<li>
									<NavLink to="contact-us" className={({ isActive }) => isActive ? classes.active : ''}>{t('contactUs')}</NavLink>
								</li>
							</ul>
							<div className={classes.menu__buttons}>
								<Link to={`/${lang}/login`}>
									<button className={classes.menu__login}>{t('login')}</button>
								</Link>
								<Link to={`/${lang}/sign-up`}>
									<button className={classes.menu__signup}>{t('signup')}</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
}

export default WelcomeBackground;
