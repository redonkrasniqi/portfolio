package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	Port            string
	SMTPHost        string
	SMTPPort        string
	SMTPUser        string
	SMTPPass        string
	ContactReceiver string
	AllowedOrigin   string
}

var Cfg AppConfig

func Load() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, reading environment variables directly")
	}

	Cfg = AppConfig{
		Port:            getEnv("PORT", "8080"),
		SMTPHost:        getEnv("SMTP_HOST", ""),
		SMTPPort:        getEnv("SMTP_PORT", "587"),
		SMTPUser:        getEnv("SMTP_USER", ""),
		SMTPPass:        getEnv("SMTP_PASS", ""),
		ContactReceiver: getEnv("CONTACT_RECEIVER", ""),
		AllowedOrigin:   getEnv("ALLOWED_ORIGIN", "http://localhost:3000"),
	}

	if Cfg.SMTPHost == "" || Cfg.SMTPUser == "" || Cfg.SMTPPass == "" {
		log.Fatal("Missing required SMTP configuration")
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
