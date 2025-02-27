package com.babyloop.popularity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/popularity")
public class PopularityController {
    
    @Autowired
    private PopularityService popularityService;

    @GetMapping
    public PopularityResponseDTO<List<PopularityDTO>> getAllPopularity() {
        List<PopularityDTO> allPopularity = popularityService.getAllPopularity();
        return new PopularityResponseDTO<>("success", allPopularity);
    }
}
