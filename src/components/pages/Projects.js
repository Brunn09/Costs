import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'

import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'


function Projects() {

    const location = useLocation()
    let message = ''

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/projects', 
            {method: 'GET',
            headers: {'Content-type': 'application/json'}
            })
            .then((response) => response.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)})
            .catch((erro) => console.log(erro))
    }, [])

    function removeProject(id) {
        setProjectMessage('')
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }
            )
            .then((response) => response.json)
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                //Mensagem
                setProjectMessage('Projeto excluido com sucesso!')
            })
            .catch((erro) => console.log((erro)))

    }

    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/novoprojeto' text='Criar Projeto'/>
            </div>
            {message && <Message type='success' msg={message} />}
            {projectMessage && <Message type='success' msg={projectMessage} />}
            <Container customClass='start'>
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
            </Container>
        </div>
    )
}

export default Projects