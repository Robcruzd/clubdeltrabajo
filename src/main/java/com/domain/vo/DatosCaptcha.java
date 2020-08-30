package com.domain.vo;

import java.io.Serializable;

public class DatosCaptcha implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2031227028586313348L;
	private Integer var1;
	private Integer var2;
	private Integer result;
	
	public DatosCaptcha() {

	}

	public Integer getVar1() {
		return var1;
	}

	public void setVar1(Integer var1) {
		this.var1 = var1;
	}

	public Integer getVar2() {
		return var2;
	}

	public void setVar2(Integer var2) {
		this.var2 = var2;
	}

	public Integer getResult() {
		return result;
	}

	public void setResult(Integer result) {
		this.result = result;
	}

}
