import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

type BarraNavegacaoProps = {
    tema?: string;
    botoes: { texto: string; rota: string; icone: string, submenus?: { texto: string; rota: string }[] }[];
    navigate: (path: string) => void;
};

class BarraNavegacao extends Component<BarraNavegacaoProps> {
    static defaultProps = {
        tema: 'navbar-dark bg-primary' // Define a cor azul para a barra de navegação usando classes Bootstrap
    };

    gerarListaBotoes() {
        return this.props.botoes.map((botao) => (
            <li key={botao.texto} className="nav-item">
                <a
                    className="nav-link"
                    onClick={() => this.props.navigate(botao.rota)}
                    style={{ cursor: 'pointer', color: '#ffffff' }}
                >
                    <i className={`bi bi-${botao.icone}`}></i> {botao.texto}
                </a>
            </li>
        ));
    }

    render() {
        return (
            <>
                <nav className={`navbar navbar-expand-lg ${this.props.tema}`}>
                    <div className="container-fluid">
                        <a
                            className="navbar-brand"
                            onClick={() => this.props.navigate('/')}
                            style={{ cursor: 'pointer', color: '#ffffff' }}
                        >
                            World Beauty
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                {this.gerarListaBotoes()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

// Função para fornecer a função `navigate` ao `BarraNavegacao`
function withRouter(Component: any) {
    return function ComponentWithRouterProp(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withRouter(BarraNavegacao);
