package br.com.pets.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pets.models.Prontuario;
import br.com.pets.services.ProntuarioService;

@RestController
@RequestMapping("/Prontuario")
@CrossOrigin(origins = {"*"})
public class ProntuarioController {

    private final ProntuarioService prontuarioService;

    public ProntuarioController(ProntuarioService prontuarioService){
        this.prontuarioService = prontuarioService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Prontuario>> lerProntuarios(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.prontuarioService.consultarProntuarios()));
    }

    @GetMapping("/{idProntuario}")
    public ResponseEntity<Prontuario> lerProntuario(@PathVariable long idProntuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.prontuarioService.consultarProntuario(idProntuario)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Prontuario> salvarProntuario(@RequestBody Prontuario prontuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.prontuarioService.salvarProntuario(prontuario)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<Prontuario> atualizarProntuario(@RequestBody Prontuario prontuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.prontuarioService.alterarProntuario(prontuario)));
    }

    @GetMapping("/Desligar/{idProntuario}")
    public ResponseEntity<Prontuario> desligarProntuario(@PathVariable long idProntuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.prontuarioService.desligarProntuario(idProntuario)));
    }

    @GetMapping("/Ativar/{idProntuario}")
    public ResponseEntity<Prontuario> ativarProntuario(@PathVariable long idProntuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.prontuarioService.ativarProntuario(idProntuario)));
    }

}
