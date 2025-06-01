package routes

import (
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"

	"github.com/redonkrasniqi/portfolio/server/handlers"
)

func Register(app *fiber.App, logger *zap.SugaredLogger) {
	// Health check
	app.Get("/health", handlers.HealthCheck)

	// Contact form
	app.Post("/api/contact", handlers.ContactHandler(logger))
}
