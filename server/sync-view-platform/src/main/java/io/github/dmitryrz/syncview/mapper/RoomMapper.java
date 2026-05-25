package io.github.dmitryrz.syncview.mapper;

import io.github.dmitryrz.syncview.domain.model.Room;
import io.github.dmitryrz.syncview.domain.model.User;
import io.github.dmitryrz.syncview.dto.request.RoomRequestDto;
import io.github.dmitryrz.syncview.dto.response.RoomResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "currentVideo", ignore = true)
    @Mapping(target = "externalVideoUrl", ignore = true)
    Room toEntity(RoomRequestDto request, User creator);

    @Mapping(target = "creator", source = "room.creator.username")
    @Mapping(target = "videoId", source = "room.currentVideo.id")
    @Mapping(target = "currentVideo", expression = "java(resolveVideoTitleOrUrl(room))")
    RoomResponseDto toDto(Room room);

    default String resolveVideoTitleOrUrl(Room room) {
        if (room.getCurrentVideo() != null) {
            return room.getCurrentVideo().getTitle();
        }
        return room.getExternalVideoUrl();
    }
}
