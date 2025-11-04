package com.example.CriandoApi.Controller;

import com.example.CriandoApi.DAO.IUsuario;
import com.example.CriandoApi.Model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/Login")
public class LoginController {
    @Autowired
    private IUsuario dao;

    @PostMapping
    public ResponseEntity<?> fazerLogin(@RequestBody Usuario dadosLogin) {
        Optional<Usuario> userEncontrado = dao.findByEmailAndSenha(
			dadosLogin.getEmail(),
			dadosLogin.getSenha()
        );

        if (userEncontrado.isPresent()) {
            return ResponseEntity.ok(userEncontrado.get());
        }

        return ResponseEntity.status(401).body("Usuário ou senha inválidos");
    }
}


