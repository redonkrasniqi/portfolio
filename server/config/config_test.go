package config

import (
	"os"
	"testing"
)

func TestLoadSMTPConfig_Valid(t *testing.T) {
	os.Setenv("SMTP_HOST", "smtp.example.com")
	os.Setenv("SMTP_PORT", "2525")
	os.Setenv("SMTP_USER", "user@example.com")
	os.Setenv("SMTP_PASS", "password123")
	os.Setenv("CONTACT_TO", "dest@example.com")

	cfg, err := LoadSMTPConfig()
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if cfg.Host != "smtp.example.com" {
		t.Errorf("expected Host 'smtp.example.com', got '%s'", cfg.Host)
	}
	if cfg.Port != 2525 {
		t.Errorf("expected Port 2525, got %d", cfg.Port)
	}
	if cfg.Username != "user@example.com" {
		t.Errorf("expected Username 'user@example.com', got '%s'", cfg.Username)
	}
	if cfg.Password != "password123" {
		t.Errorf("expected Password 'password123', got '%s'", cfg.Password)
	}
	if cfg.ToEmail != "dest@example.com" {
		t.Errorf("expected ToEmail 'dest@example.com', got '%s'", cfg.ToEmail)
	}
}

func TestLoadSMTPConfig_InvalidPort(t *testing.T) {
	os.Setenv("SMTP_HOST", "smtp.example.com")
	os.Setenv("SMTP_PORT", "notanumber")
	os.Setenv("SMTP_USER", "user@example.com")
	os.Setenv("SMTP_PASS", "password123")
	os.Setenv("CONTACT_TO", "dest@example.com")

	_, err := LoadSMTPConfig()
	if err == nil {
		t.Fatal("expected error due to invalid port, got none")
	}
}
