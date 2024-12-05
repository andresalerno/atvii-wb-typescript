import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemCompras
type ListagemComprasProps = {
    compras: any[];
    clientes: any[];
    navigate?: (path: string) => void;
};

class ListagemCompras extends Component<ListagemComprasProps> {
    constructor(props: ListagemComprasProps) {
        super(props);
        this.handleVerDetalhes = this.handleVerDetalhes.bind(this);
        this.handleVoltarParaHome = this.handleVoltarParaHome.bind(this);
    }

    handleVerDetalhes(id: number) {
        const { navigate, compras } = this.props;
    
        const compra = compras.find(c => c.id === id);
        if (!compra) {
            alert("Compra não encontrada!");
            return;
        }
    
        if (navigate) {
            navigate(`/detalhes-compra/${id}`);
        } else {
            console.error("Navigate function not provided!");
        }
    }
    
    

    handleVoltarParaHome() {
        const { navigate } = this.props;
        if (navigate) {
            navigate('/');
        } else {
            console.error("Navigate function not provided!");
        }
    }

    calcularTotal(compra: any): number {
        let total = 0;

        const produtos = compra.produtos || [];
        const servicos = compra.servicos || [];

        produtos.forEach((produto: any) => {
            total += produto.preco * (produto.quantidade || 1);
        });

        servicos.forEach((servico: any) => {
            total += servico.preco * (servico.quantidade || 1);
        });

        return total;
    }

    formatarPreco(preco: number): string {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    obterNomeCliente(clienteId: number): string {
        const { clientes } = this.props;
        const cliente = clientes.find(cliente => cliente.id === clienteId);
        return cliente ? cliente.nome : 'Cliente não encontrado';
    }

    render() {
        const { compras } = this.props;
    
        // Calculando o valor total de todas as compras
        const valorTotalTodasCompras = compras.reduce((total, compra) => {
            return total + this.calcularTotal(compra);
        }, 0);
    
        return (
            <div className="container mt-5">
                <h2 className="mb-4">Listagem de Compras</h2>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data da Compra</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.length > 0 ? (
                            compras.map((compra, index) => (
                                <tr key={index}>
                                    <td>{compra.id}</td>
                                    <td>{this.obterNomeCliente(compra.clienteId)}</td>
                                    <td>
                                        {compra.data ? new Date(compra.data).toLocaleDateString('pt-BR') : 'Data inválida'}
                                    </td>
                                    <td className="text-center">{this.formatarPreco(this.calcularTotal(compra))}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => this.handleVerDetalhes(compra.id)}
                                        >
                                            Ver Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">Nenhuma compra realizada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
    
                {/* Mostrando o valor total de todas as compras */}
                <div className="mt-4">
                    <h5>Total de Todas as Compras: {this.formatarPreco(valorTotalTodasCompras)}</h5>
                </div>
    
                <div className="d-flex justify-content-end mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={this.handleVoltarParaHome}
                    >
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

export default withRouter(ListagemCompras);
