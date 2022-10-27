package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.MapRanking;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repository.MapRankingRepository;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
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

    @Scheduled(cron = "0 0 8 * * *", zone = "Asia/Seoul")
    public void everyDay_0_00_RankingJob() {
        System.out.println("유저랭킹시작 두구두구");
        for (int i = 1; i <= 5; i++) {
            List<Map> UsersList = mapService.get5UserByCampus(i);
            for (Map m : UsersList) {
                mapRankingRepository.save(new MapRanking(m));
            }
        }
    }


}
