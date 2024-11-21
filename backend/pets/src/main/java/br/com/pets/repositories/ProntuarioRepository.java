package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Prontuario;

@Repository
public interface ProntuarioRepository extends JpaRepository<Prontuario,Long> {
    Prontuario findById(long idPronturario);
    @SuppressWarnings("null")
    @Override
    List<Prontuario> findAll();
}
