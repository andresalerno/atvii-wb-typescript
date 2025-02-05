import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Tipo de Props para DetalhesCliente
type DetalhesClienteProps = {
    compras: any[];
    clientes: any[];
    match?: {
        params: {
            id: string;
        };
    };
    navigate?: (path: string) => void;
};

class DetalhesCliente extends Component<DetalhesClienteProps> {
    render() {
        const { compras, clientes, match } = this.props;

        // Obter o ID do cliente das props
        const clienteId = match && match.params.id ? parseInt(match.params.id, 10) : NaN;

        if (isNaN(clienteId)) {
            return <div className="alert alert-danger">Cliente não encontrado!</div>;
        }

        const cliente = clientes.find(c => c.id === clienteId);
        const comprasCliente = compras.filter(compra => compra.clienteId === clienteId);

        return (
            <div className="container mt-5">
                {cliente ? (
                    <>
                        <h2 className="mb-4">Detalhes do Cliente: {cliente.nome}</h2>
                        <h4>Compras Realizadas:</h4>
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>ID da Compra</th>
                                    <th>Data</th>
                                    <th>Produtos</th>
                                    <th>Serviços</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comprasCliente.length > 0 ? (
                                    comprasCliente.map(compra => {
                                        const totalProdutos = compra.produtos.reduce((acc: number, produto: any) => acc + (produto.preco * produto.quantidade), 0);
                                        const totalServicos = compra.servicos.reduce((acc: number, servico: any) => acc + (servico.preco * servico.quantidade), 0);
                                        const totalCompra = totalProdutos + totalServicos;

                                        return (
                                            <tr key={compra.id}>
                                                <td>{compra.id}</td>
                                                <td>{new Date(compra.data).toLocaleDateString()}</td>
                                                <td>
                                                    {compra.produtos.map((produto: any, index: number) => (
                                                        <div key={index}>{produto.nome} - {produto.quantidade} x {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {compra.servicos.map((servico: any, index: number) => (
                                                        <div key={index}>{servico.nome} - {servico.quantidade} x {servico.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                                    ))}
                                                </td>
                                                <td>{totalCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center">Nenhuma compra encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className="alert alert-danger">Cliente não encontrado!</div>
                )}
            </div>
        );
    }
}

// Função de ordem superior para usar o hook `useNavigate` e obter parâmetros de rota em um componente de classe
function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        const navigate = useNavigate();
        const params = useParams();
        return <Component {...props} navigate={navigate} match={{ params }} />;
    }
    return ComponentWithRouterProp;
}

export default withRouter(DetalhesCliente);
