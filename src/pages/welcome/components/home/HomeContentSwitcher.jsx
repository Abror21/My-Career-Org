import { useState } from "react"
import MyCareer from "./components/my-career/MyCareer"
import SearchTalent from "./components/search-talents/SearchTalent"
import PostJob from "./components/post-job/PostJob"
import JoinTeam from "./components/join-team/JoinTeam"
import SliderChain from "./slider-chain/SliderChain"
import Round from "src/components/Round/Round"

const HomeContentSwitcher = () => {
    const [count, setCount] = useState(1)

    const position = count === 1 ?
        { top: 'unset', left: 'unset', right: '0', bottom: '0' } :
        count === 2 ? { top: 'unset', left: 'unset', right: "20%", bottom: "-15vh" } :
            count === 3 ? { top: 'unset', left: 'unset', right: "30%", bottom: "-20vh" } :
                count === 4 ? { top: 'unset', left: 'unset', right: "-6%", bottom: "-10%" } : { bottom: 'unset', left: 'unset', right: "35%", top: "42vh" }
    const scale = count === 1 ? 1 : count === 2 ? 0.7 : count === 3 ? 0.9 : count === 4 ? 0.9 : 1

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
            <Round position={position} scale={scale} />
        </>
    )
}

export default HomeContentSwitcher