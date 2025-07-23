package com.liftapp.backend.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.liftapp.backend.model.ClienteDTO;
import com.liftapp.backend.model.ItemPedidoDTO;
import com.liftapp.backend.model.PedidoDTO;
import com.liftapp.backend.model.ProdutoDTO;

@Service
public class LiftApiService {
    private final String BASE_URL = "https://sistemalift1.com.br/lift_ps/api/";

    @Autowired
    private RestTemplate restTemplate;

    public PedidoDTO[] getPedidos(){
        String url = BASE_URL + "/Pedidos";
        return restTemplate.getForObject(url, PedidoDTO[].class);
    }

    public PedidoDTO getPedidoById(int id){
        String url = BASE_URL + "/Pedidos/" + id;
        return restTemplate.getForObject(url, PedidoDTO.class);
    }

   public List<ItemPedidoDTO> getItensPedido(int pedidoId) {
    String url = BASE_URL + "/ItensPedido";
    ItemPedidoDTO[] todosItens = restTemplate.getForObject(url, ItemPedidoDTO[].class);

   
    return Arrays.stream(todosItens)
        .filter(item -> item.getPedido() == pedidoId)  //filtrando IDS que correspondem ao pedido
        .collect(Collectors.toList());
}

    public ClienteDTO getCliente(int id){
        String url = BASE_URL + "/Clientes/" + id;
        return restTemplate.getForObject(url, ClienteDTO.class);
    }

    public ProdutoDTO getProdutos(int id){
        String url = BASE_URL + "/Produtos/" + id;
        return restTemplate.getForObject(url, ProdutoDTO.class);
    }

}
