package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/redonkrasniqi/portfolio/server/config"
	"github.com/redonkrasniqi/portfolio/server/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Printf("No .env file found (continuing with real env vars): %v", err)
	}

	smtpCfg, err := config.LoadSMTPConfig()
	if err != nil {
		log.Fatalf("Failed to load SMTP config: %v", err)
	}

	r := routes.RegisterRoutes(smtpCfg)
	addr := os.Getenv("PORT")
	if addr == "" {
		addr = "8080"
	}

	srv := &http.Server{
		Addr:         ":" + addr,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("Starting HTTP server on %s...", srv.Addr)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
