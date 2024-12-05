import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para ExclusaoProduto
type ExclusaoProdutoProps = {
    id: number;
    produtos: any[];
    setProdutos: React.Dispatch<React.SetStateAction<any[]>>;
    navigate: (path: string) => void;
};

class ExclusaoProduto extends Component<ExclusaoProdutoProps> {
    constructor(props: ExclusaoProdutoProps) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir() {
        const { id, produtos, setProdutos, navigate } = this.props;
        const novosProdutos = produtos.filter(produto => produto.id !== id);
        setProdutos(novosProdutos);
        alert('Produto excluído com sucesso!');
        navigate('/produtos');
    }

    render() {
        return (
            <div className="container mt-5">
                <h2 className="mb-4">Excluir Produto</h2>
                <p>Tem certeza que deseja excluir o produto com ID {this.props.id}?</p>
                <button className="btn btn-danger me-2" onClick={this.handleExcluir}>
                    Confirmar Exclusão
                </button>
                <button className="btn btn-secondary" onClick={() => this.props.navigate('/produtos')}>
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

export default withRouter(ExclusaoProduto);
