package com.service;

import com.domain.Persona;
import com.repository.PersonaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

import org.springframework.scheduling.annotation.Scheduled;

/**
 * Service Implementation for managing {@link Persona}.
 */
@Service
@Transactional
public class PersonaService {

    private final Logger log = LoggerFactory.getLogger(PersonaService.class);

    private final PersonaRepository personaRepository;

    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * Save a persona.
     *
     * @param persona the entity to save.
     * @return the persisted entity.
     */
    public Persona save(Persona persona) {
        log.debug("Request to save Persona : {}", persona);
        return personaRepository.save(persona);
    }

    /**
     * Get all the personas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Persona> findAll(Pageable pageable) {
        log.debug("Request to get all Personas");
        return personaRepository.findAll(pageable);
    }

    /**
     * Get one persona by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Persona> findOne(Long id) {
        log.debug("Request to get Persona : {}", id);
        return personaRepository.findById(id);
    }

    /**
     * Delete the persona by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Persona : {}", id);
        personaRepository.deleteById(id);
    }
    
    public Long contarPersonas() {
    	return personaRepository.count();
    }
    
    public List<Persona> getPersonas() {
    	return personaRepository.findAll();
    }

    public Optional<List<Persona>> findPersonasByProfesion(Long profesion) {
    	return personaRepository.findPersonasByProfesion(profesion);
    }

    @Scheduled(cron = "0 0 0 0/7 * *", zone="America/Bogota")
    public List<Long> updateFechaRem() {
        return personaRepository.updateFechaRem();
    }
    
    public void seleccionadoAspirante(String email) {
    	String to = email;
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtpout.secureserver.net");
        props.put("mail.smtp.port", "587");
    	String correoEnvia = "info@clubdeltrabajo.com";
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
