package main

import (
	"github.com/altescy/slide-cloud/frontend"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "pong"})
		})
	}

	router.Use(static.Serve("/", frontend.NewBinaryFS()))

	router.Run(":8080")
}
