package server

import (
	"net/http"
	"strings"

	"github.com/altescy/slide-cloud/frontend"
	"github.com/altescy/slide-cloud/internal/controller"
	"github.com/gin-gonic/gin"
)

func NewEngine(handler *controller.Handler) *gin.Engine {
	engine := gin.Default()

	apiGroup := engine.Group("/api")
	{
		apiGroup.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status": "ok",
			})
		})
		apiGroup.POST("/slides", handler.CreateSlide)
		apiGroup.GET("/slides/:id", handler.GetSlideByID)
	}

	engine.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api/") {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			fs := http.FS(frontend.GetStaticAssets())
			http.FileServer(fs).ServeHTTP(c.Writer, c.Request)
		}
	})

	return engine
}
