import React, {Component} from "react"
import axios from 'axios'
import Main from "../template/Main"

const headerProps = {
    icon: 'Users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuário: Incluir, listar, Alterar e Excluir.'
    
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: '', fone: '' },
    list: []
}

export default class UserCrud extends Component {
    state = {...initialState}

    //chamada back-end pra saber o que está cadastrado
    componentWillMount() {
        axios(baseUrl).then(resp => {
                this.setState({list: resp.data})//veio da requisição salvo na lista
            }
        )
    }

    //limpa formulário
    clear(){
        this.setState({ user: initialState.user})
    }

    //Servir pra incluir e alterar/ put - altera/ post - inclui
    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list})
            }
        )
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)//primeiro item da lista
        return list
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    //Renderizar formulário
    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Fone</label>
                            <input type="text" className="form-control"
                            name="fone"
                            value={this.state.user.fone}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o fone..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    //carregar o usuário quando for alterar
    load(user){
        this.setState({ user })
    }

    //removendo usuário tanto do back-end como da lista local
    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list =this.getUpdatedList(user, false)
            this.setState({ list})
            }
        )
    }

    //redenrizar tabela
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Fone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.rederRows()}
                </tbody>
            </table>
        )
    }

    //rederenzer as linhas
    rederRows(){
        return this.state.list.map(user => {
                return (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.fone}</td>
                        <td>
                            <button className="btn bt-warning"
                                onClick={() => this.load(user)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(user)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                )
            }
        )
    }

    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}