package model

import (
	"database/sql"
	// "github.com/go-sql-driver/mysql"
)

func scanUsers(rows *sql.Rows, e error) (users []*User, err error) {
	if e != nil {
		return nil, e
	}
	defer func() {
		err = rows.Close()
	}()
	users = []*User{}
	for rows.Next() {
		var v User
		if err = rows.Scan(&v.ID, &v.Name, &v.Password, &v.CreatedAt, &v.Deleted); err != nil {
			return
		}
		users = append(users, &v)
	}
	err = rows.Err()
	return
}

func scanUser(row *sql.Row) (user *User, err error) {
	user = &User{}
	err = row.Scan(&user.ID, &user.Name, &user.Password, &user.CreatedAt, &user.Deleted)
	return
}

func scanSlides(rows *sql.Rows, e error) (slides []*Slide, err error) {
	if e != nil {
		return nil, e
	}
	defer func() {
		err = rows.Close()
	}()
	slides = []*Slide{}
	for rows.Next() {
		var v Slide
		if err = rows.Scan(&v.ID, &v.UserID, &v.AccessToken, &v.Public, &v.Name, &v.Content, &v.CreatedAt, &v.UpdatedAt, &v.Deleted); err != nil {
			return
		}
		slides = append(slides, &v)
	}
	err = rows.Err()
	return
}

func scanSlide(row *sql.Row) (slide *Slide, err error) {
	slide = &Slide{}
	err = row.Scan(&slide.ID, &slide.UserID, &slide.AccessToken, &slide.Public, &slide.Name, &slide.Content, &slide.CreatedAt, &slide.UpdatedAt, &slide.Deleted)
	return
}
