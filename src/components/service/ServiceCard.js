import styles from '../project/ProjectCard.module.css'

import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard ({id, name, cost, description, handleRemove}) {

    const remove = (event) => {
        event.preventDefault()
        handleRemove(id, cost)
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo do serviço:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>
            </div>
        </div>
    )   
}

export default ServiceCard