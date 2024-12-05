import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemGenero
type ListagemGeneroProps = {
    clientes: any[];
    setClientes: React.Dispatch<React.SetStateAction<any[]>>;
    navigate?: (path: string) => void;
};

type ListagemGeneroState = {
    generoSelecionado: string;
};

class ListagemGenero extends Component<ListagemGeneroProps, ListagemGeneroState> {
    constructor(props: ListagemGeneroProps) {
        super(props);
        this.state = {
            generoSelecionado: '',
        };
        this.handleGeneroChange = this.handleGeneroChange.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this); // Vincular o método ao contexto da classe
    }

    handleGeneroChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ generoSelecionado: event.target.value });
    }

    handleVoltar() {
        const { navigate } = this.props;
        if (navigate) {
            navigate('/'); // Atualizando para voltar à página de gerenciamento de clientes
        } else {
            console.error("Navigate function not provided!");
        }
    }

    render() {
        const { clientes } = this.props;
        const { generoSelecionado } = this.state;

        const clientesFiltrados = generoSelecionado
            ? clientes.filter(cliente => cliente.genero === generoSelecionado)
            : clientes;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Listagem de Clientes por Gênero</h2>
                <div className="mb-3">
                    <label className="form-label">Selecione o Gênero:</label>
                    <select
                        className="form-select"
                        value={generoSelecionado}
                        onChange={this.handleGeneroChange}
                    >
                        <option value="">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                        <option value="Não declarar">Não declarar</option>
                    </select>
                </div>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Nome Social</th>
                            <th>CPF</th>
                            <th>Data de Emissão</th>
                            <th>Gênero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.length > 0 ? (
                            clientesFiltrados.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.nomeSocial || '-'}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{new Date(cliente.dataEmissao).toLocaleDateString()}</td>
                                    <td>{cliente.genero}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">Nenhum cliente encontrado para o gênero selecionado.</td>
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

export default withRouter(ListagemGenero);
