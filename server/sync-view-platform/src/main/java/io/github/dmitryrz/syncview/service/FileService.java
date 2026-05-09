package io.github.dmitryrz.syncview.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String uploadFile(MultipartFile file, String folder, String user);
    void deleteFile(String user);
    String buildFullUrl(String objectName);
}
