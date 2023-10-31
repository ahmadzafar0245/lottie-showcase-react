import React, { FC } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Player } from "@lottiefiles/react-lottie-player";






type Props = {
    visible: any,
    animation?: any,
    hideModel: () => void,
    src?: string
}


const ShowPopup: FC<Props> = ({
    visible,
    animation,
    hideModel,
    src

}) => {
    return (
        <Modal show={visible} onHide={() => hideModel()}>
            <Modal.Header closeButton>
                <Modal.Title>{animation?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Player
                    autoplay
                    loop
                    src={animation?.localJsonUrl ? animation.localJsonUrl : src}
                    style={{ height: "200px", width: "200px", }}
                ></Player>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => hideModel()}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default ShowPopup