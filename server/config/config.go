package config

import (
	"fmt"
	"os"
	"strconv"
)

type SMTPConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	ToEmail  string
}

// LoadSMTPConfig reads environment variables and returns an SMTPConfig.
// You can set env vars e.g.:
//
//	SMTP_HOST=smtp.gmail.com
//	SMTP_PORT=587
//	SMTP_USER=foo@gmail.com
//	SMTP_PASS=yourpassword
//	CONTACT_TO=you@domain.com
func LoadSMTPConfig() (*SMTPConfig, error) {
	portInt, err := strconv.Atoi(os.Getenv("SMTP_PORT"))
	if err != nil {
		return nil, fmt.Errorf("invalid SMTP_PORT: %w", err)
	}

	return &SMTPConfig{
		Host:     os.Getenv("SMTP_HOST"),
		Port:     portInt,
		Username: os.Getenv("SMTP_USER"),
		Password: os.Getenv("SMTP_PASS"),
		ToEmail:  os.Getenv("CONTACT_TO"),
	}, nil
}
