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

public class TareaEnviarCorreo extends TimerTask {
	
       
    public TareaEnviarCorreo() {

    }

    @Override
    public void run() {
        Connection connection ;
        try {	            
        	String url = "jdbc:postgresql://ec2-18-190-28-55.us-east-2.compute.amazonaws.com:5432/cdtdb";	            
        	String user = "cdtuser";	            
        	String pass = "cdtuser";	            
        	connection = DriverManager.getConnection(url ,user, pass);	            
        	Statement stmt = connection.createStatement();	            
        	ResultSet result = stmt.executeQuery("select\r\n" + 
        			"case \r\n" +  
        			"when (CURRENT_DATE between jhi.created_date + '336 hr' and jhi.created_date + '360 hr'::INTERVAL) then jhi.email\r\n" + 
        			"end as email\r\n" + 
        			"from ct_persona_tb per\r\n" + 
        			"left join ct_informacon_laboral_tb inf on inf.usuario_id = per.id\r\n" + 
        			"inner join jhi_user jhi on per.id = jhi.usuario_id\r\n" + 
        			"where inf.id is null\r\n" + 
        			"group by 1");	            
        	while (result.next()) {	 
        		if(result.getString("email") != null) {
        			enviarConGMail(result.getString("email"));
            		result.getStatement();
        		}
        	}	            
        	result.close();	            
        	connection.close();	        
        }catch ( SQLException ex ) {	            
        	connection = null ;	            
        	ex.printStackTrace () ;	            
        	System.out.println(" SQLException : " + ex.getMessage() );	            
        	System.out.println(" SQLState : " + ex.getSQLState () ) ;	            
        	System.out.println(" VendorError : " + ex.getErrorCode () );	        
        }
    }
        
    public void enviarConGMail(String destinatario) {
    	String to = destinatario;
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
	          ("src/main/resources/image/recordatorioEmail.jpg");
            imagePart.setDataHandler(new DataHandler(fds));
            imagePart.setHeader("Content-ID","<image>");
            imagePart.setDisposition(MimeBodyPart.INLINE);
            multipart.addBodyPart(imagePart);
            message.setContent(multipart);
            message.setSubject("Recordatorio Club del Trabajo");
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
