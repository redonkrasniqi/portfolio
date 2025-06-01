package services

import (
	"fmt"
	"net/smtp"

	"github.com/redonkrasniqi/portfolio/server/config"
	"github.com/redonkrasniqi/portfolio/server/models"
)

func SendContactEmail(req models.ContactRequest) error {
	host := config.Cfg.SMTPHost
	port := config.Cfg.SMTPPort
	user := config.Cfg.SMTPUser
	pass := config.Cfg.SMTPPass
	receiver := config.Cfg.ContactReceiver

	auth := smtp.PlainAuth("", user, pass, host)

	subject := "New Contact Form Submission"
	body := fmt.Sprintf(
		"Name: %s\r\nEmail: %s\r\n\r\nMessage:\r\n%s",
		req.Name, req.Email, req.Message,
	)

	msg := []byte(
		"To: " + receiver + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"MIME-version: 1.0;\r\n" +
			"Content-Type: text/plain; charset=\"UTF-8\";\r\n\r\n" +
			body + "\r\n",
	)

	addr := host + ":" + port
	return smtp.SendMail(addr, auth, user, []string{receiver}, msg)
}
