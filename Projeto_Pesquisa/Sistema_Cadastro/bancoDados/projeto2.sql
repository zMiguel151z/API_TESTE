create database projeto;

use projeto;

create table usuario(
id integer auto_increment primary key,
nome varchar(200) not null,
email varchar(30) not null unique,
senha varchar(15)not null unique,
telefone varchar(15)not null unique

);

select * from usuario;

#drop table usuario;