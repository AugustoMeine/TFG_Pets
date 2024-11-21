package br.com.pets.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pets.models.Agendamento;
import br.com.pets.services.AgendamentoService;

@RestController
@RequestMapping("/Agendamento")
@CrossOrigin(origins = {"*"})
public class AgendamentoController {
    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService){
        this.agendamentoService = agendamentoService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Agendamento>> lerAgendamentos(){
        return(ResponseEntity.status(HttpStatus.OK).body(agendamentoService.consultarAgendamentos()));
    }

    @GetMapping("/Data/{dataAgendamento}")
    public ResponseEntity<List<Agendamento>> lerAgendamentosData(@PathVariable LocalDate dataAgendamento){
        return(ResponseEntity.status(HttpStatus.OK).body(agendamentoService.consultarAgendamentosDatas(dataAgendamento)));
    }

    @GetMapping("/Hora/Disponivel/{dataAgendamento}")
    public ResponseEntity<List<String>> lerAgendamentosDisponiveisData(@PathVariable LocalDate dataAgendamento){
        return(ResponseEntity.status(HttpStatus.OK).body(agendamentoService.consultarAgendamentosDisponiveisDatas(dataAgendamento)));
    }

    @GetMapping("/{idAgendamento}")
    public ResponseEntity<Agendamento> lerAgendamento(@PathVariable long idAgendamento){
        return(ResponseEntity.status(HttpStatus.OK).body(agendamentoService.consultarAgendamento(idAgendamento)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Agendamento> salvarAgendamento(@RequestBody Agendamento agendamento){
        return(ResponseEntity.status(HttpStatus.OK).body(agendamentoService.salvarAgendamento(agendamento)));
    }

    @GetMapping("/Efetivar/{idAgendamento}")
    public ResponseEntity<Agendamento> efetivarAgendamento(@PathVariable long idAgendamento){
        return(ResponseEntity.status(HttpStatus.OK).body(agendamentoService.efetivarAgendamento(idAgendamento)));
    }

    @GetMapping("/Cancelar/{idAgendamento}")
    public ResponseEntity<Agendamento> cancelarAgendamento(@PathVariable long idAgendamento){
        return(ResponseEntity.status(HttpStatus.OK).body(agendamentoService.cancelarAgendamento(idAgendamento)));
    }
}
