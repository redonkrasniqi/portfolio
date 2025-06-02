package models

import (
	"encoding/json"
	"testing"
)

func TestUnmarshal_ValidJSON(t *testing.T) {
	input := `{
		"name": "Alice",
		"email": "alice@example.com",
		"message": "Hello from Alice!"
	}`

	var req ContactRequest
	if err := json.Unmarshal([]byte(input), &req); err != nil {
		t.Fatalf("unexpected error unmarshalling valid JSON: %v", err)
	}

	if req.Name != "Alice" {
		t.Errorf("expected Name = %q, got %q", "Alice", req.Name)
	}
	if req.Email != "alice@example.com" {
		t.Errorf("expected Email = %q, got %q", "alice@example.com", req.Email)
	}
	if req.Message != "Hello from Alice!" {
		t.Errorf("expected Message = %q, got %q", "Hello from Alice!", req.Message)
	}
}

func TestUnmarshal_MissingFields(t *testing.T) {
	input := `{
		"name": "Bob",
		"email": "bob@example.com"
	}`

	var req ContactRequest
	if err := json.Unmarshal([]byte(input), &req); err != nil {
		t.Fatalf("unexpected error unmarshalling JSON with missing fields: %v", err)
	}

	if req.Name != "Bob" {
		t.Errorf("expected Name = %q, got %q", "Bob", req.Name)
	}
	if req.Email != "bob@example.com" {
		t.Errorf("expected Email = %q, got %q", "bob@example.com", req.Email)
	}
	if req.Message != "" {
		t.Errorf("expected Message to be empty, got %q", req.Message)
	}
}

func TestMarshal_ProducesCorrectJSON(t *testing.T) {
	req := ContactRequest{
		Name:    "Carol",
		Email:   "carol@example.com",
		Message: "Testing JSON marshal",
	}

	data, err := json.Marshal(req)
	if err != nil {
		t.Fatalf("unexpected error marshalling ContactRequest: %v", err)
	}

	var asMap map[string]string
	if err := json.Unmarshal(data, &asMap); err != nil {
		t.Fatalf("unexpected error unmarshalling back into map: %v", err)
	}

	if asMap["name"] != "Carol" {
		t.Errorf("expected map[\"name\"] = %q, got %q", "Carol", asMap["name"])
	}
	if asMap["email"] != "carol@example.com" {
		t.Errorf("expected map[\"email\"] = %q, got %q", "carol@example.com", asMap["email"])
	}
	if asMap["message"] != "Testing JSON marshal" {
		t.Errorf("expected map[\"message\"] = %q, got %q", "Testing JSON marshal", asMap["message"])
	}
}
