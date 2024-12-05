import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para Top10MenosConsumiram
type Top10MenosConsumiramProps = {
    clientes: any[];
    navigate?: (path: string) => void;
};

class Top10MenosConsumiram extends Component<Top10MenosConsumiramProps> {
    constructor(props: Top10MenosConsumiramProps) {
        super(props);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    handleVoltar() {
        const { navigate } = this.props;
        if (navigate) {
            navigate('/');
        } else {
            console.error("Navigate function not provided!");
        }
    }

    obterTop10MenosConsumiram() {
        // Ordenar clientes pelo consumo e pegar os 10 que menos consumiram
        const { clientes } = this.props;
        return clientes
            .sort((a, b) => a.totalConsumido - b.totalConsumido)
            .slice(0, 10);
    }

    render() {
        const top10Clientes = this.obterTop10MenosConsumiram();

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Top 10 Clientes que Menos Consumiram</h2>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Nome Social</th>
                            <th>CPF</th>
                            <th>Data de Emissão</th>
                            <th>Gênero</th>
                            <th>Total Consumido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top10Clientes.length > 0 ? (
                            top10Clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.nomeSocial || '-'}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{new Date(cliente.dataEmissao).toLocaleDateString()}</td>
                                    <td>{cliente.genero}</td>
                                    <td>{cliente.totalConsumido ? cliente.totalConsumido.toFixed(2) : '0.00'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">Nenhum cliente encontrado.</td>
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

export default withRouter(Top10MenosConsumiram);
