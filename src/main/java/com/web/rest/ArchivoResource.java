package com.web.rest;

import com.domain.Archivo;
import com.service.ArchivoService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.ArchivoCriteria;
import com.service.ArchivoQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.UUID;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;

/**
 * REST controller for managing {@link com.domain.Archivo}.
 */
@RestController
@RequestMapping("/api")
public class ArchivoResource {

    private final Logger log = LoggerFactory.getLogger(ArchivoResource.class);

    private static final String ENTITY_NAME = "archivo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArchivoService archivoService;

    private final ArchivoQueryService archivoQueryService;

    public ArchivoResource(ArchivoService archivoService, ArchivoQueryService archivoQueryService) {
        this.archivoService = archivoService;
        this.archivoQueryService = archivoQueryService;
    }

    /**
     * {@code POST  /archivos} : Create a new archivo.
     *
     * @param archivo the archivo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new archivo, or with status {@code 400 (Bad Request)} if the archivo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/archivos")
    public ResponseEntity<Archivo> createArchivo(@Valid @RequestBody Archivo archivo) throws URISyntaxException {
        log.debug("REST request to save Archivo : {}", archivo);
        if (archivo.getId() != null) {
            throw new BadRequestAlertException("A new archivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Archivo result = archivoService.save(archivo);
        return ResponseEntity.created(new URI("/api/archivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    /**
     * {@code PUT  /archivos} : Updates an existing archivo.
     *
     * @param archivo the archivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated archivo,
     * or with status {@code 400 (Bad Request)} if the archivo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the archivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/archivos")
    public ResponseEntity<Archivo> updateArchivo(@Valid @RequestBody Archivo archivo) throws URISyntaxException {
        log.debug("REST request to update Archivo : {}", archivo);
        if (archivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Archivo result = archivoService.save(archivo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, archivo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /archivos} : get all the archivos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of archivos in body.
     */
    @GetMapping("/archivos")
    public ResponseEntity<List<Archivo>> getAllArchivos(ArchivoCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Archivos by criteria: {}", criteria);
        Page<Archivo> page = archivoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /archivos/count} : count all the archivos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/archivos/count")
    public ResponseEntity<Long> countArchivos(ArchivoCriteria criteria) {
        log.debug("REST request to count Archivos by criteria: {}", criteria);
        return ResponseEntity.ok().body(archivoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /archivos/:id} : get the "id" archivo.
     *
     * @param id the id of the archivo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the archivo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/archivos/{id}")
    public ResponseEntity<Archivo> getArchivo(@PathVariable Long id) {
        log.debug("REST request to get Archivo : {}", id);
        Optional<Archivo> archivo = archivoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(archivo);
    }

    /**
     * {@code DELETE  /archivos/:id} : delete the "id" archivo.
     *
     * @param id the id of the archivo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/archivos/{id}")
    public ResponseEntity<Void> deleteArchivo(@PathVariable Long id) {
        log.debug("REST request to delete Archivo : {}", id);
        archivoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /archivos/:id} : get the "id" archivo.
     *
     * @param id the id of the archivo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the archivo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/archivos/perfil/{usuarioid}/tipo/{tipo}")
    public ResponseEntity<Archivo> get(@PathVariable Long usuarioid, @PathVariable Integer tipo) {
        log.debug("REST request to get Archivo : {}", usuarioid);
        Optional<Archivo> archivo = archivoService.get(usuarioid, tipo);
        return ResponseUtil.wrapOrNotFound(archivo);
    }

    @PostMapping("/uploadFileS3")
    public ResponseEntity<?> createFile(@RequestPart("file") MultipartFile file) throws IOException {
        log.debug("hooooooooooooooooooooooooooooooooooooooooolaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", file);

        //File myObj = new File("filename.txt");
        File filef = new File("clubtrabajo/src/main/resources/banner.txt");
        
 
        file.transferTo(filef);
        // AmazonS3 amazonS3 = AmazonS3ClientBuilder
        //     .standard()
        //     .withCredentials(new DefaultAWSCredentialsProviderChain())
        //     .withRegion(Regions.DEFAULT_REGION)
        //     .build();
        AmazonS3 s3 = new AmazonS3Client();
        Region usWest2 = Region.getRegion(Regions.US_WEST_2);
        s3.setRegion(usWest2);
        // TransferManager tm = TransferManagerBuilder.standard()
        //     .withS3Client(s3)
        //     .withMultipartUploadThreshold((long) (5 * 1024 * 1025))
        //     .build();

        String bucketName = "my-first-s3-bucket-12650f52-428c-446a-9290-5931a2cd3958";
        String keyName = "MyObjectKey";
        //String file = new File("documents/my-picture.jpg");
        s3.putObject(bucketName, keyName, filef);
        return new ResponseEntity<Object>("Archivo", HttpStatus.OK);
    }
        // AmazonS3 s3 = new AmazonS3Client();
        // Region usWest2 = Region.getRegion(Regions.US_WEST_2);
        // s3.setRegion(usWest2);

        // log.debug("Filse: ", file);
        // String bucketName = "my-first-s3-bucket-12650f52-428c-446a-9290-5931a2cd3958";
        // String key = "MyObjectKey";

        // try {
        //     /*
        //      * Create a new S3 bucket - Amazon S3 bucket names are globally unique,
        //      * so once a bucket name has been taken by any user, you can't create
        //      * another bucket with that same name.
        //      *
        //      * You can optionally specify a location for your bucket if you want to
        //      * keep your data closer to your applications or users.
        //      */
        //     //System.out.println("Creating bucket " + bucketName + "\n");
        //     //s3.createBucket(bucketName);

        //     /*
        //      * List the buckets in your account
        //      */
        //     // System.out.println("Listing buckets");
        //     // for (Bucket bucket : s3.listBuckets()) {
        //     //     System.out.println(" - " + bucket.getName());
        //     // }
        //     // System.out.println();

        //     /*
        //      * Upload an object to your bucket - You can easily upload a file to
        //      * S3, or upload directly an InputStream if you know the length of
        //      * the data in the stream. You can also specify your own metadata
        //      * when uploading to S3, which allows you set a variety of options
        //      * like content-type and content-encoding, plus additional metadata
        //      * specific to your applications.
        //      */
        //     System.out.println("Uploading a new object to S3 from a file\n");
        //     s3.putObject(new PutObjectRequest(bucketName, key, createSampleFile()));

            
        //     // System.out.println("Downloading an object");
        //     // S3Object object = s3.getObject(new GetObjectRequest(bucketName, key));
        //     // System.out.println("Content-Type: "  + object.getObjectMetadata().getContentType());
        //     //displayTextInputStream(object.getObjectContent());

        //     // System.out.println("Listing objects");
        //     // ObjectListing objectListing = s3.listObjects(new ListObjectsRequest()
        //     //         .withBucketName(bucketName)
        //     //         .withPrefix("My"));
        //     // for (S3ObjectSummary objectSummary : objectListing.getObjectSummaries()) {
        //     //     System.out.println(" - " + objectSummary.getKey() + "  " +
        //     //             "(size = " + objectSummary.getSize() + ")");
        //     // }
        //     // System.out.println();

        //     // /*
        //     //  * Delete an object - Unless versioning has been turned on for your bucket,
        //     //  * there is no way to undelete an object, so use caution when deleting objects.
        //     //  */
        //     // System.out.println("Deleting an object\n");
        //     // s3.deleteObject(bucketName, key);

        //     // /*
        //     //  * Delete a bucket - A bucket must be completely empty before it can be
        //     //  * deleted, so remember to delete any objects from your buckets before
        //     //  * you try to delete them.
        //     //  */
        //     // System.out.println("Deleting bucket " + bucketName + "\n");
        //     // s3.deleteBucket(bucketName);
        // } catch (AmazonServiceException ase) {
        //     System.out.println("Caught an AmazonServiceException, which means your request made it "
        //             + "to Amazon S3, but was rejected with an error response for some reason.");
        //     System.out.println("Error Message:    " + ase.getMessage());
        //     System.out.println("HTTP Status Code: " + ase.getStatusCode());
        //     System.out.println("AWS Error Code:   " + ase.getErrorCode());
        //     System.out.println("Error Type:       " + ase.getErrorType());
        //     System.out.println("Request ID:       " + ase.getRequestId());
        // } catch (AmazonClientException ace) {
        //     System.out.println("Caught an AmazonClientException, which means the client encountered "
        //             + "a serious internal problem while trying to communicate with S3, "
        //             + "such as not being able to access the network.");
        //     System.out.println("Error Message: " + ace.getMessage());
        // }
    // }

    // /**
    //  * Creates a temporary file with text data to demonstrate uploading a file
    //  * to Amazon S3
    //  *
    //  * @return A newly created temporary file with text data.
    //  *
    //  * @throws IOException
    //  */
    private static File createSampleFile() throws IOException {
        File file = File.createTempFile("aws-java-sdk-", ".txt");
        file.deleteOnExit();

        Writer writer = new OutputStreamWriter(new FileOutputStream(file));
        writer.write("abcdefghijklmnopqrstuvwxyz\n");
        writer.write("01234567890112345678901234\n");
        writer.write("!@#$%^&*()-=[]{};':',.<>/?\n");
        writer.write("01234567890112345678901234\n");
        writer.write("abcdefghijklmnopqrstuvwxyz\n");
        writer.close();

        return file;
    }
}
