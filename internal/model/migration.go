package model

import "gorm.io/gorm"

func AutoMigrate(db *gorm.DB) (err error) {
	if err := db.AutoMigrate(&Slide{}); err != nil {
		return err
	}
	return nil
}
