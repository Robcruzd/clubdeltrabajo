package com.service;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import java.util.Optional;

import com.domain.User;
import com.domain.Profesion;
import com.domain.Persona;
import com.domain.AplicacionOferta;
import com.domain.vo.InformacionEmpresaVo;

import io.github.jhipster.config.JHipsterProperties;
import java.util.List;
import java.time.LocalDate;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String USER = "user";

    private static final String BASE_URL = "baseUrl";
    
    private static final String INFORMACION = "informacion";

    private static final String PROFESION = "profesion";

    private final JHipsterProperties jHipsterProperties;

    private final JavaMailSender javaMailSender;

    private final MessageSource messageSource;

    private final SpringTemplateEngine templateEngine;
    private final UserService userService;
    private final ProfesionService profesionService;
    private final PersonaService personaService;

    // public MailService(){}

    public MailService(
        JHipsterProperties jHipsterProperties, 
        JavaMailSender javaMailSender,
        MessageSource messageSource, 
        SpringTemplateEngine templateEngine,
        UserService userService,
        ProfesionService profesionService,
        PersonaService personaService) {

        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
        this.userService = userService;
        this.profesionService = profesionService;
        this.personaService = personaService;
    }

    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content);

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        }  catch (MailException | MessagingException e) {
            log.warn("Email could not be sent to user '{}'", to, e);
        }
    }

    @Async
    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendEmailFromTemplateApli(User user, Profesion profesion, String templateName, String titleKey) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(PROFESION, profesion);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendEmailFromTemplateRem(String email, String templateName, String titleKey) {        
        Locale locale = Locale.forLanguageTag("es");
        Context context = new Context(locale);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(email, subject, content, false, true);
    }

    @Async
    public void sendEmailFromTemplateAspir(String email, String mensaje, String templateName, String titleKey) {        
        Locale locale = Locale.forLanguageTag("es");
        Context context = new Context(locale);
        context.setVariable("informacion", mensaje);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(email, subject, content, false, true);
    }
    
    @Async
    public void sendEmailFromTemplateCustom(Object object, String templateName, String titleKey) {
        Locale locale = Locale.forLanguageTag("es");
        Context context = new Context(locale);
        String emailCt = "infoclubdeltrabajo@gmail.com";
        context.setVariable(INFORMACION, object);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        // jHipsterProperties.getMail().getBaseUrl()
        // "http://localhost:9000"
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(emailCt, subject, content, false, true);
    }

    @Async
    public void sendActivationEmail(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Async
    public void sendActivationEmailEmp(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmailEmp", "email.activation.title");
    }

    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }
    
    @Async
    public void sendInformacionEmpresa(InformacionEmpresaVo informacionEmpresa) {
        log.debug("Sending information company to '{}'", informacionEmpresa.getNombre() + ' ' + informacionEmpresa.getApellidos());
        sendEmailFromTemplateCustom(informacionEmpresa, "mail/informacionEmpresaEmail", "informacionEmpresa.title");
    }

    @Async
    public void sendApplyment(AplicacionOferta aplicacionOferta) {
        log.debug("Sending password reset email to '{}'", aplicacionOferta.getUsuario().getEmail());
        User user = userService.findByLogin(aplicacionOferta.getUsuario().getEmail());
        Profesion profesion = profesionService.getById(aplicacionOferta.getOferta().getProfesion());
        sendEmailFromTemplateApli(user, profesion, "mail/aplicacionPostulante", "email.aplica.title");
    }

    @Async
    public void sendEmailEmpresa(AplicacionOferta aplicacionOferta) {
        log.debug("Sending password reset email to '{}'", aplicacionOferta.getUsuario().getEmail());
        User user = userService.findByLogin(aplicacionOferta.getOferta().getUsuario().getEmail());
        Profesion profesion = profesionService.getById(aplicacionOferta.getOferta().getProfesion());
        sendEmailFromTemplateApli(user, profesion, "mail/aplicacionEmpresa", "email.aplicaEmp.title");
    }

    @Async
    @Scheduled(cron = "0 0 10 * * *", zone="America/Bogota")
    public void emailRemember() {
        log.debug("Sending password reset email to '{}'", userService.findEmailByQuery());
        List<Long> ids = userService.findEmailByQuery();
        for(Long id : ids) {
            Optional<Persona> opt = personaService.findOne(id);
            Persona persona = opt.get();
            // log.debug("Sending password reset email to '{}'", email);
            sendEmailFromTemplateRem(persona.getEmail(), "mail/rememberEmail", "email.remember.title");
            LocalDate date = LocalDate.now();
            persona.setFechaRecordatorio(date);
            personaService.save(persona);
        }
    }

    @Async
    public void sendSelectionEmail(String email, String mensaje) {
        log.debug("Sending password reset email to '{}'", email);
        if(mensaje.equals("")) {
            mensaje = "Hola, nuestra empresa esta interesada en contratar sus servicios";
        }
        sendEmailFromTemplateAspir(email, mensaje, "mail/emailSeleccion", "email.selection.title");
    }
}
