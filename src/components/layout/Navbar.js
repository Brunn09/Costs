import styles from './Navbar.module.css'
import Container from './Container'

import { Link } from 'react-router-dom'

import Logo from '../../img/costs_logo.png'

function Navbar() {
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to='/'><img src={Logo} alt='Costs logo'></img></Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/projetos'>Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/empresa'>Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/contato'>Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar