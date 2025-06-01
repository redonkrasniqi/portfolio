package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/redonkrasniqi/portfolio/server/config"
	"github.com/redonkrasniqi/portfolio/server/middleware"
	"github.com/redonkrasniqi/portfolio/server/routes"
	"github.com/redonkrasniqi/portfolio/server/utils"
)

func main() {
	// 1) Load configuration
	config.Load()

	// 2) Initialize logger
	appLogger := utils.NewLogger() // e.g., zap, logrus, or simple log

	// 3) Initialize Fiber
	app := fiber.New(fiber.Config{
		// You can customize error handlers, timeouts, etc. here
	})

	// 4) Global middleware
	app.Use(logger.New()) // Fiber’s built-in logger
	app.Use(middleware.CORSMiddleware(config.Cfg.AllowedOrigin))

	// 5) Register routes from routes package
	routes.Register(app, appLogger)

	// 6) Start server
	addr := fmt.Sprintf(":%s", config.Cfg.Port)
	appLogger.Infof("Starting server on %s", addr)
	if err := app.Listen(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
