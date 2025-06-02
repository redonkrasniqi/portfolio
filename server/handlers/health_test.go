package handlers

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHealthHandler(t *testing.T) {
	req := httptest.NewRequest("GET", "/health", nil)
	w := httptest.NewRecorder()

	HealthHandler(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", resp.StatusCode)
	}

	expected := `{"status":"healthy"}`
	body := strings.TrimSpace(w.Body.String())
	if body != expected {
		t.Errorf("expected body '%s', got '%s'", expected, body)
	}
}
