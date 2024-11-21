package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Acesso;

@Repository
public interface AcessoRepository extends JpaRepository<Acesso, Long>{
    Acesso findById(long idAcesso);
    Acesso findByIdUsuario(long idUsuario);
    @SuppressWarnings("null")
    @Override
    List<Acesso> findAll();  
    boolean existsByIdUsuario(long idUsuario);
}
