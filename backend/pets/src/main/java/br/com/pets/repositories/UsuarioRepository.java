package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Usuario findById(long idUsuario);
    @SuppressWarnings("null")
    @Override
    List<Usuario> findAll();

    @Query("SELECT u FROM Usuario u WHERE u.email = :vEmail AND u.senha = :vSenha")
    Usuario validarAcessoUsuario(@Param("vEmail") String vEmail,@Param("vSenha") String vSenha);

    boolean existsByEmail(String email);
}
