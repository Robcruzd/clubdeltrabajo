package com.service;
import com.mercadopago.*;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.MerchantOrder;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.payment.Payer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

  @Service
  @Transactional
  public class MercadoPagoService {

      public String mercadoPagoCdT(String id, String title, String description, float price) throws MPException, MPConfException {
          MercadoPago.SDK.setAccessToken("APP_USR-3628026467305338-063004-167ccac86e1254cf0dc3eb8adc7cc191-783442985");
          Preference preference = new Preference();  
          // Se configuran las url para retornar al comercio
          BackUrls backUrls = new BackUrls(
                    "http://www.localhost:9000/club-empresas",
                    "http://www.localhost:9000/perfil-empresa",
                    "http://www.localhost:9000/");

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