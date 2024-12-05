import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo de Props para CadastroServico
type CadastroServicoProps = {
    servicos: any[];
    setServicos: React.Dispatch<React.SetStateAction<any[]>>;
    navigate?: (path: string) => void;
};

type CadastroServicoState = {
    nome: string;
    preco: string;
};

class CadastroServico extends Component<CadastroServicoProps, CadastroServicoState> {
    constructor(props: CadastroServicoProps) {
        super(props);
        this.state = {
            nome: '',
            preco: '',
        };
        this.handleCadastrar = this.handleCadastrar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as CadastroServicoState);
    }

    handleCadastrar(e: React.FormEvent) {
        e.preventDefault();

        const { nome, preco } = this.state;
        const { servicos, setServicos, navigate } = this.props;

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

        // Criação do serviço e atualização da lista de serviços
        const idServico = servicos.length + 1;
        const novoServico = {
            id: idServico,
            nome,
            preco: precoNumerico,
        };
        setServicos([...servicos, novoServico]);

        alert('Serviço cadastrado com sucesso!');

        // Redirecionar para a listagem de serviços
        if (navigate) {
            navigate('/servicos');
        } else {
            console.error("Navigate function not provided!");
        }
    }

    render() {
        const { nome, preco } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Cadastro de Serviço</h2>
                <form onSubmit={this.handleCadastrar} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label className="form-label">(*) Descrição do Serviço:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            value={nome}
                            onChange={this.handleChange}
                            placeholder="Digite a descrição do serviço"
                            required
                        />
                        <div className="invalid-feedback">Por favor, insira uma descrição válida.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">(*) Preço do Serviço:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="preco"
                            value={preco}
                            onChange={this.handleChange}
                            placeholder="Digite o preço do serviço"
                            required
                        />
                        <div className="invalid-feedback">Por favor, insira um preço válido.</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Cadastrar Serviço</button>
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

export default withRouter(CadastroServico);
