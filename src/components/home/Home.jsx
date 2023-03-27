import React from "react"
import Main from '../template/Main'

export default props => (
    <Main icon='home' title='Início' 
        subtitle= 'Minha Agenda Querida!' >
            <div className='display-4'>Bem vindo!</div>
            <hr />
            <p className='mb-0'>Sistema de cadastro de usuário que será utilizado pelo André Luiz</p>
    </Main>
)