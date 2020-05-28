package com.domain.vo;

import java.io.Serializable;
import java.util.List;

import com.domain.InformacionAcademica;
import com.domain.InformacionLaboral;
import com.domain.InformacionPersonal;

public class HojaVidaVo implements Serializable {

    private static final long serialVersionUID = 1L;

    private InformacionPersonal informacionPersonal;
    private List<InformacionAcademica> informacionAcademica;
    private List<InformacionLaboral> experienciaLaboral;
    private List<IdiomVo> idiomas;

    public HojaVidaVo() {

    }

    public void setInformacionPersonal(InformacionPersonal informacionPersonal) {
        this.informacionPersonal = informacionPersonal;
    }

    public InformacionPersonal getInformacionPersonal() {
        return this.informacionPersonal;
    }

    public void setInformacionAcademica(List<InformacionAcademica> informacionAcademica) {
        this.informacionAcademica = informacionAcademica;
    }

    public List<InformacionAcademica> getInformacionAcademica() {
        return this.informacionAcademica;
    }

    public void setExperienciaLaboral(List<InformacionLaboral> experienciaLaboral) {
        this.experienciaLaboral = experienciaLaboral;
    }

    public List<InformacionLaboral> getExperienciaLaboral() {
        return this.experienciaLaboral;
    }

    public List<IdiomVo> getIdiomas() {
        return idiomas;
    }

    public void setIdiomas(List<IdiomVo> idiomas) {
        this.idiomas = idiomas;
    }

}