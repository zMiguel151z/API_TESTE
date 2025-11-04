package com.example.CriandoApi.Controller;

import com.example.CriandoApi.DAO.IUsuario;
import com.example.CriandoApi.Model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController  {

    @Autowired
    private IUsuario dao;

    // LISTAR TODOS
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return (List<Usuario>) dao.findAll();
    }

    // CRIAR USUÁRIO
    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return dao.save(usuario);
    }

    // EDITAR USUÁRIO
    @PutMapping
    public Usuario editarUsuario(@RequestBody Usuario usuario) {
        return dao.save(usuario);
    }

    // EXCLUIR USUÁRIO
    @DeleteMapping("/{id}")
    public Optional<Usuario> excluirUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuario = dao.findById(id);
        if (usuario.isPresent()) {
            dao.deleteById(id);
        }
        return usuario;
    }
}
