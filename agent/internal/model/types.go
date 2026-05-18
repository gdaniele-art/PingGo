package model

import "time"

type Config struct {
	APIUrl          string    `yaml:"apiUrl"`
	AgentID         int       `yaml:"agentId"`
	IntervalSeconds int       `yaml:"intervalSeconds"`
	TimeoutSeconds  int       `yaml:"timeoutSeconds"`
	Services        []Service `yaml:"services"`
}

type Service struct {
	ServiceKey  string `yaml:"serviceKey"`
	URL         string `yaml:"url"`
	CheckMethod string `yaml:"checkMethod"`
}

type CheckResult struct {
	URL            string
	Status         string
	HTTPStatusCode int
	LatencyMs      int64
	ErrorMsg       string
	CheckedAt      time.Time
}

type CheckResultRequest struct {
	AgentID        int       `json:"agentId"`
	ServiceKey     string    `json:"serviceKey"`
	Status         string    `json:"status"`
	HTTPStatusCode int       `json:"httpStatusCode"`
	LatencyMs      int64     `json:"latencyMs"`
	ErrorMessage   string    `json:"errorMessage"`
	CheckedAt      time.Time `json:"checkedAt"`
}

type ProcessResult struct {
	ServiceKey string
	Status     string
	Error      error
}
