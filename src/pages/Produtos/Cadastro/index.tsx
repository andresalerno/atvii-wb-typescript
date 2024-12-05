import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para CadastroProduto
type CadastroProdutoProps = {
    produtos: any[];
    setProdutos: React.Dispatch<React.SetStateAction<any[]>>;
    navigate?: (path: string) => void; // Tornar opcional, pois pode vir de `withRouter`
};

type CadastroProdutoState = {
    nome: string;
    preco: string;
};

class CadastroProduto extends Component<CadastroProdutoProps, CadastroProdutoState> {
    constructor(props: CadastroProdutoProps) {
        super(props);
        this.state = {
            nome: '',
            preco: '',
        };
        this.handleCadastrar = this.handleCadastrar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as CadastroProdutoState);
    }

    handleCadastrar(e: React.FormEvent) {
        e.preventDefault();

        const { nome, preco } = this.state;
        const { produtos, setProdutos, navigate } = this.props;

        // Validação dos campos obrigatórios
        if (!nome.trim() || !preco.trim()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validação do preço
        const precoNumerico = parseFloat(preco);
        if (isNaN(precoNumerico) || precoNumerico <= 0) {
            alert('Por favor, insira um preço válido.');
            return;
        }

        // Criação do produto e atualização da lista de produtos
        const idProduto = produtos.length + 1;
        const novoProduto = {
            id: idProduto,
            nome,
            preco: precoNumerico,
        };
        setProdutos([...produtos, novoProduto]);

        alert('Produto cadastrado com sucesso!');
        if (navigate) navigate('/produtos'); // Redireciona para a listagem de produtos
    }

    handleVoltar() {
        const { navigate } = this.props;
        if (navigate) {
            navigate('/produtos');
        }
    }

    render() {
        const { nome, preco } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Cadastro de Produto</h2>
                <form onSubmit={this.handleCadastrar} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label className="form-label">(*) Nome do Produto:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            value={nome}
                            onChange={this.handleChange}
                            placeholder="Digite o nome do produto"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">(*) Preço do Produto:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="preco"
                            value={preco}
                            onChange={this.handleChange}
                            placeholder="Digite o preço do produto"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Cadastrar Produto</button>
                    <button type="button" className="btn btn-secondary mt-3 w-100" onClick={this.handleVoltar}>Voltar</button>
                </form>
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

export default withRouter(CadastroProduto);
