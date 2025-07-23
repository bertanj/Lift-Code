package com.liftapp.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ConfigurableApplicationContext;
import com.liftapp.backend.controller.OrderController;
import com.liftapp.backend.model.PedidoDetalhadoDTO;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
    
	}
}

// @SpringBootApplication
// public class BackendApplication {
//   public static void main(String[] args) {
//     ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);

//     OrderController pedidoController = context.getBean(OrderController.class);

   
//     PedidoDetalhadoDTO dto = pedidoController.getPedidoDetalhado(5);

//     System.out.println("Total do pedido: R$ " + dto.getTotal());
//   }
// }