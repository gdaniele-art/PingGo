package model

type Config struct {
	APIUrl          string    `yaml:"apiUrl"`
	AgentID         int       `yaml:"agentId"`
	IntervalSeconds int       `yaml:"intervalSeconds"`
	TimeoutSeconds  int       `yaml:"timeoutSeconds"`
	Services        []Service `yaml:"services"`
}

type Service struct {
	ServiceKey string `yaml:"serviceKey"`
	URL        string `yaml:"url"`
}
