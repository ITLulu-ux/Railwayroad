package RailwayApplication;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "RailwayApplication")
@MapperScan("RailwayApplication.mapper")

public class AutoMain {
    public static void main(String[] args) {
        SpringApplication.run(AutoMain.class, args);
    }
}
