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

import br.com.pets.models.ListaClienteAnimal;
import br.com.pets.services.ListaClienteAnimalService;

@RestController
@RequestMapping("/ListaClienteAnimal")
@CrossOrigin(origins = {"*"})
public class ListaClienteAnimalController {

    private final ListaClienteAnimalService listaClienteAnimalService;

    public ListaClienteAnimalController(ListaClienteAnimalService listaClienteAnimalService){
        this.listaClienteAnimalService = listaClienteAnimalService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<ListaClienteAnimal>> lerListaClienteAnimals(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaClienteAnimalService.consultarListaClienteAnimals()));
    }

    @GetMapping("/{idListaClienteAnimal}")
    public ResponseEntity<ListaClienteAnimal> lerListaClienteAnimal(@PathVariable long idListaClienteAnimal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaClienteAnimalService.consultarListaClienteAnimal(idListaClienteAnimal)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<ListaClienteAnimal> salvarListaClienteAnimal(@RequestBody ListaClienteAnimal listaClienteAnimal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaClienteAnimalService.salvarListaClienteAnimal(listaClienteAnimal)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<ListaClienteAnimal> atualizarListaClienteAnimal(@RequestBody ListaClienteAnimal listaClienteAnimal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.listaClienteAnimalService.alterarListaClienteAnimal(listaClienteAnimal)));
    }

}
