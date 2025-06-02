package middleware

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestCORS_Preflight(t *testing.T) {
	handler := CORS(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Errorf("inner handler should NOT be invoked on OPTIONS preflight")
	}))

	req := httptest.NewRequest("OPTIONS", "/any", nil)
	req.Header.Set("Origin", "http://localhost:3000")
	req.Header.Set("Access-Control-Request-Method", "POST")
	req.Header.Set("Access-Control-Request-Headers", "Content-Type")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)
	resp := w.Result()

	if resp.StatusCode != http.StatusNoContent {
		t.Errorf("expected status 204, got %d", resp.StatusCode)
	}
	if got := resp.Header.Get("Access-Control-Allow-Origin"); got != "*" {
		t.Errorf("expected Access-Control-Allow-Origin='*', got '%s'", got)
	}
	if got := resp.Header.Get("Access-Control-Allow-Methods"); got != "GET, POST, OPTIONS" {
		t.Errorf("expected Access-Control-Allow-Methods='GET, POST, OPTIONS', got '%s'", got)
	}
	if got := resp.Header.Get("Access-Control-Allow-Headers"); got != "Content-Type, Authorization" {
		t.Errorf("expected Access-Control-Allow-Headers='Content-Type, Authorization', got '%s'", got)
	}
	// Body should be empty on a preflight
	if body := w.Body.String(); len(strings.TrimSpace(body)) != 0 {
		t.Errorf("expected empty body on preflight, got '%s'", body)
	}
}

func TestCORS_SimpleRequest(t *testing.T) {
	handler := CORS(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	}))

	req := httptest.NewRequest("GET", "/any", nil)
	req.Header.Set("Origin", "http://localhost:3000")
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)
	resp := w.Result()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", resp.StatusCode)
	}
	if got := resp.Header.Get("Access-Control-Allow-Origin"); got != "*" {
		t.Errorf("expected Access-Control-Allow-Origin='*', got '%s'", got)
	}
	body := strings.TrimSpace(w.Body.String())
	if body != "OK" {
		t.Errorf("expected body 'OK', got '%s'", body)
	}
}
