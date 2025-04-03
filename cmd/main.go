package main

import (
	"github.com/altescy/slide-cloud/internal/controller"
	"github.com/altescy/slide-cloud/internal/model"
	"github.com/altescy/slide-cloud/internal/server"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	cxn := ":memory:?cache=shared"
	db, err := gorm.Open(sqlite.Open(cxn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	if err := model.AutoMigrate(db); err != nil {
		panic("failed to migrate database")
	}

	handler := controller.NewHandler(db)
	engine := server.NewEngine(handler)
	engine.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
