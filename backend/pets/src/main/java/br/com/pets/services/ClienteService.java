package br.com.pets.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import br.com.pets.models.Cliente;
import br.com.pets.repositories.ClienteRepository;
import br.com.pets.repositories.EnderecoRepository;

@Service
public class ClienteService {
    @SuppressWarnings("NonConstantLogger")
    Logger logger = Logger.getLogger(ClienteService.class.getName());
    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;

    public ClienteService(ClienteRepository clienteRepository,EnderecoRepository enderecoRepository){
        this.clienteRepository = clienteRepository;
        this.enderecoRepository = enderecoRepository;
    }

    public List<Cliente> consultarClientes(){
        return(this.clienteRepository.findAll());
    }

    public Cliente consultarCliente(long idCliente){
        return(this.clienteRepository.findById(idCliente));
    }

    @SuppressWarnings("LoggerStringConcat")
    public Cliente salvarCliente(Cliente cliente){
        //Valida se já existe alguem com o usuário notificado
        if(this.clienteRepository.existsByCpf(cliente.getCpf())){
            logger.warning("Erro ao tentar salvar o Cliente: Cliente invalido <" + cliente.getIdEndereco() + ">");
            return(null);
        }

        //Valida se possui um endereço valido
        if(cliente.getIdEndereco() == 0){
            cliente.setIdEndereco(-1);
        }
        if(!this.enderecoRepository.existsById(cliente.getIdEndereco())){
            logger.warning("Erro ao tentar salvar o Cliente: Endereco invalido <" + cliente.getIdEndereco() + ">");
            return(null);
        }

        //Id do cliente, por ser forma sequencial é desconsiderado o valor enviado
        cliente.setIdCliente(-1L);
        cliente.setStatus("Ativo");

        return(this.clienteRepository.save(cliente));
    }

    public Cliente alterarCliente(Cliente cliente){
        if(!this.clienteRepository.existsById(cliente.getIdCliente())){
            return(null);
        }

        Cliente clienteFinal = this.clienteRepository.findById(cliente.getIdCliente());

        //Separa apenas os campos que podem ser alterados
        clienteFinal.setNome(cliente.getNome());
        clienteFinal.setDataNascimento(cliente.getDataNascimento());
        clienteFinal.setCpf(cliente.getCpf());
        clienteFinal.setRegistroGeral(cliente.getRegistroGeral());
        clienteFinal.setTelefone(cliente.getTelefone());
        clienteFinal.setEmail(cliente.getEmail());

        return(this.clienteRepository.save(clienteFinal));
    }

    public Cliente desligarCliente(long idCliente){
        //valida se o usuário existe
        if(!this.clienteRepository.existsById(idCliente)){
            logger.warning("Desligamento nao efetivado: Cliente nao localizado");
            return(null);
        }

        Cliente clienteFinal = this.clienteRepository.findById(idCliente);

        clienteFinal.setStatus("Inativo");

        return(this.clienteRepository.save(clienteFinal));
    }

    public Cliente ativarCliente(long idCliente){
        //valida se o usuário existe
        if(!this.clienteRepository.existsById(idCliente)){
            return(null);
        }

        Cliente clienteFinal = this.clienteRepository.findById(idCliente);

        //Valida se o usuário já foi desligado
        if(!clienteFinal.getStatus().equals("Inativo")){
            logger.warning("Ativacao nao efetivada: Status 'Inativo' nao localizado");
        }

        clienteFinal.setStatus("Ativo");

        return(this.clienteRepository.save(clienteFinal));
    }
}
