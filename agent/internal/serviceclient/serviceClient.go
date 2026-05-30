package serviceclient

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/gdaniele-art/pinggo/agent/internal/model"
)

func FetchServices(apiURL string, token string) ([]model.Service, error) {
	if strings.TrimSpace(apiURL) == "" {
		return nil, fmt.Errorf("apiURL is required")
	}
	if strings.TrimSpace(token) == "" {
		return nil, fmt.Errorf("Token is required")
	}

	baseURL := strings.TrimRight(apiURL, "/")
	endpointURL := fmt.Sprintf("%s/api/agent/services", baseURL)
	client := http.Client{
		Timeout: 10 * time.Second,
	}

	req, err := http.NewRequest(http.MethodGet, endpointURL, nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error sending request: %w", err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		var apiError model.APIErrorResponse
		if err := json.Unmarshal(body, &apiError); err == nil && apiError.Message != "" {
			return nil, fmt.Errorf("API returned status %d : %s", resp.StatusCode, apiError.Message)
		}

		//fallback
		return nil, fmt.Errorf("API returned status %d: %s", resp.StatusCode, string(body))

	}

	var services []model.Service
	if err := json.Unmarshal(body, &services); err != nil {
		return nil, fmt.Errorf("failed to decode response body: %w", err)
	}

	return services, nil
}
