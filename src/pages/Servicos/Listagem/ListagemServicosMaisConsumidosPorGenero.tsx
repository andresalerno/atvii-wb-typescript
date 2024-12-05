import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemServicosMaisConsumidosPorGenero
type ListagemServicosMaisConsumidosPorGeneroProps = {
    clientes: any[];
    compras: any[];
};

class ListagemServicosMaisConsumidosPorGenero extends Component<ListagemServicosMaisConsumidosPorGeneroProps> {
    contarServicosPorGenero(genero: string) {
        const { clientes, compras } = this.props;
        const contagem: { [key: number]: number } = {};

        // Filtra os clientes pelo gênero e obtém suas compras
        clientes.forEach(cliente => {
            if (cliente.genero === genero) {
                const comprasCliente = compras.filter(compra => compra.clienteId === cliente.id);

                // Conta os serviços consumidos por esse cliente
                comprasCliente.forEach(compra => {
                    compra.servicos.forEach((servico: any) => {
                        if (contagem[servico.id]) {
                            contagem[servico.id] += servico.quantidade;
                        } else {
                            contagem[servico.id] = servico.quantidade;
                        }
                    });
                });
            }
        });

        return Object.entries(contagem)
            .map(([servicoId, quantidade]) => {
                const servico = this.props.compras
                    .flatMap(compra => compra.servicos)
                    .find((servico: any) => servico.id === parseInt(servicoId));
                return {
                    ...servico,
                    quantidade
                };
            })
            .filter(servico => servico) // Filtra para garantir que o serviço exista
            .sort((a, b) => b.quantidade - a.quantidade);
    }

    renderTabelaServicos(genero: string) {
        const servicosMaisConsumidos = this.contarServicosPorGenero(genero);

        return (
            <div className="mb-5">
                <h4>{genero}</h4>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome do Serviço</th>
                            <th>Quantidade Consumida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicosMaisConsumidos.length > 0 ? (
                            servicosMaisConsumidos.map(servico => (
                                <tr key={servico.id}>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.quantidade}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">Nenhum serviço consumido.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div className="container mt-5">
                <h2 className="mb-4">Serviços Mais Consumidos por Gênero</h2>
                {this.renderTabelaServicos('Masculino')}
                {this.renderTabelaServicos('Feminino')}
                {this.renderTabelaServicos('Outro')}
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

export default withRouter(ListagemServicosMaisConsumidosPorGenero);
