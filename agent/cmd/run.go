package cmd

import (
	"time"

	"fmt"

	"github.com/gdaniele-art/pinggo/agent/internal/config"
	"github.com/gdaniele-art/pinggo/agent/internal/runner"
	"github.com/spf13/cobra"
)

// runCmd represents the run command
var runCmd = &cobra.Command{
	Use:   "run",
	Short: "Start the pingGo monitoring agent",
	Long:  ``,
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg, err := config.LoadConfig("config/config.yaml")
		if err != nil {
			return fmt.Errorf("failed to load config: %w", err)
		}

		configValidated := config.ValidateConfig(cfg)
		if configValidated != nil {
			return fmt.Errorf("failed to validate config: %w", configValidated)
		}
		intervalSeconds := time.Duration(cfg.IntervalSeconds) * time.Second
		timeoutSeconds := time.Duration(cfg.TimeoutSeconds) * time.Second

		runner.RunLoop(cfg.APIUrl, cfg.AgentID, intervalSeconds, timeoutSeconds)

		return nil

	},
}

func init() {
	rootCmd.AddCommand(runCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// runCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// runCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
