package io.github.dmitryrz.syncview.mapper;

import io.github.dmitryrz.syncview.domain.model.Room;
import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.domain.model.Video;
import io.github.dmitryrz.syncview.dto.request.RoomRequestDto;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "id", ignore = true)
    Room toEntity(RoomRequestDto dto, User creator, Video currentVideo);

    @Mapping(target = "currentVideo", source = "currentVideo.url")
    @Mapping(target = "creator", source = "creator.username")
    RoomResponseDto toDto(Room room);
}
