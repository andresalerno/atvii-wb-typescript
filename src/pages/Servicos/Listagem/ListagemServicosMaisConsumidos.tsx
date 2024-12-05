import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ListagemServicosMaisConsumidos
type ListagemServicosMaisConsumidosProps = {
    compras: any[];
};

class ListagemServicosMaisConsumidos extends Component<ListagemServicosMaisConsumidosProps> {
    calcularConsumoServicos() {
        const { compras } = this.props;
        const consumoServicos: { [key: string]: { nome: string; quantidade: number } } = {};

        compras.forEach((compra) => {
            compra.servicos.forEach((servico: any) => {
                if (consumoServicos[servico.id]) {
                    consumoServicos[servico.id].quantidade += servico.quantidade;
                } else {
                    consumoServicos[servico.id] = {
                        nome: servico.nome,
                        quantidade: servico.quantidade,
                    };
                }
            });
        });

        return Object.values(consumoServicos).sort((a, b) => b.quantidade - a.quantidade);
    }

    render() {
        const servicosMaisConsumidos = this.calcularConsumoServicos();

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Serviços Mais Consumidos</h2>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Nome do Serviço</th>
                            <th>Quantidade Consumida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicosMaisConsumidos.length > 0 ? (
                            servicosMaisConsumidos.map((servico, index) => (
                                <tr key={index}>
                                    <td>{servico.nome}</td>
                                    <td>{servico.quantidade}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="text-center">Nenhum serviço consumido.</td>
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

export default withRouter(ListagemServicosMaisConsumidos);
