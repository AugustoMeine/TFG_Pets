package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.ListaMedicamentoProntuario;

@Repository
public interface ListaMedicamentoProntuarioRepository extends JpaRepository<ListaMedicamentoProntuario,Long> {
    ListaMedicamentoProntuario findById(long idListaMedicamentoProntuario);
    @SuppressWarnings("null")
    @Override
    List<ListaMedicamentoProntuario> findAll();
}
