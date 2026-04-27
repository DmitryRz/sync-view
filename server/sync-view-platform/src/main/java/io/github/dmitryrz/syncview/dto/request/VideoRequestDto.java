package io.github.dmitryrz.syncview.dto.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VideoRequestDto {
    private String title;
    private String url;
    private Integer duration;
}
