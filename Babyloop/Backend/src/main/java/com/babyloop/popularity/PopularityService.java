package com.babyloop.popularity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PopularityService {

    @Autowired
    private PopularityMapper popularityMapper;

    public List<PopularityDTO> getAllPopularity() {
        return popularityMapper.selectPopularity();
    }
}
