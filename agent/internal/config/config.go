package config

import (
	"fmt"
	"os"

	"github.com/gdaniele-art/pinggo/agent/internal/model"
	"gopkg.in/yaml.v3"
)

func LoadConfig(path string) (model.Config, error) {
	fileContent, err := os.ReadFile(path)
	if err != nil {
		return model.Config{}, fmt.Errorf("failed, cloud not read config file: %w", err)
	}
	var cfg model.Config

	if err := yaml.Unmarshal(fileContent, &cfg); err != nil {
		return model.Config{}, fmt.Errorf("failed, cloud not parse config file: %w", err)
	}
	return cfg, nil
}

func ValidateConfig(cfg model.Config) error {
	if cfg.APIUrl == "" {
		return fmt.Errorf("apiUrl is required")
	}

	if cfg.AgentID <= 0 {
		return fmt.Errorf("agentId must be greater than 0")
	}

	if cfg.IntervalSeconds <= 0 {
		return fmt.Errorf("intervalSeconds must be greater than 0")
	}

	if cfg.TimeoutSeconds <= 0 {
		return fmt.Errorf("timeoutSeconds must be greater than 0")
	}

	return nil
}
