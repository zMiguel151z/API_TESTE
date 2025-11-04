package com.example.CriandoApi.DAO;

import com.example.CriandoApi.Model.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IUsuario extends CrudRepository<Usuario, Integer> {


    Optional<Usuario> findByEmailAndSenha(String email, String senha);
	
}
