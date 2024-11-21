package br.com.pets.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.pets.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    Cliente findById(long idCliente);
    @SuppressWarnings("null")
    @Override
    List<Cliente> findAll();
    boolean existsByCpf(String cpf);
    boolean existsByRegistroGeral(String registroGeral);
}
