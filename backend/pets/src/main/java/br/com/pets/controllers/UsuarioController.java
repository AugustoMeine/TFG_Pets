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

import br.com.pets.models.Usuario;
import br.com.pets.services.UsuarioService;

@RestController
@RequestMapping("/Usuario")
@CrossOrigin(origins = {"*"})
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Usuario>> lerUsuarios(){
        return(ResponseEntity.status(HttpStatus.OK).body(usuarioService.consultarUsuarios()));
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<Usuario> lerUsuario(@PathVariable long idUsuario){
        return(ResponseEntity.status(HttpStatus.OK).body(usuarioService.consultarUsuario(idUsuario)));
    }

    @GetMapping("/Login/{login}/{senha}")
    public ResponseEntity<Usuario> validarLogin(@PathVariable String login, @PathVariable String senha){
        return(ResponseEntity.status(HttpStatus.OK).body(usuarioService.validarLogin(login,senha)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario){
        return(ResponseEntity.status(HttpStatus.OK).body(usuarioService.salvarUsuario(usuario)));
    }

    @PutMapping({"/",""})
    public ResponseEntity<Usuario> atualizarUsuario(@RequestBody Usuario usuario){
        return(ResponseEntity.status(HttpStatus.OK).body(usuarioService.alterarUsuario(usuario)));
    }

    @GetMapping("/Desligar/{idUsuario}")
    public ResponseEntity<Usuario> desligarUsuario(@PathVariable long idUsuario){
        return(ResponseEntity.status(HttpStatus.OK).body(usuarioService.desligarUsuario(idUsuario)));
    }

    @GetMapping("/Ativar/{idUsuario}")
    public ResponseEntity<Usuario> ativarUsuario(@PathVariable long idUsuario){
        return(ResponseEntity.status(HttpStatus.OK).body(usuarioService.ativarUsuario(idUsuario)));
    }

    
}
