package io.github.dmitryrz.syncview.dto.request;

import lombok.*;
import lombok.extern.jackson.Jacksonized;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Value
public class VideoRequestDto {
    String title;
    MultipartFile file;
}
