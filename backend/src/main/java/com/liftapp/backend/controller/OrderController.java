package com.liftapp.backend.controller;

import com.liftapp.backend.model.ClienteDTO;
import com.liftapp.backend.model.ItemPedidoDTO;
import com.liftapp.backend.model.ItemProdutoDTO;
import com.liftapp.backend.model.PedidoDTO;
import com.liftapp.backend.model.PedidoDetalhadoDTO;
import com.liftapp.backend.model.ProdutoDTO;
import com.liftapp.backend.service.LiftApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/pedidos")

public class OrderController {

    @Autowired
    private LiftApiService liftApiService;

    @GetMapping
    public Object[] listOrders() {
        return liftApiService.getPedidos();
    }

    @GetMapping("/{id}")
    public Object getDetalhesPedido(@PathVariable int id) {
        return liftApiService.getPedidoById(id);
    }

    @GetMapping("/{id}/itens")
    public List<ItemPedidoDTO> getItensPedido(@PathVariable int id) {
        return liftApiService.getItensPedido(id);
    }

  @GetMapping("/{id}/detalhes")
public PedidoDetalhadoDTO getPedidoDetalhado(@PathVariable int id) {
    PedidoDTO pedido = liftApiService.getPedidoById(id);
    ClienteDTO cliente = liftApiService.getCliente(pedido.getCliente());
    List<ItemPedidoDTO> itens = liftApiService.getItensPedido(id);
    List<ItemProdutoDTO> itensComProdutos = new ArrayList<>();
    double total = itens.stream()
        .mapToDouble(item -> {
            ProdutoDTO produto = liftApiService.getProdutos(item.getProduto());
            return produto.getValor() * item.getQuantidade();
        })
        .sum();

    for (ItemPedidoDTO item : itens) {
        ProdutoDTO produto = liftApiService.getProdutos(item.getProduto());
        ItemProdutoDTO itemProduto = new ItemProdutoDTO();
        itemProduto.setItem(item);
        itemProduto.setProduto(produto);
        itensComProdutos.add(itemProduto);
    }

    PedidoDetalhadoDTO pedidoDetalhado = new PedidoDetalhadoDTO();
    pedidoDetalhado.setPedido(pedido);
    pedidoDetalhado.setCliente(cliente);
    pedidoDetalhado.setItens(itensComProdutos);
    pedidoDetalhado.setTotal(total); 

    return pedidoDetalhado;
    }
}