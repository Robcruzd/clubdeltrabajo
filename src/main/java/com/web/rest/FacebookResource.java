package com.web.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Empresa;
import com.domain.Oferta;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.types.FacebookType;
import com.service.EmpresaService;
import com.service.OfertaService;

@RestController
@RequestMapping("/api")
public class FacebookResource {	
	
	private String pageAccessToken = "EAADMjZAo3RvQBACLZBvynzfolZB2wz8aONDE7t8fx5ZC8ZCplZBTxIMPb7ZC648UePZCwzcfAISOA75CZApFpUVZC38vZCMJwObIHhKPs6NGLthgGgu73VBiOorzfSl9pa523roGJAJSIT1ZBZBMVkrRngs0kbM17AcrgJ9ZBAAQoXPUpyc33kS1khbnGp";
    
	private final EmpresaService empresaService;
	private final OfertaService ofertaService;

	public FacebookResource(EmpresaService empresaService, OfertaService ofertaService) {
		this.empresaService = empresaService;
		this.ofertaService = ofertaService;
	}    
    
    @GetMapping("/facebookPost")
    public List<String> publicarPost(@RequestParam("codigoOferta") String codigoOferta, @RequestParam("codigoEmpresa") String codigoEmpresa) {
    	Optional<Empresa> empresaData = empresaService.findOne(Long.parseLong(codigoEmpresa));
    	Optional<Oferta> ofertaData = ofertaService.findOne(Long.parseLong(codigoOferta));
    	Empresa empresaActualizar = empresaData.get();
    	List<String> lista = new ArrayList<String>();
    	if(empresaData.get().getReplicasOferta() != 0 && empresaData.get().getReplicasOferta() != null) {
    		Long valor = empresaActualizar.getReplicasOferta() - 1;
    		FacebookClient facebookClient= new DefaultFacebookClient(this.pageAccessToken, Version.VERSION_6_0);
            
            facebookClient.publish("clubdeltrabajo/feed", //
            		FacebookType.class, //
            		Parameter.with("message", ofertaData.get().getDescripcion()));
            
            empresaActualizar.setReplicasOferta(valor);
            empresaService.save(empresaActualizar);
            lista.add("si");
            return lista;
    	}
    	lista.add("no");
    	return lista;
    }

}
