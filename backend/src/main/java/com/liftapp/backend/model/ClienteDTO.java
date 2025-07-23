package com.liftapp.backend.model;

import lombok.Data;

@Data
public class ClienteDTO {
    private int id;
    private String nome;
    private String cpf;
    private String email;
}
