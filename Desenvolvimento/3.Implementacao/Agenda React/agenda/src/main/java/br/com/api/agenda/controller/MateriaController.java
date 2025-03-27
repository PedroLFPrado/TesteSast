package br.com.api.agenda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.agenda.model.Materia;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.service.MateriaService;


@RestController
@CrossOrigin(origins = "*")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    //Listar
    @GetMapping("/listar-materias")
        public Iterable<Materia> listarMateria(@RequestParam Long userId){
        Iterable<Materia> materias = materiaService.listar(userId);

        return materias;
    }

    //Editar 
    @PutMapping("/editar-materia")
    public ResponseEntity<?> editarMateria(@RequestBody Materia materiaModel){
        return materiaService.CadastrarAlterarMateria(materiaModel, "alterar");
    }

    // Cadastrar
    @PostMapping("/cadastrar-materia")
    public ResponseEntity<?> cadastrarMateria(@RequestBody Materia materiaModel){
        
        return materiaService.CadastrarAlterarMateria(materiaModel, "cadastrar"); 
    }

    // Remover
    @DeleteMapping("/remover-materia/{id}")
    public ResponseEntity<RespostaModelo> removerMateria(@PathVariable long id){
        return materiaService.remover(id);
    } 
}

