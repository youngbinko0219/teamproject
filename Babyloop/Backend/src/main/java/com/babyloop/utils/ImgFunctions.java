package com.babyloop.utils;

import java.io.File;
import java.util.UUID;

public class ImgFunctions {

	public static String getUuid() {
		String uuid = UUID.randomUUID().toString();
		uuid = uuid.replaceAll("-", "");
		
		return uuid;
	}
	
	
	public static String renameFile(String sDirectory,
			String fileName) {
		
		String ext = fileName.substring(fileName.lastIndexOf("."));
		String now = getUuid();
		String newFileName = now + ext;
		
		File oldFile =
				new File(sDirectory + File.separator + fileName);
		File newFile = 
				new File(sDirectory + File.separator + newFileName);
		oldFile.renameTo(newFile);
		
		return newFileName;
	}
}
