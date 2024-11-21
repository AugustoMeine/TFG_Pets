package br.com.pets.models;

import jakarta.persistence.*;

@Entity
@Table(name = "MEDICAMENTO")
public class Medicamento {

    @Id
    @Column(name = "ID_MEDICAMENTO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMedicamento;

    @Column(name="NOME", nullable=false)
    private String nome;

    @Column(name="PRINCIPIO_ATIVO", nullable=false)
    private String principioAtivo;

    @Column(name="FABRICANTE", nullable=false)
    private String fabricante;

    @Column(name="STATUS", nullable=false)
    private String status;

    public Medicamento() {
    }

    public Medicamento(long idMedicamento, String nome, String principioAtivo, String fabricante, String status) {
        this.idMedicamento = idMedicamento;
        this.nome = nome;
        this.principioAtivo = principioAtivo;
        this.fabricante = fabricante;
        this.status = status;
    }

    public long getIdMedicamento() {
        return idMedicamento;
    }

    public void setIdMedicamento(long idMedicamento) {
        this.idMedicamento = idMedicamento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPrincipioAtivo() {
        return principioAtivo;
    }

    public void setPrincipioAtivo(String principioAtivo) {
        this.principioAtivo = principioAtivo;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
