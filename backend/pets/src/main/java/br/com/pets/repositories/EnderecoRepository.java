package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco,Long> {

    Endereco findById(long idEndereco);
    @SuppressWarnings("null")
    @Override
    List<Endereco> findAll();

}
