package main

import (
	"github.com/altescy/slide-cloud/api/server"
)

func main() {
	engine := server.NewEngine()
	engine.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
