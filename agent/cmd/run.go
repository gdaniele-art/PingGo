package cmd

import (
	"time"

	"fmt"

	"github.com/gdaniele-art/pinggo/agent/internal/config"
	"github.com/gdaniele-art/pinggo/agent/internal/runner"
	"github.com/spf13/cobra"
)

var runOnce bool

var runCmd = &cobra.Command{
	Use:   "run",
	Short: "Start the pingGo monitoring agent",
	Long:  `Starts the PingGo agent, fetches enabled services from the backend API, checks them periodically, and reports the results`,
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg, err := config.LoadConfig(GetConfigPath())
		if err != nil {
			return fmt.Errorf("failed to load config: %w", err)
		}

		configValidated := config.ValidateConfig(cfg)
		if configValidated != nil {
			return fmt.Errorf("failed to validate config: %w", configValidated)
		}
		intervalSeconds := time.Duration(cfg.IntervalSeconds) * time.Second
		timeoutSeconds := time.Duration(cfg.TimeoutSeconds) * time.Second

		if runOnce {
			runner.RunOnce(cfg.APIUrl, cfg.AgentID, cfg.Token, timeoutSeconds)
			return nil
		}

		runner.RunLoop(cfg.APIUrl, cfg.AgentID, cfg.Token, intervalSeconds, timeoutSeconds)

		return nil

	},
}

func init() {
	rootCmd.AddCommand(runCmd)

	runCmd.Flags().BoolVarP(&runOnce, "once", "o", false, "Run the agent once and exit")

}
