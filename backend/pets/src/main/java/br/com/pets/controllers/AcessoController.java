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

import br.com.pets.models.Acesso;
import br.com.pets.services.AcessoService;

@RestController
@RequestMapping("/Acesso")
@CrossOrigin(origins = {"*"})
public class AcessoController {

    private final AcessoService acessoService;

    public AcessoController(AcessoService acessoService){
        this.acessoService = acessoService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Acesso>> lerAcessos(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.acessoService.consultarAcessos()));
    }

    @GetMapping("/{idAcesso}")
    public ResponseEntity<Acesso> lerAcesso(@PathVariable long idAcesso){
        return(ResponseEntity.status(HttpStatus.OK).body(this.acessoService.consultarAcesso(idAcesso)));
    }

    @GetMapping("/Usuario/{idUsuario}")
    public ResponseEntity<Acesso> lerAcessoUsuario(@PathVariable long idUsuario){
        return(ResponseEntity.status(HttpStatus.OK).body(this.acessoService.consultarAcessoUsuario(idUsuario)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Acesso> salvarAcesso(@RequestBody Acesso acesso){
        return(ResponseEntity.status(HttpStatus.OK).body(this.acessoService.salvarAcesso(acesso)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<Acesso> atualizarAcesso(@RequestBody Acesso acesso){
        return(ResponseEntity.status(HttpStatus.OK).body(this.acessoService.alterarAcesso(acesso)));
    }

}
