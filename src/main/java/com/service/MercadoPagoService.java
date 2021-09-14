package com.service;
import com.mercadopago.*;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.MerchantOrder;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.Payer;
import com.mercadopago.resources.datastructures.preference.Identification;
import com.mercadopago.resources.datastructures.preference.Phone;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.domain.PayerMer;
import com.domain.Empresa;
import java.time.ZonedDateTime;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// import com.service.MercadoPagoService;
import com.service.PagosService;
import com.domain.Membresia;
import com.domain.Pagos;
import java.util.Optional;

// import com.service.MembresiaService;

  @Service
  @Transactional
  public class MercadoPagoService {

    private final Logger log = LoggerFactory.getLogger(MercadoPagoService.class);

    @Autowired
    private PagosService pagosService;
    // private final MembresiaService membresiaService;

      public String mercadoPagoCdT(Membresia membresia, PayerMer payerMer, Empresa empresa) throws MPException, MPConfException {
          MercadoPago.SDK.setAccessToken("APP_USR-3628026467305338-063004-167ccac86e1254cf0dc3eb8adc7cc191-783442985");
          Preference preference = new Preference();
          // Date date = new Date();
          // Se configuran las url para retornar al comercio
          BackUrls backUrls = new BackUrls(
                    "http://190.248.224.11:9000/club-empresas",
                    "http://190.248.224.11:9000/perfil-empresa",
                    "http://190.248.224.11:9000/");

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
            preference.setNotificationUrl("http://190.248.224.11:8080/api/notiMercadoPago");
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
        MercadoPago.SDK.setAccessToken("APP_USR-3628026467305338-063004-167ccac86e1254cf0dc3eb8adc7cc191-783442985");
        Payment payment = new Payment();
        return payment.findById(id);
        }

        public Object mercadoPagoGetMerchant(String id) throws MPException, MPConfException {
        MercadoPago.SDK.setAccessToken("APP_USR-3628026467305338-063004-167ccac86e1254cf0dc3eb8adc7cc191-783442985");
        MerchantOrder merchant = new MerchantOrder();
        return merchant.findById(id);
    }
  }