package com.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.apache.commons.io.IOUtils;
import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
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

@Service
@Transactional
public class HojaVidaService {
	private final Logger log = LoggerFactory.getLogger(HojaVidaService.class);

	private final ArchivoRepository archivoRepository;
	private final PersonaRepository personaRepository;
	private final InformacionPersonalRepository personalRepository;
	private final InformacionAcademicaRepository academicaRepository;
	private final InformacionLaboralRepository experienciaRepository;
	private final PersonaIdiomaRepository idiomaRepository;

	public HojaVidaService(InformacionPersonalRepository personalRepository,
			InformacionAcademicaRepository academicaRepository, InformacionLaboralRepository experienciaRepository,
			PersonaIdiomaRepository idiomaRepository, PersonaRepository personaRepository, ArchivoRepository archivoRepository) {
		this.archivoRepository = archivoRepository;
		this.personalRepository = personalRepository;
		this.academicaRepository = academicaRepository;
		this.experienciaRepository = experienciaRepository;
		this.idiomaRepository = idiomaRepository;
		this.personaRepository = personaRepository;
	}

	/**
	 * Save a HojaVidaVo.
	 *
	 * @param hojaVidaVo the entity to manage to persist.
	 * @return the persisted entity.
	 */
	public HojaVidaVo save(HojaVidaVo hojaVida) {
		log.debug("Request to save Hoja de vida : {}", hojaVida);
		if (hojaVida.getPersona() != null) this.personaRepository.save(hojaVida.getPersona());
		if (hojaVida.getInformacionPersonal() != null) this.personalRepository.save(hojaVida.getInformacionPersonal());
		if (hojaVida.getIdiomas() != null && !hojaVida.getIdiomas().isEmpty()) this.idiomaRepository.saveAll(hojaVida.getIdiomas());
		guardarInformacionArchivos(hojaVida);
		return hojaVida;
	}
	
	public void guardarInformacionArchivos(HojaVidaVo hojaVida) {
		if (hojaVida.getInformacionAcademica() != null && !hojaVida.getInformacionAcademica().isEmpty()) {
			for (InformacionAcademica infAca: hojaVida.getInformacionAcademica()) {
				Optional<InformacionAcademica> informacionAcademicaBusqueda = this.academicaRepository.findById(infAca.getId());
				if (informacionAcademicaBusqueda.get().getId() != null) {
					this.academicaRepository.save(infAca);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionAcademica = hojaVida.getArchivos().stream().filter(f -> f.getInformacionAcademica().getId().equals(infAca.getId())).collect(Collectors.toList());
						archivosInformacionAcademica.stream().map(f -> {
							f.setInformacionAcademica(infAca);
							return f;
						}).forEach(f -> {
							this.archivoRepository.save(f);
						});
					}
				} else {
					Long index = infAca.getId();
					infAca.setId(null);
					InformacionAcademica informacionAcademicaGuardado = this.academicaRepository.save(infAca);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionAcademica = hojaVida.getArchivos().stream().filter(f -> f.getInformacionAcademica().getId().equals(index)).collect(Collectors.toList());
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
			for (InformacionLaboral infLab: hojaVida.getExperienciaLaboral()) {
				Optional<InformacionLaboral> informacionLaboralBusqueda = this.experienciaRepository.findById(infLab.getId());
				if (informacionLaboralBusqueda.get().getId() != null) {
					this.experienciaRepository.save(infLab);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionLaboral = hojaVida.getArchivos().stream().filter(f -> f.getInformacionLaboral().getId().equals(infLab.getId())).collect(Collectors.toList());
						archivosInformacionLaboral.stream().map(f -> {
							f.setInformacionLaboral(infLab);
							return f;
						}).forEach(f -> {
							this.archivoRepository.save(f);
						});
					}
				} else {
					Long index = infLab.getId();
					infLab.setId(null);
					InformacionLaboral informacionLaboralGuardado = this.experienciaRepository.save(infLab);
					if (hojaVida.getArchivos() != null && !hojaVida.getArchivos().isEmpty()) {
						List<Archivo> archivosInformacionLaboral = hojaVida.getArchivos().stream().filter(f -> f.getInformacionLaboral().getId().equals(index)).collect(Collectors.toList());
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
	}

	/**
	 * get a HojaVidaVo
	 * 
	 * @param id the persona's id
	 * @return the result entity
	 * @throws IOException 
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
		List<Archivo> listaArchivos = this.archivoRepository.findByUsuario(archivoHojaVida.getUsuario());
		Archivo archivo = new Archivo();
		String cadena64 = archivoHojaVida.getArchivo().replaceFirst("^.*,", "");
		byte[] bytesHojaVida = Base64.getDecoder().decode(cadena64);
		InputStream inputStream = new ByteArrayInputStream(bytesHojaVida);
		pdfMergerUtility.addSource(inputStream);
		for(Archivo item: listaArchivos) {
			String cadena64Items = item.getArchivo().replaceFirst("^.*,", "");
			byte[] bytesItems = Base64.getDecoder().decode(cadena64Items);
			if (item.getExtension().equals("pdf"))
			{
				InputStream inputStreamItems = new ByteArrayInputStream(bytesItems);
				pdfMergerUtility.addSource(inputStreamItems);
			}
			else {
				if(item.getTipo() != 5) {
					PDDocument documento = new PDDocument();
					ByteArrayOutputStream out = new ByteArrayOutputStream();
					PDPage page = new PDPage();
					documento.addPage(page);
					PDPageContentStream contents = new PDPageContentStream(documento, page);
					ByteArrayInputStream bais = new ByteArrayInputStream(bytesItems);
					BufferedImage bim = ImageIO.read(bais);
					PDImageXObject pdImage = LosslessFactory.createFromImage(documento, bim);
					contents.drawImage(pdImage, 70, 250);
			        contents.close();
			        documento.save(out);
			        documento.close();
			        ByteArrayInputStream inputStreamImages = new ByteArrayInputStream(out.toByteArray());
					pdfMergerUtility.addSource(inputStreamImages);
				}
			}
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