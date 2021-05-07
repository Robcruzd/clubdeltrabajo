package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import java.util.TimerTask;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;

import com.service.MailService;

@Component
public class TareaEnviarCorreo extends TimerTask {
	

    @Autowired
    private MailService mailService;

    public TareaEnviarCorreo(
    ) {
    }

    @PostConstruct
    public void run() {
        System.out.println("Probaaaaaaaaaaaaaaaaaaaaaaaando");
        this.mailService.emailRemember();
    }

}
