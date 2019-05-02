package model

import (
	"database/sql"

	"github.com/pkg/errors"
)

var (
	ErrUserNotFound     = errors.New("user not found")
	ErrUserConflict     = errors.New("user conflict")
	ErrSlideNotFound    = errors.New("slide not found")
	ErrSlideConflict    = errors.New("slide name conflict")
	ErrNoAvailableToken = errors.New("no available token")
	ErrParameterInvalid = errors.New("parameter invalid")
)

type QueryExecutor interface {
	Exec(string, ...interface{}) (sql.Result, error)
	Query(string, ...interface{}) (*sql.Rows, error)
	QueryRow(string, ...interface{}) *sql.Row
}
