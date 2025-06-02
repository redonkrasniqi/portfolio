package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/redonkrasniqi/portfolio/server/config"
	"github.com/redonkrasniqi/portfolio/server/models"
	"github.com/redonkrasniqi/portfolio/server/services"
)

func ContactHandler(smtpCfg *config.SMTPConfig) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req models.ContactRequest
		decoder := json.NewDecoder(r.Body)
		if err := decoder.Decode(&req); err != nil {
			http.Error(w, `{"error":"invalid JSON payload"}`, http.StatusBadRequest)
			return
		}

		if req.Name == "" || req.Email == "" || req.Message == "" {
			http.Error(w, `{"error":"name, email, and message are required"}`, http.StatusBadRequest)
			return
		}

		if err := services.SendContactEmail(smtpCfg, &req); err != nil {
			http.Error(w, `{"error":"failed to send email"}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	}
}
