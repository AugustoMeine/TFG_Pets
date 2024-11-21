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

import br.com.pets.models.ListaMedicamentoProntuario;
import br.com.pets.services.ListaMedicamentoProntuarioService;

@RestController
@RequestMapping("/ListaMedicamentoProntuario")
@CrossOrigin(origins = {"*"})
public class ListaMedicamentoProntuarioController {
    private final ListaMedicamentoProntuarioService listaMedicamentoProntuarioService;

    public ListaMedicamentoProntuarioController(ListaMedicamentoProntuarioService listaMedicamentoProntuarioService){
        this.listaMedicamentoProntuarioService = listaMedicamentoProntuarioService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<ListaMedicamentoProntuario>> lerListaMedicamentoProntuarios(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaMedicamentoProntuarioService.consultarListaMedicamentoProntuarios()));
    }

    @GetMapping("/{idListaMedicamentoProntuario}")
    public ResponseEntity<ListaMedicamentoProntuario> lerListaMedicamentoProntuario(@PathVariable long idListaMedicamentoProntuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaMedicamentoProntuarioService.consultarListaMedicamentoProntuario(idListaMedicamentoProntuario)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<ListaMedicamentoProntuario> salvarListaMedicamentoProntuario(@RequestBody ListaMedicamentoProntuario listaMedicamentoProntuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaMedicamentoProntuarioService.salvarListaMedicamentoProntuario(listaMedicamentoProntuario)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<ListaMedicamentoProntuario> atualizarListaMedicamentoProntuario(@RequestBody ListaMedicamentoProntuario listaMedicamentoProntuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaMedicamentoProntuarioService.alterarListaMedicamentoProntuario(listaMedicamentoProntuario)));
    }

    @GetMapping("/Excluir/{idListaMedicamentoProntuario}")
    public ResponseEntity<Boolean> ativarUsuario(@PathVariable long idListaMedicamentoProntuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaMedicamentoProntuarioService.deletarListaMedicamentoProntuario(idListaMedicamentoProntuario)));
    }
}
