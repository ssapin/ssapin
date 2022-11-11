package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.MapPlace;
import com.ssapin.backend.api.domain.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MapPlaceRepository extends JpaRepository<MapPlace, Long> {
    @Query(nativeQuery = true,
            value = "select IFNULL(map_place.place_id,0) " +
                    "from map_place " +
                    "right join map on map.id=map_place.map_id and map.campus_id=:campusId " +
                    "group by map_place.place_id " +
                    "order by count(map_place.place_id) desc " +
                    "limit 1")
    long makeMapPlaceRanking(long campusId);
    boolean existsByMapAndPlace(Map map, Place place);
}
