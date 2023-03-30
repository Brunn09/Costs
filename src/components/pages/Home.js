import styles from './Home.module.css'

import LinkButton from '../layout/LinkButton'

import Savings from '../../img/savings.svg'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to='/novoprojeto' text='Criar Projeto'/>
            <img src={Savings} alt='Savings'></img>
        </section>
    )
}

export default Home