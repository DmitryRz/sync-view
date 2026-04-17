package io.github.dmitryrz.syncview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SyncViewApplication {

	public static void main(String[] args) {
		SpringApplication.run(SyncViewApplication.class, args);
	}

}
