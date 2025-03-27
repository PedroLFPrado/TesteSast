package br.com.api.agenda.controller;

import br.com.api.agenda.model.Usuario;
import br.com.api.agenda.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*") 
public class UsuarioController {

    @Autowired
    private final UsuarioService usuarioService;

    @GetMapping("/all")
    public List<Usuario> getUsuarios() {
        return usuarioService.getUsuarios();
    }

    @GetMapping("/get")
    public Usuario getUsuario(@RequestParam(name = "email") String email,
                                @RequestParam(name = "password") String password) {
        return usuarioService.getUsuario(email,password);
    }

    @GetMapping("/getProfessorStatus")
    public Boolean getProfessorStatus(@RequestParam(name = "email") String email,
                                  @RequestParam(name = "password") String password) {
    try {
        Usuario usuario = usuarioService.getUsuario(email, password);
        System.out.println("Cliente encontrado: " + usuario);
        System.out.println("Ele é professor? " + usuario.getIsProfessor());
        
        return usuario != null && usuario.getIsProfessor(); // Retorna true ou false
    } catch (Exception e) {
        System.err.println("Erro ao obter status do professor: " + e.getMessage());
        return false; // ou lançar uma exceção
    }
                                  }

    @PostMapping("/add")
    public void registerNewUsuario(@RequestBody Usuario usuario) {
        System.out.println("Recebido: " + usuario);
        usuarioService.addNewUsuario(usuario);
    }

    @DeleteMapping("/delete")
    public void deleteUsuarioByEmail(@RequestParam(name = "email") String email) {
        usuarioService.deleteUsuarioByEmail(email);
    }
}
