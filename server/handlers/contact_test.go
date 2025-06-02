package handlers

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/redonkrasniqi/portfolio/server/config"
)

func TestContactHandler_InvalidJSON(t *testing.T) {
	smtpCfg := &config.SMTPConfig{
		Host:     "localhost",
		Port:     1025,
		Username: "",
		Password: "",
		ToEmail:  "dest@example.com",
	}
	handler := ContactHandler(smtpCfg)

	req := httptest.NewRequest("POST", "/contact", strings.NewReader("{invalid-json}"))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	handler(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}
}

func TestContactHandler_MissingFields(t *testing.T) {
	smtpCfg := &config.SMTPConfig{
		Host:     "localhost",
		Port:     1025,
		Username: "",
		Password: "",
		ToEmail:  "dest@example.com",
	}
	handler := ContactHandler(smtpCfg)

	payload := `{"name":"Bob","email":"bob@example.com","subject":"No message"}`
	req := httptest.NewRequest("POST", "/contact", strings.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	handler(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}
}

func TestContactHandler_ServiceError(t *testing.T) {
	smtpCfg := &config.SMTPConfig{
		Host:     "invalid.host.example",
		Port:     1025,
		Username: "",
		Password: "",
		ToEmail:  "dest@example.com",
	}
	handler := ContactHandler(smtpCfg)

	payload := `{"name":"Alice","email":"alice@example.com","subject":"Hello","message":"Hello"}`
	req := httptest.NewRequest("POST", "/contact", strings.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	handler(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusInternalServerError {
		t.Errorf("expected status 500, got %d", resp.StatusCode)
	}
}
