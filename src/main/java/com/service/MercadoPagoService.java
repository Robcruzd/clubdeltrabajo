package com.service;
import com.mercadopago.*;
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
//   import com.mercadopago.Item;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.payment.Payer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

  @Service
  @Transactional
  public class MercadoPagoService {

      public String mercadoPagoCdT() throws MPException, MPConfException {
          MercadoPago.SDK.setAccessToken("APP_USR-3628026467305338-063004-167ccac86e1254cf0dc3eb8adc7cc191-783442985");
          Preference preference = new Preference();  
        //   Crea un ítem en la preferencia
            Item item = new Item();
            item.setTitle("Mi producto")
                .setQuantity(1)
                .setUnitPrice((float) 1500);
            preference.appendItem(item);
            Preference save = preference.save();
            System.out.println("---saveMer---------------------"+save.getId());
            return String.valueOf(save.getId());
        //   Payment payment = new Payment()
        //           .setTransactionAmount(100f)
        //           .setToken("your_cardtoken")
        //           .setDescription("description")
        //           .setInstallments(1)
        //           .setPaymentMethodId("visa")
        //           .setPayer(new Payer()
        //                   .setEmail("dummy_email"));

        //   payment.save();
      }
  }