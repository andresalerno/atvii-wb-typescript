import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemProdutosMaisConsumidosPorGenero
type ListagemProdutosMaisConsumidosPorGeneroProps = {
    clientes: any[];
    compras: any[];
};

type ConsumoPorGenero = {
    [genero: string]: {
        [produtoNome: string]: number;
    };
};

class ListagemProdutosMaisConsumidosPorGenero extends Component<ListagemProdutosMaisConsumidosPorGeneroProps> {
    calcularProdutosMaisConsumidosPorGenero() {
        const { clientes, compras } = this.props;
        const consumoPorGenero: ConsumoPorGenero = {};

        // Preencher os dados de consumo por gênero
        compras.forEach((compra) => {
            const cliente = clientes.find((c) => c.id === compra.clienteId);
            if (cliente) {
                const genero = cliente.genero;
                if (!consumoPorGenero[genero]) {
                    consumoPorGenero[genero] = {};
                }

                compra.produtos.forEach((produto: any) => {
                    if (!consumoPorGenero[genero][produto.nome]) {
                        consumoPorGenero[genero][produto.nome] = 0;
                    }
                    consumoPorGenero[genero][produto.nome] += produto.quantidade;
                });
            }
        });

        return consumoPorGenero;
    }

    render() {
        const consumoPorGenero = this.calcularProdutosMaisConsumidosPorGenero();

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Produtos Mais Consumidos por Gênero</h2>
                {Object.keys(consumoPorGenero).map((genero) => (
                    <div key={genero} className="mb-4">
                        <h4>{genero}</h4>
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade Consumida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(consumoPorGenero[genero])
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([produtoNome, quantidade]) => (
                                        <tr key={produtoNome}>
                                            <td>{produtoNome}</td>
                                            <td>{quantidade}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ))}
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

export default withRouter(ListagemProdutosMaisConsumidosPorGenero);
