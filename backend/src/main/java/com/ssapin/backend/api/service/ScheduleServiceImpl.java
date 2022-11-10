package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.UserRankingResponse;

import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.MapRanking;
import com.ssapin.backend.api.domain.entity.UserRanking;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repository.MapRankingRepository;
import com.ssapin.backend.api.domain.repository.UserRankingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@EnableScheduling
@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final MapServiceImpl mapService;

    private final CampusRepository campusRepository;

    private final MapRankingRepository mapRankingRepository;

    private final UserRankingRepository userRankingRepository;

    @Scheduled(cron = "0 20 16 * * *", zone = "Asia/Seoul")
    public void everyDay_0_08_RankingJob() {
        System.out.println("유저랭킹시작 두구두구");
        userRankingRepository.deleteAll();

        for (long i = 1; i <= 5; i++) {
            List<UserRankingResponse> UsersList = mapService.get5UserByCampus(i);
            for (UserRankingResponse uu : UsersList) {
                UserRanking userRanking = UserRanking.builder()
                        .user(uu.getUser())
                        .mapCount(uu.getMapCount())
                        .build();
                userRankingRepository.save(userRanking);
            }

        }

        System.out.println("지도랭킹시작 두구두구");
        mapRankingRepository.deleteAll();
        for (int i = 1; i <= 5; i++) {
            List<Map> MapList = mapService.get6MapsByCampus(i);
            for (Map mm : MapList) {
                MapRanking mapRanking = MapRanking.builder()
                        .map(mm)
                        .build();
                mapRankingRepository.save(mapRanking);
            }
        }
    }


}
