package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal,Long> {

    Animal findById(long idAnimal);
    @SuppressWarnings("null")
    @Override
    List<Animal> findAll();

}
