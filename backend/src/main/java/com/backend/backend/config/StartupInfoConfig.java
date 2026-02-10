package com.backend.backend.config;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class StartupInfoConfig {

    private final Environment environment;

    @Value("${spring.application.name:SkillSphere Backend}")
    private String applicationName;

    @Value("${firebase.project.id:not-configured}")
    private String firebaseProjectId;

    public StartupInfoConfig(Environment environment) {
        this.environment = environment;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void displayStartupInfo() {
        String port = environment.getProperty("server.port", "8080");
        String contextPath = environment.getProperty("server.servlet.context-path", "/");
        String[] activeProfiles = environment.getActiveProfiles();
        String profiles = activeProfiles.length > 0 ? String.join(", ", activeProfiles) : "default";
        
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            // Use localhost as fallback
        }

        String corsOrigins = environment.getProperty("cors.allowed-origins", "*");
        boolean firebaseConfigured = !firebaseProjectId.equals("not-configured") && !firebaseProjectId.isEmpty();

        System.out.println();
        System.out.println("╔══════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                     🚀 SKILLSPHERE BACKEND STARTED 🚀                       ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════════════╣");
        System.out.println("║                                                                              ║");
        System.out.printf("║  📋 Application:     %-55s ║%n", applicationName);
        System.out.printf("║  🔧 Profile:         %-55s ║%n", profiles);
        System.out.printf("║  🌐 Port:            %-55s ║%n", port);
        System.out.println("║                                                                              ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════════════╣");
        System.out.println("║  📡 ENDPOINTS                                                                ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════════════╣");
        System.out.printf("║  Local:              http://localhost:%-37s ║%n", port + contextPath);
        System.out.printf("║  Network:            http://%-43s ║%n", hostAddress + ":" + port + contextPath);
        System.out.printf("║  Health:             http://localhost:%-37s ║%n", port + "/actuator/health");
        System.out.println("║                                                                              ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════════════╣");
        System.out.println("║  🔗 API ROUTES                                                               ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════════════╣");
        System.out.printf("║  Posts:              GET/POST    /posts                                      ║%n");
        System.out.printf("║  Comments:           GET/POST    /api/v1/comments/*                          ║%n");
        System.out.printf("║  Topics:             GET/POST    /api/v1/topics/*                            ║%n");
        System.out.printf("║  User Status:        GET/POST    /api/v1/user-status/*                       ║%n");
        System.out.println("║                                                                              ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════════════╣");
        System.out.println("║  ⚙️  CONFIGURATION                                                           ║");
        System.out.println("╠══════════════════════════════════════════════════════════════════════════════╣");
        System.out.printf("║  Firebase Project:   %-55s ║%n", firebaseConfigured ? firebaseProjectId : "❌ Not configured");
        System.out.printf("║  Firebase Status:    %-55s ║%n", firebaseConfigured ? "✅ Connected" : "⚠️  Check configuration");
        System.out.printf("║  CORS Origins:       %-55s ║%n", truncate(corsOrigins, 55));
        System.out.println("║                                                                              ║");
        System.out.println("╚══════════════════════════════════════════════════════════════════════════════╝");
        System.out.println();
        
        if (!firebaseConfigured) {
            System.out.println("⚠️  WARNING: Firebase is not configured!");
            System.out.println("   Please set the following environment variables:");
            System.out.println("   - FIREBASE_PROJECT_ID");
            System.out.println("   - FIREBASE_CREDENTIALS_PATH (local) or FIREBASE_CREDENTIALS_JSON (production)");
            System.out.println();
        }
    }

    private String truncate(String str, int maxLength) {
        if (str == null) return "N/A";
        if (str.length() <= maxLength) return str;
        return str.substring(0, maxLength - 3) + "...";
    }
}
