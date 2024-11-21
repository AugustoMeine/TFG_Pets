package br.com.pets.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ACESSO")
public class Acesso {

    @Id
    @Column(name = "ID_ACESSO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAcesso;

    @Column(name="ID_USUARIO", nullable=false)
    private long idUsuario;

    @Column(name="ACESSO_ADMINISTRADOR", nullable=false)
    private String acessoAdministrador;

    @Column(name="ACESSO_MEDICO_VETERINARIO", nullable=false)
    private String acessoMedicoVeterinario;

    @Column(name="ACESSO_ATENDENTE", nullable=false)
    private String acessoAtendente;

    public Acesso() {
    }

    public Acesso(String acessoAdministrador, String acessoAtendente, String acessoMedicoVeterinario, long idAcesso, long idUsuario) {
        this.acessoAdministrador = acessoAdministrador;
        this.acessoAtendente = acessoAtendente;
        this.acessoMedicoVeterinario = acessoMedicoVeterinario;
        this.idAcesso = idAcesso;
        this.idUsuario = idUsuario;
    }

    public long getIdAcesso() {
        return idAcesso;
    }

    public void setIdAcesso(long idAcesso) {
        this.idAcesso = idAcesso;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getAcessoAdministrador() {
        return acessoAdministrador;
    }

    public void setAcessoAdministrador(String acessoAdministrador) {
        this.acessoAdministrador = acessoAdministrador;
    }

    public String getAcessoMedicoVeterinario() {
        return acessoMedicoVeterinario;
    }

    public void setAcessoMedicoVeterinario(String acessoMedicoVeterinario) {
        this.acessoMedicoVeterinario = acessoMedicoVeterinario;
    }

    public String getAcessoAtendente() {
        return acessoAtendente;
    }

    public void setAcessoAtendente(String acessoAtendente) {
        this.acessoAtendente = acessoAtendente;
    }
    
}
