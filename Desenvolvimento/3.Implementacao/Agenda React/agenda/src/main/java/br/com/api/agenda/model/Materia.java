package br.com.api.agenda.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "materia")
@Getter
@Setter
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String sala;
    private String dia_horario;

    @OneToMany(mappedBy = "materia", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Atividade> atividades;

    @OneToMany(mappedBy = "materia", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Aviso> avisos;

    @ManyToOne
    @JoinColumn(name="professor_id")
    private Usuario professor;
}
