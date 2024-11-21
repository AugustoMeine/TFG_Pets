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

import br.com.pets.models.Animal;
import br.com.pets.services.AnimalService;

@RestController
@RequestMapping("/Animal")
@CrossOrigin(origins = {"*"})
public class AnimalController {
    
    private final AnimalService animalService;

    public AnimalController(AnimalService animalService){
        this.animalService = animalService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Animal>> lerAnimals(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.animalService.consultarAnimals()));
    }

    @GetMapping("/{idAnimal}")
    public ResponseEntity<Animal> lerAnimal(@PathVariable long idAnimal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.animalService.consultarAnimal(idAnimal)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Animal> salvarAnimal(@RequestBody Animal animal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.animalService.salvarAnimal(animal)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<Animal> atualizarAnimal(@RequestBody Animal animal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.animalService.alterarAnimal(animal)));
    }

    @GetMapping("/Desligar/{idAnimal}")
    public ResponseEntity<Animal> desligarAnimal(@PathVariable long idAnimal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.animalService.desligarAnimal(idAnimal)));
    }

    @GetMapping("/Ativar/{idAnimal}")
    public ResponseEntity<Animal> ativarAnimal(@PathVariable long idAnimal){
        return(ResponseEntity.status(HttpStatus.OK).body(this.animalService.ativarAnimal(idAnimal)));
    }

}
