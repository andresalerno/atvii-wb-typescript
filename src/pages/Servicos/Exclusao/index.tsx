import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ExclusaoServico
type ExclusaoServicoProps = {
    id: number;
    servicos: any[];
    setServicos: React.Dispatch<React.SetStateAction<any[]>>;
    navigate: (path: string) => void;
};

class ExclusaoServico extends Component<ExclusaoServicoProps> {
    constructor(props: ExclusaoServicoProps) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir() {
        const { id, servicos, setServicos, navigate } = this.props;
        const novosServicos = servicos.filter(servico => servico.id !== id);
        setServicos(novosServicos);
        alert('Serviço excluído com sucesso!');
        navigate('/servicos');
    }

    render() {
        return (
            <div className="container mt-5">
                <h2 className="mb-4">Excluir Serviço</h2>
                <p>Tem certeza que deseja excluir o serviço com ID {this.props.id}?</p>
                <button className="btn btn-danger me-2" onClick={this.handleExcluir}>
                    Confirmar Exclusão
                </button>
                <button className="btn btn-secondary" onClick={() => this.props.navigate('/servicos')}>
                    Cancelar
                </button>
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

export default withRouter(ExclusaoServico);
