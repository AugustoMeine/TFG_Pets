package br.com.pets.services;

import br.com.pets.models.Endereco;
import br.com.pets.repositories.EnderecoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class EnderecoService {

    Logger logger = Logger.getLogger(EnderecoService.class.getName());
    private final EnderecoRepository enderecoRepository;

    public EnderecoService(EnderecoRepository enderecoRepository){
        this.enderecoRepository = enderecoRepository;
    }

    public List<Endereco> consultarEnderecos(){
        return(this.enderecoRepository.findAll());
    }

    public Endereco consultarEndereco(long idEndereco){
        return(this.enderecoRepository.findById(idEndereco));
    }

    public Endereco salvarEndereco(Endereco endereco){
        //Valida se já existe alguem com o usuário notificado
        if(this.enderecoRepository.existsById(endereco.getIdEndereco())){
            return(null);
        }

        //Id do endereco, por ser forma sequencial é desconsiderado o valor enviado
        endereco.setIdEndereco(-1L);
        endereco.setStatus("Ativo");

        return(this.enderecoRepository.save(endereco));
    }

    public Endereco alterarEndereco(Endereco endereco){
        if(!this.enderecoRepository.existsById(endereco.getIdEndereco())){
            return(null);
        }

        Endereco enderecoFinal = this.enderecoRepository.findById(endereco.getIdEndereco());

        //Separa apenas os campos que podem ser alterados
        enderecoFinal.setCep(endereco.getCep());
        enderecoFinal.setCidade(endereco.getCidade());
        enderecoFinal.setEstado(endereco.getEstado());
        enderecoFinal.setBairro(endereco.getBairro());
        enderecoFinal.setRua(endereco.getRua());
        enderecoFinal.setNumero(endereco.getNumero());
        enderecoFinal.setComplemento(endereco.getComplemento());

        return(this.enderecoRepository.save(enderecoFinal));
    }

    public Endereco desligarEndereco(long idEndereco){
        //valida se o usuário existe
        if(!this.enderecoRepository.existsById(idEndereco)){
            logger.warning("Desligamento nao efetivado: Endereco nao localizado");
            return(null);
        }

        Endereco enderecoFinal = this.enderecoRepository.findById(idEndereco);

        enderecoFinal.setStatus("Inativo");

        return(this.enderecoRepository.save(enderecoFinal));
    }

    public Endereco ativarEndereco(long idEndereco){
        //valida se o usuário existe
        if(!this.enderecoRepository.existsById(idEndereco)){
            return(null);
        }

        Endereco enderecoFinal = this.enderecoRepository.findById(idEndereco);

        //Valida se o usuário já foi desligado
        if(!enderecoFinal.getStatus().equals("Inativo")){
            logger.warning("Ativacao nao efetivada: Status 'Inativo' nao localizado");
        }

        enderecoFinal.setStatus("Ativo");

        return(this.enderecoRepository.save(enderecoFinal));
    }

}
