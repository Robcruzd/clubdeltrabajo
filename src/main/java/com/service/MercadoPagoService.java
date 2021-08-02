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
import com.domain.PayerMer;
import java.time.LocalDate;

  @Service
  @Transactional
  public class MercadoPagoService {

      public String mercadoPagoCdT(String id, String title, String description, float price, PayerMer payerMer) throws MPException, MPConfException {
          MercadoPago.SDK.setAccessToken("APP_USR-3628026467305338-063004-167ccac86e1254cf0dc3eb8adc7cc191-783442985");
          Preference preference = new Preference();  
          // Se configuran las url para retornar al comercio
          BackUrls backUrls = new BackUrls(
                    "http://190.248.224.11:9000/club-empresas",
                    "http://190.248.224.11:9000/perfil-empresa",
                    "http://190.248.224.11:9000/");

            preference.setBackUrls(backUrls);
        //   Crea un ítem en la preferencia
            Item item = new Item();
            item.setId(id)
                .setTitle(title)
                .setDescription(description)
                .setCategoryId("services")
                .setQuantity(1)
                .setCurrencyId("COP")
                .setUnitPrice((float) price);
            Payer payer = new Payer();
            payer.setName(payerMer.getNombre())
                .setSurname(payerMer.getApellidos())
                .setEmail(payerMer.getCorreo())
                .setDateCreated(LocalDate.now().toString())
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