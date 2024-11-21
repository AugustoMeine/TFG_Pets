package br.com.pets.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "LISTA_CLIENTE_ANIMAL")
public class ListaClienteAnimal {

    @Id
    @Column(name = "ID_LISTA_CLIENTE_ANIMAL", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idListaClienteAnimal;

    @Column(name = "ID_CLIENTE", nullable = false)
    private long idCliente;

    @Column(name = "ID_ANIMAL", nullable = false)
    private long idAnimal;

    @Column(name = "DATA_CRIACAO", nullable = false)
    private LocalDateTime dataCriacao;

    public ListaClienteAnimal() {
    }

    public ListaClienteAnimal(long idListaClienteAnimal, long idCliente, long idAnimal, LocalDateTime dataCriacao) {
        this.idListaClienteAnimal = idListaClienteAnimal;
        this.idCliente = idCliente;
        this.idAnimal = idAnimal;
        this.dataCriacao = dataCriacao;
    }

    public long getIdListaClienteAnimal() {
        return idListaClienteAnimal;
    }

    public void setIdListaClienteAnimal(long idListaClienteAnimal) {
        this.idListaClienteAnimal = idListaClienteAnimal;
    }

    public long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(long idCliente) {
        this.idCliente = idCliente;
    }

    public long getIdAnimal() {
        return idAnimal;
    }

    public void setIdAnimal(long idAnimal) {
        this.idAnimal = idAnimal;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
