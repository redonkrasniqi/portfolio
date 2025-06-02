package routes

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/redonkrasniqi/portfolio/server/config"
)

func TestRegisterRoutes_Health(t *testing.T) {
	cfg := &config.SMTPConfig{}
	router := RegisterRoutes(cfg)

	req := httptest.NewRequest("GET", "/health", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)
	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", resp.StatusCode)
	}
}

func TestRegisterRoutes_ContactMissingFields(t *testing.T) {
	// Use invalid SMTP config, but missing-field validation happens first
	cfg := &config.SMTPConfig{
		Host:     "invalid",
		Port:     1025,
		Username: "",
		Password: "",
		ToEmail:  "dest@example.com",
	}
	router := RegisterRoutes(cfg)

	req := httptest.NewRequest("POST", "/contact", strings.NewReader(`{"name":"Bob","email":"bob@example.com"}`))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)
	resp := w.Result()
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}
}

func TestRegisterRoutes_CORSPreflight(t *testing.T) {
	cfg := &config.SMTPConfig{}
	router := RegisterRoutes(cfg)

	req := httptest.NewRequest("OPTIONS", "/contact", nil)
	req.Header.Set("Origin", "http://localhost:3000")
	req.Header.Set("Access-Control-Request-Method", "POST")
	req.Header.Set("Access-Control-Request-Headers", "Content-Type")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)
	resp := w.Result()
	if resp.StatusCode != http.StatusNoContent {
		t.Errorf("expected status 204, got %d", resp.StatusCode)
	}
	if resp.Header.Get("Access-Control-Allow-Origin") != "*" {
		t.Errorf("expected CORS header '*', got '%s'", resp.Header.Get("Access-Control-Allow-Origin"))
	}
}
