import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

type HomePageProps = {
    navigate: (path: string) => void;
};

type HomePageState = {
    expandedCard: string | null;
};

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            expandedCard: null,
        };
        this.handleNavigate = this.handleNavigate.bind(this);
        this.toggleSubmenu = this.toggleSubmenu.bind(this);
    }

    handleNavigate(path: string) {
        const { navigate } = this.props;
        navigate(path);
    }

    toggleSubmenu(card: string) {
        this.setState((prevState) => ({
            expandedCard: prevState.expandedCard === card ? null : card,
        }));
    }

    render() {
        const { expandedCard } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4 text-center">Gerenciamento</h2>
                <div className="row">
                    {/* Gerenciar Clientes */}
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card"
                            onClick={() => this.toggleSubmenu('clientes')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body text-center">
                                <h5 className="card-title">Gerenciar Clientes</h5>
                            </div>
                        </div>
                        {expandedCard === 'clientes' && (
                            <div className="list-group">
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/cadastrar-cliente')}
                                >
                                    Cadastrar Clientes
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/clientes')}
                                >
                                    Listagem de Clientes
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/clientes/top10-mais')}
                                >
                                    Top 10 Mais Consumiram
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/clientes/top10-menos')}
                                >
                                    Top 10 Menos Consumiram
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/clientes/top5-valor')}
                                >
                                    Top 5 Mais Consumiram em Valor
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/clientes/genero')}
                                >
                                    Listar por Gênero
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Gerenciar Produtos */}
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card"
                            onClick={() => this.toggleSubmenu('produtos')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body text-center">
                                <h5 className="card-title">Gerenciar Produtos</h5>
                            </div>
                        </div>
                        {expandedCard === 'produtos' && (
                            <div className="list-group">
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/cadastrar-produto')}
                                >
                                    Cadastrar Produtos
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/produtos')}
                                >
                                    Listagem de Produtos
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Gerenciar Serviços */}
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card"
                            onClick={() => this.toggleSubmenu('servicos')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body text-center">
                                <h5 className="card-title">Gerenciar Serviços</h5>
                            </div>
                        </div>
                        {expandedCard === 'servicos' && (
                            <div className="list-group">
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/cadastrar-servico')}
                                >
                                    Cadastrar Serviços
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/servicos')}
                                >
                                    Listagem de Serviços
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Gerenciar Compras */}
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card"
                            onClick={() => this.toggleSubmenu('compras')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body text-center">
                                <h5 className="card-title">Gerenciar Compras</h5>
                            </div>
                        </div>
                        {expandedCard === 'compras' && (
                            <div className="list-group">
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/cadastrar-compra')}
                                >
                                    Cadastrar Compra
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/compras')}
                                >
                                    Listar Compras
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/compras/produtos-mais-consumidos')}
                                >
                                    Listar Produtos Mais Consumidos
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/compras/servicos-mais-consumidos')}
                                >
                                    Listar Serviços Mais Consumidos
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/compras/produtos-por-genero')}
                                >
                                    Listar Produtos Mais Consumidos por Gênero
                                </button>
                                <button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.handleNavigate('/compras/servicos-por-genero')}
                                >
                                    Listar Serviços Mais Consumidos por Gênero
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function withRouter(Component: React.ComponentType<any>) {
    function ComponentWithRouterProp(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
    return ComponentWithRouterProp;
}

export default withRouter(HomePage);
