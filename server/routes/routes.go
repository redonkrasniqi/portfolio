package routes

import (
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/redonkrasniqi/portfolio/server/config"
	"github.com/redonkrasniqi/portfolio/server/handlers"
	mw "github.com/redonkrasniqi/portfolio/server/middleware"
)

func RegisterRoutes(smtpCfg *config.SMTPConfig) *chi.Mux {
	r := chi.NewRouter()

	r.Use(chiMiddleware.Logger)
	r.Use(chiMiddleware.Recoverer)
	r.Use(chiMiddleware.RequestID)
	r.Use(chiMiddleware.RealIP)
	r.Use(chiMiddleware.NoCache)
	r.Use(chiMiddleware.StripSlashes)

	r.Use(mw.CORS)

	r.Get("/health", handlers.HealthHandler)

	r.Post("/contact", handlers.ContactHandler(smtpCfg))

	return r
}
