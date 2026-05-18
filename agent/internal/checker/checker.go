package checker

import (
	"net"
	"net/http"
	"time"

	"github.com/gdaniele-art/pinggo/agent/internal/model"
)

func checkHTTPGet(service model.Service, timeout time.Duration) model.CheckResult {
	start := time.Now()
	client := http.Client{
		Timeout: timeout,
	}
	resp, err := client.Get(service.URL)
	latencyMs := time.Since(start).Milliseconds()

	checkresult := model.CheckResult{
		URL:            service.URL,
		Status:         "DOWN",
		HTTPStatusCode: 0,
		LatencyMs:      latencyMs,
		ErrorMsg:       "",
		CheckedAt:      start.UTC(),
	}
	if err != nil {
		checkresult.ErrorMsg = err.Error()
		return checkresult
	}
	defer resp.Body.Close()
	checkresult.HTTPStatusCode = resp.StatusCode
	if resp.StatusCode >= 200 && resp.StatusCode < 400 {
		checkresult.Status = "UP"
	}
	return checkresult
}

func checkTCP(service model.Service, timeout time.Duration) model.CheckResult {
	start := time.Now()

	checkResult := model.CheckResult{
		URL:            service.URL,
		Status:         "DOWN",
		HTTPStatusCode: 0,
		LatencyMs:      0,
		ErrorMsg:       "",
		CheckedAt:      start.UTC(),
	}
	conn, err := net.DialTimeout("tcp", service.URL, timeout)

	checkResult.LatencyMs = time.Since(start).Milliseconds()

	if err != nil {
		checkResult.ErrorMsg = err.Error()
		return checkResult
	}
	defer conn.Close()
	checkResult.Status = "UP"
	return checkResult
}

func CheckService(service model.Service, timeout time.Duration) model.CheckResult {
	switch service.CheckMethod {
	case "HTTP_GET":
		return checkHTTPGet(service, timeout)
	case "TCP":
		return checkTCP(service, timeout)
	default:
		return model.CheckResult{
			URL:            service.URL,
			Status:         "DOWN",
			HTTPStatusCode: 0,
			LatencyMs:      0,
			ErrorMsg:       "Unsupported check method",
			CheckedAt:      time.Now().UTC(),
		}
	}
}
