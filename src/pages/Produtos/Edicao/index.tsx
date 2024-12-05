import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Tipo de Props para EdicaoProduto
interface EdicaoProdutoProps {
    produtos: any[];
    setProdutos: React.Dispatch<React.SetStateAction<any[]>>;
    navigate: (path: string) => void;
}

interface EdicaoProdutoState {
    nome: string;
    preco: string;
}

class EdicaoProduto extends Component<EdicaoProdutoProps, EdicaoProdutoState> {
    constructor(props: EdicaoProdutoProps) {
        super(props);
        this.state = {
            nome: '',
            preco: '',
        };
        this.handleEditar = this.handleEditar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { id } = this.props as any;
        const produto = this.props.produtos.find(produto => produto.id === parseInt(id));
        if (produto) {
            this.setState({
                nome: produto.nome,
                preco: produto.preco.toString(),
            });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as EdicaoProdutoState);
    }

    handleEditar(e: React.FormEvent) {
        e.preventDefault();

        const { nome, preco } = this.state;
        const { produtos, setProdutos, navigate } = this.props;
        const { id } = this.props as any;

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

        // Atualização do produto
        const novosProdutos = produtos.map(produto =>
            produto.id === parseInt(id)
                ? { ...produto, nome, preco: precoNumerico }
                : produto
        );
        setProdutos(novosProdutos);

        alert('Produto editado com sucesso!');
        navigate('/produtos');
    }

    render() {
        const { nome, preco } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Edição de Produto</h2>
                <form onSubmit={this.handleEditar} className="needs-validation" noValidate>
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
                        <div className="invalid-feedback">Por favor, insira um nome válido.</div>
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
                        <div className="invalid-feedback">Por favor, insira um preço válido.</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Salvar Alterações</button>
                </form>
            </div>
        );
    }
}

// Função de ordem superior para usar o hook `useNavigate` e `useParams` em um componente de classe
function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} navigate={navigate} {...params} />;
    }
    return ComponentWithRouterProp;
}

export default withRouter(EdicaoProduto);
