import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Tipo de Props para EdicaoCliente
type EdicaoClienteProps = {
    clientes: any[];
    setClientes: React.Dispatch<React.SetStateAction<any[]>>;
    navigate: (path: string) => void;  
    id?: string; // Adiciona o id como opcional
};

// Tipo de Estado para EdicaoCliente
type EdicaoClienteState = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpfValor: string;
    dataEmissao: string;
    generoOpcao: '1' | '2' | '3' | '4';
};

class EdicaoCliente extends Component<EdicaoClienteProps, EdicaoClienteState> {
    constructor(props: EdicaoClienteProps) {
        super(props);

        const cliente = props.clientes.find((c) => c.id === parseInt(props.id || '', 10));

        if (cliente) {
            this.state = {
                id: cliente.id,
                nome: cliente.nome || '',
                nomeSocial: cliente.nomeSocial || '',
                cpfValor: cliente.cpf || '',
                dataEmissao: new Date(cliente.dataEmissao).toLocaleDateString('pt-BR'),
                generoOpcao: cliente.generoOpcao || '1',
            };
        } else {
            this.state = {
                id: 0,
                nome: '',
                nomeSocial: '',
                cpfValor: '',
                dataEmissao: '',
                generoOpcao: '1',
            };
        }

        this.handleEditar = this.handleEditar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as EdicaoClienteState);
    }

    handleEditar(e: React.FormEvent) {
        e.preventDefault();

        const { id, nome, cpfValor, dataEmissao, nomeSocial, generoOpcao } = this.state;
        const { clientes, setClientes, navigate } = this.props;

        // Validação dos campos obrigatórios
        if (!nome.trim() || !cpfValor.trim() || !dataEmissao.trim()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validação da data
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataEmissao)) {
            alert('A data de emissão do CPF deve estar no formato dd/mm/aaaa.');
            return;
        }

        // Processamento da data
        const partes = dataEmissao.split('/');
        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const ano = parseInt(partes[2], 10);
        const dataEmissaoFormatada = new Date(ano, mes, dia);

        // Atualizar o cliente na lista de clientes
        const clientesAtualizados = clientes.map((cliente) => {
            if (cliente.id === id) {
                return {
                    ...cliente,
                    nome,
                    nomeSocial,
                    cpf: cpfValor,
                    dataEmissao: dataEmissaoFormatada,
                    generoOpcao,
                };
            }
            return cliente;
        });
        setClientes(clientesAtualizados);

        alert('Cliente editado com sucesso!');
        navigate('/clientes');  // Redireciona para a listagem de clientes
    }

    render() {
        const { nome, nomeSocial, cpfValor, dataEmissao, generoOpcao } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Edição de Cliente</h2>
                <form onSubmit={this.handleEditar} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label className="form-label">(*) Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            value={nome}
                            onChange={this.handleChange}
                            placeholder="Digite o nome do cliente"
                            required
                        />
                        <div className="invalid-feedback">Por favor, insira um nome válido.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nome Social:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nomeSocial"
                            value={nomeSocial}
                            onChange={this.handleChange}
                            placeholder="Digite o nome social do cliente (opcional)"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">(*) CPF:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cpfValor"
                            value={cpfValor}
                            onChange={this.handleChange}
                            placeholder="Digite o CPF do cliente"
                            required
                        />
                        <div className="invalid-feedback">Por favor, insira um CPF válido.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">(*) Data de Emissão do CPF (dd/mm/aaaa):</label>
                        <input
                            type="text"
                            className="form-control"
                            name="dataEmissao"
                            value={dataEmissao}
                            onChange={this.handleChange}
                            placeholder="Digite a data de emissão do CPF"
                            required
                        />
                        <div className="invalid-feedback">Por favor, insira uma data válida no formato dd/mm/aaaa.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">(*) Gênero:</label>
                        <select
                            className="form-select"
                            name="generoOpcao"
                            value={generoOpcao}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="1">Masculino</option>
                            <option value="2">Feminino</option>
                            <option value="3">Outro</option>
                            <option value="4">Não desejo declarar</option>
                        </select>
                        <div className="invalid-feedback">Por favor, selecione uma opção de gênero.</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Salvar Alterações</button>
                </form>
            </div>
        );
    }
}

// Função de ordem superior para usar o hook `useNavigate` em um componente de classe
function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let navigate = useNavigate();
        let { id } = useParams();
        return <Component {...props} navigate={navigate} id={id} />;
    }
    return ComponentWithRouterProp;
}

export default withRouter(EdicaoCliente);
