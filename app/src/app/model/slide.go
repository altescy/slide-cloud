package model

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/pkg/errors"
)

//go:generate scanner
type Slide struct {
	ID          int64     `json:"id"`
	UserID      int64     `json:"user_id"`
	AccessToken string    `json:"access_token"`
	Public      bool      `json:"public"`
	Name        string    `json:"name"`
	Content     string    `json:"content"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Deleted     bool      `json:"-"`
}

func GetSlideByID(d QueryExecutor, id int64) (*Slide, error) {
	return scanSlide(d.QueryRow("SELECT * FROM slide WHERE NOT deleted AND id = ?", id))
}

func getSlideByIDWithLock(tx *sql.Tx, id int64) (*Slide, error) {
	return scanSlide(tx.QueryRow("SELECT * FROM slide WHERE NOT deleted AND id = ? FOR UPDATE", id))
}

func getSlideByAccessToken(d QueryExecutor, accessToken string) (*Slide, error) {
	return scanSlide(d.QueryRow("SELECT * FROM slide WHERE NOT deleted AND access_token = ?", accessToken))
}

func getSlideByUserIDAndAccessToken(d QueryExecutor, userID int64, accessToken string) (*Slide, error) {
	return scanSlide(d.QueryRow("SELECT * FROM slide WHERE NOT deleted AND user_id = ? AND access_token = ?", userID, accessToken))
}

func GetSlidesByUserID(d QueryExecutor, userID int64) ([]*Slide, error) {
	return scanSlides(d.Query("SELECT * FROM slide WHERE NOT deleted AND user_id = ? ORDER BY updated_at DESC", userID))
}

func GetSlidesWithoutContentByUserID(d QueryExecutor, userID int64) ([]*Slide, error) {
	return scanSlides(d.Query("SELECT id, user_id, access_token, public, name, '', created_at, updated_at, deleted FROM slide WHERE NOT deleted AND user_id = ? ORDER BY updated_at DESC", userID))
}

func GetAvailableSlideByUserIDAndAccessToken(d QueryExecutor, userID int64, accessToken string) (*Slide, error) {
	slide, err := scanSlide(d.QueryRow("SELECT * FROM slide WHERE NOT deleted AND (public OR user_id = ?) AND access_token = ?", userID, accessToken))
	switch {
	case err == sql.ErrNoRows:
		return nil, ErrSlideNotFound
	case err != nil:
		return nil, err
	}
	return slide, nil
}

func GetPublicSlideByAccessToken(d QueryExecutor, accessToken string) (*Slide, error) {
	slide, err := scanSlide(d.QueryRow("SELECT * FROM slide WHERE NOT deleted AND public AND access_token = ?", accessToken))
	switch {
	case err == sql.ErrNoRows:
		return nil, ErrSlideNotFound
	case err != nil:
		return nil, err
	}
	return slide, nil
}

func getNewAccessToken(d QueryExecutor) (string, error) {
	const (
		MaxTryCount = 10
		TokenLength = 10
	)
	var accessToken string
	for i := 0; i < MaxTryCount; i++ {
		accessToken = RandString(TokenLength)
		if _, err := getSlideByAccessToken(d, accessToken); err != nil {
			if err != sql.ErrNoRows {
				return "", err
			}
			return accessToken, nil
		}
	}
	return "", ErrNoAvailableToken
}

func AddSlide(tx *sql.Tx, userID int64, name, content string) (*Slide, error) {
	user, err := getUserByIDWithLock(tx, userID)
	if err != nil {
		return nil, errors.Wrapf(err, "getUserByIDWithLock failed. id:%d", userID)
	}
	const (
		MaxTryCount = 10
		TokenLength = 10
	)
	accessToken, err := getNewAccessToken(tx)
	if err != nil {
		return nil, err
	}
	res, err := tx.Exec(`INSERT INTO slide (user_id, access_token, name, content, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(6), NOW(6))`, user.ID, accessToken, name, content)
	if err != nil {
		if mysqlError, ok := err.(*mysql.MySQLError); ok {
			if mysqlError.Number == 1062 {
				return nil, ErrSlideConflict
			}
		}
		return nil, errors.Wrap(err, "insert slide failed")
	}
	id, err := res.LastInsertId()
	if err != nil {
		return nil, errors.Wrap(err, "get slide_id failed")
	}
	return GetSlideByID(tx, id)
}

func UpdateSlide(tx *sql.Tx, userID int64, accessToken string, params map[string]string) (*Slide, error) {
	columns := []string{"public", "name", "content"}
	keys := []string{}
	values := []interface{}{}
	for _, k := range columns {
		if v, ok := params[k]; ok {
			keys = append(keys, fmt.Sprintf("%s = ?", k))
			switch {
			case k == "public":
				values = append(values, v == "1" || v == "true")
			default:
				values = append(values, v)
			}
		}
	}
	if len(values) == 0 {
		return nil, ErrParameterInvalid
	}
	query := fmt.Sprintf("UPDATE slide SET %s, updated_at = NOW(6) WHERE user_id = ? AND access_token = ? ", strings.Join(keys, ", "))
	values = append(values, userID)
	values = append(values, accessToken)
	_, err := tx.Exec(query, values...)
	if err != nil {
		if mysqlError, ok := err.(*mysql.MySQLError); ok {
			if mysqlError.Number == 1062 {
				return nil, ErrSlideConflict
			}
		}
		return nil, errors.Wrap(err, "update slide failed")
	}
	slide, err := getSlideByUserIDAndAccessToken(tx, userID, accessToken)
	switch {
	case err == sql.ErrNoRows:
		return nil, ErrSlideNotFound
	case err != nil:
		return nil, err
	}
	return slide, nil
}

func DeleteSlide(tx *sql.Tx, userID int64, accessToken string) error {
	res, err := tx.Exec("UPDATE slide SET deleted = 1, updated_at = NOW(6) WHERE not deleted AND user_id = ? AND access_token = ?", userID, accessToken)
	if err != nil {
		return err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return errors.Wrap(err, "get row affected failed")
	}
	if n == 0 {
		return ErrSlideNotFound
	}
	return nil
}
