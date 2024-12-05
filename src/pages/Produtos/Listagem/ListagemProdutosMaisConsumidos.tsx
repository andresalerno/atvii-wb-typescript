import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemProdutosMaisConsumidos
type ListagemProdutosMaisConsumidosProps = {
    compras: any[];
    navigate?: (path: string) => void;
};

type ProdutoConsumo = {
    id: number;
    nome: string;
    quantidadeTotal: number;
};

class ListagemProdutosMaisConsumidos extends Component<ListagemProdutosMaisConsumidosProps> {
    constructor(props: ListagemProdutosMaisConsumidosProps) {
        super(props);
    }

    calcularProdutosMaisConsumidos() {
        const { compras } = this.props;
        const produtosConsumo: { [key: number]: ProdutoConsumo } = {};

        compras.forEach(compra => {
            compra.produtos.forEach((produto: any) => {
                if (!produtosConsumo[produto.id]) {
                    produtosConsumo[produto.id] = {
                        id: produto.id,
                        nome: produto.nome,
                        quantidadeTotal: 0,
                    };
                }
                produtosConsumo[produto.id].quantidadeTotal += produto.quantidade;
            });
        });

        return Object.values(produtosConsumo).sort((a, b) => b.quantidadeTotal - a.quantidadeTotal);
    }

    render() {
        const produtosMaisConsumidos = this.calcularProdutosMaisConsumidos();

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Produtos Mais Consumidos</h2>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome do Produto</th>
                            <th>Quantidade Total Consumida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosMaisConsumidos.length > 0 ? (
                            produtosMaisConsumidos.map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidadeTotal}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">Nenhum produto foi consumido.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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

export default withRouter(ListagemProdutosMaisConsumidos);
