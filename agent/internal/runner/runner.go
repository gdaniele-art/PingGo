package runner

import (
	"fmt"
	"time"

	"github.com/gdaniele-art/pinggo/agent/internal/checker"
	"github.com/gdaniele-art/pinggo/agent/internal/model"
	"github.com/gdaniele-art/pinggo/agent/internal/reporter"
)

func ProcessService(apiURL string, agentID int, service model.Service, timeout time.Duration, ch chan<- model.ProcessResult) {
	checkResult := checker.CheckService(service, timeout)

	request := reporter.BuildCheckResult(agentID, service.ServiceKey, checkResult)

	err := reporter.ReportCheckResult(request, apiURL)
	if err != nil {
		ch <- model.ProcessResult{
			ServiceKey: service.ServiceKey,
			Status:     checkResult.Status,
			Error:      err,
		}
		return
	}
	ch <- model.ProcessResult{
		ServiceKey: service.ServiceKey,
		Status:     checkResult.Status,
		Error:      nil,
	}
}

func RunOnce(apiURL string, agentID int, services []model.Service, timeout time.Duration) {
	ch := make(chan model.ProcessResult, len(services))
	for _, service := range services {
		go ProcessService(apiURL, agentID, service, timeout, ch)
	}

	for i := 0; i < len(services); i++ {
		result := <-ch

		if result.Error != nil {
			fmt.Printf("[ERROR] %s status=%s report failed: %v\n", result.ServiceKey, result.Status, result.Error)
			continue
		}
		fmt.Printf("[OK] %s reported status=%s\n", result.ServiceKey, result.Status)
	}
}
func RunLoop(apiURL string, agentID int, services []model.Service, interval time.Duration, timeout time.Duration) {
	for {
		RunOnce(apiURL, agentID, services, timeout)
		time.Sleep(interval)
	}
}
