import {useNavigate} from 'react-router-dom' 

import styles from './NewProject.module.css'

import ProjectForm from '../project/ProjectForm'

function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {

        //Initialize costs and services
        project.costs = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then(() => {
        //    console.log(data)
            navigate('/projetos',  { state: {message: 'Projeto criado com sucesso!'} })
        })
            
        .catch((error) => console.log(error))
        
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar mais informações</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
        </div>
    )
}

export default NewProject