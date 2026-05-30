package cmd

import (
	"fmt"

	"github.com/gdaniele-art/pinggo/agent/internal/checker"
	"github.com/gdaniele-art/pinggo/agent/internal/config"
	"github.com/gdaniele-art/pinggo/agent/internal/serviceclient"
	"github.com/spf13/cobra"
)

var servicesCmd = &cobra.Command{
	Use:   "services",
	Short: "Manage and inspect services assigned to this agent",
}

var servicesListCmd = &cobra.Command{
	Use:   "list",
	Short: "List all enabled services assigned to this agent",

	RunE: func(cmd *cobra.Command, args []string) error {
		cfg, err := config.LoadConfig(GetConfigPath())

		if err != nil {
			return fmt.Errorf("failed to load config: %w", err)
		}

		if err := config.ValidateConfig(cfg); err != nil {
			return fmt.Errorf("failed to validate config: %w", err)
		}

		fmt.Printf("[INFO] fetching services for agentId=%d\n", cfg.AgentID)

		services, err := serviceclient.FetchServices(cfg.APIUrl, cfg.Token)
		if err != nil {
			return fmt.Errorf("failed to fetch services: %w", err)
		}
		if len(services) == 0 {
			fmt.Println("[INFO] no enabled services configured for this agent")
			return nil
		}
		fmt.Printf("\n%-20s %-25s %-10s %s\n", "SERVICE KEY", "NAME", "METHOD", "URL")

		for _, service := range services {
			if err := checker.ValidateService(service); err != nil {
				fmt.Printf("[WARN] invalid service config:%v serviceKey=%s name=%s\n", err, service.ServiceKey, service.Name)
				continue
			}
			fmt.Printf("%-20s %-25s %-10s %s\n", service.ServiceKey, service.Name, service.CheckMethod, service.URL)
		}
		return nil
	},
}

func init() {
	rootCmd.AddCommand(servicesCmd)
	servicesCmd.AddCommand(servicesListCmd)
}
