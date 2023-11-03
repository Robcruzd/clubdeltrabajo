package com.service;

import java.util.List;
import java.util.Optional;
import java.util.Properties;

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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.AplicacionOferta;
import com.repository.AplicacionOfertaRepository;

/**
 * Service Implementation for managing {@link AplicacionOferta}.
 */
@Service
@Transactional
public class AplicacionOfertaService {

    private final Logger log = LoggerFactory.getLogger(AplicacionOfertaService.class);

    private final AplicacionOfertaRepository aplicacionOfertaRepository;

    public AplicacionOfertaService(AplicacionOfertaRepository aplicacionOfertaRepository) {
        this.aplicacionOfertaRepository = aplicacionOfertaRepository;
    }

    /**
     * Save a aplicacionOferta.
     *
     * @param aplicacionOferta the entity to save.
     * @return the persisted entity.
     */
    public AplicacionOferta save(AplicacionOferta aplicacionOferta) {
        log.debug("Request to save AplicacionOferta : {}", aplicacionOferta);
        return aplicacionOfertaRepository.save(aplicacionOferta);
    }

    /**
     * Get all the aplicacionOfertas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<AplicacionOferta> findAll(Pageable pageable) {
        log.debug("Request to get all AplicacionOfertas");
        return aplicacionOfertaRepository.findAll(pageable);
    }

    /**
     * Get one aplicacionOferta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AplicacionOferta> findOne(Long id) {
        log.debug("Request to get AplicacionOferta : {}", id);
        return aplicacionOfertaRepository.findById(id);
    }

    /**
     * Delete the aplicacionOferta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AplicacionOferta : {}", id);
        aplicacionOfertaRepository.deleteById(id);
    }
    
    public List<AplicacionOferta> getByPersona( Long persona) {
    	return aplicacionOfertaRepository.getByPersona(persona);
    }
    
    public List<AplicacionOferta> getByOferta(Long oferta) {
    	return aplicacionOfertaRepository.getByOferta(oferta);
    }
    
    public List<AplicacionOferta> getByOfertaAndPersona(Long oferta, Long persona) {
    	return aplicacionOfertaRepository.getByOfertaAndPersona(oferta, persona);
    }
    
    public void enviarEmailEmpresa(String email) {
    	String to = email;
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtpout.secureserver.net");
        props.put("mail.smtp.port", "587");
    	String correoEnvia = "notificacion@clubdeltrabajo.com";
    	String contrasena = "Temporal22";
        Session session = Session.getInstance(props,
           new javax.mail.Authenticator() {
              protected PasswordAuthentication getPasswordAuthentication() {
                 return new PasswordAuthentication(correoEnvia, contrasena);
         }
           });
    	
    	try {
    		MimeMessage message = new MimeMessage(session);
            message.setSubject("HTML  mail with images");
            message.setFrom(new InternetAddress(correoEnvia));
            message.addRecipient(Message.RecipientType.TO,
                 new InternetAddress(to));

            // Mail Body
            MimeMultipart multipart = new MimeMultipart("related");
            BodyPart textPart = new MimeBodyPart();
            String htmlText ="<img src=\"cid:image\"> ";
            textPart.setContent(htmlText, "text/html");

            multipart.addBodyPart(textPart);
            BodyPart imagePart = new MimeBodyPart();
	        DataSource fds = new FileDataSource
	          ("src/main/resources/image/Bienvenido.jpg");
            imagePart.setDataHandler(new DataHandler(fds));
            imagePart.setHeader("Content-ID","<image>");
            imagePart.setDisposition(MimeBodyPart.INLINE);
            multipart.addBodyPart(imagePart);
            message.setContent(multipart);
            message.setSubject("Hoja de vida Seleccionada para revisión");
            message.setRecipients(Message.RecipientType.TO,
                     InternetAddress.parse(to));
            Transport.send(message);
    	} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    public void enviarEmailAplicante(String email) {
    	String to = email;
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtpout.secureserver.net");
        props.put("mail.smtp.port", "587");
    	String correoEnvia = "notificacion@clubdeltrabajo.com";
    	String contrasena = "Temporal22";
        Session session = Session.getInstance(props,
           new javax.mail.Authenticator() {
              protected PasswordAuthentication getPasswordAuthentication() {
                 return new PasswordAuthentication(correoEnvia, contrasena);
         }
           });
    	
    	try {
    		MimeMessage message = new MimeMessage(session);
            message.setSubject("HTML  mail with images");
            message.setFrom(new InternetAddress(correoEnvia));
            message.addRecipient(Message.RecipientType.TO,
                 new InternetAddress(to));

            // Mail Body
            MimeMultipart multipart = new MimeMultipart("related");
            BodyPart textPart = new MimeBodyPart();
            String htmlText ="<img src=\"cid:image\"> ";
            textPart.setContent(htmlText, "text/html");

            multipart.addBodyPart(textPart);
            BodyPart imagePart = new MimeBodyPart();
	        DataSource fds = new FileDataSource
	          ("src/main/resources/image/Bienvenido.jpg");
            imagePart.setDataHandler(new DataHandler(fds));
            imagePart.setHeader("Content-ID","<image>");
            imagePart.setDisposition(MimeBodyPart.INLINE);
            multipart.addBodyPart(imagePart);
            message.setContent(multipart);
            message.setSubject("Hoja de vida Seleccionada para revisión");
            message.setRecipients(Message.RecipientType.TO,
                     InternetAddress.parse(to));
            Transport.send(message);
    	} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
