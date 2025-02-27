package com.babyloop.header;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HeaderResponseDTO<T> {
	private String message;
    private T data;
}
