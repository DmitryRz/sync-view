package io.github.dmitryrz.syncview.dto.request;

import jakarta.validation.constraints.AssertTrue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
@AllArgsConstructor
public class RoomRequestDto {
    Long videoId;
    String name;
    String externalUrl;

    @AssertTrue(message = "Должно быть указано либо videoId, либо externalUrl, но не оба сразу")
    public boolean isValidVideoSource() {
        return (videoId == null) != (externalUrl == null);
    }
}
