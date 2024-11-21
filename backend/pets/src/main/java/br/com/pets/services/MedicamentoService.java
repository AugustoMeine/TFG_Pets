package br.com.pets.services;

import br.com.pets.models.Medicamento;
import br.com.pets.repositories.MedicamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class MedicamentoService {

    Logger logger = Logger.getLogger(MedicamentoService.class.getName());
    private final MedicamentoRepository medicamentoRepository;

    public MedicamentoService(MedicamentoRepository medicamentoRepository){
        this.medicamentoRepository = medicamentoRepository;
    }

    public List<Medicamento> consultarMedicamentos(){
        return(this.medicamentoRepository.findAll());
    }

    public Medicamento consultarMedicamento(long idMedicamento){
        return(this.medicamentoRepository.findById(idMedicamento));
    }

    public Medicamento salvarMedicamento(Medicamento medicamento){
        //Valida se já existe alguem com o usuário notificado
        if(this.medicamentoRepository.existsById(medicamento.getIdMedicamento())){
            return(null);
        }

        //Id do medicamento, por ser forma sequencial é desconsiderado o valor enviado
        medicamento.setIdMedicamento(-1L);
        medicamento.setStatus("Ativo");

        return(this.medicamentoRepository.save(medicamento));
    }

    public Medicamento alterarMedicamento(Medicamento medicamento){
        if(!this.medicamentoRepository.existsById(medicamento.getIdMedicamento())){
            return(null);
        }

        Medicamento medicamentoFinal = this.medicamentoRepository.findById(medicamento.getIdMedicamento());

        //Separa apenas os campos que podem ser alterados
        medicamentoFinal.setNome(medicamento.getNome());
        medicamentoFinal.setPrincipioAtivo(medicamento.getPrincipioAtivo());
        medicamentoFinal.setFabricante(medicamento.getFabricante());

        return(this.medicamentoRepository.save(medicamentoFinal));
    }

    public Medicamento desligarMedicamento(long idMedicamento){
        //valida se o usuário existe
        if(!this.medicamentoRepository.existsById(idMedicamento)){
            logger.warning("Desligamento nao efetivado: Medicamento nao localizado");
            return(null);
        }

        Medicamento medicamentoFinal = this.medicamentoRepository.findById(idMedicamento);

        medicamentoFinal.setStatus("Inativo");

        return(this.medicamentoRepository.save(medicamentoFinal));
    }

    public Medicamento ativarMedicamento(long idMedicamento){
        //valida se o usuário existe
        if(!this.medicamentoRepository.existsById(idMedicamento)){
            return(null);
        }

        Medicamento medicamentoFinal = this.medicamentoRepository.findById(idMedicamento);

        //Valida se o usuário já foi desligado
        if(!medicamentoFinal.getStatus().equals("Inativo")){
            logger.warning("Ativacao nao efetivada: Status 'Inativo' nao localizado");
        }

        medicamentoFinal.setStatus("Ativo");

        return(this.medicamentoRepository.save(medicamentoFinal));
    }

}
