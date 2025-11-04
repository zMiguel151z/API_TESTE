package com.example.CriandoApi.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "nome" , length = 200, nullable = true)
	private String nome;
	
	@Column(name = "email" , length = 50, nullable = true)
	private String email;
	
	@Column(name = "senha" , columnDefinition = "TEXT" , nullable = true)
	private String senha;
	
	@Column(name = "telefone" , length = 15, nullable = true)
	private String telefone;
	
	
	
	// setters e getters
	
	public Integer getId(){
		return this.id;
	}
	public void setId(Integer id){
		this.id = id;
	}
	
	
	public String getNome(){
		return this.nome;
	}
	public void setNome(String nome){
		this.nome = nome;
	}

	
	public String getEmail(){
		return this.email;
	}
	public void setEmail(String id){
		this.email = id;
	}
	
	
	public String getSenha(){
		return this.senha;
	}
	public void setSenha(String id){
		this.senha = id;
	}
	
	
	public String getTelefone(){
		return this.telefone;
	}
	public void setTelefone(String id){
		this.telefone = id;
	}
	
	
}
