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

import com.domain.InformacionPersonal;
import com.domain.Profesion;
import com.repository.InformacionPersonalRepository;

/**
 * Service Implementation for managing {@link InformacionPersonal}.
 */
@Service
@Transactional
public class InformacionPersonalService {


    private final Logger log = LoggerFactory.getLogger(InformacionPersonalService.class);

    private final InformacionPersonalRepository informacionPersonalRepository;

    public InformacionPersonalService(InformacionPersonalRepository informacionPersonalRepository) {
        this.informacionPersonalRepository = informacionPersonalRepository;
    }

    /**
     * Save a informacionPersonal.
     *
     * @param informacionPersonal the entity to save.
     * @return the persisted entity.
     */
    public InformacionPersonal save(InformacionPersonal informacionPersonal) {
        log.debug("Request to save InformacionPersonal : {}", informacionPersonal);
        return informacionPersonalRepository.save(informacionPersonal);
    }

    /**
     * Get all the informacionPersonals.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<InformacionPersonal> findAll(Pageable pageable) {
        log.debug("Request to get all InformacionPersonals");
        return informacionPersonalRepository.findAll(pageable);
    }

    /**
     * Get one informacionPersonal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InformacionPersonal> findOne(Long id) {
        log.debug("Request to get InformacionPersonal : {}", id);
        return informacionPersonalRepository.findById(id);
    }

    /**
     * Delete the informacionPersonal by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InformacionPersonal : {}", id);
        informacionPersonalRepository.deleteById(id);
    }
    
    public List<InformacionPersonal> findByProfesion(Profesion profesion) {
        return informacionPersonalRepository.findByProfesion(profesion);
    }
    
    public InformacionPersonal obtenerInfoUsuario( Long persona) {
    	return informacionPersonalRepository.obtenerInfoUsuario(persona);
    }
    
}
