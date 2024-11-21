package br.com.pets.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    Agendamento findById(long idAgendamento);
    @SuppressWarnings("null")
    @Override
    List<Agendamento> findAll();    

    List<Agendamento> findByDataAgendamento(LocalDate dataAgendamento);    
    boolean existsByDataAgendamentoAndHoraAgendamento(LocalDate dataAgendamento, LocalTime horaAgendamento);
    List<Agendamento> findByDataAgendamentoAndHoraAgendamento(LocalDate dataAgendamento, LocalTime horaAgendamento);        
}
