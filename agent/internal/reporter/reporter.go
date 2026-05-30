package reporter

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/gdaniele-art/pinggo/agent/internal/model"
)

func BuildCheckResult(agentID int, serviceKey string, checkResult model.CheckResult) model.CheckResultRequest {
	return model.CheckResultRequest{
		AgentID:        agentID,
		ServiceKey:     serviceKey,
		Status:         checkResult.Status,
		HTTPStatusCode: checkResult.HTTPStatusCode,
		LatencyMs:      checkResult.LatencyMs,
		ErrorMessage:   checkResult.ErrorMsg,
		CheckedAt:      checkResult.CheckedAt,
	}
}

func ReportCheckResult(checkResultRequest model.CheckResultRequest, apiURL string, token string) error {
	jsonBody, err := json.Marshal(checkResultRequest)
	if err != nil {
		return fmt.Errorf("error converting request to JSON: %w", err)
	}
	if strings.TrimSpace(token) == "" {
		return fmt.Errorf("token is required")
	}
	endpoint := strings.TrimRight(apiURL, "/") + "/api/agent/check-results"
	req, err := http.NewRequest(http.MethodPost, endpoint, bytes.NewBuffer(jsonBody))
	if err != nil {
		return fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Accept", "application/json")

	client := http.Client{
		Timeout: 10 * time.Second,
	}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error sending check result to API: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error reading response body: %w", err)
	}
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		var apiError model.APIErrorResponse
		if err := json.Unmarshal(body, &apiError); err == nil && apiError.Message != "" {
			return fmt.Errorf("API returned status %d : %s", resp.StatusCode, apiError.Message)
		}

		//fallback
		return fmt.Errorf("API returned status %d: %s", resp.StatusCode, string(body))
	}
	return nil
}
