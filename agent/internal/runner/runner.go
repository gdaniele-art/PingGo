package runner

import (
	"fmt"
	"time"

	"github.com/gdaniele-art/pinggo/agent/internal/checker"
	"github.com/gdaniele-art/pinggo/agent/internal/model"
	"github.com/gdaniele-art/pinggo/agent/internal/reporter"
	"github.com/gdaniele-art/pinggo/agent/internal/serviceclient"
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

func RunOnce(apiURL string, agentID int, timeout time.Duration) {
	fmt.Printf("[INFO] fetching services for agentId=%d\n", agentID) //future improvement : logger
	services, err := serviceclient.FetchServices(apiURL, agentID)
	if err != nil {
		fmt.Printf("failed to fetch services: %v\n", err)
		return
	}
	if len(services) == 0 {
		fmt.Println("[INFO] no enabled services configured for this agent")
		return
	}
	fmt.Printf("[INFO] received %d enabled services\n", len(services))

	ch := make(chan model.ProcessResult, len(services))
	for _, service := range services {
		if err := checker.ValidateService(service); err != nil {
			fmt.Printf("[ERROR] invalid service config: %v\n", err)
			continue
		}
		fmt.Printf(
			"[INFO] checking serviceKey=%s name=%s method=%s url=%s\n", service.ServiceKey, service.Name, service.CheckMethod, service.URL)
		go ProcessService(apiURL, agentID, service, timeout, ch)
	}

	for i := 0; i < len(services); i++ {
		result := <-ch

		if result.Error != nil {
			fmt.Printf("[ERROR] %s status=%s report failed: %v\n", result.ServiceKey, result.Status, result.Error)
			continue
		}
		fmt.Printf("[OK] serviceKey=%s reported status=%s\n", result.ServiceKey, result.Status)
	}
}
func RunLoop(apiURL string, agentID int, interval time.Duration, timeout time.Duration) {
	for {
		RunOnce(apiURL, agentID, timeout)
		time.Sleep(interval)
	}
}
