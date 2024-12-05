import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemServico
type ListagemServicoProps = {
    servicos: any[];
    setServicos: React.Dispatch<React.SetStateAction<any[]>>;
    navigate?: (path: string) => void;
};

class ListagemServico extends Component<ListagemServicoProps> {
    constructor(props: ListagemServicoProps) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
        this.handleEditar = this.handleEditar.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    handleExcluir(id: number) {
        const { servicos, setServicos } = this.props;
        const novosServicos = servicos.filter(servico => servico.id !== id);
        setServicos(novosServicos);
    }

    handleEditar(id: number) {
        const { navigate } = this.props;
        if (navigate) {
            navigate(`/editar-servico/${id}`);
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

    formatarPreco(preco: number): string {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    render() {
        const { servicos } = this.props;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Listagem de Serviços</h2>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th className="text-center">Preço</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.length > 0 ? (
                            servicos.map(servico => (
                                <tr key={servico.id}>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td className="text-center">{this.formatarPreco(servico.preco)}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => this.handleEditar(servico.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => this.handleExcluir(servico.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">Nenhum serviço cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-secondary" onClick={this.handleVoltar}>
                        Voltar
                    </button>
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

export default withRouter(ListagemServico);
