package controller

import (
	"net/http"

	"github.com/altescy/slide-cloud/internal/model"
	"github.com/gin-gonic/gin"
)

func (h *Handler) CreateSlide(c *gin.Context) {
	var slide model.Slide
	if err := c.ShouldBindJSON(&slide); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.DB.Create(&slide).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, slide)
}

func (h *Handler) GetSlideByID(c *gin.Context) {
	id := c.Param("id")
	var slide model.Slide
	if err := h.DB.First(&slide, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Slide not found"})
		return
	}

	c.JSON(http.StatusOK, slide)
}
