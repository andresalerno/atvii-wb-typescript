import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ExclusaoCliente
type ExclusaoClienteProps = {
    id: number;
    clientes: any[];
    setClientes: React.Dispatch<React.SetStateAction<any[]>>;
    navigate: (path: string) => void;
};

class ExclusaoCliente extends Component<ExclusaoClienteProps> {
    constructor(props: ExclusaoClienteProps) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir() {
        const { id, clientes, setClientes, navigate } = this.props;
        const novosClientes = clientes.filter(cliente => cliente.id !== id);
        setClientes(novosClientes);
        alert('Cliente excluído com sucesso!');
        navigate('/clientes');
    }

    render() {
        return (
            <div className="container mt-5">
                <h2 className="mb-4">Excluir Cliente</h2>
                <p>Tem certeza que deseja excluir o cliente com ID {this.props.id}?</p>
                <button className="btn btn-danger me-2" onClick={this.handleExcluir}>
                    Confirmar Exclusão
                </button>
                <button className="btn btn-secondary" onClick={() => this.props.navigate('/clientes')}>
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

export default withRouter(ExclusaoCliente);
