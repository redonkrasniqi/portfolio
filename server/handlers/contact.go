package handlers

import (
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"

	"github.com/redonkrasniqi/portfolio/server/models"
	"github.com/redonkrasniqi/portfolio/server/services"
)

func ContactHandler(logger *zap.SugaredLogger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var req models.ContactRequest
		if err := c.BodyParser(&req); err != nil {
			logger.Errorf("Failed to parse contact request: %v", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
		}

		if req.Name == "" || req.Email == "" || req.Message == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Name, email, and message are required"})
		}

		if err := services.SendContactEmail(req); err != nil {
			logger.Errorf("Failed to send contact email: %v", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to send email"})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "sent"})
	}
}
