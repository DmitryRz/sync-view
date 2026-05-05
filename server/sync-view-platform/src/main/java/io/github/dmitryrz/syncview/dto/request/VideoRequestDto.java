package io.github.dmitryrz.syncview.dto.request;

import lombok.*;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class VideoRequestDto {
    String title;
    String url;
    Integer duration;
}
