package com.liftapp.backend.model;

import lombok.Data;


@Data
public class ItemProdutoDTO {
    private ItemPedidoDTO item;
    private ProdutoDTO produto;
}

