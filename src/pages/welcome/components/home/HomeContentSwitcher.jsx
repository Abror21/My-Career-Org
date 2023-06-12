import { useState } from "react"
import MyCareer from "./components/my-career/MyCareer"
import Round from "./round/Round"
import classes from './HomeContentSwitcher.module.scss'
import SearchTalent from "./components/search-talents/SearchTalent"
import PostJob from "./components/post-job/PostJob"
import JoinTeam from "./components/join-team/JoinTeam"
import SliderChain from "./slider-chain/SliderChain"

const HomeContentSwitcher = () => {
    const [count, setCount] = useState(1)

    return (
        <>
            {count === 1 && <MyCareer />}
            {count === 2 && <SearchTalent />}
            {count === 3 && <PostJob />}
            {count === 4 && <JoinTeam />}

            <SliderChain
                count={count}
                setCount={setCount}
            />

            <div className={classes.roundContainer}>
                <div className={count === 1 ? classes.round1 : count === 2 ? classes.round2 : count === 3 ? classes.round3 : count === 4 ? classes.round4 : classes.round1}>
                <Round />
                </div>
            </div>
        </>
    )
}

export default HomeContentSwitcher