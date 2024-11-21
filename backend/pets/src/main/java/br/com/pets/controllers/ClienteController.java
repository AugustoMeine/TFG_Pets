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

import br.com.pets.models.Cliente;
import br.com.pets.services.ClienteService;

@RestController
@RequestMapping("/Cliente")
@CrossOrigin(origins = {"*"})
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService){
        this.clienteService = clienteService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Cliente>> lerClientes(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.clienteService.consultarClientes()));
    }

    @GetMapping("/{idCliente}")
    public ResponseEntity<Cliente> lerCliente(@PathVariable long idCliente){
        return(ResponseEntity.status(HttpStatus.OK).body(this.clienteService.consultarCliente(idCliente)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Cliente> salvarCliente(@RequestBody Cliente cliente){
        return(ResponseEntity.status(HttpStatus.OK).body(this.clienteService.salvarCliente(cliente)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<Cliente> atualizarCliente(@RequestBody Cliente cliente){
        return(ResponseEntity.status(HttpStatus.OK).body(this.clienteService.alterarCliente(cliente)));
    }

    @GetMapping("/Desligar/{idCliente}")
    public ResponseEntity<Cliente> desligarCliente(@PathVariable long idCliente){
        return(ResponseEntity.status(HttpStatus.OK).body(this.clienteService.desligarCliente(idCliente)));
    }

    @GetMapping("/Ativar/{idCliente}")
    public ResponseEntity<Cliente> ativarCliente(@PathVariable long idCliente){
        return(ResponseEntity.status(HttpStatus.OK).body(this.clienteService.ativarCliente(idCliente)));
    }

}
