import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemProduto
type ListagemProdutoProps = {
    produtos: any[];
    setProdutos: React.Dispatch<React.SetStateAction<any[]>>;
    navigate?: (path: string) => void;
};

class ListagemProduto extends Component<ListagemProdutoProps> {
    constructor(props: ListagemProdutoProps) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
        this.handleEditar = this.handleEditar.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    handleExcluir(id: number) {
        const { produtos, setProdutos } = this.props;
        const novosProdutos = produtos.filter(produto => produto.id !== id);
        setProdutos(novosProdutos);
    }

    handleEditar(id: number) {
        const { navigate } = this.props;
        if (navigate) {
            navigate(`/editar-produto/${id}`);
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
        const { produtos } = this.props;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Listagem de Produtos</h2>
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
                        {produtos.length > 0 ? (
                            produtos.map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td className="text-center">{this.formatarPreco(produto.preco)}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => this.handleEditar(produto.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => this.handleExcluir(produto.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">Nenhum produto cadastrado.</td>
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

export default withRouter(ListagemProduto);
