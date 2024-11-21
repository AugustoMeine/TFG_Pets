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

import br.com.pets.models.Endereco;
import br.com.pets.services.EnderecoService;

@RestController
@RequestMapping("/Endereco")
@CrossOrigin(origins = {"*"})
public class EnderecoController {

    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService){
        this.enderecoService = enderecoService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Endereco>> lerEnderecos(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.enderecoService.consultarEnderecos()));
    }

    @GetMapping("/{idEndereco}")
    public ResponseEntity<Endereco> lerEndereco(@PathVariable long idEndereco){
        return(ResponseEntity.status(HttpStatus.OK).body(this.enderecoService.consultarEndereco(idEndereco)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Endereco> salvarEndereco(@RequestBody Endereco endereco){
        return(ResponseEntity.status(HttpStatus.OK).body(this.enderecoService.salvarEndereco(endereco)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<Endereco> atualizarEndereco(@RequestBody Endereco endereco){
        return(ResponseEntity.status(HttpStatus.OK).body(this.enderecoService.alterarEndereco(endereco)));
    }

    @GetMapping("/Desligar/{idEndereco}")
    public ResponseEntity<Endereco> desligarEndereco(@PathVariable long idEndereco){
        return(ResponseEntity.status(HttpStatus.OK).body(this.enderecoService.desligarEndereco(idEndereco)));
    }

    @GetMapping("/Ativar/{idEndereco}")
    public ResponseEntity<Endereco> ativarEndereco(@PathVariable long idEndereco){
        return(ResponseEntity.status(HttpStatus.OK).body(this.enderecoService.ativarEndereco(idEndereco)));
    }

}
