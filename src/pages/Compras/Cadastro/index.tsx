import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipos de Props para CadastroCompra
interface CadastroCompraProps {
    clientes: any[];
    produtos: any[];
    servicos: any[];
    setCompras: React.Dispatch<React.SetStateAction<any[]>>;
    navigate: any;
}

interface CadastroCompraState {
    clienteId: string;
    itensCompra: { tipo: 'produto' | 'servico'; id: number; quantidade: number }[];
    valorTotal: number;
}

class CadastroCompra extends Component<CadastroCompraProps, CadastroCompraState> {
    constructor(props: CadastroCompraProps) {
        super(props);
        this.state = {
            clienteId: '',
            itensCompra: [],
            valorTotal: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdicionarItem = this.handleAdicionarItem.bind(this);
        this.handleQuantidadeChange = this.handleQuantidadeChange.bind(this);
        this.handleCadastrar = this.handleCadastrar.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as CadastroCompraState);
    }

    handleAdicionarItem(tipo: 'produto' | 'servico', id: number) {
        this.setState((prevState) => ({
            itensCompra: [...prevState.itensCompra, { tipo, id, quantidade: 1 }],
        }), this.atualizarValorTotal);
    }

    handleQuantidadeChange(index: number, quantidade: number) {
        const { itensCompra } = this.state;
        itensCompra[index].quantidade = quantidade;
        this.setState({ itensCompra }, this.atualizarValorTotal);
    }

    atualizarValorTotal() {
        const { itensCompra } = this.state;
        const { produtos, servicos } = this.props;
        let valorTotal = 0;

        itensCompra.forEach(item => {
            if (item.tipo === 'produto') {
                const produto = produtos.find(prod => prod.id === item.id);
                if (produto) {
                    valorTotal += produto.preco * item.quantidade;
                }
            } else if (item.tipo === 'servico') {
                const servico = servicos.find(serv => serv.id === item.id);
                if (servico) {
                    valorTotal += servico.preco * item.quantidade;
                }
            }
        });

        this.setState({ valorTotal });
    }

    handleCadastrar(e: React.FormEvent) {
        e.preventDefault();
        const { clienteId, itensCompra, valorTotal } = this.state;
        const { setCompras, clientes, navigate } = this.props;
    
        if (!clienteId) {
            alert('Por favor, selecione um cliente.');
            return;
        }
    
        if (itensCompra.length === 0) {
            alert('Por favor, adicione pelo menos um produto ou serviço à compra.');
            return;
        }
    
        const cliente = clientes.find(cli => cli.id === parseInt(clienteId));
        if (!cliente) {
            alert('Cliente inválido.');
            return;
        }
    
        // Verificando se todos os itens têm valores válidos
        let totalCompra = 0;
        const itensComDetalhes = itensCompra.map(item => {
            if (item.tipo === 'produto') {
                const produto = this.props.produtos.find(prod => prod.id === item.id);
                if (produto) {
                    totalCompra += produto.preco * item.quantidade;
                    return { ...item, preco: produto.preco, nome: produto.nome };
                }
            } else if (item.tipo === 'servico') {
                const servico = this.props.servicos.find(serv => serv.id === item.id);
                if (servico) {
                    totalCompra += servico.preco * item.quantidade;
                    return { ...item, preco: servico.preco, nome: servico.nome };
                }
            }
            return null;
        }).filter(item => item !== null);
    
        const novaCompra = {
            id: Math.floor(Math.random() * 10000),
            clienteId: parseInt(clienteId),
            data: new Date().toISOString(),
            produtos: itensComDetalhes.filter(item => item?.tipo === 'produto'),
            servicos: itensComDetalhes.filter(item => item?.tipo === 'servico'),
            valorTotal: totalCompra,
        };
    
        setCompras(prev => [...prev, novaCompra]);
        alert('Compra cadastrada com sucesso!');
        navigate('/compras');
    }
    
    

    render() {
        const { clientes, produtos, servicos } = this.props;
        const { clienteId, itensCompra, valorTotal } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Cadastro de Compra</h2>
                <form onSubmit={this.handleCadastrar}>
                    <div className="mb-3">
                        <label className="form-label">(*) Selecione o Cliente:</label>
                        <select
                            name="clienteId"
                            value={clienteId}
                            onChange={this.handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Adicionar Produtos:</label>
                        <div>
                            {produtos.map(produto => (
                                <button
                                    type="button"
                                    key={produto.id}
                                    className="btn btn-secondary btn-sm me-2 mb-2"
                                    onClick={() => this.handleAdicionarItem('produto', produto.id)}
                                >
                                    {produto.nome}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Adicionar Serviços:</label>
                        <div>
                            {servicos.map(servico => (
                                <button
                                    type="button"
                                    key={servico.id}
                                    className="btn btn-secondary btn-sm me-2 mb-2"
                                    onClick={() => this.handleAdicionarItem('servico', servico.id)}
                                >
                                    {servico.nome}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Itens da Compra:</label>
                        <ul className="list-group">
                            {itensCompra.map((item, index) => {
                                const produtoOuServico = item.tipo === 'produto'
                                    ? produtos.find(prod => prod.id === item.id)
                                    : servicos.find(serv => serv.id === item.id);

                                return produtoOuServico ? (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {produtoOuServico.nome} - {item.tipo === 'produto' ? 'Produto' : 'Serviço'}
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantidade}
                                            onChange={(e) => this.handleQuantidadeChange(index, parseInt(e.target.value))}
                                            className="form-control ms-3"
                                            style={{ width: '80px' }}
                                        />
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>

                    <div className="mb-3">
                        <h5>Valor Total: R$ {valorTotal.toFixed(2)}</h5>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Cadastrar Compra</button>
                </form>
            </div>
        );
    }
}

// Função de ordem superior para usar o hook `useNavigate` em um componente de classe
function withRouter(Component: any) {
    return function ComponentWithRouterProp(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withRouter(CadastroCompra);
