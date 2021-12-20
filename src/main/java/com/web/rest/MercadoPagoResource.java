package com.web.rest;

import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Empresa;
import com.domain.Membresia;
import com.domain.Pagos;
// import com.mercadopago.resources.datastructures.preference.Payer;
import com.domain.PayerMer;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.MerchantOrder;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.datastructures.merchantorder.MerchantOrderPayment;
import com.service.EmpresaService;
import com.service.MembresiaService;
import com.service.MercadoPagoService;
import com.service.PagosService;
/**
 * REST controller for managing {@link com.domain.Profesion}.
 */
@RestController
@RequestMapping("/api")
public class MercadoPagoResource {

    private final Logger log = LoggerFactory.getLogger(MercadoPagoResource.class);

    @Autowired
    private PagosService pagosService;
    
    @Autowired
    private EmpresaService empresaService;
	

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MercadoPagoService mercadoPagoService;
    private final MembresiaService membresiaService;

    public MercadoPagoResource(
        MercadoPagoService mercadoPagoService,
        MembresiaService membresiaService) {
        this.mercadoPagoService = mercadoPagoService;
        this.membresiaService = membresiaService;
    }

    /**
     * {@code POST  /profesions} : Create a new profesion.
     *
     * @param profesion the profesion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profesion, or with status {@code 400 (Bad Request)} if the profesion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mercadoPago")
    public String createMercadoPago(@Valid @RequestBody String id, @Valid @RequestBody String topic) throws URISyntaxException, MPException, MPConfException {
        System.out.println("---probandito-----"+id);
        System.out.println("---probandito-----"+topic);
        log.debug("Prooooooooobando"+id);
        log.debug("Prooooooooobando"+topic);
        // Preference result = mercadoPagoService.mercadoPagoCdT();
        
        return "resuuult";
    }

    @PostMapping("/mercado-pago")
    public Object getMercado(@Valid @RequestBody PayerMer body) throws URISyntaxException, MPException, MPConfException {
        Membresia membresia = new Membresia();
        Object result = null;
        PayerMer payerMer = new PayerMer();
        // payer.setName(body.payer["nombre"]);
        if(body.getPago().equals("unaOferta")){
            long lg = 1;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        else if(body.getPago().equals("dosOferta")){
            long lg = 2;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        else if(body.getPago().equals("tresOferta")){
            long lg = 3;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        else if(body.getPago().equals("flexi")){
            long lg = 4;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        else if(body.getPago().equals("bronce")){
            long lg = 5;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        else if(body.getPago().equals("plata")){
            long lg = 6;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        else if(body.getPago().equals("oro")){
            long lg = 7;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        else if(body.getPago().equals("diamante")){
            long lg = 8;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        return result;
        // return "{\"id\": \""+result+"\"}";
    }
    
    /**
     * {@code POST  /profesions} : Create a new profesion.
     *
     * @param profesion the profesion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profesion, or with status {@code 400 (Bad Request)} if the profesion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notiMercadoPago")
    public String notiMercadoPago(@RequestParam(value = "topic") String topic, @RequestParam(value = "id") String id) throws URISyntaxException, MPException, MPConfException {
        Payment payment = null;
        MerchantOrder merchant = null;
        Pagos pago = new Pagos();
        LocalDateTime date = ZonedDateTime.now(ZoneId.of("America/Bogota")).toLocalDateTime();
        switch(topic) { 
            case "payment":
                payment = (Payment) mercadoPagoService.mercadoPagoGetPayment(id);
                // Get the payment and the corresponding merchant_order reported by the IPN.
                merchant = (MerchantOrder) mercadoPagoService.mercadoPagoGetMerchant(payment.getOrder().getId().toString());
                pago = pagosService.findPagoByPreference(merchant.getPreferenceId());
                pago.setFechaUltimaActuali(date);
                break;
            case "merchant_order":
                merchant = (MerchantOrder) mercadoPagoService.mercadoPagoGetMerchant(id);
                pago = pagosService.findPagoByPreference(merchant.getPreferenceId());
                pago.setFechaUltimaActuali(date);
                break;
        }

        float paid_amount = 0;
        for(MerchantOrderPayment paymentf : merchant.getPayments()){
            pago.setEstado(paymentf.getStatus());
            pagosService.save(pago);
            if(!pago.getId().equals(null)){
            }
            if(paymentf.getStatus().equals("approved")){
                paid_amount += paymentf.getTransactionAmount();
            }
        }

        // If the payment's transaction amount is equal (or bigger) than the merchant_order's amount you can release your items
        if(paid_amount >= merchant.getTotalAmount()){
            log.debug("Totally paid");
            configuracionMembresia(pago);
        } else {
            System.out.println("Not paid yet. Do not release your item.");
        }
        
        return "resuuuult";
    }
    
    public void configuracionMembresia(Pagos pagoSaved) {
        // Membresia membresia = pagoSaved.getMembresia();
        // Empresa empresaSaved = new Empresa();
        // empresaSaved = pagoSaved.getEmpresa();
        // empresaSaved.setPublicacionesOferta(empresaSaved.getPublicacionesOferta() + Long.valueOf(membresia.getOfertas()));
        // empresaSaved.setVisualizacionesHv(empresaSaved.getVisualizacionesHv() + Long.valueOf(membresia.getVisualizaciones()));
        // empresaSaved.setDescargasHv(empresaSaved.getDescargasHv() + Long.valueOf(membresia.getDescargas()));
        // empresaSaved.setMembresia(membresia.getMembresiaClub());
        // empresaSaved.setJuridica(membresia.getJuridica());
        // empresaSaved.setReplicasOferta(empresaSaved.getReplicasOferta() + Long.valueOf(membresia.getReplicasOferta()));
        // empresaService.save(empresaSaved);
    	if(pagoSaved.getMembresia().getNombreMembresia().equals("unaOferta")) {
    		Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(empresaSaved.getPublicacionesOferta() + 1);
    		empresaSaved.setVisualizacionesHv(empresaSaved.getVisualizacionesHv() + 20);
    		empresaService.save(empresaSaved);
    	}
    	else if(pagoSaved.getMembresia().getNombreMembresia().equals("dosOferta")) {
    		Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(empresaSaved.getPublicacionesOferta() + Long.valueOf(2));
    		empresaSaved.setVisualizacionesHv(Long.valueOf(999));
    		empresaService.save(empresaSaved);
    		
    	}
		else if(pagoSaved.getMembresia().getNombreMembresia().equals("tresOferta")) {
			Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(empresaSaved.getPublicacionesOferta() + 3);
    		empresaSaved.setVisualizacionesHv(Long.valueOf(999));
    		empresaService.save(empresaSaved);
		}
		else if(pagoSaved.getMembresia().getNombreMembresia().equals("flexi")) {
			Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(empresaSaved.getPublicacionesOferta() + 18);
    		empresaSaved.setVisualizacionesHv(Long.valueOf(999));
    		empresaSaved.setDescargasHv(empresaSaved.getDescargasHv() + 50);
    		empresaSaved.setMembresia(true);
    		empresaService.save(empresaSaved);
		}
		else if(pagoSaved.getMembresia().getNombreMembresia().equals("bronce")) {
			Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(empresaSaved.getPublicacionesOferta() + 25);
    		empresaSaved.setVisualizacionesHv(Long.valueOf(999));
    		empresaSaved.setDescargasHv(empresaSaved.getDescargasHv() + 120);
    		empresaSaved.setMembresia(true);
    		empresaService.save(empresaSaved);
		}
		else if(pagoSaved.getMembresia().getNombreMembresia().equals("plata")) {
			Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(empresaSaved.getPublicacionesOferta() + 25);
    		empresaSaved.setVisualizacionesHv(Long.valueOf(999));
    		empresaSaved.setDescargasHv(empresaSaved.getDescargasHv() + 120);
    		empresaSaved.setMembresia(true);
    		empresaSaved.setReplicasOferta(empresaSaved.getReplicasOferta() + 2);
    		empresaService.save(empresaSaved);
		}
		else if(pagoSaved.getMembresia().getNombreMembresia().equals("oro")) {
			Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(Long.valueOf(999));
    		empresaSaved.setVisualizacionesHv(Long.valueOf(999));
    		empresaSaved.setDescargasHv(empresaSaved.getDescargasHv() + 200);
    		empresaSaved.setMembresia(true);
            empresaSaved.setJuridica(true);
    		empresaSaved.setReplicasOferta(empresaSaved.getReplicasOferta() + 4);
    		empresaService.save(empresaSaved);
		}
		else if(pagoSaved.getMembresia().getNombreMembresia().equals("diamante")) {
			Empresa empresaSaved = new Empresa();
    		empresaSaved = pagoSaved.getEmpresa();
    		empresaSaved.setPublicacionesOferta(Long.valueOf(999));
    		empresaSaved.setVisualizacionesHv(Long.valueOf(999));
    		empresaSaved.setDescargasHv(Long.valueOf(999));
    		empresaSaved.setMembresia(true);
            empresaSaved.setJuridica(true);
    		empresaService.save(empresaSaved);
		}
    }
}
