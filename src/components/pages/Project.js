import { parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'    

function Project(){

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((erro) => console.log((erro)))
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost) {
        setMessage('')

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.costs = parseFloat(projectUpdated.costs) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify(projectUpdated)
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço excluido')
            setType('success')
        })
        .catch((erro) => console.log(erro))
    }

    function createService(project){

        //last service
        const lastService = project.services[project.services.length - 1]
        
        lastService.id = uuidv4()
        
        const lastServiceCost = lastService.cost
        
        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)
              
        setMessage('')
        // max cost validation
        if(newCost > parseFloat(project.budget)) {
            
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total costs
        project.costs = newCost
        setMessage('Serviço adicionado!')
        setType('success')

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then( (response) => response.json())
        .then( () => {
            setShowServiceForm(false)
        })
        .catch( (erro) => console.log(erro) )
    }

    function editPost(project) {
        setMessage('')
        if(project.budget < project.costs) {
            //mensagem
            setType('error')
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            return false
        }
        fetch(`http://localhost:5000/projects/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then( (response) => response.json() )
        .then( (data) => {
            setProject(data)
            setShowProjectForm(false)
            //mensagem
            setType('success')
            setMessage('Projeto atualizado!')
        } )
        .catch( (erro) => console.log(erro) )
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar' }
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento total:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.costs}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                        handleSubmit={editPost}
                                        btnText='Concluir Edição'
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container} >
                            <h2>Adicione um serviço:</h2>
                            <button onClick={toggleServiceForm} className={styles.btn}>
                                { !showServiceForm ? 'Adicionar serviço' : 'Fechar' }
                            </button>
                            <div className={styles.project_info}>
                                { showServiceForm && (
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    btnText='Adicionar Serviço'
                                    projectData={project}
                                    />) }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 && 
                                services.map((service) => (
                                    <ServiceCard 
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        handleRemove={removeService}

                                    />
                                ))
                            }

                            {services.length === 0 && <p>Não há serviços!</p>}
                        </Container>
                    </Container>
                </div>
            ) : (<Loading />)
            }
        </>
    )
}

export default Project