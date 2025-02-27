package com.babyloop.service;

import java.io.ByteArrayOutputStream;
import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.babyloop.auth.repository.MemberDTO;
import com.babyloop.payment.repository.RentalsDTO;
import com.babyloop.product.repository.ProductsDTO;
import com.google.firestore.v1.Document;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class PdfService {
	
	@Autowired
	private SpringTemplateEngine templateEngine;
	
	
	/**
     * 결제 정보를 기반으로 receipt.html 템플릿을 렌더링하여 HTML 문자열을 생성한다.
     *
     * @param 
     * @return HTML : 문자열
     */
    public String generateHtmlTemplate(
    		MemberDTO memberDTO,
    		List<ProductsDTO> productsDTO,
    		RentalsDTO rentalsDTO,
    		int stockSize, int productSize,
    		int total, int pointSize, String start) {
        Context context = new Context();
        context.setVariable("rentalsDTO", rentalsDTO);
        context.setVariable("products", productsDTO);
        context.setVariable("memberDTO", memberDTO);
        context.setVariable("stockSize", stockSize);
        context.setVariable("productSize", productSize);
        context.setVariable("total", total);
        context.setVariable("pointSize", pointSize);
        context.setVariable("start", start);
        // "receipt"는 templates 폴더 내에 있는 receipt.html 파일을 가리킵니다.
        return templateEngine.process("receipt", context);
    }
    
    
    // HTML을 PDF로 변환 (Flying Saucer 사용)
    public byte[] generatePdf(String htmlContent) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        // Flying Saucer PDF 변환기
        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(htmlContent);
        renderer.layout();
        renderer.createPDF(byteArrayOutputStream);

        return byteArrayOutputStream.toByteArray();
    }


}
