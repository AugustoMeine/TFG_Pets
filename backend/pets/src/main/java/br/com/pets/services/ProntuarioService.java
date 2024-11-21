package br.com.pets.services;

import br.com.pets.models.Prontuario;
import br.com.pets.repositories.AnimalRepository;
import br.com.pets.repositories.ProntuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ProntuarioService {

    Logger logger = Logger.getLogger(ProntuarioService.class.getName());
    private final ProntuarioRepository prontuarioRepository;
    private final AnimalRepository animalRepository;

    public ProntuarioService(ProntuarioRepository prontuarioRepository,AnimalRepository animalRepository){
        this.prontuarioRepository = prontuarioRepository;
        this.animalRepository = animalRepository;
    }

    public List<Prontuario> consultarProntuarios(){
        return(this.prontuarioRepository.findAll());
    }

    public Prontuario consultarProntuario(long idProntuario){
        return(this.prontuarioRepository.findById(idProntuario));
    }

    public Prontuario salvarProntuario(Prontuario prontuario){
        //Valida se já existe alguem com o usuário notificado
        if(this.prontuarioRepository.existsById(prontuario.getIdProntuario())){
            logger.warning("Erro ao salvar o prontuario: prontuario possui cadastro no banco <" +prontuario.getIdProntuario()+ ">");
            return(null);
        }

        //Valida se já existe o animal desejado
        if(!this.animalRepository.existsById(prontuario.getIdAnimal())){
            logger.warning("Erro ao salvar o prontuario: Animal nao cadastrado <" +prontuario.getIdAnimal()+ ">");
            return(null);
        }

        //Id do prontuario, por ser forma sequencial é desconsiderado o valor enviado
        prontuario.setIdProntuario(-1L);
        prontuario.setDataCriacao(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")),DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")));
        prontuario.setStatus("Ativo");

        return(this.prontuarioRepository.save(prontuario));
    }

    public Prontuario alterarProntuario(Prontuario prontuario){
        if(!this.prontuarioRepository.existsById(prontuario.getIdProntuario())){
            logger.warning("Erro ao atualizar o prontuario: Prontuario nao cadastrado <" +prontuario.getIdProntuario()+ ">");
            return(null);
        }

        //Valida se já existe o animal desejado
        if(!this.animalRepository.existsById(prontuario.getIdAnimal())){
            logger.warning("Erro ao atualizar o prontuario: Animal nao cadastrado <" +prontuario.getIdAnimal()+ ">");
            return(null);
        }

        Prontuario prontuarioFinal = this.prontuarioRepository.findById(prontuario.getIdProntuario());

        //Separa apenas os campos que podem ser alterados

        prontuarioFinal.setIdAnimal(prontuario.getIdAnimal());
        prontuarioFinal.setTemperatura(prontuario.getTemperatura());
        prontuarioFinal.setFrequenciaCardiaca(prontuario.getFrequenciaCardiaca());
        prontuarioFinal.setSintomas(prontuario.getSintomas());
        prontuarioFinal.setDiagnosticoProvavel(prontuario.getDiagnosticoProvavel());
        prontuarioFinal.setDiagnosticoDefinitivo(prontuario.getDiagnosticoDefinitivo());

        return(this.prontuarioRepository.save(prontuarioFinal));
    }

    public Prontuario desligarProntuario(long idProntuario){
        //valida se o usuário existe
        if(!this.prontuarioRepository.existsById(idProntuario)){
            logger.warning("Desligamento nao efetivado: Prontuario nao localizado");
            return(null);
        }

        Prontuario prontuarioFinal = this.prontuarioRepository.findById(idProntuario);

        prontuarioFinal.setStatus("Inativo");

        return(this.prontuarioRepository.save(prontuarioFinal));
    }

    public Prontuario ativarProntuario(long idProntuario){
        //valida se o usuário existe
        if(!this.prontuarioRepository.existsById(idProntuario)){
            return(null);
        }

        Prontuario prontuarioFinal = this.prontuarioRepository.findById(idProntuario);

        //Valida se o usuário já foi desligado
        if(!prontuarioFinal.getStatus().equals("Inativo")){
            logger.warning("Ativacao nao efetivada: Status 'Inativo' nao localizado");
        }

        prontuarioFinal.setStatus("Ativo");

        return(this.prontuarioRepository.save(prontuarioFinal));
    }

}
