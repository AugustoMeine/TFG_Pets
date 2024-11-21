package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Medicamento;

@Repository
public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

    Medicamento findById(long idMedicamento);
    @SuppressWarnings("null")
    @Override
    List<Medicamento> findAll();

}
