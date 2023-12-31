package com.service;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;

import com.domain.Empresa;
import com.domain.Membresia;
import com.domain.Pagos;
import com.domain.PayerMer;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.MerchantOrder;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Identification;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import com.mercadopago.resources.datastructures.preference.Phone;

// import com.service.MembresiaService;

  @Service
  @Transactional
  public class MercadoPagoService {

    @Value("${mercadoPagoProps.accessToken}")
    private String accessToken;

    private final Logger log = LoggerFactory.getLogger(MercadoPagoService.class);
    	
    @Autowired
    private PagosService pagosService;
    // private final MembresiaService membresiaService;

      public String mercadoPagoCdT(Membresia membresia, PayerMer payerMer, Empresa empresa) throws MPException, MPConfException {
          MercadoPago.SDK.setAccessToken(this.accessToken);
          Preference preference = new Preference();
          // Date date = new Date();
          // Se configuran las url para retornar al comercio
          BackUrls backUrls = new BackUrls(
                    "https://www.clubdeltrabajo.com/perfil-empresa",
                    "https://www.clubdeltrabajo.com/membresias",
                    "https://www.clubdeltrabajo.com/");

            preference.setBackUrls(backUrls);
            LocalDateTime date = ZonedDateTime.now(ZoneId.of("America/Bogota")).toLocalDateTime();
            System.out.println(date);
        //   Crea un ítem en la preferencia
            Item item = new Item();
            item.setId(membresia.getId().toString())
                .setTitle(membresia.getNombreMembresia())
                .setDescription(membresia.getNombreMembresia())
                .setCategoryId("services")
                .setQuantity(1)
                .setCurrencyId("COP")
                .setUnitPrice((float) membresia.getPrecioMembresia());
            Payer payer = new Payer();
            payer.setName(payerMer.getNombre())
                .setSurname(payerMer.getApellidos())
                .setEmail(payerMer.getCorreo())
                .setDateCreated(date.toString())
                .setPhone(new Phone()
                    .setAreaCode("57")
                    .setNumber(payerMer.getTelefono()))
                .setIdentification(new Identification()
                .setType(payerMer.getTipoIdentificacion())
                .setNumber(payerMer.getIdentificacion()));
            preference.setPayer(payer);
            preference.appendItem(item);
            preference.setNotificationUrl("https://www.clubdeltrabajo.com/api/notiMercadoPago");
            Preference save = preference.save();
            Pagos pagos = new Pagos();
            pagos.setPreferenciaMerc(save.getId());
            pagos.setMembresia(membresia);
            pagos.setEmpresa(empresa);
            pagos.setEstado("Waiting");
            pagos.setFechaUltimaActuali(date);
            pagos.setFechaCreacion(date);
            Pagos pagoSaved = pagosService.save(pagos);
            System.out.println("---date---------------------"+ZonedDateTime.now(ZoneId.of("America/Bogota")).toLocalDateTime());
            System.out.println("---saveMer---------------------"+save.getId());
            return "{\"id\": \""+String.valueOf(save.getId())+"\", \"initPoint\": \""+String.valueOf(save.getInitPoint())+"\"}";
      }

      public Object mercadoPagoGetPayment(String id) throws MPException, MPConfException {
        MercadoPago.SDK.setAccessToken(this.accessToken);
        Payment payment = new Payment();
        return payment.findById(id);
        }

        public Object mercadoPagoGetMerchant(String id) throws MPException, MPConfException {
        MercadoPago.SDK.setAccessToken(this.accessToken);
        MerchantOrder merchant = new MerchantOrder();
        return merchant.findById(id);
    }
        
 }