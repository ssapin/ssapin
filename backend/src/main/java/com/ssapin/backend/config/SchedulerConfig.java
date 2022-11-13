package com.ssapin.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

@Configuration
public class SchedulerConfig implements SchedulingConfigurer {
    private final int POOL_SIZE = 10;

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        // [스레드 풀을 사용해서 모든 예약된 스케줄 작업이 실행되도록 설정]
        // [스프링에서는 스케줄링 작업은 한개의 스레드 풀에서 실행되기때문에 >> 다중 동시 실행을 위해서 스레드 풀 설정 실시]
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();

        threadPoolTaskScheduler.setPoolSize(POOL_SIZE);
        threadPoolTaskScheduler.setThreadNamePrefix("scheduled-task-pool-");
        threadPoolTaskScheduler.initialize();

        scheduledTaskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
        System.out.println("\n");
        System.out.println("=======================================");
        System.out.println("current thread : " + Thread.currentThread().getName());
        System.out.println("=======================================");
        System.out.println("\n");
    }
}
