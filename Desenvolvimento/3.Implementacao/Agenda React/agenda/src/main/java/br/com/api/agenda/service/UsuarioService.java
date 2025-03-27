package br.com.api.agenda.service;


import br.com.api.agenda.model.Usuario;
import br.com.api.agenda.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UsuarioService {

    @Autowired
    private final UsuarioRepository usuarioRepository;

    public List<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuario(String email, String password) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findUsuarioByEmail(email);
        if (usuarioOptional.isPresent()) {
            if (!usuarioOptional.get().getPassword().equals(password)) {
                throw new IllegalStateException("password is not correct for email: "+ email);
            }
        }else {
            throw new IllegalStateException("email: " + email + " is not present");
        }
        return usuarioOptional.get();
    }

    public void addNewUsuario(Usuario usuario) {
        Optional<Usuario> usuarioOptional = usuarioRepository
                .findUsuarioByEmail(usuario.getEmail());
        if(usuarioOptional.isPresent()) {
            throw new IllegalStateException("email already taken");
        }
        usuarioRepository.save(usuario);
    }

    public void deleteUsuarioByEmail(String email) {
        Optional<Usuario> usuarioOptional = usuarioRepository
                .findUsuarioByEmail(email);
        if(usuarioOptional.isEmpty()) {
            throw new IllegalStateException("usuario with email: " + email + " doesn't exist");
        }
        usuarioRepository.deleteById(usuarioOptional.get().getId());
    }

}
