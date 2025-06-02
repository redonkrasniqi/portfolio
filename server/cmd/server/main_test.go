package main

import (
	"os"
	"os/exec"
	"testing"
)

func TestMain_MissingEnv(t *testing.T) {
	os.Unsetenv("SMTP_HOST")
	os.Unsetenv("SMTP_PORT")
	os.Unsetenv("SMTP_USER")
	os.Unsetenv("SMTP_PASS")
	os.Unsetenv("CONTACT_TO")
	os.Unsetenv("PORT")

	cmd := exec.Command("go", "run", ".")
	cmd.Dir = "."

	if err := cmd.Run(); err == nil {
		t.Fatal("expected `go run .` to fail when env vars are missing, but it succeeded")
	}
}
