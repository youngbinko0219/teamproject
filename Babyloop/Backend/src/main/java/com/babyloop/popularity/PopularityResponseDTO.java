package com.babyloop.popularity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PopularityResponseDTO<T> {
    private String message;
    private T data;
}
