package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceBookmarkRepository extends JpaRepository<PlaceBookmark, Long> {
    public List<PlaceBookmark> findAllByUserId(long userId);

    @Query(nativeQuery = true,
            value = "select IFNULL(B.id, 0) from place_bookmark right join " +
                    "(select distinct(map_place.place_id) as id from map_place right join map on map.id=map_place.map_id and map.campus_id=:campusId order by id) as B " +
                    "on B.id = place_bookmark.place_id " +
                    "group by B.id " +
                    "order by count(B.id) desc " +
                    "limit 1")
    Long makeBookmarkRanking(long campusId);
}
