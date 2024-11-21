package br.com.pets.models;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "AGENDAMENTO")
public class Agendamento {
    
    @Id
    @Column(name = "ID_AGENDAMENTO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAgendamento;

    @Column(name="ID_USUARIO", nullable=false)
    private long idUsuario;

    @Column(name="ID_CLIENTE", nullable=false)
    private long idCliente;

    @Column(name="ID_ANIMAL", nullable=false)
    private long idAnimal;

    @Column(name="DATA_AGENDAMENTO", nullable=false)
    private LocalDate dataAgendamento;
    
    @Column(name="HORA_AGENDAMENTO", nullable=false)
    private LocalTime horaAgendamento;

    @Column(name="STATUS", nullable=false)
    private String status;

    public Agendamento() {
    }

    public Agendamento(LocalDate dataAgendamento, LocalTime horaAgendamento, long idAgendamento, long idAnimal, long idCliente, long idUsuario, String status) {
        this.dataAgendamento = dataAgendamento;
        this.horaAgendamento = horaAgendamento;
        this.idAgendamento = idAgendamento;
        this.idAnimal = idAnimal;
        this.idCliente = idCliente;
        this.idUsuario = idUsuario;
        this.status = status;
    }

    public long getIdAgendamento() {
        return idAgendamento;
    }

    public void setIdAgendamento(long idAgendamento) {
        this.idAgendamento = idAgendamento;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
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

    public LocalDate getDataAgendamento() {
        return dataAgendamento;
    }

    public void setDataAgendamento(LocalDate dataAgendamento) {
        this.dataAgendamento = dataAgendamento;
    }

    public LocalTime getHoraAgendamento() {
        return horaAgendamento;
    }

    public void setHoraAgendamento(LocalTime horaAgendamento) {
        this.horaAgendamento = horaAgendamento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
