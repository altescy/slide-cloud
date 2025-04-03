package model

import (
	"time"

	"gorm.io/gorm"
)

type Slide struct {
	ID        int            `json:"id" gorm:"primaryKey"`
	Title     string         `json:"title"`
	Content   string         `json:"content"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

func (s *Slide) BeforeCreate(tx *gorm.DB) (err error) {
	s.CreatedAt = time.Now()
	s.UpdatedAt = time.Now()
	return
}

func (s *Slide) BeforeUpdate(tx *gorm.DB) (err error) {
	s.UpdatedAt = time.Now()
	return
}

func (s *Slide) BeforeDelete(tx *gorm.DB) (err error) {
	s.DeletedAt = gorm.DeletedAt{
		Time:  time.Now(),
		Valid: true,
	}
	return
}

func CreateSlide(db *gorm.DB, slide *Slide) error {
	return db.Create(slide).Error
}

func GetSlideByID(db *gorm.DB, id int) (*Slide, error) {
	var slide Slide
	if err := db.First(&slide, id).Error; err != nil {
		return nil, err
	}
	return &slide, nil
}

func UpdateSlide(db *gorm.DB, slide *Slide) error {
	return db.Save(slide).Error
}

func DeleteSlide(db *gorm.DB, id int) error {
	var slide Slide
	if err := db.First(&slide, id).Error; err != nil {
		return err
	}
	return db.Delete(&slide).Error
}
