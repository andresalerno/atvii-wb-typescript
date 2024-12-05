import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemCliente
type ListagemClienteProps = {
    clientes: any[];
    setClientes: React.Dispatch<React.SetStateAction<any[]>>;
    navigate?: (path: string) => void;
};

class ListagemCliente extends Component<ListagemClienteProps> {
    constructor(props: ListagemClienteProps) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
        this.handleEditar = this.handleEditar.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    handleExcluir(id: number) {
        const { clientes, setClientes } = this.props;
        const novosClientes = clientes.filter(cliente => cliente.id !== id);
        setClientes(novosClientes);
    }

    handleEditar(id: number) {
        const { navigate } = this.props;
        if (navigate) {
            navigate(`/editar-cliente/${id}`);
        } else {
            console.error("Navigate function not provided!");
        }
    }

    handleVoltar() {
        const { navigate } = this.props;
        if (navigate) {
            navigate('/');
        } else {
            console.error("Navigate function not provided!");
        }
    }

    render() {
        const { clientes } = this.props;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Listagem de Clientes</h2>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Nome Social</th>
                            <th>CPF</th>
                            <th>Data de Emissão</th>
                            <th>Gênero</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.nomeSocial || '-'}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{new Date(cliente.dataEmissao).toLocaleDateString()}</td>
                                    <td>{cliente.genero}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => this.handleEditar(cliente.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => this.handleExcluir(cliente.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">Nenhum cliente cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-secondary" onClick={this.handleVoltar}>Voltar</button>
                </div>
            </div>
        );
    }
}

// Função de ordem superior para usar o hook `useNavigate` em um componente de classe
function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
    return ComponentWithRouterProp;
}

export default withRouter(ListagemCliente);
