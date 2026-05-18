package reporter

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

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

func ReportCheckResult(checkResultRequest model.CheckResultRequest, apiURL string) error {
	jsonBody, err := json.Marshal(checkResultRequest)
	if err != nil {
		return fmt.Errorf("error converting request to JSON: %w", err)
	}
	endpoint := strings.TrimRight(apiURL, "/") + "/api/agent/check-results"

	resp, err := http.Post(endpoint, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return fmt.Errorf("error sending check result to API: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("API returned unexpected status code: %d", resp.StatusCode)
	}
	return nil
}
