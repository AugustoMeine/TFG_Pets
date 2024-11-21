package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.ListaClienteAnimal;

@Repository
public interface ListaClienteAnimalRepository extends JpaRepository<ListaClienteAnimal,Long> {
    ListaClienteAnimal findById(long idListaClienteAnimal);
    @SuppressWarnings("null")
    @Override
    List<ListaClienteAnimal> findAll();
}
