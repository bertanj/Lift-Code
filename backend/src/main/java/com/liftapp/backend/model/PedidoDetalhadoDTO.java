package com.liftapp.backend.model;

import lombok.Data;

import java.util.List;

@Data
public class PedidoDetalhadoDTO {
    private PedidoDTO pedido;
    private ClienteDTO cliente;
    private List<ItemProdutoDTO> itens;
    private double total;
}
