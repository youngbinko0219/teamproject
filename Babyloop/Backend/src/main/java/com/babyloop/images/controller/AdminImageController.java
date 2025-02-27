package com.babyloop.images.controller;

import com.babyloop.images.repository.AdBannerResponse;
import com.babyloop.images.repository.ApiResponse;
import com.babyloop.images.repository.ImageDeleteResponse;
import com.babyloop.images.repository.ImageUrlResponse;
import com.babyloop.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/ad-settings")
public class AdminImageController {

    @Autowired
    private ProductImageService productImageService;

    /**
     * 다중 이미지 업로드 API
     */
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImages(@RequestParam("files") MultipartFile[] files) {
        if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().body(new ApiResponse("error", "파일이 없습니다."));
        }

        try {
            List<String> imageUrls = productImageService.processAdImageFile(files, "ad");
            List<ImageUrlResponse> responses = imageUrls.stream()
                    .map(ImageUrlResponse::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(new ApiResponse("success", responses));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("error", "이미지 업로드 실패: " + e.getMessage()));
        }
    }

    /**
     * 이미지 삭제 API
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteImage(@RequestParam("url") String url) {
        if (url == null || url.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse("error", "유효한 URL이 필요합니다."));
        }

        try {
            boolean removed = productImageService.deleteImage(url);
            return ResponseEntity.ok().body(new ApiResponse("success", new ImageDeleteResponse(removed)));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("error", "이미지 삭제 실패: " + e.getMessage()));
        }
    }

    /**
     * 광고 배너 이미지 조회 API
     */
    @GetMapping
    public ResponseEntity<?> getAdBanners() {
        try {
            List<String> banners = productImageService.getAdBanners();
            AdBannerResponse response = new AdBannerResponse(banners);
            return ResponseEntity.ok().body(new ApiResponse("success", response));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("error", "배너 조회 실패: " + e.getMessage()));
        }
    }

}
