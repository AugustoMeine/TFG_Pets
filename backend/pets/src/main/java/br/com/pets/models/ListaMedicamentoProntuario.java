package br.com.pets.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "LISTA_MEDICAMENTO_PRONTUARIO")
public class ListaMedicamentoProntuario {

    @Id
    @Column(name = "ID_LISTA_MEDICAMENTO_PRONTUARIO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idListaMedicamentoProntuario;

    @Column(name = "ID_MEDICAMENTO", nullable = false)
    private long idMedicamento;

    @Column(name = "ID_PRONTUARIO", nullable = false)
    private long idProntuario;

    @Column(name = "DATA_CRIACAO", nullable = false)
    private LocalDateTime dataCriacao;

    public ListaMedicamentoProntuario() {
    }

    public ListaMedicamentoProntuario(long idListaMedicamentoProntuario, long idMedicamento, long idProntuario, LocalDateTime dataCriacao) {
        this.idListaMedicamentoProntuario = idListaMedicamentoProntuario;
        this.idMedicamento = idMedicamento;
        this.idProntuario = idProntuario;
        this.dataCriacao = dataCriacao;
    }

    public long getIdListaMedicamentoProntuario() {
        return idListaMedicamentoProntuario;
    }

    public void setIdListaMedicamentoProntuario(long idListaMedicamentoProntuario) {
        this.idListaMedicamentoProntuario = idListaMedicamentoProntuario;
    }

    public long getIdMedicamento() {
        return idMedicamento;
    }

    public void setIdMedicamento(long idMedicamento) {
        this.idMedicamento = idMedicamento;
    }

    public long getIdProntuario() {
        return idProntuario;
    }

    public void setIdProntuario(long idProntuario) {
        this.idProntuario = idProntuario;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
