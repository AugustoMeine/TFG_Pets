package br.com.pets.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "PRONTUARIO")
public class Prontuario {

    @Id
    @Column(name = "ID_PRONTUARIO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idProntuario;

    @Column(name="ID_ANIMAL", nullable=false)
    private long idAnimal;

    @Column(name="DATA_CRIACAO", nullable=true)
    private LocalDateTime dataCriacao;

    @Column(name="TEMPERATURA", nullable=false)
    private float temperatura;

    @Column(name="FREQUENCIA_CARDIACA", nullable=false)
    private int frequenciaCardiaca;

    @Column(name="SINTOMAS", nullable=false)
    private String sintomas;

    @Column(name="DIAGNOSTICO_PROVAVEL", nullable=true)
    private String diagnosticoProvavel;

    @Column(name="DIAGNOSTICO_DEFINITIVO", nullable=true)
    private String diagnosticoDefinitivo;

    @Column(name="STATUS", nullable=false)
    private String status;

    public Prontuario() {
    }

    public Prontuario(long idProntuario, long idAnimal, LocalDateTime dataCriacao, float temperatura, int frequenciaCardiaca, String sintomas, String diagnosticoProvavel, String diagnosticoDefinitivo, String status) {
        this.idProntuario = idProntuario;
        this.idAnimal = idAnimal;
        this.dataCriacao = dataCriacao;
        this.temperatura = temperatura;
        this.frequenciaCardiaca = frequenciaCardiaca;
        this.sintomas = sintomas;
        this.diagnosticoProvavel = diagnosticoProvavel;
        this.diagnosticoDefinitivo = diagnosticoDefinitivo;
        this.status = status;
    }

    public long getIdProntuario() {
        return idProntuario;
    }

    public void setIdProntuario(long idProntuario) {
        this.idProntuario = idProntuario;
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

    public float getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(float temperatura) {
        this.temperatura = temperatura;
    }

    public int getFrequenciaCardiaca() {
        return frequenciaCardiaca;
    }

    public void setFrequenciaCardiaca(int frequenciaCardiaca) {
        this.frequenciaCardiaca = frequenciaCardiaca;
    }

    public String getSintomas() {
        return sintomas;
    }

    public void setSintomas(String sintomas) {
        this.sintomas = sintomas;
    }

    public String getDiagnosticoProvavel() {
        return diagnosticoProvavel;
    }

    public void setDiagnosticoProvavel(String diagnosticoProvavel) {
        this.diagnosticoProvavel = diagnosticoProvavel;
    }

    public String getDiagnosticoDefinitivo() {
        return diagnosticoDefinitivo;
    }

    public void setDiagnosticoDefinitivo(String diagnosticoDefinitivo) {
        this.diagnosticoDefinitivo = diagnosticoDefinitivo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
