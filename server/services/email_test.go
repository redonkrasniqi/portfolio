package services

import (
	"testing"

	"github.com/redonkrasniqi/portfolio/server/config"
	"github.com/redonkrasniqi/portfolio/server/models"
)

func TestSendContactEmail_InvalidConfig(t *testing.T) {
	cfg := &config.SMTPConfig{
		Host:     "invalid.host.example",
		Port:     1025,
		Username: "user",
		Password: "pass",
		ToEmail:  "dest@example.com",
	}
	req := &models.ContactRequest{
		Name:    "Test",
		Email:   "test@example.com",
		Message: "Message body",
	}

	err := SendContactEmail(cfg, req)
	if err == nil {
		t.Fatal("expected error sending with invalid config, got nil")
	}
}
