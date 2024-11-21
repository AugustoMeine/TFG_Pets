package br.com.pets.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import br.com.pets.models.Usuario;
import br.com.pets.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    Logger logger = Logger.getLogger(UsuarioService.class.getName());
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> consultarUsuarios(){
        return(usuarioRepository.findAll());
    }

    public Usuario consultarUsuario(long idUsuario){
        return(usuarioRepository.findById(idUsuario));
    }

    public Usuario validarLogin(String login, String senha){
        return(usuarioRepository.validarAcessoUsuario(login,senha));
    };

    public Usuario salvarUsuario(Usuario usuario){
        //Valida se já existe alguem com o usuário notificado
        if(usuarioRepository.existsByEmail(usuario.getEmail())){
            return(null);
        }

        usuario.setIdUsuario(-1L);
        usuario.setDataCriacao(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")),DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")));
        usuario.setDataEncerramento(LocalDateTime.of(3000,12,31,23,59,59));
        usuario.setStatus("Ativo");

        return(usuarioRepository.save(usuario));
    }

    public Usuario alterarUsuario(Usuario usuario){
        if(!usuarioRepository.existsById(usuario.getIdUsuario())){
            return(null);
        }

        Usuario usuarioFinal = usuarioRepository.findById(usuario.getIdUsuario());

        //Separa apenas os campos que podem ser alterados
        usuarioFinal.setEmail(usuario.getEmail());
        usuarioFinal.setNome(usuario.getNome());
        usuarioFinal.setSenha(usuario.getSenha());

        return(usuarioRepository.save(usuarioFinal));
    }

    public boolean deletarUsuario(long idUsuario){
        //valida se o usuário existe
        if(usuarioRepository.existsById(idUsuario)){
            usuarioRepository.deleteById(idUsuario);
            return(!usuarioRepository.existsById(idUsuario));
        }
        return(false);
    }

    public Usuario desligarUsuario(long idUsuario){
        //valida se o usuário existe
        if(!usuarioRepository.existsById(idUsuario)){
            logger.warning("Desligamento nao efetivado: Usuario nao localizado");
            return(null);
        }

        Usuario usuarioFinal = usuarioRepository.findById(idUsuario);

        usuarioFinal.setDataEncerramento(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")),DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")));
        usuarioFinal.setStatus("Inativo");

        return(usuarioRepository.save(usuarioFinal));
    }

    public Usuario ativarUsuario(long idUsuario){
        //valida se o usuário existe
        if(!usuarioRepository.existsById(idUsuario)){
            return(null);
        }

        Usuario usuarioFinal = usuarioRepository.findById(idUsuario);

        //Valida se o usuário já foi desligado
        if(!usuarioFinal.getStatus().equals("Inativo")){
            logger.warning("Ativacao nao efetivada: Status 'Inativo' nao localizado");
        }

        usuarioFinal.setDataEncerramento(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")),DateTimeFormatter.ofPattern("dd/MM/uuuu HH:mm:ss")));
        usuarioFinal.setStatus("Ativo");

        return(usuarioRepository.save(usuarioFinal));
    }

}
