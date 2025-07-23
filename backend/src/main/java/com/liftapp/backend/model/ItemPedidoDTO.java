package com.liftapp.backend.model;

import lombok.Data;

@Data
public class ItemPedidoDTO {
    private int pedido;
    private int produto;
    private double quantidade;
}
