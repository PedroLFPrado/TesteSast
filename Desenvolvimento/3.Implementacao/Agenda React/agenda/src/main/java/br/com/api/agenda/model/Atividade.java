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
@Table(name = "atividade")
@Getter
@Setter
public class Atividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome; 
    private String data_entrega;
    private String descricao;
    private boolean feita;

    @ManyToOne
    @JoinColumn(name="materia_id")
    private Materia materia;

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<AlunoAtividade> alunoatividades;
}
