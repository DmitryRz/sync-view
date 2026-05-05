package io.github.dmitryrz.syncview.mapper;

import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.model.Video;
import io.github.dmitryrz.syncview.dto.request.VideoRequestDto;
import io.github.dmitryrz.syncview.dto.response.VideoResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VideoMapper {

    @Mapping(target = "ownerUsername", source = "owner.username")
    VideoResponseDto toResponseDto(Video video);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Video toEntity(VideoRequestDto dto, User owner);
}