package services

import (
	"fmt"

	"github.com/go-mail/mail/v2"
	"github.com/redonkrasniqi/portfolio/server/config"
	"github.com/redonkrasniqi/portfolio/server/models"
)

func SendContactEmail(cfg *config.SMTPConfig, req *models.ContactRequest) error {
	m := mail.NewMessage()

	m.SetHeader("From", cfg.Username)
	m.SetHeader("To", cfg.ToEmail)
	m.SetHeader("Reply-To", req.Email)

	subject := fmt.Sprintf("New contact from %s!", req.Name)
	m.SetHeader("Subject", subject)

	body := fmt.Sprintf(
		"You’ve received a new message from your portfolio site:\n\n"+
			"Name: %s\nEmail: %s\n\nMessage:\n%s\n",
		req.Name, req.Email, req.Message,
	)
	m.SetBody("text/plain", body)

	d := mail.NewDialer(cfg.Host, cfg.Port, cfg.Username, cfg.Password)
	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}
