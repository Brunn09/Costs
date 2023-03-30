import styles from './Loading.module.css'

import Loader from '../../img/loading.svg'

function Loading() {
    return(
        <div className={styles.loading_container}>
            <img className={styles.loader} src={Loader} alt="Loading" />
        </div>
    )
}

export default Loading