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

func validateConfig(cfg model.Config) error {
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

	if len(cfg.Services) == 0 {
		return fmt.Errorf("at least one service is required")
	}

	for _, service := range cfg.Services {
		if service.ServiceKey == "" {
			return fmt.Errorf("serviceKey is required")
		}

		if service.URL == "" {
			return fmt.Errorf("url is required for service %s", service.ServiceKey)
		}
	}
	return nil
}
