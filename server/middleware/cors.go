package middleware

import (
	"github.com/gofiber/fiber/v2"
)

// CORSMiddleware returns a Fiber middleware that sets CORS headers
func CORSMiddleware(allowedOrigin string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", allowedOrigin)
		c.Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Method() == "OPTIONS" {
			return c.SendStatus(fiber.StatusOK)
		}
		return c.Next()
	}
}
