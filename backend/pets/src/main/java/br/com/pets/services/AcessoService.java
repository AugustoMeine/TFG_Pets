package br.com.pets.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import br.com.pets.models.Acesso;
import br.com.pets.repositories.AcessoRepository;
import br.com.pets.repositories.UsuarioRepository;

@Service
public class AcessoService {

    Logger logger = Logger.getLogger(AcessoService.class.getName());
    private final AcessoRepository acessoRepository;
    private final UsuarioRepository usuarioRepository;

    public AcessoService(AcessoRepository acessoRepository,UsuarioRepository usuarioRepository){
        this.acessoRepository = acessoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Acesso> consultarAcessos(){
        return(this.acessoRepository.findAll());
    }

    public Acesso consultarAcesso(long idAcesso){
        return(this.acessoRepository.findById(idAcesso));
    }

    public Acesso consultarAcessoUsuario(long idUsuario){
        return(this.acessoRepository.findByIdUsuario(idUsuario));
    }

    public Acesso salvarAcesso(Acesso acesso){
        //Valida se já existe alguem com o usuário notificado
        if(this.acessoRepository.existsById(acesso.getIdAcesso())){
            logger.info("Acesso ja cadastrado");
            return(null);
        }

        if(!this.usuarioRepository.existsById(acesso.getIdUsuario())){
            logger.info("Usuario nao encontrado");
            return(null);
        }

        if(this.acessoRepository.existsByIdUsuario(acesso.getIdUsuario())){
            logger.info("Usuario ja possui acesso cadastrado");
            return(null);
        }

        //Referente ao Id do acesso, por ser forma sequencial é desconsiderado o valor enviado
        acesso.setIdAcesso(-1L);        

        return(this.acessoRepository.save(acesso));
    }

    public Acesso alterarAcesso(Acesso acesso){
        if(!this.acessoRepository.existsById(acesso.getIdAcesso())){
            return(null);
        }

        Acesso acessoFinal = this.acessoRepository.findById(acesso.getIdAcesso());

        //Separa apenas os campos que podem ser alterados
        acessoFinal.setAcessoAdministrador(acesso.getAcessoAdministrador());
        acessoFinal.setAcessoMedicoVeterinario(acesso.getAcessoMedicoVeterinario());
        acessoFinal.setAcessoAtendente(acesso.getAcessoAtendente());

        return(this.acessoRepository.save(acessoFinal));
    }

}
