import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Tipo de Props para EdicaoCompra
interface EdicaoCompraProps {
    compras: any[];
    setCompras: React.Dispatch<React.SetStateAction<any[]>>;
    clientes: any[];
    produtos: any[];
    servicos: any[];
    navigate: (path: string) => void;
}

interface EdicaoCompraState {
    clienteId: number;
    produtos: { id: number; quantidade: number }[];
    servicos: { id: number; quantidade: number }[];
}

class EdicaoCompra extends Component<EdicaoCompraProps, EdicaoCompraState> {
    constructor(props: EdicaoCompraProps) {
        super(props);
        this.state = {
            clienteId: 0,
            produtos: [],
            servicos: [],
        };
        this.handleEditar = this.handleEditar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleQuantidadeChange = this.handleQuantidadeChange.bind(this);
    }

    componentDidMount() {
        const { id } = this.props as any;
        const compra = this.props.compras.find(compra => compra.id === parseInt(id));
        if (compra) {
            this.setState({
                clienteId: compra.cliente.id,
                produtos: compra.produtos.map((produto: any) => ({
                    id: produto.id,
                    quantidade: produto.quantidade,
                })),
                servicos: compra.servicos.map((servico: any) => ({
                    id: servico.id,
                    quantidade: servico.quantidade,
                })),
            });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as EdicaoCompraState);
    }

    handleQuantidadeChange(event: React.ChangeEvent<HTMLInputElement>, tipo: string, itemId: number) {
        const { value } = event.target;
        const quantidade = parseInt(value);

        if (tipo === 'produto') {
            this.setState(prevState => ({
                produtos: prevState.produtos.map(produto =>
                    produto.id === itemId ? { ...produto, quantidade } : produto
                ),
            }));
        } else if (tipo === 'servico') {
            this.setState(prevState => ({
                servicos: prevState.servicos.map(servico =>
                    servico.id === itemId ? { ...servico, quantidade } : servico
                ),
            }));
        }
    }

    handleEditar(e: React.FormEvent) {
        e.preventDefault();

        const { clienteId, produtos, servicos } = this.state;
        const { compras, setCompras, navigate } = this.props;
        const { id } = this.props as any;

        // Validação do cliente
        if (clienteId === 0) {
            alert('Por favor, selecione um cliente.');
            return;
        }

        // Validação dos produtos e serviços
        if (produtos.length === 0 && servicos.length === 0) {
            alert('Por favor, selecione pelo menos um produto ou serviço.');
            return;
        }

        // Atualização da compra
        const novasCompras = compras.map(compra =>
            compra.id === parseInt(id)
                ? { ...compra, clienteId, produtos, servicos }
                : compra
        );
        setCompras(novasCompras);

        alert('Compra editada com sucesso!');
        navigate('/compras');
    }

    render() {
        const { clientes, produtos, servicos } = this.props;
        const { clienteId } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Edição de Compra</h2>
                <form onSubmit={this.handleEditar}>
                    <div className="mb-3">
                        <label className="form-label">(*) Cliente:</label>
                        <select
                            name="clienteId"
                            value={clienteId}
                            onChange={this.handleChange}
                            className="form-select"
                            required
                        >
                            <option value={0}>Selecione um cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <h5>Produtos:</h5>
                        {produtos.map(produto => (
                            <div key={produto.id} className="d-flex align-items-center mb-2">
                                <label className="me-3">{produto.nome}:</label>
                                <input
                                    type="number"
                                    min={0}
                                    className="form-control w-25"
                                    value={
                                        this.state.produtos.find(p => p.id === produto.id)?.quantidade || 0
                                    }
                                    onChange={(e) => this.handleQuantidadeChange(e, 'produto', produto.id)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mb-3">
                        <h5>Serviços:</h5>
                        {servicos.map(servico => (
                            <div key={servico.id} className="d-flex align-items-center mb-2">
                                <label className="me-3">{servico.nome}:</label>
                                <input
                                    type="number"
                                    min={0}
                                    className="form-control w-25"
                                    value={
                                        this.state.servicos.find(s => s.id === servico.id)?.quantidade || 0
                                    }
                                    onChange={(e) => this.handleQuantidadeChange(e, 'servico', servico.id)}
                                />
                            </div>
                        ))}
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

export default withRouter(EdicaoCompra);
