package br.com.pets.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import br.com.pets.models.ListaMedicamentoProntuario;
import br.com.pets.repositories.ListaMedicamentoProntuarioRepository;
import br.com.pets.repositories.MedicamentoRepository;
import br.com.pets.repositories.ProntuarioRepository;

@Service
public class ListaMedicamentoProntuarioService {
    Logger logger = Logger.getLogger(ListaMedicamentoProntuarioService.class.getName());
    private final ListaMedicamentoProntuarioRepository listaMedicamentoProntuarioRepository;
    private final MedicamentoRepository medicamentoRepository;
    private final ProntuarioRepository prontuarioRepository;

    public ListaMedicamentoProntuarioService(ListaMedicamentoProntuarioRepository listaMedicamentoProntuarioRepository,MedicamentoRepository medicamentoRepository,ProntuarioRepository prontuarioRepository){
        this.listaMedicamentoProntuarioRepository = listaMedicamentoProntuarioRepository;
        this.medicamentoRepository = medicamentoRepository;
        this.prontuarioRepository = prontuarioRepository;
    }

    public List<ListaMedicamentoProntuario> consultarListaMedicamentoProntuarios(){
        return(this.listaMedicamentoProntuarioRepository.findAll());
    }

    public ListaMedicamentoProntuario consultarListaMedicamentoProntuario(long idListaMedicamentoProntuario){
        return(this.listaMedicamentoProntuarioRepository.findById(idListaMedicamentoProntuario));
    }

    public ListaMedicamentoProntuario salvarListaMedicamentoProntuario(ListaMedicamentoProntuario listaMedicamentoProntuario){
        //Valida se já existe alguem com o id notificado
        if(this.listaMedicamentoProntuarioRepository.existsById(listaMedicamentoProntuario.getIdListaMedicamentoProntuario())){
            logger.warning("Erro ao salvar a ListaMedicamentoProntuario: lista existente <" + listaMedicamentoProntuario.getIdListaMedicamentoProntuario() + ">");
            return(null);
        }
        //Valida se já existe o Medicamento notificado
        if(!this.medicamentoRepository.existsById(listaMedicamentoProntuario.getIdMedicamento())){
            logger.warning("Erro ao salvar a ListaMedicamentoProntuario: medicamento nao localizado <" + listaMedicamentoProntuario.getIdMedicamento() + ">");
            return(null);
        }
        //Valida se já existe o Prontuario notificado
        if(!this.prontuarioRepository.existsById(listaMedicamentoProntuario.getIdProntuario())){
            logger.warning("Erro ao salvar a ListaMedicamentoProntuario: prontuario nao localizado <" + listaMedicamentoProntuario.getIdProntuario() + ">");
            return(null);
        }

        //Id do listaMedicamentoProntuario, por ser forma sequencial é desconsiderado o valor enviado
        listaMedicamentoProntuario.setIdListaMedicamentoProntuario(-1L);
        listaMedicamentoProntuario.setDataCriacao(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")),DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")));

        return(this.listaMedicamentoProntuarioRepository.save(listaMedicamentoProntuario));
    }

    public ListaMedicamentoProntuario alterarListaMedicamentoProntuario(ListaMedicamentoProntuario listaMedicamentoProntuario){
        //Valida se existe o ID para ser atualizado
        if(!this.listaMedicamentoProntuarioRepository.existsById(listaMedicamentoProntuario.getIdListaMedicamentoProntuario())){
            return(null);
        }
        //Valida se já existe o Medicamento notificado
        if(!this.medicamentoRepository.existsById(listaMedicamentoProntuario.getIdMedicamento())){
            logger.warning("Erro ao atualizar a ListaMedicamentoProntuario: medicamento nao localizado <" + listaMedicamentoProntuario.getIdMedicamento() + ">");
            return(null);
        }
        //Valida se já existe o Prontuario notificado
        if(!this.prontuarioRepository.existsById(listaMedicamentoProntuario.getIdProntuario())){
            logger.warning("Erro ao atualizar a ListaMedicamentoProntuario: prontuario nao localizado <" + listaMedicamentoProntuario.getIdProntuario() + ">");
            return(null);
        }

        ListaMedicamentoProntuario listaMedicamentoProntuarioFinal = this.listaMedicamentoProntuarioRepository.findById(listaMedicamentoProntuario.getIdListaMedicamentoProntuario());

        //Separa apenas os campos que podem ser alterados
        listaMedicamentoProntuarioFinal.setIdMedicamento(listaMedicamentoProntuario.getIdMedicamento());
        listaMedicamentoProntuarioFinal.setIdProntuario(listaMedicamentoProntuario.getIdProntuario());

        return(this.listaMedicamentoProntuarioRepository.save(listaMedicamentoProntuarioFinal));
    }

    public boolean deletarListaMedicamentoProntuario(long idListaMedicamentoProntuario){
        //valida se a listaMedicamentoProntuario existe
        if(listaMedicamentoProntuarioRepository.existsById(idListaMedicamentoProntuario)){
            listaMedicamentoProntuarioRepository.deleteById(idListaMedicamentoProntuario);
            return(!listaMedicamentoProntuarioRepository.existsById(idListaMedicamentoProntuario));
        }
        return(false);
    }
}
