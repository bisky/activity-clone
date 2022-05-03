import { useState } from "react";
import styles from 'styled-components'

const ModalBackground = styles.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);

`;

const ModalBody = styles.div`
    background-color: white;
    margin: 10% auto;
    padding: 20px;
    margin:10%;
`;

export const ModalPreview = ({show}) => {

    const [modalPrev, setModalPrev] = useState(true);
    
    return (
       <>
         {modalPrev && (
                <ModalBackground onClick={() => setModalPrev(false) }>
                    <ModalBody onClick={e => e.stopPropagation()}>
                        <button onClick={() => setModalPrev(false)}>Hide Modal</button>
                        {show}
                    </ModalBody>
                </ModalBackground>
         )}

       </>
    )
}
