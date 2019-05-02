package model

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

//go:generate scanner
type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	Deleted   bool      `json:"-"`
}

func GetUserByID(d QueryExecutor, id int64) (*User, error) {
	return scanUser(d.QueryRow("SELECT * FROM user WHERE NOT deleted AND id = ?", id))
}

func getUserByIDWithLock(tx *sql.Tx, id int64) (*User, error) {
	return scanUser(tx.QueryRow("SELECT * FROM user WHERE id = ? FOR UPDATE", id))
}

func UserSignup(tx *sql.Tx, name, password string) error {
	pass, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	if _, err := tx.Exec(`INSERT INTO user (name, password, created_at) VALUES (?, ?, NOW(6))`, name, pass); err != nil {
		if mysqlError, ok := err.(*mysql.MySQLError); ok {
			if mysqlError.Number == 1062 {
				return ErrUserConflict
			}
		}
		return err
	}
	return nil
}

func UserLogin(d QueryExecutor, name, password string) (*User, error) {
	user, err := scanUser(d.QueryRow("SELECT * FROM user WHERE NOT deleted AND name = ?", name))
	switch {
	case err == sql.ErrNoRows:
		return nil, ErrUserNotFound
	case err != nil:
		return nil, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return user, nil
}
