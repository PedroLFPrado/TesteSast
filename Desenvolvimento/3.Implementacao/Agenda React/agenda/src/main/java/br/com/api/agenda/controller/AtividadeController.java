package br.com.api.agenda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

import org.springframework.data.domain.Page;

import br.com.api.agenda.model.Atividade;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.service.AtividadeService;

@RestController
@CrossOrigin(origins = "*")
public class AtividadeController {

    @Autowired
    private AtividadeService atividadeService;



// Listar atividades vinculadas à matéria com paginação
@GetMapping("/listar-atividade/materia/{materiaId}")
public Page<Atividade> listarAtividadesPorMateria(@PathVariable Long materiaId, 
                                                  @RequestParam(defaultValue = "0") int page, 
                                                  @RequestParam(defaultValue = "3") int size) {
    return atividadeService.listarPorMateria(materiaId, PageRequest.of(page, size));
}

    @GetMapping("/listar-atividade")
    public Iterable<Atividade> listarAtividade(){
        Iterable<Atividade> todasAtividades = atividadeService.listar();
        return todasAtividades;
    }


    // Editar
    @PutMapping("/editar-atividade")
    public ResponseEntity<?> editarAtividade(@RequestBody Atividade atividade){
        return atividadeService.CadastrarAlterarAtividade(atividade, "alterar");
    }

    // Cadastrar
    @PostMapping("/cadastrar-atividade")
    public ResponseEntity<?> cadastrarAtividade(@RequestBody Atividade atividade){
        return atividadeService.CadastrarAlterarAtividade(atividade, "cadastrar"); 
    }

    // Remover
    @DeleteMapping("/remover-atividade/{id}")
    public ResponseEntity<RespostaModelo> removerAtividade(@PathVariable long id){
        return atividadeService.remover(id);
    }

    @GetMapping("/")
    public String rota(){
        return "Api da agenda funcionando";
    }



}
