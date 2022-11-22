import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from '../../styles/Characters.module.css'
import ModalStyle from '../../styles/Modal.module.css'

Modal.setAppElement("#__next");

export default function Main () {

    const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    const [character, setCharacter] = useState()

    useEffect (() => {
        axios.get(baseURL)
        .then((response) => 
        setCharacter(response.data.results))
    }, [])

    const [modalVisible, setModalVisible] = useState(false);
    const [itemSelect, setItemSelect] = useState(null);
    
    const onItemClicked = (item) => {
        setItemSelect(item);
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    return (
        <main>
            <ul className={styles.ulCharacters}>
                {character?.map((character, index) => {
                    return (
                        <li key={index} className={styles.li} onClick={() => onItemClicked(character)}>
                            <h3 className={styles.li_name}>{character?.name}</h3>
                        </li>
                    );
                })}
            </ul>
            <Modal
            isOpen={modalVisible}
            onRequestClose={closeModal}
            overlayClassName={ModalStyle.modalOverlay}
            className={ModalStyle.modalContent}>
                <h1>{itemSelect?.name}</h1>
            </Modal>
        </main>
    )
}