FROM openjdk:11-jre-slim
WORKDIR app
EXPOSE 8080
COPY ./build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","${JAVA_OPTS}","-jar","/app.jar"]