package com.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.apache.commons.io.IOUtils;
import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.Archivo;
import com.domain.InformacionAcademica;
import com.domain.InformacionLaboral;
import com.domain.InformacionPersonal;
import com.domain.Persona;
import com.domain.PersonaIdioma;
import com.domain.vo.HojaVidaVo;
import com.repository.ArchivoRepository;
import com.repository.InformacionAcademicaRepository;
import com.repository.InformacionLaboralRepository;
import com.repository.InformacionPersonalRepository;
import com.repository.PersonaIdiomaRepository;
import com.repository.PersonaRepository;
import com.service.ArchivoService;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;

import org.springframework.beans.factory.annotation.Value;
import javax.annotation.PostConstruct;

@Service
@Transactional
public class HojaVidaService {

	private AmazonS3 s3client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client = new AmazonS3Client(credentials);
    }

	private final Logger log = LoggerFactory.getLogger(HojaVidaService.class);

	private final ArchivoRepository archivoRepository;
	private final PersonaRepository personaRepository;
	private final InformacionPersonalRepository personalRepository;
	private final InformacionAcademicaRepository academicaRepository;
	private final InformacionLaboralRepository experienciaRepository;
	private final PersonaIdiomaRepository idiomaRepository;
	private final ArchivoService archivoService;

	public HojaVidaService(InformacionPersonalRepository personalRepository,
			InformacionAcademicaRepository academicaRepository, InformacionLaboralRepository experienciaRepository, ArchivoService archivoService,
			PersonaIdiomaRepository idiomaRepository, PersonaRepository personaRepository, ArchivoRepository archivoRepository) {
		this.archivoRepository = archivoRepository;
		this.personalRepository = personalRepository;
		this.academicaRepository = academicaRepository;
		this.experienciaRepository = experienciaRepository;
		this.idiomaRepository = idiomaRepository;
		this.personaRepository = personaRepository;
		this.archivoService = archivoService;
	}

	/**
	 * Save a HojaVidaVo.
	 *
	 * @return the persisted entity.
	 */
	public HojaVidaVo save(HojaVidaVo hojaVida) {
		// log.debug("Request to save Hoja de vida : {}", hojaVida);
		// System.out.println("------------------------probandote--------------------------");
		if (hojaVida.getPersona() != null) this.personaRepository.save(hojaVida.getPersona());
		if (hojaVida.getInformacionPersonal() != null) this.personalRepository.save(hojaVida.getInformacionPersonal());
		if (hojaVida.getIdiomas() != null && !hojaVida.getIdiomas().isEmpty()) {
			this.idiomaRepository.deleteByIdPersona(hojaVida.getIdiomas().get(0).getIdPersona());
			this.idiomaRepository.saveAll(hojaVida.getIdiomas());}
		guardarInformacionArchivos(hojaVida);
		return hojaVida;
	}
	
	public void guardarInformacionArchivos(HojaVidaVo hojaVida) {
		System.out.println("-----------------------probandito---------------------");
		if (hojaVida.getInformacionPersonal() != null) {
			List<Archivo> infoPer = this.archivoRepository.findByUsuario(hojaVida.getPersona());
			for(Archivo archivo: hojaVida.getArchivos()){
				if(archivo.getTipo().equals(1) || archivo.getTipo().equals(2)){
					if(archivo.getId() != null){
						Optional<Archivo> archivoEnBD = this.archivoRepository.findById(archivo.getId());
						if(archivoEnBD.isPresent()){
							archivoService.deleteFile(archivoEnBD.get().getArchivo());
							this.archivoRepository.deleteById(archivoEnBD.get().getId());
						}
						this.archivoRepository.save(archivo);
					}else{
						this.archivoRepository.save(archivo);
					}
				}
			}
		}
		
		if (hojaVida.getInformacionAcademica() != null && !hojaVida.getInformacionAcademica().isEmpty()) {
			System.out.println("---probanditopersona---------------------"+hojaVida.getInformacionAcademica().get(0).getUsuario());
			List<InformacionAcademica> infosAcademicas = this.academicaRepository.findByUsuario(hojaVida.getInformacionAcademica().get(0).getUsuario());
			System.out.println("---probanditoinf---------------------"+infosAcademicas);
			if(!infosAcademicas.isEmpty()){
				System.out.println("---probanditoinfoooo---------------------"+infosAcademicas);
				for (InformacionAcademica infAcad: infosAcademicas) {
					if(!hojaVida.getInformacionAcademica().contains(infAcad)){
						this.archivoRepository.deleteByInformacionAcademica(infAcad);
						this.academicaRepository.deleteById(infAcad.getId());
					}}}
			for (InformacionAcademica infAca: hojaVida.getInformacionAcademica()) {
				System.out.println("---probandito---------------------"+infAca);
				Optional<InformacionAcademica> informacionAcademicaBusqueda = this.academicaRepository.findById(infAca.getId());
				System.out.println("---probandito---------------------"+informacionAcademicaBusqueda);
				if (informacionAcademicaBusqueda.isPresent()) {
					this.academicaRepository.save(infAca);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionAcademica = new ArrayList<Archivo>();
						for(Archivo dato :  hojaVida.getArchivos()) {
							if(dato.getInformacionAcademica() != null && dato.getInformacionAcademica().getId().equals(infAca.getId())) {
								archivosInformacionAcademica.add(dato);
							}
						}
//						List<Archivo> archivosInformacionAcademica = hojaVida.getArchivos().stream().filter(f -> f.getInformacionAcademica().getId().equals(infAca.getId())).collect(Collectors.toList());
						archivosInformacionAcademica.stream().map(f -> {
							f.setInformacionAcademica(infAca);
							return f;
						}).forEach(f -> {
							this.archivoRepository.save(f);
						});
					}
				} else {
					Long index = infAca.getId();
					// infAca.setId(null);
					// System.out.println("------------------------------Request to save Hoja de vida : {}"+ infAca);
					InformacionAcademica informacionAcademicaGuardado = this.academicaRepository.save(infAca);
					// System.out.println("------------------------------Response to save Hoja de vida : {}"+ informacionAcademicaGuardado);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionAcademica = new ArrayList<Archivo>();
						for(Archivo dato :  hojaVida.getArchivos()) {
							if(dato.getInformacionAcademica() != null && dato.getInformacionAcademica().getId().equals(index)) {
								archivosInformacionAcademica.add(dato);
							}
						}
//						List<Archivo> archivosInformacionAcademica = hojaVida.getArchivos().stream().filter(f -> f.getInformacionAcademica().getId().equals(index)).collect(Collectors.toList());
						archivosInformacionAcademica.stream().map(f -> {
							f.setInformacionAcademica(informacionAcademicaGuardado);
							return f;
						}).forEach(f -> {
							this.archivoRepository.save(f);
						});
					}
				}
			}
		}
		
		if (hojaVida.getExperienciaLaboral() != null && !hojaVida.getExperienciaLaboral().isEmpty()) {
			System.out.println("---probanditopersonaexp---------------------"+hojaVida.getExperienciaLaboral().get(0).getUsuario());
			List<InformacionLaboral> infosLaborales = this.experienciaRepository.findByUsuario(hojaVida.getExperienciaLaboral().get(0).getUsuario());
			System.out.println("---probanditoinfexp---------------------"+infosLaborales);
			if(!infosLaborales.isEmpty()){
				System.out.println("---probanditoinfooooexp---------------------"+infosLaborales);
				for (InformacionLaboral infLabor: infosLaborales) {
					if(!hojaVida.getExperienciaLaboral().contains(infLabor)){
						this.archivoRepository.deleteByInformacionLaboral(infLabor);
						this.experienciaRepository.deleteById(infLabor.getId());
					}}}
			for (InformacionLaboral infLab: hojaVida.getExperienciaLaboral()) {
				Optional<InformacionLaboral> informacionLaboralBusqueda = this.experienciaRepository.findById(infLab.getId());
				if (informacionLaboralBusqueda.isPresent()) {
					this.experienciaRepository.save(infLab);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionLaboral = new ArrayList<Archivo>();
						for(Archivo dato :  hojaVida.getArchivos()) {
							if(dato.getInformacionLaboral() != null && dato.getInformacionLaboral().getId().equals(infLab.getId())) {
								archivosInformacionLaboral.add(dato);
							}
						}
//						List<Archivo> archivosInformacionLaboral = hojaVida.getArchivos().stream().filter(f -> f.getInformacionLaboral().getId().equals(infLab.getId())).collect(Collectors.toList());
						archivosInformacionLaboral.stream().map(f -> {
							f.setInformacionLaboral(infLab);
							return f;
						}).forEach(f -> {
							this.archivoRepository.save(f);
						});
					}
				} else {
					Long index = infLab.getId();
					// infLab.setId(null);
					InformacionLaboral informacionLaboralGuardado = this.experienciaRepository.save(infLab);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionLaboral = new ArrayList<Archivo>();
						for(Archivo dato :  hojaVida.getArchivos()) {
							if(dato.getInformacionLaboral() != null && dato.getInformacionLaboral().getId().equals(index)) {
								archivosInformacionLaboral.add(dato);
							}
						}
//						List<Archivo> archivosInformacionLaboral = hojaVida.getArchivos().stream().filter(f -> f.getInformacionLaboral().getId().equals(index)).collect(Collectors.toList());
						archivosInformacionLaboral.stream().map(f -> {
							f.setInformacionLaboral(informacionLaboralGuardado);
							return f;
						}).forEach(f -> {
							this.archivoRepository.save(f);
						});
					}
				}
			}
		}
		
		if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
			System.out.println("-----------------------probandito---------------------ifarchivos");
			List<Archivo> archivosDiferentes = new ArrayList<Archivo>();
			for(Archivo dato :  hojaVida.getArchivos()) {
				if(dato.getTipo() == 3 || dato.getTipo() == 4) {
					archivosDiferentes.add(dato);
				}
			}
			archivosDiferentes.stream().map(f -> {
				return f;
			}).forEach(f -> {
				this.archivoRepository.save(f);
			});
		}
	}

	/**
	 * get a HojaVidaVo
	 * 
	 * @param id the persona's id
	 * @return the result entity
	 */
	public Optional<HojaVidaVo> get(Long id) {
		HojaVidaVo hojaVidaVo = new HojaVidaVo();
		Persona persona = personaRepository.findById(id).get();
		InformacionPersonal personal = this.personalRepository.findByUsuario(persona);
		List<InformacionAcademica> academica = this.academicaRepository.findByUsuario(persona);
		List<InformacionLaboral> experiencia = this.experienciaRepository.findByUsuario(persona);
		List<PersonaIdioma> idiomas = this.idiomaRepository.findByIdPersona(persona);
		List<Archivo> archivos = this.archivoRepository.findByUsuario(persona);
		
		hojaVidaVo.setArchivos(archivos);
		hojaVidaVo.setPersona(persona);
		hojaVidaVo.setInformacionPersonal(personal);
		hojaVidaVo.setInformacionAcademica(academica);
		hojaVidaVo.setExperienciaLaboral(experiencia);
		hojaVidaVo.setIdiomas(idiomas);
		Optional<HojaVidaVo> opt = Optional.ofNullable(hojaVidaVo);
		return opt;
	}
	
	public Archivo crearArchivoPDF(Archivo archivoInicial) throws IOException {
		Persona persona = personaRepository.findById(archivoInicial.getUsuario().getId()).get();
		Archivo archivoFinal = new Archivo();
		if (persona != null) {
			archivoFinal = generarPDFCompleto(archivoInicial);
			if (archivoFinal != null)
			{
				archivoFinal.setExtension("pdf");
				archivoFinal.setUsuario(persona);
				archivoFinal.setTipo(100);
				archivoFinal.setNombre(persona.getNombre() + persona.getApellido() + ".pdf");
				return archivoFinal;
			}
			return null;
		}
		return null;
	}
	
	public Archivo generarPDFCompleto(Archivo archivoHojaVida) throws IOException {
		PDFMergerUtility pdfMergerUtility = new PDFMergerUtility();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		ByteArrayInputStream pdfInputStream = null;

		// AmazonS3 s3 = new AmazonS3Client();
        Region usEast2 = Region.getRegion(Regions.US_EAST_2);
        s3client.setRegion(usEast2);

        //String bucketName = "my-first-s3-bucket-12650f52-428c-446a-9290-5931a2cd3958";
        System.out.println("Downloading an object");
		
		List<Archivo> listaArchivos = this.archivoRepository.findByUsuarioOrderByTipoAsc(archivoHojaVida.getUsuario());
		Archivo archivo = new Archivo();
		String cadena64 = archivoHojaVida.getArchivo().replaceFirst("^.*,", "");
		byte[] bytesHojaVida = Base64.getDecoder().decode(cadena64);
		InputStream inputStream = new ByteArrayInputStream(bytesHojaVida);
		pdfMergerUtility.addSource(inputStream);
		for(Archivo item: listaArchivos) {
			try {
				if(item.getTipo() != 5) {
					S3Object object = s3client.getObject(new GetObjectRequest(bucketName, item.getArchivo()));
					InputStream inputStreamItemaws = object.getObjectContent();
					pdfMergerUtility.addSource(inputStreamItemaws);
				}
			} catch (AmazonServiceException ase) {
				System.out.println("Caught an AmazonServiceException, which means your request made it "
						+ "to Amazon S3, but was rejected with an error response for some reason.");
				System.out.println("Error Message:    " + ase.getMessage());
				System.out.println("HTTP Status Code: " + ase.getStatusCode());
				System.out.println("AWS Error Code:   " + ase.getErrorCode());
				System.out.println("Error Type:       " + ase.getErrorType());
				System.out.println("Request ID:       " + ase.getRequestId());
			} catch (AmazonClientException ace) {
				System.out.println("Caught an AmazonClientException, which means the client encountered "
						+ "a serious internal problem while trying to communicate with S3, "
						+ "such as not being able to access the network.");
				System.out.println("Error Message: " + ace.getMessage());
			}
			// String cadena64Items = item.getArchivo().replaceFirst("^.*,", "");
			// byte[] bytesItems = Base64.getDecoder().decode(cadena64Items);
			// if (item.getExtension().equals("pdf"))
			// {
			// 	InputStream inputStreamItems = new ByteArrayInputStream(bytesItems);
			// 	pdfMergerUtility.addSource(inputStreamItems);
			// }
			// else {
			// 	if(item.getTipo() != 5) {
			// 		PDDocument documento = new PDDocument();
			// 		ByteArrayOutputStream out = new ByteArrayOutputStream();
			// 		PDPage page = new PDPage();
			// 		documento.addPage(page);
			// 		PDPageContentStream contents = new PDPageContentStream(documento, page);
			// 		ByteArrayInputStream bais = new ByteArrayInputStream(bytesItems);
			// 		BufferedImage bim = ImageIO.read(bais);
			// 		PDImageXObject pdImage = LosslessFactory.createFromImage(documento, bim);
			// 		contents.drawImage(pdImage, 70, 250);
			//         contents.close();
			//         documento.save(out);
			//         documento.close();
			//         ByteArrayInputStream inputStreamImages = new ByteArrayInputStream(out.toByteArray());
			// 		pdfMergerUtility.addSource(inputStreamImages);
			// 	}
			// }
		}
		pdfMergerUtility.setDestinationStream(outputStream);
		pdfMergerUtility.mergeDocuments(MemoryUsageSetting.setupMainMemoryOnly());
		pdfInputStream = new ByteArrayInputStream(outputStream.toByteArray());		
		byte[] bytes = IOUtils.toByteArray(pdfInputStream);
		String base64Final = Base64.getEncoder().encodeToString(bytes);
		StringBuilder sb = new StringBuilder();
        sb.append("data:application/pdf;base64,");
        sb.append(base64Final);
        archivo.setArchivo(sb.toString());
		return archivo;
	}
}