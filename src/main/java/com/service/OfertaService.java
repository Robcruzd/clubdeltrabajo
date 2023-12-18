package com.service;

import java.util.Calendar;
import java.util.Date;
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

import com.domain.Empresa;
import com.domain.Oferta;
import com.repository.OfertaRepository;
import com.service.dto.OfertaCriteria;

/**
 * Service Implementation for managing {@link Oferta}.
 */
@Service
@Transactional
public class OfertaService {

    private final Logger log = LoggerFactory.getLogger(OfertaService.class);

    private final OfertaRepository ofertaRepository;

    public OfertaService(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    /**
     * Save a oferta.
     *
     * @param oferta the entity to save.
     * @return the persisted entity.
     */
    public Oferta save(Oferta oferta) {
        log.debug("Request to save Oferta : {}", oferta);
        return ofertaRepository.save(oferta);
    }

    /**
     * Get all the ofertas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Oferta> findAll(Pageable pageable) {
        log.debug("Request to get all Ofertas");
        return ofertaRepository.findAll(pageable);
    }

    /**
     * Get one oferta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Oferta> findOne(Long id) {
        log.debug("Request to get Oferta : {}", id);
        return ofertaRepository.findById(id);
    }

    /**
     * Delete the oferta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Oferta : {}", id);
        ofertaRepository.deleteById(id);
    }
    
    /**
     * Get all the ofertas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Oferta> findOfertasFiltro(OfertaCriteria criteria) {
        log.debug("Request to get all Ofertas");
        return ofertaRepository.findByCiudadAndExperiencia(criteria.getCiudad(),criteria.getExperiencia());
    }
    
    public List<Oferta> getOfertasFiltro( Long salario, Long ciudad) {
    	return ofertaRepository.getOfertasFiltro(salario,ciudad);
    }
    
    public List<Oferta> getOfertasEmpresa( Empresa usuario) {
    	return ofertaRepository.findByUsuarioOrderByFechaPublicacionDesc(usuario);
    }
    
    public List<Oferta> getOfertasFiltroAll( Long salario, Long ciudad, Long fecha) {
    	return ofertaRepository.getOfertasFiltroAll(salario,ciudad,getFechaHora(fecha));
    }
    
    public List<Oferta> getOfertasFiltroFechaSalario( Long salario, Long fecha) {
    	return ofertaRepository.getOfertasFiltroFechaSalario(salario,getFechaHora(fecha));
    }
    
    public List<Oferta> getOfertasFiltroFechaCiudad( Long ciudad, Long fecha) {
    	return ofertaRepository.getOfertasFiltroFechaCiudad(ciudad,getFechaHora(fecha));
    }
    
    public List<Oferta> getOfertasFiltroFecha( Long fecha) {
    	return ofertaRepository.getOfertasFiltroFecha(getFechaHora(fecha));
    }
    
    public List<Oferta> getOfertasFiltroAllProfesion( Long salario, Long ciudad, Long fecha, Long profesion) {
    	return ofertaRepository.getOfertasFiltroAllProfesion(salario,ciudad,getFechaHora(fecha),profesion);
    }
    
    public List<Oferta> getOfertasFiltroFechaSalarioProfesion( Long salario, Long fecha, Long profesion) {
    	return ofertaRepository.getOfertasFiltroFechaSalarioProfesion(salario,getFechaHora(fecha),profesion);
    }
    
    public List<Oferta> getOfertasFiltroFechaCiudadProfesion( Long ciudad, Long fecha, Long profesion) {
    	return ofertaRepository.getOfertasFiltroFechaCiudadProfesion(ciudad,getFechaHora(fecha),profesion);
    }
    
    public List<Oferta> getOfertasFiltroFechaProfesion( Long fecha, Long profesion) {
    	return ofertaRepository.getOfertasFiltroFechaProfesion(getFechaHora(fecha),profesion);
    }

    public List<Oferta> getOfertasDestacadas() {
    	return ofertaRepository.getOfertasDestacadas();
    }

    public Optional<List<Oferta>> findOfertasByProfesion(Long profesion) {
        // Optional<List<Oferta>> ofertas = ofertaRepository.findOfertasByProfesion(profesion);
        // if(ofertas.isPresent()){
        //     return ofertas;
        // }else {
        //     return null;
        // }
    	return ofertaRepository.findOfertasByProfesion(profesion);
    }
    
    public Date getFechaHora(Long fecha) {
    	Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
    	Date fechaHora;
    	if(fecha == 1) {
    		calendar.add(calendar.DAY_OF_MONTH, -1);
    		fechaHora = calendar.getTime();
    	}else if(fecha == 2) {
    		calendar.add(calendar.DAY_OF_MONTH, -7);
    		fechaHora = calendar.getTime();
    	}else if(fecha == 3) {
    		calendar.add(calendar.DAY_OF_MONTH, -30);
    		fechaHora = calendar.getTime();
    	}else{
    		calendar.add(calendar.DAY_OF_MONTH, -365);
    		fechaHora = calendar.getTime();
    	}
    	return fechaHora;
    }
    
    public void enviarEmailPersonas(String email) {
    	// Recipient's email ID needs to be mentioned.
        String to = email;

        // Sender's email ID needs to be mentioned
        String from = "notificacion@clubdeltrabajo.com";
        final String username = "notificacion@clubdeltrabajo.com";//change accordingly
        final String password = "Temporal22";//change accordingly

        // Assuming you are sending email through relay.jangosmtp.net
        String host = "smtpout.secureserver.net";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");

        // Get the Session object.
        Session session = Session.getInstance(props,
           new javax.mail.Authenticator() {
              protected PasswordAuthentication getPasswordAuthentication() {
                 return new PasswordAuthentication(username, password);
              }
  	});

        try {
              // Create a default MimeMessage object.
              Message message = new MimeMessage(session);

     	   // Set From: header field of the header.
  	   message.setFrom(new InternetAddress(from));

  	   // Set To: header field of the header.
  	   message.setRecipients(Message.RecipientType.TO,
                InternetAddress.parse(to));

  	   // Set Subject: header field
  	   message.setSubject("Nueva oferta de trabajo para usted en el club del trabajo");

  	   // Send the actual HTML message, as big as you like
  	   message.setContent(
                "<p>&nbsp;</p>\r\n" + 
                "                <h3 style=\"text-align: center; color:#3f7320;\">Nueva oferta de trabajo</h3> \r\n" + 
                "                <p><strong>revisa nuestra pagina para que apliques a la oferta publicada </strong></p>\r\n" + 
                "                <p><a href=\"https://www.clubdeltrabajo.com\" target=\"_blank\" rel=\"noopener\"><button>Ingrese ya</button></a></p>\r\n" + 
                "<p>\r\n" + 
                "  Att: equipo del Club del Trabajo\r\n" + 
                "</p>",
               "text/html");

  	   // Send message
  	   Transport.send(message);

  	   System.out.println("Sent message successfully....");

        } catch (MessagingException e) {
  	   e.printStackTrace();
  	   throw new RuntimeException(e);
        }
    }
    
}
