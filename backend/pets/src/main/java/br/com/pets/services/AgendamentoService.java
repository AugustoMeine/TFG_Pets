package br.com.pets.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.pets.models.Agendamento;
import br.com.pets.repositories.AgendamentoRepository;
import br.com.pets.repositories.AnimalRepository;
import br.com.pets.repositories.ClienteRepository;

@Service
public class AgendamentoService {
    
    @SuppressWarnings("NonConstantLogger")
    Logger logger = Logger.getLogger(AgendamentoService.class.getName());
    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final AnimalRepository  animalRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository, ClienteRepository clienteRepository, AnimalRepository animalRepository){
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.animalRepository = animalRepository;
    }

    public List<Agendamento> consultarAgendamentos(){
        return(agendamentoRepository.findAll());
    }

    public List<Agendamento> consultarAgendamentosDatas(LocalDate dataAgendamento) {
        List<Agendamento> agendamentos = agendamentoRepository.findByDataAgendamento(dataAgendamento);
        return agendamentos.stream()
                .filter(agendamento -> "Pendente".equals(agendamento.getStatus()))
                .sorted(Comparator.comparing(Agendamento::getHoraAgendamento))
                .collect(Collectors.toList());
    }

    public List<String> consultarAgendamentosDisponiveisDatas(LocalDate dataAgendamento) {
        List<String> horariosDisponiveis = new ArrayList<>();
        int totalIntervalos = (24 * 60) / 15; // Total de intervalos de 15 minutos em um dia
    
        for (int i = 0; i < totalIntervalos; i++) {
            LocalTime horaAtual = LocalTime.of(0, 0).plusMinutes(i * 15);
            
            if (!agendamentoRepository.existsByDataAgendamentoAndHoraAgendamento(dataAgendamento, horaAtual)) {
                horariosDisponiveis.add(horaAtual+"");
            }
            //Pode até existir, mas não é impeditivo caso tenha o status diferente de "Pendente"
            if(agendamentoRepository.existsByDataAgendamentoAndHoraAgendamento(dataAgendamento, horaAtual)){
                List<Agendamento> agendamentoAux = agendamentoRepository.findByDataAgendamentoAndHoraAgendamento(dataAgendamento, horaAtual);                
                if (!agendamentoAux.stream().anyMatch(agendamento -> agendamento.getStatus().equalsIgnoreCase("Pendente"))) {
                    horariosDisponiveis.add(horaAtual + "");
                }
            }
        }
    
        return horariosDisponiveis;
    }

    public Agendamento consultarAgendamento(long idAgendamento){
        return(agendamentoRepository.findById(idAgendamento));
    }    

    public Agendamento salvarAgendamento(Agendamento agendamento){
        //Valida se já existe alguem com o usuário notificado
        if(agendamentoRepository.existsById(agendamento.getIdAgendamento())){
            return(null);
        }

        if(!clienteRepository.existsById(agendamento.getIdCliente())){
            logger.warning("Agendamento nao efetivado: Cliente nao localizado");
            return(null);
        }
        
        if(!animalRepository.existsById(agendamento.getIdAnimal())){
            logger.warning("Agendamento nao efetivado: Animal nao localizado");
            return(null);
        }

        if(agendamentoRepository.existsByDataAgendamentoAndHoraAgendamento(agendamento.getDataAgendamento(), agendamento.getHoraAgendamento())){
            List<Agendamento> agendamentoAux = agendamentoRepository.findByDataAgendamentoAndHoraAgendamento(agendamento.getDataAgendamento(), agendamento.getHoraAgendamento());
            for (Agendamento aux : agendamentoAux) {                    
                if(aux.getStatus().equalsIgnoreCase("Pendente")){
                    logger.warning("Agendamento nao efetivado: Data e hora indisponiveis");
                    return(null);
                }
            }
        }

        agendamento.setIdAgendamento(-1L);
        agendamento.setStatus("Pendente");

        return(agendamentoRepository.save(agendamento));
    }

    public Agendamento cancelarAgendamento(long idAgendamento){
        //valida se o usuário existe
        if(!agendamentoRepository.existsById(idAgendamento)){
            logger.warning("Cancelamento nao efetivado: Agendamento nao localizado");
            return(null);
        }

        Agendamento agendamentoFinal = agendamentoRepository.findById(idAgendamento);

        agendamentoFinal.setStatus("Cancelado");

        return(agendamentoRepository.save(agendamentoFinal));
    }

    public Agendamento efetivarAgendamento(long idAgendamento){
        //valida se o usuário existe
        if(!agendamentoRepository.existsById(idAgendamento)){
            logger.warning("Efetivacao nao efetivada: Agendamento nao localizado");
            return(null);
        }

        Agendamento agendamentoFinal = agendamentoRepository.findById(idAgendamento);

        agendamentoFinal.setStatus("Efetivado");

        return(agendamentoRepository.save(agendamentoFinal));
    }

}
