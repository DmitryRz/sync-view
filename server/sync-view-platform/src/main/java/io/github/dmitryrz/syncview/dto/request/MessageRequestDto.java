package io.github.dmitryrz.syncview.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
@AllArgsConstructor
public class MessageRequestDto {
    String message;
}
