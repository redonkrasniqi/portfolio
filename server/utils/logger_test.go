package utils

import (
	"testing"
)

func TestNewLogger_NotNil(t *testing.T) {
	logger := NewLogger()
	if logger == nil {
		t.Fatal("expected NewLogger() to return a non-nil *zap.SugaredLogger")
	}

	logger.Infof("Test message: %s", "hello")
}
