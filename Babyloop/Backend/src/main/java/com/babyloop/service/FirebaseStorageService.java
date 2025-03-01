package com.babyloop.service;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Acl.Role;
import com.google.cloud.storage.Acl.User;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

@Service
public class FirebaseStorageService {

    /**
     * MultipartFile을 받아서 Firebase Storage에 업로드하고, 파일의 공개 URL을 반환한다.
     *
     * @param file     업로드할 파일
     * @param fileName Storage에 저장할 파일명
     * @return 업로드된 파일의 공개 URL
     */
    public String uploadFile(MultipartFile file, String fileName) {
        try {
            // Storage Bucket 가져오기
            Bucket bucket = StorageClient.getInstance().bucket();
            
            // 경로지정
            String storagePath = "imgs/" + fileName;
            
            // 파일 업로드: file.getBytes()를 이용해 파일의 바이트 데이터를 업로드하며, contentType도 함께 지정
            Blob blob = bucket.create(storagePath, file.getBytes(), file.getContentType());
            
            // (옵션) 업로드한 파일을 public 읽기 권한으로 변경 → 이후 URL로 바로 접근 가능하도록 함
            blob.toBuilder().setAcl(Arrays.asList(Acl.of(User.ofAllUsers(), Role.READER))).build().update();

            // public URL 구성: bucket이 public이면 아래 URL로 접근 가능함.
            String publicUrl = String.format("https://storage.googleapis.com/%s/%s", bucket.getName(), blob.getName());
            return publicUrl;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
	/**
	 * PDF 파일 데이터를 Firebase Storage에 업로드하고, 업로드된 파일의 공개 URL을 반환한다.
	 *
	 * @param pdfBytes 업로드할 PDF 파일의 바이트 배열
	 * @param paymentId 결제 식별자로, 이를 사용하여 파일 이름을 생성한다.
	 * @return 업로드된 PDF 파일의 공개 URL
	 */
    public String uploadPdf(byte[] pdfBytes, String paymentId) {
        // Firebase Admin SDK 초기화 후 Bucket 사용
        Bucket bucket = StorageClient.getInstance().bucket();
        String fileName = "receipt/" + paymentId + ".pdf";

        Blob blob = bucket.create(fileName, pdfBytes, "application/pdf");
        
        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));  // 업로드된 파일을 공개 설정
        
        // 예시: Storage 버킷이 공개 액세스를 허용하는 경우
        String fileUrl = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                bucket.getName(), URLEncoder.encode(fileName, StandardCharsets.UTF_8));
        return fileUrl;
    }
    
}
