package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;

import com.service.MercadoPagoService;
import com.service.MembresiaService;
import com.web.rest.errors.BadRequestAlertException;

import com.mercadopago.resources.Preference;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.MerchantOrder;
import com.mercadopago.resources.datastructures.merchantorder.MerchantOrderPayment;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
// import com.mercadopago.resources.datastructures.preference.Payer;
import com.domain.PayerMer;
import com.domain.Membresia;
import com.domain.Pagos;
import com.service.MembresiaService;
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
        System.out.println("---probandito---------------------"+body.getNombre());
        System.out.println("---probandito---------------------"+body.getApellidos());
        Membresia membresia = new Membresia();
        Object result = null;
        PayerMer payerMer = new PayerMer();
        // payer.setName(body.payer["nombre"]);
        if(body.getPago().equals("bronce")){
            long lg = 1;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        if(body.getPago().equals("plata")){
            long lg = 2;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        if(body.getPago().equals("oro")){
            long lg = 3;
            Optional<Membresia> membresiaOptional = membresiaService.findOne(lg);
            if(membresiaOptional.isPresent()){
                membresia = membresiaOptional.get();
            }else{
                return "La Membresía no existe";
            }
            result = mercadoPagoService.mercadoPagoCdT(membresia, payerMer, body.getEmpresa());
        }
        if(body.getPago().equals("diamante")){
            long lg = 4;
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
                log.debug("REST request to delete User: {}", topic);
                payment = (Payment) mercadoPagoService.mercadoPagoGetPayment(id);
                // Get the payment and the corresponding merchant_order reported by the IPN.
                merchant = (MerchantOrder) mercadoPagoService.mercadoPagoGetMerchant(payment.getOrder().getId().toString());
                pago = pagosService.findPagoByPreference(merchant.getPreferenceId());
                log.debug("paaaaaaaaaaaaaaaaaaaaaaaaaaagos: {}", pago);
                pago.setFechaUltimaActuali(date);
                log.debug("merchant id in pay {}", merchant.getId());
                break;
            case "merchant_order":
                log.debug("REST request to delete User: {}", topic);
                merchant = (MerchantOrder) mercadoPagoService.mercadoPagoGetMerchant(id);
                pago = pagosService.findPagoByPreference(merchant.getPreferenceId());
                pago.setFechaUltimaActuali(date);
                log.debug("merchant id {}", merchant.getId());
                break;
        }

        
        log.debug("paaaaaaaaaaaaaaaaaaaaaaaaaaagos2: {}", pago);
        float paid_amount = 0;
        for(MerchantOrderPayment paymentf : merchant.getPayments()){
            pago.setEstado(paymentf.getStatus());
            log.debug("paaaaaaaaaaaaaaaaaaaaaaaaaaagos: {}", pago);
            pagosService.save(pago);
            if(!pago.getId().equals(null)){
            }
            if(paymentf.getStatus().equals("approved")){
                log.debug("Approooooooved");
                paid_amount += paymentf.getTransactionAmount();
            }
        }

        // If the payment's transaction amount is equal (or bigger) than the merchant_order's amount you can release your items
        if(paid_amount >= merchant.getTotalAmount()){
            log.debug("Totally paid");
            // if (merchant.getShipments().size()>0) { // The merchant_order has shipments
            //     if(merchant.getShipments().get(0).getStatus().equals("ready_to_ship")) {
            //         System.out.println("Totally paid. Print the label and release your item.");
            //     }
            // } else { // The merchant_order don't has any shipments
            //     System.out.println("Totally paid. Release your item.");
            // }
        } else {
            System.out.println("Not paid yet. Do not release your item.");
        }
        // Preference result = mercadoPagoService.mercadoPagoCdT();
        
        return "resuuuult";
    }
}
