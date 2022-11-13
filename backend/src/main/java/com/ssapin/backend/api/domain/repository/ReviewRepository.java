package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(nativeQuery = true,
            value="select IFNULL(B.id,0) " +
                    "from review right join " +
                    "(select distinct(map_place.place_id) as id from map_place right join map on map.id=map_place.map_id and map.campus_id=:campusId order by id) as B " +
                    "on review.place_id = B.id " +
                    "group by B.id " +
                    "order by count(B.id) desc " +
                    "limit 1 ")
    Long makeReviewRanking(long campusId);
    Optional<Review> findByUserAndPlace(User user, Place place);
}
