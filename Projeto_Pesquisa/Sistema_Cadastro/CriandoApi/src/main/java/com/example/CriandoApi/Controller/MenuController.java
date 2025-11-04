package com.example.CriandoApi.Controller;

import com.example.CriandoApi.DAO.IUsuario;
import com.example.CriandoApi.Model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/Menu")
public class MenuController {
    @Autowired
    private IUsuario dao;

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> editarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) {
        Optional<Usuario> existente = dao.findById(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario u = existente.get();
        u.setNome(usuario.getNome());
        u.setEmail(usuario.getEmail());
        u.setTelefone(usuario.getTelefone());

        dao.save(u);
        return ResponseEntity.ok(u);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Integer id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
		



