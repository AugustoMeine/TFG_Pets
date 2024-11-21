package br.com.pets.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ANIMAL")
public class Animal {

    @Id
    @Column(name = "ID_ANIMAL", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAnimal;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "PESO", nullable = false)
    private float peso;

    @Column(name = "RACA", nullable = false)
    private String raca;

    @Column(name = "IDADE", nullable = false)
    private int idade;

    @Column(name = "SEXO", nullable = false)
    private String sexo;

    @Column(name="STATUS", nullable=false)
    private String status;

    public Animal() {
    }

    public Animal(long idAnimal, String nome, float peso, String raca, int idade, String sexo, String status) {
        this.idAnimal = idAnimal;
        this.nome = nome;
        this.peso = peso;
        this.raca = raca;
        this.idade = idade;
        this.sexo = sexo;
        this.status = status;
    }

    public long getIdAnimal() {
        return idAnimal;
    }

    public void setIdAnimal(long idAnimal) {
        this.idAnimal = idAnimal;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public float getPeso() {
        return peso;
    }

    public void setPeso(float peso) {
        this.peso = peso;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
