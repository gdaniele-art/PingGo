package checker

import (
	"fmt"
	"net"
	"strings"

	"github.com/gdaniele-art/pinggo/agent/internal/model"
)

func ValidateService(service model.Service) error {
	if strings.TrimSpace(service.ServiceKey) == "" {

		return fmt.Errorf("service key is required")
	}
	if strings.TrimSpace(service.URL) == "" {
		return fmt.Errorf("url is required")
	}
	switch service.CheckMethod {
	case "HTTP_GET":
		if !strings.HasPrefix(service.URL, "http://") && !strings.HasPrefix(service.URL, "https://") {
			return fmt.Errorf("service %s uses HTTP_GET but url must start with http:// or https://", service.ServiceKey)
		}
	case "TCP":
		host, port, err := net.SplitHostPort(service.URL)
		if err != nil || strings.TrimSpace(host) == "" || strings.TrimSpace(port) == "" {
			return fmt.Errorf("service %s uses TCP but url must have host:port format", service.ServiceKey)
		}
	case "PING":
		return fmt.Errorf("service %s uses PING but it is not supported yet", service.ServiceKey)

	default:
		return fmt.Errorf("unsupported checkMethod %q for service %s", service.CheckMethod, service.ServiceKey)

	}
	return nil
}
