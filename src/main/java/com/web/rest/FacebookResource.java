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

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.client.methods.HttpPost;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@RestController
@RequestMapping("/api")
public class FacebookResource {	
	
	private String pageAccessToken = "EAAHZCw1DFFKoBACREo8LGxSyLcTLqzHlZC6aPIi58iovUr0CKBaKBZBD1J4KgOIYu7n8AQ6gb6MkB3iROuy5g6GvctbhvPYbIyrALhUHei57Cejn8gfHiwtRNtWdQPRh3OfN4uKClaO3CtROwanQxYQT2bZAM0icxaEanTMgwdy61bhMQZCKL";
    
	private final EmpresaService empresaService;
	private final OfertaService ofertaService;

	public FacebookResource(EmpresaService empresaService, OfertaService ofertaService) {
		this.empresaService = empresaService;
		this.ofertaService = ofertaService;
	}    
    
    @GetMapping("/facebookPost")
    public List<String> publicarPost(@RequestParam("codigoOferta") String codigoOferta, @RequestParam("codigoEmpresa") String codigoEmpresa) throws Exception {
    	Optional<Empresa> empresaData = empresaService.findOne(Long.parseLong(codigoEmpresa));
    	Optional<Oferta> ofertaData = ofertaService.findOne(Long.parseLong(codigoOferta));
    	Empresa empresaActualizar = empresaData.get();
    	List<String> lista = new ArrayList<String>();
    	if(empresaData.get().getReplicasOferta() != 0 && empresaData.get().getReplicasOferta() != null) {
    		Long valor = empresaActualizar.getReplicasOferta() - 1;
    		// FacebookClient facebookClient= new DefaultFacebookClient(this.pageAccessToken, Version.VERSION_6_0);
            
            // facebookClient.publish("clubdeltrabajo/feed", //
            // 		FacebookType.class, //
            // 		Parameter.with("message", ofertaData.get().getDescripcion()));

            CloseableHttpClient client = HttpClients.createDefault();
			HttpPost httpPost = new HttpPost("https://graph.facebook.com/100955765079986/feed");

			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("message", ofertaData.get().getDescripcion()));
			params.add(new BasicNameValuePair("access_token", this.pageAccessToken));
			httpPost.setEntity(new UrlEncodedFormEntity(params));

			CloseableHttpResponse response = client.execute(httpPost);
			assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
			client.close();

            empresaActualizar.setReplicasOferta(valor);
            empresaService.save(empresaActualizar);
            lista.add("si");
            return lista;
    	}
    	lista.add("no");
    	return lista;
    }

}
