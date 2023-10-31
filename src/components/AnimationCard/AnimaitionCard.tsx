import React, { FC } from 'react'

import { Player } from "@lottiefiles/react-lottie-player";


type Props = {
    name: string,
    src: string,
    isDownloadShow: boolean,
    actionText: string,
    onViewClick: () => void,
    actionClick: () => void,
    onDownloadClick: () => void,
    cssClass: string,
    isSaved: any
}




const AnimaitionCard: FC<Props> = ({
    actionClick,
    actionText,
    isDownloadShow,
    name,
    src,
    onViewClick,
    cssClass,
    isSaved,
    onDownloadClick
}) => {
    return (
        <div className="lottie-animation-card">
            <h2 className="headinglotti">{name}</h2>
            <div className="lottie-div">
                <div onClick={onViewClick}>
                    <Player
                        autoplay
                        loop
                        src={src}
                        style={{ height: "120px", width: "120px", textAlign: "left", margin: 0 }}
                    ></Player>
                </div>

                <div className="button-container">
                    {
                        isDownloadShow &&
                        <button className={`btn btn-success p-2 m-2`} onClick={() => onDownloadClick()}>{'Download'}</button>
                    }
                    <button disabled={isSaved} className={`p-2 m-2 btn ${cssClass}`} onClick={() => actionClick()}>{isSaved ? 'Saved' : actionText}</button>
                </div>
            </div>
        </div>
    )
}

export default AnimaitionCard