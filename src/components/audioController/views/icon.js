import React from "react"

const previousBtn = (
    <svg className="svg-icon" viewBox="0 0 1024 1024">
        <path d="M362.3 512l445-332.3v664.5L362.3 512zM216.7 179.7h80v664.5h-80V179.7z">
        </path>
    </svg>
)

const nextBtn = (
    <svg className="svg-icon" viewBox="0 0 1024 1024">
        <path d="M216.7 844.3V179.7l445 332.3-445 332.3z m590.6 0h-80V179.7h80v664.6z">
        </path>
    </svg>
)

const volumeBtn = (
    <svg className="svg-icon" viewBox="0 0 1024 1024">
        <path d="M697.5 76l-497 230.6-147.3-20v420l147.3-20 497 230.6V76z m-50 760.7l-424.9-195-13.7-6.8-15.2 2.1-90.6 12.3V343.8l90.6 12.3 15.2 2.1 13.7-6.8 424.9-194.9v680.2zM812 612h-50V412h50v200z m204.7 200h-50V212h50v600zM914.3 712h-50V312h50v400z">
        </path>
    </svg>
)

const listBtn = (
    <svg className="svg-icon" viewBox="0 0 1024 1024">
        <path d="M91.9 165.2h50v50h-50v-50z m150.2 0v50h690v-50h-690zM91.9 429.7h50v-50h-50v50z m150.2 0h690v-50h-690v50zM91.9 644.3h50v-50h-50v50z m150.2 0h690v-50h-690v50zM91.9 858.8h50v-50h-50v50z m150.2 0h690v-50h-690v50z">
        </path>
    </svg>
)

const getModeButtonSvg = (mode) => {
    let loop = (
        <svg className="svg-icon" viewBox="0 0 1024 1024">
            <path d="M922 607.1V887H102V157h612.2V58.2l200 125-200 125V207H152v630h720V607.1h50z">
            </path>
        </svg>
    )
    let circle = (
        <svg className="svg-icon" viewBox="0 0 1024 1024">
            <path
                d="M922 607.1V887H102V157h612.2V58.2l200 125-200 125V207H152v630h720V607.1h50zM560.5 737.6V306.4h-34c-9.2 18.6-24.8 37.7-46.9 57.4-22.1 19.7-47.9 36.5-77.3 50.4v51c16.4-6.1 34.9-15.1 55.5-27.2s37.3-24.2 50-36.3v336h52.7z">
            </path>
        </svg>
    )
    let random = (
        <svg className="svg-icon" viewBox="0 0 1024 1024">
            <path d="M726.6 774H594.4L458.8 512l135.6-262h132.2v98.7l200-125-200-125V200H564.4L430.7 457.7 297.4 200h-200v50h169.2l135.9 262-135.9 262H97.4v50h200l133.3-257.7L564.4 824h162.2v101.3l200-125-200-125z">
            </path>
        </svg>
    )
    let mapModeToIcon = {
        loop,
        circle,
        random,
    }
    return mapModeToIcon[mode]
}

const getPlayButtonSvg = (status) => {
    let play = (
        <svg className="svg-icon" viewBox="0 0 1024 1024">
            <path d="M243.2 208h166.4v608H243.2zM614.4 208h166.4v608h-166.4z">
            </path>
        </svg>
    )
    let pause = (
        <svg className="svg-icon" viewBox="0 0 1024 1024">
            <path d="M289.5 844.3V179.7l445 332.3-445 332.3z">
            </path>
        </svg>
    )
    let mapStatusToIcon = {
        play,
        pause,
    }
    return mapStatusToIcon[status]
}

export {
    previousBtn,
    nextBtn,
    volumeBtn,
    listBtn,
    getModeButtonSvg,
    getPlayButtonSvg,
}