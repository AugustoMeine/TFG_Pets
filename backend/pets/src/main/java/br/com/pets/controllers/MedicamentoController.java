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

import br.com.pets.models.Medicamento;
import br.com.pets.services.MedicamentoService;

@RestController
@RequestMapping("/Medicamento")
@CrossOrigin(origins = {"*"})
public class MedicamentoController {

    private final MedicamentoService medicamentoService;

    public MedicamentoController(MedicamentoService medicamentoService){
        this.medicamentoService = medicamentoService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Medicamento>> lerMedicamentos(){
        return(ResponseEntity.status(HttpStatus.OK).body(this.medicamentoService.consultarMedicamentos()));
    }

    @GetMapping("/{idMedicamento}")
    public ResponseEntity<Medicamento> lerMedicamento(@PathVariable long idMedicamento){
        return(ResponseEntity.status(HttpStatus.OK).body(this.medicamentoService.consultarMedicamento(idMedicamento)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Medicamento> salvarMedicamento(@RequestBody Medicamento medicamento){
        return(ResponseEntity.status(HttpStatus.OK).body(this.medicamentoService.salvarMedicamento(medicamento)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<Medicamento> atualizarMedicamento(@RequestBody Medicamento medicamento){
        return(ResponseEntity.status(HttpStatus.OK).body(this.medicamentoService.alterarMedicamento(medicamento)));
    }

    @GetMapping("/Desligar/{idMedicamento}")
    public ResponseEntity<Medicamento> desligarMedicamento(@PathVariable long idMedicamento){
        return(ResponseEntity.status(HttpStatus.OK).body(this.medicamentoService.desligarMedicamento(idMedicamento)));
    }

    @GetMapping("/Ativar/{idMedicamento}")
    public ResponseEntity<Medicamento> ativarMedicamento(@PathVariable long idMedicamento){
        return(ResponseEntity.status(HttpStatus.OK).body(this.medicamentoService.ativarMedicamento(idMedicamento)));
    }

}
