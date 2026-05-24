package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

var configPath string

var rootCmd = &cobra.Command{
	Use:   "monitor-agent",
	Short: "PingGo internal service monitoring agent",
	Long:  `PingGo Agent runs inside a private network, fetches enabled monitored services from the PingGo backend, checks them periodically, and reports health check results back to the API.`,
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}
func GetConfigPath() string {
	return configPath
}
func init() {
	rootCmd.PersistentFlags().StringVarP(&configPath, "config", "c", "config/config.yaml", "Path to the configuration file")
}
