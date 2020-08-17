package com.service;

import com.domain.Archivo;
import com.domain.Persona;
import com.repository.ArchivoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.UUID;

/**
 * Service Implementation for managing {@link Archivo}.
 */
@Service
@Transactional
public class ArchivoService {

    private AmazonS3 s3client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;
    
    @Value("${spring.datasource.url}")
    private String urlConnection;
    @Value("${spring.datasource.username}")
    private String userConnection;
    @Value("${spring.datasource.password}")
    private String passConnection;

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client = new AmazonS3Client(credentials);
    }

    private final Logger log = LoggerFactory.getLogger(ArchivoService.class);

    private final ArchivoRepository archivoRepository;

    public ArchivoService(ArchivoRepository archivoRepository) {
        this.archivoRepository = archivoRepository;
    }

    /**
     * Save a archivo.
     *
     * @param archivo the entity to save.
     * @return the persisted entity.
     */
    public Archivo save(Archivo archivo) {
        log.debug("Request to save Archivo : {}", archivo);
        return archivoRepository.save(archivo);
    }
    
    /**
     * Save all archivos.
     *
     * @param archivos the entities to save.
     * @return the persisted entities.
     */
    public List<Archivo> saveAll(List<Archivo> archivos) {
        log.debug("Request to save Archivos : {}", archivos);
        return archivoRepository.saveAll(archivos);
    }

    /**
     * Get all the archivos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Archivo> findAll(Pageable pageable) {
        log.debug("Request to get all Archivos");
        return archivoRepository.findAll(pageable);
    }

    /**
     * Get one archivo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Archivo> findOne(Long id) {
        log.debug("Request to get Archivo : {}", id);
        return archivoRepository.findById(id);
    }

    /**
     * Delete the archivo by id.
     *
     * @param id the id of the entity.
     * @throws SQLException 
     * @throws Exception 
     */
    public void delete(Long id) throws Exception {
        log.debug("Request to delete Archivo : {}", id);
		Class.forName("org.postgresql.Driver");
		Connection connection = DriverManager.getConnection(urlConnection, userConnection, passConnection);
		PreparedStatement st = connection.prepareStatement("DELETE FROM ct_archivo_tb WHERE id = ?");
		st.setFloat(1, id);
		st.executeUpdate(); 
        //archivoRepository.deleteById(id);
    }

    /**
     * Get one archivo by usuario and tipo.
     *
     * @param usuario the persona.
     * @param tipo the tipo of archivo.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Archivo> get(Long usuarioId, Integer tipo) {
        log.debug("Request to get Archivo : {}", usuarioId);
        Persona usuario = new Persona();
        usuario.setId(usuarioId);
        Optional<Archivo> opt = Optional.ofNullable(archivoRepository.findFirstByUsuarioAndTipoOrderByIdDesc(usuario, tipo));
		return opt;
    }

    public String uploadFile(MultipartFile file) {

        Region usEast2 = Region.getRegion(Regions.US_EAST_2);
        s3client.setRegion(usEast2);
        
        try{
            String keyName = file.getOriginalFilename();
            InputStream is=file.getInputStream();
            System.out.println("Uploading "+file.getOriginalFilename()+" a new object to S3 from a file\n");
            s3client.putObject(new PutObjectRequest(bucketName, keyName, is, new ObjectMetadata()));
            //filef.delete();
            return "upload OK";
        } catch (AmazonServiceException ase) {
            System.out.println("Caught an AmazonServiceException, which means your request made it "
                    + "to Amazon S3, but was rejected with an error response for some reason.");
            System.out.println("Error Message:    " + ase.getMessage());
            System.out.println("HTTP Status Code: " + ase.getStatusCode());
            System.out.println("AWS Error Code:   " + ase.getErrorCode());
            System.out.println("Error Type:       " + ase.getErrorType());
            System.out.println("Request ID:       " + ase.getRequestId());
            return "Error Message:    " + ase.getMessage();
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());
            return "Error Message:    " + ace.getMessage();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public String deleteFile(String keyName) {

        Region usEast2 = Region.getRegion(Regions.US_EAST_2);
        s3client.setRegion(usEast2);
        
        try{
            System.out.println("Deleting an object\n");
            s3client.deleteObject(bucketName, keyName);
            return "delete OK";
        } catch (AmazonServiceException ase) {
            System.out.println("Caught an AmazonServiceException, which means your request made it "
                    + "to Amazon S3, but was rejected with an error response for some reason.");
            System.out.println("Error Message:    " + ase.getMessage());
            System.out.println("HTTP Status Code: " + ase.getStatusCode());
            System.out.println("AWS Error Code:   " + ase.getErrorCode());
            System.out.println("Error Type:       " + ase.getErrorType());
            System.out.println("Request ID:       " + ase.getRequestId());
            return "Error Message:    " + ase.getMessage();
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with S3, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());
            return "Error Message:    " + ace.getMessage();
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
