import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ExclusaoCompra
type ExclusaoCompraProps = {
    id: number;
    compras: any[];
    setCompras: React.Dispatch<React.SetStateAction<any[]>>;
    navigate: (path: string) => void;
};

class ExclusaoCompra extends Component<ExclusaoCompraProps> {
    constructor(props: ExclusaoCompraProps) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir() {
        const { id, compras, setCompras, navigate } = this.props;
        const novasCompras = compras.filter(compra => compra.id !== id);
        setCompras(novasCompras);
        alert('Compra excluída com sucesso!');
        navigate('/compras');
    }

    render() {
        return (
            <div className="container mt-5">
                <h2 className="mb-4">Excluir Compra</h2>
                <p>Tem certeza que deseja excluir a compra com ID {this.props.id}?</p>
                <button className="btn btn-danger me-2" onClick={this.handleExcluir}>
                    Confirmar Exclusão
                </button>
                <button className="btn btn-secondary" onClick={() => this.props.navigate('/compras')}>
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

export default withRouter(ExclusaoCompra);
