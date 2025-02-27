package com.babyloop.utils;

import java.io.ByteArrayOutputStream;

import org.xhtmlrenderer.pdf.ITextRenderer;

public class PdfGenerator {

	
    /**
     * HTML 문자열을 받아서 PDF 파일의 바이트 배열로 변환한다.
     *
     * @param htmlContent 변환할 HTML 문자열
     * @return PDF 파일의 바이트 배열
     */
	public byte[] generatePdf(String htmlContent) {
	    // Flying Saucer를 이용해 HTML을 PDF로 변환하는 예시
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	    try {
	        ITextRenderer renderer = new ITextRenderer();
	        renderer.setDocumentFromString(htmlContent);
	        renderer.layout();
	        renderer.createPDF(outputStream);
	        outputStream.close();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return outputStream.toByteArray();
	}

}
